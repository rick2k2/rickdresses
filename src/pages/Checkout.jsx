import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "../utils/axiosConfig";
import "../styles/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const total = cartItems.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      alert("You must be logged in to place an order.");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const updatedItems = cartItems.map((item) => ({
      ...item,
      price: item.finalPrice,
    }));

    const orderDetails = {
      form,
      items: updatedItems,
      total,
      payment: {
        method: paymentMethod,
        status: "Pending",
      },
    };

    try {
      setLoading(true);
      const res = await axios.post("/orders", orderDetails);

      if (res.status === 201 || res.data.success) {
        clearCart();
        navigate("/order-success", {
          state: {
            orderDetails,
            orderId: res.data.orderId,
          },
        });
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
          <select
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Online">Online</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? "Placing Order..." : "🛒 Place Order"}
          </button>
        </form>

        <div className="checkout-summary">
          <h3>🧾 Order Summary</h3>
          {cartItems.map((item, idx) => (
            <div key={idx} className="summary-item">
              <span>
                *{item.name} - [₹ {Math.round(item.finalPrice)} ×{" "}
                {item.quantity}] =
              </span>
              <span>₹{item.finalPrice * item.quantity}</span>
            </div>
          ))}
          <hr />
          <div className="summary-total">
            <strong>Total:</strong>
            <strong>₹{total}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
