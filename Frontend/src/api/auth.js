import axiosInstance from "./axios";

export const loginUser = async (formData)=>{
    const response = await axiosInstance.post("/api/auth/login",formData);
    return response.data;
}