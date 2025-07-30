import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Profile.css";

const Profile = ({ user, setUser }) => {
  const [form, setForm] = useState(user || {});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setUser(form);
    localStorage.setItem("userInfo", JSON.stringify(form));
    toast.success("✅ Profile updated!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  if (!user) return <p className="login-warning">⚠️ Please login first.</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="/assests/user.png"
          alt="User Avatar"
          className="profile-avatar"
        />

        <h2>{form.name || "Your Name"}</h2>
        <p className="profile-email">{form.email || "you@example.com"}</p>

        <form onSubmit={handleUpdate} className="profile-form">
          <div className="form-group">
            <label className="label_profile_form">Name: </label>
            <input
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label_profile_form">Email: </label>
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="update-btn">
            Update Profile
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
