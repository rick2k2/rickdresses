import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";
import "../styles/AdminAllPayments.css";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data } = await axios.get("/payments");
      setPayments(data);
    } catch (err) {
      toast.error("Failed to load payments");
    }
  };

  // Handle status update
  const handleUpdateStatus = async (paymentId, newStatus) => {
    try {
      await axios.put(`/payments/${paymentId}`, { status: newStatus });

      if (newStatus === "approved") {
        // Call backend to update order status
        const approvedPayment = payments.find((p) => p._id === paymentId);
        if (approvedPayment) {
          await axios.post("/payments/approve", {
            paymentId,
            orderId: approvedPayment.orderId,
          });
        }
      }

      toast.success(`Marked as ${newStatus}`);
      fetchPayments();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // Handle delete
  const handleDeletePayment = async (paymentId) => {
    if (!window.confirm("Are you sure you want to delete this payment?"))
      return;

    try {
      await axios.delete(`/payments/${paymentId}`);
      toast.success("Payment deleted");
      fetchPayments();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="admin-payments">
      <h2>📄 All Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Order ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Txn ID</th>
            <th>Screenshot</th>
            <th>Status</th>
            <th>Payment Mode</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                🚫 No payments found.
              </td>
            </tr>
          ) : (
            payments.map((pay) => (
              <tr key={pay._id}>
                <td>{pay._id}</td>
                <td>{pay.orderId?.slice(-6)}</td>
                <td>{pay.user?.name || "N/A"}</td>
                <td>₹ {pay.paymentAmount}</td>
                <td>{pay.transactionId}</td>

                <td>
                  <a
                    href={pay.screenshot}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </td>
                <td>
                  <span
                    className={
                      pay.status === "pending"
                        ? "status-pending"
                        : pay.status === "approved"
                        ? "status-approved"
                        : "status-failed"
                    }
                  >
                    {pay.status}
                  </span>
                </td>
                <td>{pay.paymentMode}</td>
                <td>
                  {pay.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(pay._id, "approved")}
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(pay._id, "failed")}
                      >
                        ❌ Reject
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="delete-btn delete_allpayment"
                        onClick={() => handleDeletePayment(pay._id)}
                      >
                        🗑️ Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;
