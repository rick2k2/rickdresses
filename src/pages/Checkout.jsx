import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "../utils/axiosConfig"; // ✅ Your custom axios instance
import "../styles/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const billRef = useRef();

  const { cartItems, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [loading, setLoading] = useState(false);
  const [showBill, setShowBill] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderDetails = {
      form,
      items: cartItems,
      total,
    };

    try {
      setLoading(true);
      setShowBill(true);

      // ✅ Save order to backend first
      const res = await axios.post("/orders", orderDetails);

      if (res.status === 201 || res.data.success) {
        // ✅ Wait a bit and print
        setTimeout(() => {
          printBill();

          // ✅ Navigate to order success with data
          navigate("/order-success", {
            state: { orderDetails },
          });

          clearCart();
        }, 800);
      } else {
        alert("Failed to save order. Try again.");
      }
    } catch (err) {
      console.error("Order Error:", err.message);
      alert("Server error while placing order!");
    } finally {
      setLoading(false);
    }
  };

  const printBill = () => {
    window.print();
  };

  return (
    <div className="checkout-container">
      <h2>🧡 Rick Dresses Checkout</h2>

      <div className="checkout-wrapper">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Billing Info</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Placing Order..." : "🛒 Place Order"}
          </button>
        </form>

        <div className="checkout-summary">
          <h3>🧾 Order Summary</h3>
          {cartItems.map((item, idx) => (
            <div key={idx} className="summary-item">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <hr />
          <div className="summary-total">
            <strong>Total:</strong>
            <strong>₹{total}</strong>
          </div>
        </div>
      </div>

      {showBill && (
        <div className="print-bill" ref={billRef}>
          <h3>🎉 Order Placed! Final Bill:</h3>
          <div className="bill-box">
            <p>
              <strong>Name:</strong> {form.name}
            </p>
            <p>
              <strong>Email:</strong> {form.email}
            </p>
            <p>
              <strong>Address:</strong> {form.address}
            </p>
            <p>
              <strong>Phone:</strong> {form.phone}
            </p>
            <hr />
            <h4>Items:</h4>
            {cartItems.map((item, idx) => (
              <p key={idx}>
                {item.name} × {item.quantity} = ₹{item.quantity * item.price}
              </p>
            ))}
            <hr />
            <h3>Total Paid: ₹{total}</h3>
            <button onClick={printBill}>🖨️ Print Bill</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
