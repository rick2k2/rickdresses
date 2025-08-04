import React from "react";
import { Link } from "react-router-dom";
import "../styles/PaymentSuccess.css";

const PaymentSuccess = () => (
  <div className="success-container">
    <div className="success-box">
      <div className="success-check">✅</div>
      <h2>Payment Submitted!</h2>
      <p>Thank you for your confirmation. We will verify your order soon.</p>
      <Link to="/order-history">
        <button className="back-button">Back To Order Page</button>
      </Link>
    </div>
  </div>
);

export default PaymentSuccess;
