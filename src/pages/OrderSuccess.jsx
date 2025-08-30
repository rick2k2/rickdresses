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

  // 🟢 Total Calculation
  const total = items.reduce(
    (acc, item) => acc + (item.finalPrice || item.price) * item.quantity,
    0
  );

  return (
    <div className="order_success_container">
      <div className="order_card">
        <h2>🎉 Order Confirmed!</h2>
        <p className="success-subtitle">
          Thank you, <strong>{form.name}</strong>! Your order has been placed
          successfully.
        </p>

        <div className="customer-info">
          <p>
            <strong>📞 Phone:</strong> {form.phone}
          </p>
          <p>
            <strong>🏠 Address:</strong> {form.address}
          </p>
        </div>

        <h3>🛍️ Order Summary</h3>

        {/* Modern Table for Items */}
        <div className="table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Price (₹)</th>
                <th>Qty</th>
                <th>Subtotal (₹)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{Math.round(item.finalPrice || item.price)}</td>
                  <td>{item.quantity}</td>
                  <td>{(item.finalPrice || item.price) * item.quantity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="total-label">
                  Total Paid
                </td>
                <td className="total-price">₹{total}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="order-buttons">
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
    </div>
  );
};

export default OrderSuccess;
