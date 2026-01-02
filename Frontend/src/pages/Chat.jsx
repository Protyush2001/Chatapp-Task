

// import { useState, useEffect, useRef  } from "react";
// import { useNavigate } from "react-router-dom";
// import socket from "../socket";
// import axiosInstance from "../api/axios";
// import { useDispatch, useSelector } from "react-redux";
// import { loadUser } from "../redux/authSlice";

// export default function Chat() {
//   const [rooms, setRooms] = useState([]);
//   const [activeRoom, setActiveRoom] = useState(null);
  
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [roomName, setRoomName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedUsers, setSelectedUsers] = useState([]);


//   const [users, setUsers] = useState([]);

//   const messagesEndRef = useRef(null);

//   const user = useSelector((state) => state.auth.user);
//   const userId = user?.id || user?._id;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//     useEffect(()=>{
//     const token = localStorage.getItem("token");
//     if(!token){
//       navigate("/login");
//       return;
//     }
//     const fetchUser = async () => {
//       try{
//         const res = await axiosInstance.get("/api/users/me",{
//           headers: {Authorization:token}
//         });
//         console.log("User data is received",res.data);
//         dispatch(loadUser(res.data));
        
//       }catch(err){
//         console.log("Session expired",err);
       
//       }
//     }
//     fetchUser();
//   },[dispatch,navigate]);



//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const res = await axiosInstance.get("/api/rooms", {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         });
//         setRooms(res.data);
//       } catch (err) {
//         console.log("Error fetching rooms", err);
//       }
//     };
//     fetchRooms();
//   }, [user]);

//   useEffect(() => {
//     if(!user){
//       return;
//     }
//     const fetchUsers = async () => {
//       try {
//         const res = await axiosInstance.get("/api/users", {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         });

//         setUsers(res.data);
//       } catch (err) {
//         console.log("Error fetching users", err);
//       }
//     };
//     fetchUsers();
//   }, [user]);

 




  
  
//   useEffect(() => {
//     if (!activeRoom) {
//       return;
//     }
//     socket.emit("joinroom", activeRoom._id);
//     return () => {
//       socket.emit("leaveroom", activeRoom._id);
//     };
//   }, [activeRoom]);


//   useEffect(() => {
//     if (!activeRoom) return;

//     const fetchMessages = async () => {
//       setLoading(true);
//       try {
//         const res = await axiosInstance.get(`/api/messages/${activeRoom._id}`, {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         });
//         setMessages(res.data);
//       } catch (err) {
//         console.log("Error fetching messages", err);
//         setMessages([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMessages();
//   }, [activeRoom]);


//   useEffect(() => {
//     const handleMessage = (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     };

//     socket.on("receiveMessage", handleMessage);

//     return () => {
//       socket.off("receiveMessage", handleMessage);
//     };
//   }, []);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim() || !activeRoom) {
//       return;
//     }

//     try {
//       const res = await axiosInstance.post(
//         "/api/messages/send",
//         {
//           roomId: activeRoom._id,
//           content: message,
//         },
//         {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         }
//       );

    
//       socket.emit("sendMessage", {
//         roomId: activeRoom._id,
//         message: res.data,
//       });

//       // Add message to local state immediately
//       setMessages((prev) => [...prev, res.data]);
//       setMessage("");
//     } catch (err) {
//       console.log("Error sending message", err);
//     }
//   };



//   const createRoom = async () => {
//   if (!roomName || selectedUsers.length === 0) return;

//   const res = await axiosInstance.post(
//     "/api/rooms/createRoom",
//     {
//       name: roomName,
//       users: selectedUsers
//     },
//     {
//       headers: {
//         Authorization: localStorage.getItem("token")
//       }
//     }
//   );

//   setRooms((prev) => [...prev, res.data]);
//   setShowModal(false);
//   setRoomName("");
//   setSelectedUsers([]);
// };

//   const startDM = async (userId) => {
//     const res = await axiosInstance.post(
//       "/api/rooms/dm",
//       { userId },
//       { headers: { Authorization: localStorage.getItem("token") } }
//     );
//     setActiveRoom(res.data);
//   };

//   const getChatTitle = () => {
//     if (!activeRoom) {
//       return "Select a room or chat";
//     }
//     if (activeRoom.isGroup) {
//       return activeRoom.name;
//     }

//     const otherUser = activeRoom.users.find((u) => u._id !== userId);

//     return otherUser?.username || "Chat";
//   };

//   const formatTime = (time) => {
//     return new Date(time).toLocaleTimeString([],{
//       hour:"2-digit",
//       minute:"2-digit"
//     });
//   }

//   const groupRooms = rooms.filter((room) => room.isGroup);
//   const filteredUsers = users.filter((user) => user._id !== userId);

//   if(!user){
//     return (
//       <div>
//         Loading chat...
//       </div>
//     )
//   }

//  return (
//     <div className="flex h-screen bg-gray-50">
//       {/* SIDEBAR */}
//       <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
//         {/* Header */}
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex-1">
//               <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
//                 Logged in as
//               </p>
//               <p className="text-lg font-bold text-gray-900 truncate">
//                 {user.username}
//               </p>
//             </div>
//             <button
//               onClick={() => navigate("/login")}
//               className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 hover:text-red-600"
//               title="Logout"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                 />
//               </svg>
//             </button>
//           </div>
//           <button
//             onClick={() => setShowModal(true)}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-3 rounded-lg transition flex items-center justify-center gap-2"
//           >
//             <span>+</span> New Room
//           </button>
//         </div>

//         {/* Rooms & DMs List */}
//         <div className="flex-1 overflow-y-auto p-3 space-y-2">
//           {/* Rooms Section */}
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-widest font-bold px-3 py-2 mb-1">
//               Rooms
//             </p>
//             <div className="space-y-1.5">
//               {groupRooms.length === 0 ? (
//                 <p className="text-xs text-gray-400 px-3 py-2">No rooms yet</p>
//               ) : (
//                 groupRooms.map((room) => (
//                   <button
//                     key={room._id}
//                     onClick={() => setActiveRoom(room)}
//                     className={`w-full text-left px-3 py-2.5 rounded-lg transition font-medium ${
//                       activeRoom?._id === room._id
//                         ? "bg-blue-600 text-white"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     <span className="text-lg mr-2">#</span>
//                     {room.name}
//                   </button>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* DMs Section */}
//           <div className="pt-2 mt-4 border-t border-gray-200">
//             <p className="text-xs text-gray-500 uppercase tracking-widest font-bold px-3 py-2 mb-1">
//               Direct Messages
//             </p>
//             <div className="space-y-1.5">
//               {filteredUsers.length === 0 ? (
//                 <p className="text-xs text-gray-400 px-3 py-2">No users available</p>
//               ) : (
//                 filteredUsers.map((u) => (
//                   <button
//                     key={u._id}
//                     onClick={() => startDM(u._id)}
//                     className={`w-full text-left px-3 py-2.5 rounded-lg transition font-medium flex items-center gap-2 ${
//                       activeRoom?.users?.some((usr) => usr._id === u._id) &&
//                       !activeRoom?.isGroup
//                         ? "bg-blue-100 text-blue-900"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     <span className="text-lg">👤</span>
//                     <span className="truncate">{u?.username || "Loading..."}</span>
//                   </button>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CHAT AREA */}
//       <div className="flex-1 flex flex-col bg-white">
//         {/* Chat Header */}
//         <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900">
//               {getChatTitle()}
//             </h2>
//             {activeRoom && (
//               <p className="text-xs text-gray-500 mt-0.5">
//                 {activeRoom.isGroup
//                   ? `${activeRoom.users?.length || 0} members`
//                   : "Direct message"}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Messages Container */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
//           {!activeRoom ? (
//             <div className="h-full flex items-center justify-center">
//               <div className="text-center">
//                 <svg
//                   className="w-16 h-16 text-gray-300 mx-auto mb-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                   />
//                 </svg>
//                 <p className="text-gray-500 font-medium">
//                   Select a chat to start messaging
//                 </p>
//               </div>
//             </div>
//           ) : loading ? (
//             <div className="h-full flex items-center justify-center">
//               <div className="flex flex-col items-center gap-2">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                 <p className="text-gray-400 text-sm">Loading messages...</p>
//               </div>
//             </div>
//           ) : messages.length === 0 ? (
//             <div className="h-full flex items-center justify-center">
//               <p className="text-gray-400">No messages yet. Start the conversation!</p>
//             </div>
//           ) : (
//             <>
//               {messages.map((m) => (
//                 <div
//                   key={m._id}
//                   className={`flex ${
//                     m.sender?._id === userId ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-xs lg:max-w-md ${
//                       m.sender?._id === userId
//                         ? "bg-blue-600 text-white rounded-3xl rounded-tr-sm shadow-md"
//                         : "bg-white text-gray-900 rounded-3xl rounded-tl-sm border border-gray-200 shadow-sm"
//                     } px-4 py-3`}
//                   >
//                     {activeRoom.isGroup && m.sender?._id !== userId && (
//                       <p className="text-xs font-semibold mb-1 opacity-75">
//                         {m.sender?.username || "User"}
//                       </p>
//                     )}
//                     <p className="break-words text-sm leading-relaxed">
//                       {m.content}
//                     </p>
//                     <p
//                       className={`text-xs mt-1.5 text-right ${
//                         m.sender?._id === userId ? "text-blue-100" : "text-gray-400"
//                       }`}
//                     >
//                       {formatTime(m.createdAt)}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </>
//           )}
//         </div>

//         {/* Message Input */}
//         {activeRoom && (
//           <form
//             onSubmit={sendMessage}
//             className="p-4 bg-white border-t border-gray-200"
//           >
//             <div className="flex gap-3">
//               <input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400"
//               />
//               <button
//                 type="submit"
//                 disabled={!message.trim()}
//                 className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-full transition flex items-center gap-2"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-2.379 5.951 2.379a1 1 0 001.169-1.409l-7-14z" />
//                 </svg>
//               </button>
//             </div>
//           </form>
//         )}
//       </div>



//       {showModal && (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl w-80">
//         <h3 className="font-semibold mb-4 text-lg">Create Group</h3>

//       {/* Room Name */}
//       <input
//         type="text"
//         placeholder="Room name"
//         value={roomName}
//         onChange={(e) => setRoomName(e.target.value)}
//         className="w-full border rounded-lg px-3 py-2 mb-3"
//       />

//       {/* Select Users */}
//       <p className="text-sm font-medium mb-1">Add members</p>
//       <div className="max-h-40 overflow-y-auto border rounded p-2 mb-4">
//         {users
//           .filter((u) => u._id !== userId)
//           .map((u) => (
//             <label
//               key={u._id}
//               className="flex items-center gap-2 mb-1 cursor-pointer"
//             >
//               <input
//                 type="checkbox"
//                 value={u._id}
//                 onChange={(e) => {
//                   if (e.target.checked) {
//                     setSelectedUsers((prev) => [...prev, u._id]);
//                   } else {
//                     setSelectedUsers((prev) =>
//                       prev.filter((id) => id !== u._id)
//                     );
//                   }
//                 }}
//               />
//               <span className="text-sm">{u.username}</span>
//             </label>
//           ))}
//       </div>

//       {/* Actions */}
//       <div className="flex gap-2">
//         <button
//           onClick={createRoom}
//           className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           Create
//         </button>
//         <button
//           onClick={() => setShowModal(false)}
//           className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// }

//////////////////////////

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

  const user = useSelector((state) => state.auth.user);
  const userId = user?._id || user?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  /* auth */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axiosInstance.get("/api/users/me", {
      headers: { Authorization: token }
    }).then(res => dispatch(loadUser(res.data)));
  }, []);

  /* rooms */
  useEffect(() => {
    if (!user) return;
    axiosInstance.get("/api/rooms", {
      headers: { Authorization: localStorage.getItem("token") }
    }).then(res => setRooms(res.data));
  }, [user]);

  /* users */
  useEffect(() => {
    if (!user) return;
    axiosInstance.get("/api/users", {
      headers: { Authorization: localStorage.getItem("token") }
    }).then(res => setUsers(res.data));
  }, [user]);

  /* socket room join */
  useEffect(() => {
    if (!activeRoom) return;
    socket.emit("joinroom", activeRoom._id);
    return () => socket.emit("leaveroom", activeRoom._id);
  }, [activeRoom]);

  /* messages */
  useEffect(() => {
    if (!activeRoom) return;
    setLoading(true);
    axiosInstance
      .get(`/api/messages/${activeRoom._id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(res => setMessages(res.data))
      .finally(() => setLoading(false));
  }, [activeRoom]);

  useEffect(() => {
    socket.on("receiveMessage", msg =>
      setMessages(prev => [...prev, msg])
    );
    return () => socket.off("receiveMessage");
  }, []);

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
      message: res.data
    });

    setMessages(prev => [...prev, res.data]);
    setMessage("");
  };

  const createRoom = async () => {
    if (!roomName || selectedUsers.length === 0) return;

    const res = await axiosInstance.post(
      "/api/rooms/createRoom",
      { name: roomName, users: selectedUsers },
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    setRooms(prev => [...prev, res.data]);
    setShowModal(false);
    setRoomName("");
    setSelectedUsers([]);
  };

  if (!user) return <div>Loading chat...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        user={user}
        rooms={rooms}
        users={users}
        activeRoom={activeRoom}
        setActiveRoom={setActiveRoom}
        setShowModal={setShowModal}
        navigate={navigate}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader activeRoom={activeRoom} userId={userId} />
        <Messages
          messages={messages}
          activeRoom={activeRoom}
          userId={userId}
          loading={loading}
          messagesEndRef={messagesEndRef}
        />
        {activeRoom && (
          <MessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
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

