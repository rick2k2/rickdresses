import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/OrderHistory.css";
import { toast } from "react-toastify"; // ✅ optional toast

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [cancelingOrderId, setCancelingOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/orders/my");
        // ✅ Optional: Sort orders by date (latest first)
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sorted);
      } catch (err) {
        setError("Failed to load order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [refresh]);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      setCancelingOrderId(id); // disable button
      await axios.delete(`/orders/delete/${id}`); // ✅ fixed path
      toast.success("Order cancelled successfully!");
      setRefresh((prev) => !prev);
    } catch (err) {
      toast.error("Failed to cancel order.");
    } finally {
      setCancelingOrderId(null);
    }
  };

  if (loading)
    return (
      <div className="order-loading">
        <div className="spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );

  if (error) return <div className="order-error">{error}</div>;

  return (
    <div className="order-history-page">
      <h2>🧾 My Order History</h2>
      <p className="order-count">
        Total Orders: <strong>{orders.length}</strong>
      </p>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="order-history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-6)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.items.length}</td>
                <td>₹{order.total.toFixed(2)}</td>
                <td>
                  <span
                    className={`status-tag ${
                      order.status === "Delivered" ? "delivered" : "pending"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status === "Pending" ? (
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(order._id)}
                      disabled={cancelingOrderId === order._id}
                    >
                      {cancelingOrderId === order._id
                        ? "Cancelling..."
                        : "Cancel"}
                    </button>
                  ) : (
                    <span className="no-action">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
