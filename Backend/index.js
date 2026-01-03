const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const configDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const http = require("http");
const {Server} = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*"
    }
})
const auth = require("./middleware/auth");



dotenv.config();
// app.use(cors());

app.use(cors({
  origin: "*", 
  credentials: true
}));
app.use(express.json());



configDB();

const PORT = process.env.PORT || 4000;



app.use("/api/auth",authRoutes);
app.use("/api/rooms",roomRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

server.listen(PORT,()=>{
    console.log("Server is running on:",PORT);
});

// io.on("connection",(socket)=>{
//     console.log("User connected:",socket.id);
//     socket.on("joinroom",(roomId)=>{
//         socket.join(roomId);
//         console.log(`user joined room: ${roomId}`);
//     });
//     socket.on("sendMessage",(data)=>{
//         const {roomId,message} = data;
//         socket.to(roomId).emit('receiveMessage',message);

//     });

 

//     socket.on("disconnect",()=>{
//         console.log("User disconnected:",socket.id);
//     })

// })

io.on("connection",(socket)=>{
    console.log("User connected:",socket.id);
    
    socket.on("joinroom",(roomId)=>{
        socket.join(roomId);
        console.log(`user joined room: ${roomId}`);
    });
    
    socket.on("sendMessage",(data)=>{
        const {roomId, message} = data;
        // Emit to ALL users in the room (including sender)
        io.to(roomId).emit('receiveMessage', {
            ...message,
            roomId: roomId  // Include roomId so frontend knows which room this is for
        });
    });

    socket.on("disconnect",()=>{
        console.log("User disconnected:",socket.id);
    })
});

