

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import axiosInstance from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import {loadUser} from "../redux/authSlice";

export default function Chat() {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

    useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
      return;
    }
    const fetchUser = async () => {
      try{
        const res = await axiosInstance.get("/api/users/me",{
          headers: {Authorization:token}
        });
        console.log("User data is received",res.data);
        dispatch(loadUser(res.data));
        
      }catch(err){
        console.log("Session expired",err);
       
      }
    }
    fetchUser();
  },[dispatch,navigate]);

  // Fetch all rooms on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axiosInstance.get("/api/rooms", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setRooms(res.data);
      } catch (err) {
        console.log("Error fetching rooms", err);
      }
    };
    fetchRooms();
  }, [user]);

  useEffect(() => {
    if(!user){
      return;
    }
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/users", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.log("Error fetching users", err);
      }
    };
    fetchUsers();
  }, [user]);

 



  // Join room socket when active room changes
  
  
  useEffect(() => {
    if (!activeRoom) {
      return;
    }
    socket.emit("joinroom", activeRoom._id);
    return () => {
      socket.emit("leaveroom", activeRoom._id);
    };
  }, [activeRoom]);

  // Fetch messages when active room changes
  useEffect(() => {
    if (!activeRoom) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/messages/${activeRoom._id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.log("Error fetching messages", err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [activeRoom]);

  // Listen for incoming messages via socket
  useEffect(() => {
    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !activeRoom) {
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/api/messages/send",
        {
          roomId: activeRoom._id,
          content: message,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // Emit to other users via socket
      socket.emit("sendMessage", {
        roomId: activeRoom._id,
        message: res.data,
      });

      // Add message to local state immediately
      setMessages((prev) => [...prev, res.data]);
      setMessage("");
    } catch (err) {
      console.log("Error sending message", err);
    }
  };

  const createRoom = async () => {
    if (!roomName.trim()) return;

    try {
      const res = await axiosInstance.post(
        "/api/rooms/createRoom",
        { name: roomName },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setRooms((prev) => [...prev, res.data]);
      setRoomName("");
      setShowModal(false);
    } catch (err) {
      console.log("Create room failed", err);
    }
  };

  const startDM = async (userId) => {
    const res = await axiosInstance.post(
      "/api/rooms/dm",
      { userId },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    setActiveRoom(res.data);
  };

  const getChatTitle = () => {
    if (!activeRoom) {
      return "Select a room or chat";
    }
    if (activeRoom.isGroup) {
      return activeRoom.name;
    }

    const otherUser = activeRoom.users.find((u) => u._id !== userId);

    return otherUser?.username || "Chat";
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([],{
      hour:"2-digit",
      minute:"2-digit"
    });
  }

  const groupRooms = rooms.filter((room) => room.isGroup);
  const filteredUsers = users.filter((user) => user._id !== userId);

  if(!user){
    return (
      <div>
        Loading chat...
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-green-200">
      {/* SIDEBAR */}
      <div className="w-1/4 bg-green border-r flex flex-col">
        {/* Header */}
      <div className="p-3 sm:p-4 border-b ">
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

    {/* Username */}
    <div className="text-sm font-medium text-gray-700 text-center sm:text-left truncate">
      {user.username}
    </div>

    {/* Title */}
    <h2 className="font-bold text-lg text-center">
      Chats
    </h2>

    {/* Actions */}
    <div className="flex gap-2 justify-center sm:justify-end">
      <button
        onClick={() => setShowModal(true)}
        className="text-xs sm:text-sm bg-green-600 text-white px-3 sm:px-4 py-1.5 rounded hover:bg-green-700 transition"
      >
        + Room
      </button>

      <button
        onClick={() => navigate("/login")}
        className="text-xs sm:text-sm bg-red-800 text-white px-3 sm:px-4 py-1.5 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>

  </div>
      </div>



        {/* Rooms */}
        <div className="p-4 flex-1 overflow-y-auto bg-gray-800">
          <p className="text-white text-xl mb-2 font-bold">Rooms</p>

          {groupRooms.map((room) => (
            <div
              key={room._id}
              onClick={() => setActiveRoom(room)}
              className={`p-2 rounded cursor-pointer mb-1 bg-green-300`}
            >
              {room.name}
            </div>
          ))}

          <p className="text-white text-sm mt-4 mb-2 font-bold">
            Direct Messages
          </p>
          {filteredUsers.map((u) => (
            <div
              key={u._id}
              onClick={() => startDM(u._id)}
              className="p-2 rounded cursor-pointer hover:bg-green-600 hover:text-white bg-green-200 mb-4"
            >
              👤 {u?.username || "Loading..."}
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="w-3/4 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-green-500 border-b text-xl text-white font-bold">
          <h3 className="font-semibold">{getChatTitle()}</h3>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-600">
          {loading ? (
            <p className="text-gray-400">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-400">No messages yet</p>
          ) : (
            messages.map((m) => (
              <div
                key={m._id}
                className={`mb-3 max-w-md p-3 rounded-lg 
                  ${
                    m.sender?.id === userId
                      ? "bg-green-200 ml-auto"
                      : "bg-white"
                  }`}
              >
                <p className="text-xs text-gray-500 mb-1">
                  {m.sender?.username || "User"}
                </p>
                <p>{m.content}</p>
                <p className="text-[10px] text-right mt-1 opacity-70">{formatTime(m.createdAt)}</p>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        {activeRoom && (
          <form
            onSubmit={sendMessage}
            className="p-4 bg-white border-t flex gap-2"
          >
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 rounded-lg hover:bg-indigo-700"
            >
              Send
            </button>
          </form>
        )}
      </div>

      {/* CREATE ROOM MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80">
            <h3 className="font-semibold mb-4">Create Room</h3>

            <input
              type="text"
              placeholder="Room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            <div className="flex gap-2">
              <button
                onClick={createRoom}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Create
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
