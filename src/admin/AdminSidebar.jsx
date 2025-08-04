import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>
        <li>
          <Link to="/admin/allpayments">Payments</Link>
        </li>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/post">New Post</Link>
        </li>
        <li>
          <Link to="/admin/bills">Create Bill</Link>
        </li>
        <li>
          <Link to="/admin/allcontacts">Contact Message</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
