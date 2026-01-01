import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: "http://localhost:4086",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
