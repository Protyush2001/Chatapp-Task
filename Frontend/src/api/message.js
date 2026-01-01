import axiosInstance from "./axios";

export const getMessage = async (roomId) =>{
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(`/messages/${roomId}`,{
        header: {
            Authorization: token
        }
    });

    return response.data;
}