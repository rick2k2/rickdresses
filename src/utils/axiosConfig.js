// /utils/axiosConfig.js
import axios from "axios";
import { getToken } from "./auth";

// Base URL from env
const API_URL = process.env.REACT_APP_API_BASE_URL;

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
