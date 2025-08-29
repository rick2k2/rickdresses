import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails, orderId } = location.state || {};

  if (!orderDetails || !orderId) {
    return <h2>❌ No order data found.</h2>;
  }

  const { items, form } = orderDetails;

  // 🟢 Correct total calculation using finalPrice
  const total = items.reduce(
    (acc, item) => acc + (item.finalPrice || item.price) * item.quantity,
    0
  );

  return (
    <div className="order_success_container">
      <div className="order_card">
        <h2>🎉 Order Confirmed!</h2>
        <p>
          <strong>Name:</strong> {form.name}
        </p>
        <p>
          <strong>Phone:</strong> {form.phone}
        </p>
        <p>
          <strong>Address:</strong> {form.address}
        </p>

        <h3>🛍️ Items:</h3>
        {items.map((item, i) => (
          <p key={i}>
            *{item.name} - [₹ {Math.round(item.finalPrice)}× {item.quantity}] =
            ₹{(item.finalPrice || item.price) * item.quantity}
          </p>
        ))}

        <h3>Total Paid: ₹{total}</h3>

        <button
          className="view_order_history_btn"
          onClick={() => navigate("/order-history")}
        >
          View Order History
        </button>

        <button
          className="order_history_payment_btn"
          onClick={() => navigate(`/payment/${orderId}`)}
        >
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
