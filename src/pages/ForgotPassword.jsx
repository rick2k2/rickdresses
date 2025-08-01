import React, { useState } from "react";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import "../styles/ForgotPassword.css"; // ✅ import the CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/forgot-password", { email });
      toast.success("Reset email sent!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="forgot-container">
      <form onSubmit={handleSubmit} className="forgot-form">
        <h2>Forgot Password?</h2>
        <p className="forgot-subtitle">
          Enter your registered email and we’ll send you a reset link.
        </p>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="forgot-input"
        />
        <button type="submit" className="forgot-btn">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
