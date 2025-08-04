import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminOrders.css";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/orders/admin/allorders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error("❌ Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelByAdmin = async (orderId) => {
    const reason = prompt("Enter reason for cancellation:");
    if (!reason) return;

    try {
      await axios.put(`/orders/cancel/${orderId}`, {
        cancelledBy: "admin",
        cancelReason: reason,
      });
      toast.success("🛑 Order cancelled by admin");
      fetchOrders();
    } catch (err) {
      console.error("Cancel failed:", err);
      toast.error("❌ Failed to cancel order");
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

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this order?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/orders/delete/${orderId}`);
      toast.success("🗑️ Order permanently deleted");
      fetchOrders();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("❌ Failed to delete order");
    }
  };

  const handleDownloadBill = async (orderId) => {
    try {
      const res = await axios.get(`/orders/bill/${orderId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice-${orderId.slice(-6)}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Bill download failed:", err);
      toast.error("❌ Failed to download bill");
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
              <th>Payment</th>
              <th>Payment Mode</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="admin_order_id">{order._id.slice(-6)}</td>
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
                <td>
                  {order.payment.status === "approved" ? (
                    <span className="paid">✅ Paid</span>
                  ) : (
                    <span className="unpaid">❌ Unpaid</span>
                  )}
                </td>
                <td>{order.payment.method}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  {order.status === "Delivered" ? (
                    "✅ Delivered"
                  ) : order.status === "Cancelled" ? (
                    <span className="cancelled">❌ Cancelled</span>
                  ) : (
                    "⏳ Pending"
                  )}
                </td>
                <td className="admin_order_btn_container">
                  <button
                    className="deliver-btn"
                    onClick={() => markAsDelivered(order._id)}
                    disabled={order.status !== "Pending"}
                  >
                    ✅ Deliver
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelByAdmin(order._id)}
                    disabled={order.status !== "Pending"}
                  >
                    🛑 Cancel
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    🗑️ Delete
                  </button>
                  <button
                    className="download-btn admin_order_download"
                    onClick={() => handleDownloadBill(order._id)}
                  >
                    📄 Download Bill
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
