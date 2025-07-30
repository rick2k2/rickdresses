import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminOrders.css";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // 🔁 loading state

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/orders/admin/allorders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error("❌ Failed to fetch orders");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm("🗑️ Delete this order?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/orders/delete/${orderId}`);
      toast.success("✅ Order deleted");
      fetchOrders();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("❌ Failed to delete order");
    }
  };

  const markAsDelivered = async (orderId) => {
    try {
      await axios.put(`/orders/deliver/${orderId}`);
      toast.success("📦 Order marked as Delivered");
      fetchOrders();
    } catch (err) {
      console.error("Deliver failed:", err);
      toast.error("❌ Failed to mark as delivered");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-orders-container">
      <h2>📦 Admin Order Management</h2>

      {loading ? (
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-6)}</td>
                <td>{order.name}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} × {item.quantity} – ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>₹{order.total}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  {order.status === "Delivered" ? "✅ Delivered" : "⏳ Pending"}
                </td>
                <td>
                  <button
                    className="deliver-btn"
                    onClick={() => markAsDelivered(order._id)}
                    disabled={order.status === "Delivered"}
                  >
                    ✅ Deliver
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(order._id)}
                  >
                    🗑️ Delete
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

export default AdminOrders;
