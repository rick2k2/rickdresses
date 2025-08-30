import React, { useState } from "react";
import axios from "../utils/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "../styles/AdminCreatePost.css";

const AdminCreatePost = () => {
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/posts", form);
      toast.success("✅ Post created successfully!");
      setForm({ title: "", content: "" });
    } catch (err) {
      toast.error("❌ Failed to create post!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-create-post-container">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="admin-create-post-card">
        <h2 className="admin-post-heading">✍️ Create New Post</h2>
        <p className="admin-subtitle">
          Share the latest updates and news with your customers 🚀
        </p>

        <form onSubmit={handleSubmit} className="admin-post-form">
          <div className="form-group">
            <label htmlFor="title">Post Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter an attractive post title..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Post Content</label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your post content here..."
              rows="6"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreatePost;
