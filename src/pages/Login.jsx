import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/login`,
        credentials
      );

      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Login failed!");
    }
  };

  return (
    <div className="login-container">
      <h2>💻 Login</h2>
      <form onSubmit={handleLogin} className="login">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
