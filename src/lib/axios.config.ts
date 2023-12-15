import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api",
    timeout: 6000,
    headers: { "X-Client": "Next", "Content-Type": "application/json" },
});

export default axiosInstance;