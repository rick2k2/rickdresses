import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaPencilAlt } from "react-icons/fa";
import axios from "../utils/axiosConfig";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Profile.css";

const Profile = ({ user, setUser }) => {
  const [form, setForm] = useState(user || {});
  const [imagePreview, setImagePreview] = useState(user?.profileImage || "");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (form.profileImage) {
      setImagePreview(form.profileImage);
    }
  }, [form.profileImage]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setForm(user); // Reset form fields to original user data
    setImagePreview(user?.profileImage || ""); // Reset image preview
    setSelectedFile(null); // Remove selected image if any
    toast.info("Profile changes discarded!", { autoClose: 1500 });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }

    try {
      const { data } = await axios.put("/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`, // or get token from localStorage/context
        },
      });

      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("✅ Profile updated!", { autoClose: 2000 });
    } catch (error) {
      toast.error("❌ Failed to update profile", { autoClose: 2000 });
    }
  };

  if (!user) return <p className="login-warning">⚠️ Please login first.</p>;

  const fallbackLetter = form.name?.[0]?.toUpperCase() || "U";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar-container">
          <label htmlFor="profile-image" className="image-upload-label">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="User Avatar"
                className="profile-avatar"
              />
            ) : (
              <div className="fallback-avatar">{fallbackLetter}</div>
            )}
            <span className="edit-icon">
              <FaPencilAlt />
            </span>
          </label>
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>

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

          <button
            type="button"
            className="update-btn cancel_btn_profile"
            onClick={handleCancel}
          >
            Cancel Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
