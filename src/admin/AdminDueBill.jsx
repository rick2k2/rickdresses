import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "../styles/AdminDueBill.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDueBill = () => {
  const [dues, setDues] = useState([]);
  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState({});

  useEffect(() => {
    fetchDueBills();
  }, []);

  const fetchDueBills = async () => {
    try {
      const res = await axios.get("/bills/due");
      setDues(res.data);
    } catch (err) {
      console.error("Error fetching dues");
      toast.error("Error fetching dues");
    }
  };

  const handlePayment = async (billId) => {
    const amount = parseFloat(payment[billId]);
    if (isNaN(amount) || amount <= 0) return toast.warning("Invalid amount");

    try {
      await axios.put(`/bills/pay/${billId}`, { amount });
      toast.success("✅ Payment successful");
      fetchDueBills();
      setPayment((prev) => ({ ...prev, [billId]: "" }));
    } catch (err) {
      toast.error("❌ Payment failed");
    }
  };

  const filteredDues = dues.filter((bill) =>
    bill.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="due-list-container">
      <h2>🧾 Due List</h2>

      <input
        type="text"
        placeholder="🔍 Search by customer"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <table className="due-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Due</th>
            <th>Pay Now</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDues.map((bill) => {
            const due = bill.totalAmount - bill.paidAmount;
            return (
              <tr key={bill._id}>
                <td>{bill.customerName}</td>
                <td>{bill.phone}</td>
                <td>₹{bill.totalAmount}</td>
                <td>₹{bill.paidAmount}</td>
                <td>₹{due}</td>
                <td>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={payment[bill._id] || ""}
                    onChange={(e) =>
                      setPayment((prev) => ({
                        ...prev,
                        [bill._id]: e.target.value,
                      }))
                    }
                    className="pay-input"
                  />
                </td>
                <td>
                  <button
                    onClick={() => handlePayment(bill._id)}
                    className="pay-button"
                  >
                    Pay
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Toast container at bottom-right */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AdminDueBill;
