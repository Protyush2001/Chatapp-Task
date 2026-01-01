// import { useState, useEffect } from "react";
// import socket from "../socket";
// import axiosInstance from "../api/axios";
// import { useSelector } from "react-redux";

// export default function Chat() {
//   const [rooms, setRooms] = useState([]);
//   const [activeRoom, setActiveRoom] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showModal,setShowModal] = useState(false);
//   const [roomName,setRoomName] =useState("");

//   const user = useSelector((state) => state.auth.user);
//   const userId = user?.id;

//   useEffect(() => {
//     const fetchRooms = async () => {
//         try{
//       const res = await axiosInstance.get("/api/rooms", {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       });
//       setRooms(res.data);
//         }catch(err){
//             console.log("Error fetching rooms", err);
//         }

//     };
//     fetchRooms();
//   }, []);

//   useEffect(() => {
//     if (!activeRoom) {
//       return;
//     }
//     socket.emit("joinroom", activeRoom._id);
//     // return () => {
//     //   socket.emit("leaveroom", activeRoom._id);
//     // };
//   }, [activeRoom]);

//   useEffect(() => {
//     if (!activeRoom) return;
//     const fetchMessages = async () => {
//         try{
//             const res = await axiosInstance.get(`/api/messages/${activeRoom._id}`, 
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       });
//       setMessages(res.data);
//         }catch(err){
//             console.log("Error fetching messages", err);
//         }
      
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
//     try{
//         const res = await axiosInstance.post("/api/messages/send",{
//             roomId: activeRoom._id,
//             content: message,      
//     },
//     {
//         headers:{
//             Authorization: localStorage.getItem("token")
//         },
//         }
//     );
//     socket.emit("sendMessage", {
//       roomId: activeRoom._id,
//       message: res.data,

//     });
//     setMessage("");
//   }catch(err){
//     console.log("Error sending message", err);
//   }
// }

// const createRoom = async () =>{
//     if(!roomName.trim()) return;
//     try{
//         const res = await axiosInstance.post(
//             "/api/rooms/createRoom",
//             {name: roomName},
//             {
//                 headers: {
//                     Authorization: localStorage.getItem("token"),
//                 },
//             }
//         );
//         setRooms((prev)=>[...prev,res.data]);
//         setRoomName("");
//         setShowModal(false);
//     }catch(err){
//         console.log("Create room failed",err);
//     }
// }

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <div
//         style={{ width: "25%", borderRight: "1px solid #ccc", padding: "10px" }}
//       >
//         <h2>Chat Rooms</h2>
//         <button onClick={()=>setShowModal(true)}>Create Room</button>
//         {rooms.map((room) => (
//           <p
//             key={room._id}
//             onClick={() => setActiveRoom(room)}
//             style={{
//               cursor: "pointer",
//               fontWeight: activeRoom?._id === room._id ? "bold" : "normal",
//             }}
//           >
//             {room.name}
//           </p>
//         ))}
//       </div>
//       <div style={{ width: "75%", padding: "10px" }}>
//         <h3>{activeRoom ? activeRoom.name : "Select a room"}</h3>
//         <div
//           style={{
//             height: "75%",
//             overflowY: "auto",
//             border: "1px solid #ddd",
//             padding: "10px",
//           }}
//         >
//           {messages.map((m, i) => (
//             <p key={i}>
//               <b>{m.sender?.username || "User"}:</b> {m.content}
//             </p>
//           ))}
//         </div>

//         {activeRoom && (
//           <form action="" onSubmit={sendMessage} style={{ marginTop: "10px" }}>
//             <input
//               type="text"
//               placeholder="Type your message here"
//               style={{ width: "80%", padding: "8px" }}
//               value={message}
//               onChange={(e) => {
//                 setMessage(e.target.value);
//               }}
//             />
//             <input type="submit" value="send" style={{ padding: "8px" }} />
//           </form>
//         )}
//       </div>
//       {showModal && (
//         <div>
//             <div style={{background:"#fff",padding:"20px",width:"300px"}}>
//                 <h3>Create Room</h3>
//                 <input type="text" placeholder="Room name" value={roomName} onChange={(e)=>setRoomName(e.target.value)}
//                 style={{width:"100%",padding:"8px"}}
//                 />
//             <div style={{marginTop: "10px"}}>
//                 <button onClick={createRoom}>Create</button>
//                 <button onClick={()=>setShowModal(false)}>Cancel</button>
//             </div>
//             </div>
//         </div>
//       )}
//     </div>
//   );
// }

///////////////////////////

import { useState, useEffect } from "react";
import socket from "../socket";
import axiosInstance from "../api/axios";
import { useSelector } from "react-redux";

export default function Chat() {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [users,setUsers] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

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
  }, []);

  useEffect(()=>{
    const fetchUsers = async() =>{
        try{
            const res = await axiosInstance.get("/api/users",{
                headers:{
                    Authorization: localStorage.getItem("token")
                }
            });
            setUsers(res.data);
        }catch(err){
            console.log("Error fetching users",err)
        }
        
    }
    fetchUsers();
  },[])

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
        const res = await axiosInstance.get(
          `/api/messages/${activeRoom._id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
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

  const startDM = async (userId) =>{
    const res = await axiosInstance.post("/api/rooms/dm",{userId},{headers:{Authorization:localStorage.getItem("token")}});
    setActiveRoom(res.data);

  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{ width: "25%", borderRight: "1px solid #ccc", padding: "10px" }}
      >
        <h2>Chat Rooms</h2>
        <button onClick={() => setShowModal(true)}>Create Room</button>
        {rooms.map((room) => (
          <p
            key={room._id}
            onClick={() => setActiveRoom(room)}
            style={{
              cursor: "pointer",
              fontWeight: activeRoom?._id === room._id ? "bold" : "normal",
              padding: "8px",
              backgroundColor:
                activeRoom?._id === room._id ? "#e0e0e0" : "transparent",
              borderRadius: "4px",
            }}
          >
            {room.name}
          </p>
        ))}
        <h3>Direct Messages</h3>
        {users.map(user => (
            <p key={user._id} onClick={()=>{startDM(user._id)}}>{user.username}</p>
        ))}
      </div>

      {/* Main Chat Area */}
      <div style={{ width: "75%", padding: "10px", display: "flex", flexDirection: "column" }}>
        <h3>{activeRoom ? activeRoom.name : "Select a room"}</h3>

        {/* Messages Container */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {loading ? (
            <p style={{ color: "#999" }}>Loading messages...</p>
          ) : messages.length === 0 ? (
            <p style={{ color: "#999" }}>No messages yet. Start the conversation!</p>
          ) : (
            messages.map((m) => (
              <div
                key={m._id}
                style={{
                  marginBottom: "10px",
                  padding: "8px",
                  backgroundColor: m.sender?.id === userId ? "#e3f2fd" : "#fff",
                  borderRadius: "4px",
                }}
              >
                <b>{m.sender?.username || "User"}:</b> {m.content}
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        {activeRoom && (
          <form onSubmit={sendMessage} style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Type your message here"
              style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input
              type="submit"
              value="Send"
              style={{
                padding: "8px 16px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer",
              }}
            />
          </form>
        )}
      </div>

      {/* Create Room Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              width: "300px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Create Room</h3>
            <input
              type="text"
              placeholder="Room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && createRoom()}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={createRoom}
                style={{
                  flex: 1,
                  padding: "8px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Create
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1,
                  padding: "8px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
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
