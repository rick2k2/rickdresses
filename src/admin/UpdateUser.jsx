import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import "../styles/UpdateUser.css";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", isAdmin: false });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        toast.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === "checkbox" ? checked : value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${id}/admin`, {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      toast.success("User updated successfully");
      navigate("/admin/users");
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="update-user">
      <h2>🛠️ Update User</h2>
      <form onSubmit={handleUpdate} className="update">
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isAdmin"
            checked={user.isAdmin}
            onChange={handleChange}
          />
          Admin
        </label>
        <button type="submit">✅ Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateUser;
