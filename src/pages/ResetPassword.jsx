import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import "../styles/ResetPassword.css";
const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/users/reset-password/${token}`, { password });
      toast.success("Password reset successful!");
    } catch (err) {
      toast.error("Reset failed");
    }
  };

  return (
    <form className="reset-container" onSubmit={handleReset}>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Set New Password</button>
      <Link to="/login" type="submit" className="reset_login_link">
        Go Back to Login
      </Link>
    </form>
  );
};

export default ResetPassword;
