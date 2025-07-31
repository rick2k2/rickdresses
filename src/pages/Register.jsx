import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/register`,
        // "http://localhost:5000/api/users/register",
        formData
      );
      toast.success("Registration successful!");
      console.log(res.data);
      // ✅ Clear form
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <h2>💻 Register</h2>
      <form onSubmit={handleSubmit} className="register">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
