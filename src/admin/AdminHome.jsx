import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminDashboard.css";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true); // 🔁 Loading state

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/admin/stats");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false); // ✅ Stop loading once done
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-content">
      <h1>Dashboard</h1>

      {loading ? (
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p>Loading dashboard stats...</p>
        </div> // 💫 You can add spinner here
      ) : (
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Products</h3>
            <p>{stats.totalProducts}</p>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
