import React from "react";
import "../styles/PaymentQr.css";

const PaymentQr = () => {
  return (
    <div className="payment-container">
      <h2>💳 Make Payment to Rick Dresses</h2>
      <p>Scan the QR code below using any UPI app to complete your payment.</p>

      <div className="qr-section">
        <img
          src="/assests/GpayQr.jpg"
          alt="Rick Dresses UPI QR"
          className="qr-image"
        />
        <div className="upi-id">
          <strong>UPI ID:</strong> rickdresses@okicici
        </div>
      </div>

      <p className="note">
        📌 Please mention your Order ID in the UPI note while making payment.
      </p>
    </div>
  );
};

export default PaymentQr;
