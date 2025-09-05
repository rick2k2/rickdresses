import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminOrders.css";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ganeshBase64 from "./ganeshBase64";

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

  // 🧾 Download Bill with Orange Table Header
  const handleDownloadBill = (order) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // 🏪 Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Rick Dresses", pageWidth / 2, 15, { align: "center" });

    // 🏠 Address
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      "Vill+P.O: Makhaltore, Murshidabad, Pin-742401 (W.B)",
      pageWidth / 2,
      21,
      { align: "center" }
    );

    // Outer Border
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, pageWidth - 20, 270);

    // 🕉️ Logo
    doc.addImage(ganeshBase64, "JPEG", pageWidth - 50, 18, 30, 30, "", "FAST");

    // Invoice Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Invoice Details:", 14, 40);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Customer: ${order.name}`, 14, 48);
    doc.text(`Phone: ${order.phone}`, 14, 54);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 60);
    doc.text(`Address: ${order.address}`, 14, 66);

    // Background Logo (Watermark)
    doc.addImage(
      ganeshBase64,
      "JPEG",
      pageWidth / 2 - 40,
      pageHeight / 2 - 40,
      80,
      80,
      "",
      "FAST"
    );

    // 🟠 Table with Orange Header
    autoTable(doc, {
      startY: 75,
      head: [["Product", "Qty", "Price", "Subtotal"]],
      body: order.items.map((item) => [
        item.name,
        item.quantity.toString(),
        `Rs ${item.price}`,
        `Rs ${item.price * item.quantity}`,
      ]),
      styles: { font: "helvetica", fontSize: 11 },
      headStyles: {
        fillColor: [255, 102, 0],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      margin: { left: 14, right: 14 },
    });

    let finalY = doc.lastAutoTable.finalY;
    if (finalY > 240) {
      doc.addPage();
      finalY = 20;
    }

    // Total Section
    const due =
      order.total - (order.payment.status === "approved" ? order.total : 0);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: Rs ${order.total}`, 14, finalY + 10);
    doc.text(
      `Paid: Rs ${order.payment.status === "approved" ? order.total : 0}`,
      14,
      finalY + 17
    );
    doc.text(`Due: Rs ${due}`, 14, finalY + 24);

    // Thank You Note
    doc.setTextColor(255, 102, 0);
    doc.setFontSize(12);
    doc.text("Thank you, visit again!", 14, finalY + 35);
    doc.setTextColor(0, 0, 0);

    doc.save(`${order.name}_invoice.pdf`);
    toast.info("📄 Bill downloaded successfully!");
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
        <div className="admin-orders-wrapper">
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
                    <ul className="admin_order_items_list">
                      {order.items.map((item, i) => (
                        <li key={i}>
                          {item.name} - ₹{item.price} × {item.quantity} = ₹
                          {item.price * item.quantity}
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
                      className="admin_order_cancel_btn"
                      onClick={() => handleCancelByAdmin(order._id)}
                      disabled={order.status !== "Pending"}
                    >
                      🛑 Cancel
                    </button>
                    <button
                      className="admin_order_delete_btn"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      🗑️ Delete
                    </button>
                    <button
                      className="download-btn admin_order_download"
                      onClick={() => handleDownloadBill(order)}
                    >
                      📄 Download Bill
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
