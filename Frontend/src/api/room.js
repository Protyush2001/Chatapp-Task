import axiosInstance from "./axios";

export const getRooms = async()=>{
    const res = await axiosInstance.get("/api/rooms",{
        headers:{
            Authorization: localStorage.getItem("token")
        }
    });
    return res.data;
};

export const createRoom = async(roomName)=>{
    const res = await axiosInstance.post("/api/rooms/createRoom",
        {name: roomName},
        {
    headers:{
        Authorization: localStorage.getItem("token")
        }
        
    
    });
    return res.data;
}

