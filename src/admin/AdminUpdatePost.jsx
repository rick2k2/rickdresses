import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import "../styles/AdminUpdatePost.css";

const AdminUpdatePost = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/posts");
      setPosts(res.data);
    } catch (err) {
      toast.error("Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setEditPost(post);
  };

  const handleChange = (e) => {
    setEditPost({ ...editPost, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/posts/${editPost._id}`, {
        title: editPost.title,
        content: editPost.content,
      });
      toast.success("Post updated");
      setEditPost(null);
      fetchPosts();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="admin-update-posts">
      <h2>✏️ Update Posts</h2>

      {editPost && (
        <form className="update-form" onSubmit={handleUpdate}>
          <input
            type="text"
            name="title"
            value={editPost.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="content"
            value={editPost.content}
            onChange={handleChange}
            placeholder="Content"
            rows="5"
            required
          />
          <div className="form-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditPost(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <table className="update-posts-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Content</th>
            <th>Created At</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id}>
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>{post.content.slice(0, 100)}...</td>
              <td>{new Date(post.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(post)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUpdatePost;
