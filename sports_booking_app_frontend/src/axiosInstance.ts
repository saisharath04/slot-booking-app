import axios from "axios";
import { JWT_TOKEN } from "./constants";

const axiosInstance = axios.create({
  baseURL: "http://localhost:25088/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(JWT_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
