import axios from "axios";
import { getToken } from "./auth";

const instance = axios.create({
  baseURL: "https://rd-backend-jb01.onrender.com/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
