import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminallPost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminAllPost = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      toast.error("Failed to fetch posts");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`/posts/${id}`);
      toast.success("Post deleted");
      fetchPosts(); // Refresh after delete
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/post/update`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="admin-posts-table-container">
      <h2>📝 All Posts</h2>
      <p className="post-counter">Total Posts: {posts.length}</p>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <table className="posts-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Content</th>
              <th>Created At</th>
              <th>Actions</th>
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
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(post._id)}
                  >
                    Edit
                  </button>
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

export default AdminAllPost;
