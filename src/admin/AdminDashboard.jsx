import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
