import React, { useState } from "react";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AdminCreatePost.css";

const AdminCreatePost = () => {
  const [form, setForm] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/posts", form);
      toast.success("Post created successfully!");
      setForm({ title: "", content: "" });
    } catch (err) {
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="admin-create-post-form">
      <h2 className="admin_post_heading">Create Post 📝</h2>
      <form onSubmit={handleSubmit} className="admin_post_create_form">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter Title"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Enter Content"
          rows="5"
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default AdminCreatePost;
