import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import "../styles/AdminDeletePost.css";

const AdminDeletePost = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/posts");
      setPosts(res.data);
    } catch (err) {
      toast.error("Failed to fetch posts");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`/posts/${id}`);
      toast.success("Post deleted");
      fetchPosts(); // refresh list
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="admin-delete-posts">
      <h2>Delete Posts ❌</h2>

      {posts.length === 0 ? (
        <p className="no-post-message">No posts available.</p>
      ) : (
        <table className="delete-posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content (Preview)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.content.slice(0, 100)}...</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDeletePost;
