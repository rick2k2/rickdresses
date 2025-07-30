import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import "../styles/AdminUsers.css";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/users/allusers");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleModify = (id) => {
    navigate(`/admin/users/update/${id}`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-users">
      <h2>👤 All Users</h2>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Registered</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>{u.isAdmin ? "Admin" : "User"}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="delete-btn"
                    >
                      ❌ Delete
                    </button>
                    <button
                      onClick={() => handleModify(u._id)}
                      className="modify-btn"
                    >
                      🛠️ Modify
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
