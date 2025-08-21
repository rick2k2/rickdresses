import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminDashboard.css";
import { Link, useLocation } from "react-router-dom";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalPosts: 0,
    totalBills: 0,
    totalPayments: 0,
    totalContacts: 0,
    totalReviews: 0,
  });

  const [notifications, setNotifications] = useState({
    newOrders: 0,
    newUsers: 0,
    newPayments: 0,
    newContacts: 0,
    newReviews: 0,
  });

  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // ✅ Fetch stats & update notifications
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/admin/stats");

        const prevStats = JSON.parse(localStorage.getItem("adminStats")) || {};

        const storedNotifications = JSON.parse(
          localStorage.getItem("adminNotifications")
        ) || {
          newOrders: 0,
          newUsers: 0,
          newPayments: 0,
          newContacts: 0,
          newReviews: 0,
        };

        const updatedNotifications = { ...storedNotifications };

        // ✅ Orders
        updatedNotifications.newOrders =
          data.totalOrders > (prevStats.totalOrders || 0)
            ? data.totalOrders - (prevStats.totalOrders || 0)
            : 0;

        // ✅ Users
        updatedNotifications.newUsers =
          data.totalUsers > (prevStats.totalUsers || 0)
            ? data.totalUsers - (prevStats.totalUsers || 0)
            : 0;

        // ✅ Payments
        updatedNotifications.newPayments =
          data.totalPayments > (prevStats.totalPayments || 0)
            ? data.totalPayments - (prevStats.totalPayments || 0)
            : 0;

        // ✅ Contacts
        updatedNotifications.newContacts =
          data.totalContacts > (prevStats.totalContacts || 0)
            ? data.totalContacts - (prevStats.totalContacts || 0)
            : 0;

        // ✅ Reviews
        updatedNotifications.newReviews =
          data.totalReviews > (prevStats.totalReviews || 0)
            ? data.totalReviews - (prevStats.totalReviews || 0)
            : 0;

        setStats(data);
        setNotifications(updatedNotifications);

        // ✅ Save to localStorage
        localStorage.setItem("adminStats", JSON.stringify(data));
        localStorage.setItem(
          "adminNotifications",
          JSON.stringify(updatedNotifications)
        );
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // ✅ Reset notifications when visiting specific pages
  useEffect(() => {
    const storedNotifications =
      JSON.parse(localStorage.getItem("adminNotifications")) || {};

    const updatedNotifications = { ...storedNotifications };

    const pageToNotificationMap = {
      "/admin/orders": "newOrders",
      "/admin/users": "newUsers",
      "/admin/allpayments": "newPayments",
      "/admin/allcontacts": "newContacts",
      "/admin/allreviews": "newReviews",
    };

    const notificationKey = pageToNotificationMap[location.pathname];

    if (notificationKey && updatedNotifications[notificationKey] > 0) {
      // ✅ Reset only when admin visits the specific section
      updatedNotifications[notificationKey] = 0;
      setNotifications(updatedNotifications);
      localStorage.setItem(
        "adminNotifications",
        JSON.stringify(updatedNotifications)
      );
    }
  }, [location]);

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
          {/* Products */}
          <Link to="allproducts" className="admin_home_link">
            <div className="stat-card">
              <h3>Total Products</h3>
              <p>{stats.totalProducts}</p>
            </div>
          </Link>

          {/* Orders */}
          <Link to="orders" className="admin_home_link">
            <div className="stat-card">
              <h3>
                Total Orders{" "}
                {notifications.newOrders > 0 && (
                  <span className="notif-badge">{notifications.newOrders}</span>
                )}
              </h3>
              <p>{stats.totalOrders}</p>
            </div>
          </Link>

          {/* Users */}
          <Link to="users" className="admin_home_link">
            <div className="stat-card">
              <h3>
                Total Users{" "}
                {notifications.newUsers > 0 && (
                  <span className="notif-badge">{notifications.newUsers}</span>
                )}
              </h3>
              <p>{stats.totalUsers}</p>
            </div>
          </Link>

          {/* Posts */}
          <Link to="post/all" className="admin_home_link">
            <div className="stat-card">
              <h3>Total Posts</h3>
              <p>{stats.totalPosts}</p>
            </div>
          </Link>

          {/* Bills */}
          <Link to="/admin/allbills" className="admin_home_link">
            <div className="stat-card">
              <h3>Total Bills</h3>
              <p>{stats.totalBills}</p>
            </div>
          </Link>

          {/* Payments */}
          <Link to="/admin/allpayments" className="admin_home_link">
            <div className="stat-card">
              <h3>
                Total Payments{" "}
                {notifications.newPayments > 0 && (
                  <span className="notif-badge">
                    {notifications.newPayments}
                  </span>
                )}
              </h3>
              <p>{stats.totalPayments}</p>
            </div>
          </Link>

          {/* Contacts */}
          <Link to="/admin/allcontacts" className="admin_home_link">
            <div className="stat-card">
              <h3>
                Total Contacts{" "}
                {notifications.newContacts > 0 && (
                  <span className="notif-badge">
                    {notifications.newContacts}
                  </span>
                )}
              </h3>
              <p>{stats.totalContacts}</p>
            </div>
          </Link>

          {/* Reviews */}
          <Link to="/admin/allreviews" className="admin_home_link">
            <div className="stat-card">
              <h3>
                Total Reviews{" "}
                {notifications.newReviews > 0 && (
                  <span className="notif-badge">
                    {notifications.newReviews}
                  </span>
                )}
              </h3>
              <p>{stats.totalReviews}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
