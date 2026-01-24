


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import axiosInstance from "../api/axios";
import { loadUser } from "../redux/authSlice";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import Messages from "../components/Messages";
import MessageInput from "../components/MessageInput";
import CreateRoomModal from "../components/CreateRoomModal";

export default function Chat() {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const [typingUser, setTypingUser] = useState("");



 
  const [showChat, setShowChat] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const userId = user?._id || user?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axiosInstance
      .get("/api/users/me", {
        headers: { Authorization: token },
      })
      .then((res) => dispatch(loadUser(res.data)))
      .catch((err) => {
        if (err.response?.status === 401) navigate("/login");
      });
  }, []);


  useEffect(() => {
    if (!user) return;
    axiosInstance
      .get("/api/rooms", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setRooms(res.data));
  }, [user]);

  // useEffect(() => {
  //   if (!user) return;
  //   axiosInstance
  //     .get("/api/users?page=1&limit=5", {
  //       headers: { Authorization: localStorage.getItem("token") },
  //     })
  //     .then((res) => setUsers(res.data));
  // }, [user]);

//
useEffect(() => {
  if (!user) return;

  axiosInstance
    .get(`/api/users?page=${page}&limit=5`, {
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      const { users: newUsers, pagination } = res.data;

      if (page === 1) {
        setUsers(newUsers);
      } else {
        setUsers(prev => [...prev, ...newUsers]);
      }

      setHasMore(pagination.hasMore);
    })
    .catch(err => console.log("User pagination error:", err));
}, [user, page]);
//
  useEffect(() => {
    if (!activeRoom) return;
    socket.emit("joinroom", activeRoom._id);
    return () => socket.emit("leaveroom", activeRoom._id);
  }, [activeRoom]);


  useEffect(() => {
    if (!activeRoom) return;
    setLoading(true);
    axiosInstance
      .get(`/api/messages/${activeRoom._id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setMessages(res.data))
      .finally(() => setLoading(false));
  }, [activeRoom]);

  useEffect(() => {
  socket.on("userTyping", ({ username }) => {
    setTypingUser(username);
  });

  socket.on("userStopTyping", () => {
    setTypingUser("");
  });

  return () => {
    socket.off("userTyping");
    socket.off("userStopTyping");
  };
}, []);


 



useEffect(() => {
  const handler = (msg) => {
    if (msg.roomId === activeRoom?._id) {
      setMessages(prev => [...prev, msg]);
    }
  };

  socket.on("receiveMessage", handler);

  return () => {
    socket.off("receiveMessage", handler);
  };
}, [activeRoom]);


  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const res = await axiosInstance.post(
      "/api/messages/send",
      { roomId: activeRoom._id, content: message },
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    socket.emit("sendMessage", {
      roomId: activeRoom._id,
      message: res.data,
    });

    setMessages((prev) => [...prev, res.data]);
    setMessage("");
  };


  const startDM = async (otherUserId) => {
    try {
      const res = await axiosInstance.post(
        "/api/rooms/dm",
        { userId: otherUserId },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setActiveRoom(res.data);
      setShowChat(true); 
    } catch (err) {
      console.log("Error starting DM", err);
    }
  };


  const createRoom = async () => {
    if (!roomName || selectedUsers.length === 0) return;

    const res = await axiosInstance.post(
      "/api/rooms/createRoom",
      { name: roomName, users: selectedUsers },
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    setRooms((prev) => [...prev, res.data]);
    setShowModal(false);
    setRoomName("");
    setSelectedUsers([]);
  };


  const handleSetActiveRoom = (room) => {
    setActiveRoom(room);
    setShowChat(true);
  };

  if (!user) return <div>Loading chat...</div>;

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
   
      <div
        className={`w-full md:w-80 ${
          showChat ? "hidden md:block" : "block"
        }`}
      >
        <Sidebar
          user={user}
          rooms={rooms}
          users={users}
          activeRoom={activeRoom}
          setActiveRoom={handleSetActiveRoom}
          setShowModal={setShowModal}
          navigate={navigate}
          startDM={startDM}
          hasMore={hasMore}
          loadMoreUsers={() => setPage(prev => prev + 1)}
        />
      </div>

      <div
        className={`flex-1 flex flex-col ${
          showChat ? "block" : "hidden md:flex"
        }`}
      >
        {/* Mobile back */}
        <div className="md:hidden p-2 border-b bg-white">
          <button
            onClick={() => setShowChat(false)}
            className="text-sm text-green-500 font-semibold"
          >
            ← Back
          </button>
        </div>

        <ChatHeader activeRoom={activeRoom} userId={userId} typingUser={typingUser} />

        <Messages
          messages={messages}
          activeRoom={activeRoom}
          userId={userId}
          loading={loading}
          messagesEndRef={messagesEndRef}
          typingUser={typingUser}
        />

        {activeRoom && (
          <MessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            socket={socket}
            activeRoom={activeRoom}
            username={user?.name}
          />
        )}
      </div>

      {showModal && (
        <CreateRoomModal
          users={users}
          userId={userId}
          roomName={roomName}
          setRoomName={setRoomName}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          createRoom={createRoom}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
