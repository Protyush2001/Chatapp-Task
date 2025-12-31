import axios from "axios";

 const axiosInstance = axios.create({
    baseUrl: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
