import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminDashboard.css";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalPosts: 0,
    totalBills: 0,
    totalPayments: 0,
    totalContacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/admin/stats");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-content">
      <h1>Dashboard</h1>
      <div className="admin_home_gap_maintain"></div>
      {loading ? (
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p>Loading dashboard stats...</p>
        </div>
      ) : (
        <div className="admin-stats">
          <Link to="allproducts" className="admin_home_link">
            <div className="stat-card">
              <h3>Total Products</h3>
              <p>{stats.totalProducts}</p>
            </div>
          </Link>
          <Link to="orders" className="admin_home_link">
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p>{stats.totalOrders}</p>
            </div>
          </Link>
          <Link to="users" className="admin_home_link">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p>{stats.totalUsers}</p>
            </div>
          </Link>
          <Link to="post/all" className="admin_home_link">
            <div className="stat-card">
              <h3>Total Posts</h3>
              <p>{stats.totalPosts}</p>
            </div>
          </Link>
          <Link to="/admin/allbills" className="admin_home_link">
            <div className="stat-card">
              <h3>Total Bills</h3>
              <p>{stats.totalBills}</p>
            </div>
          </Link>
          <Link to="/admin/allpayments" className="admin_home_link">
            <div className="stat-card">
              <h3>Total Payments</h3>
              <p>{stats.totalPayments}</p>
            </div>
          </Link>
          <Link to="/admin/allcontacts" className="admin_home_link">
            <div className="stat-card">
              <h3>Total Contact</h3>
              <p>{stats.totalContacts}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
