import {io} from "socket.io-client";

const socket = io("https://chatapp-task-1.onrender.com");

export default socket;