import axios from "axios";
import { getToken } from "./auth";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://rd-backend-jb01.onrender.com/api"
    : "http://localhost:5000/api";

const instance = axios.create({
  baseURL: API_URL,
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
