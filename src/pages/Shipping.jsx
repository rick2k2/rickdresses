import React from "react";
import "../styles/Shipping.css";
import { Link } from "react-router-dom";

const Shipping = () => {
  return (
    <div className="page-container-ship">
      <h2>Shipping Information</h2>

      <p>
        At Rick Dresses, we want your shopping experience to be smooth and
        delightful. Here's everything you need to know about our shipping
        process.
      </p>

      <h3>⏱️ Processing Time</h3>
      <p>
        All orders are processed within <strong>2-4 business days</strong>.
        Orders placed on weekends or holidays will be processed on the next
        working day.
      </p>

      <h3>🚚 Estimated Delivery Time</h3>
      <p>
        Once shipped, deliveries typically arrive within{" "}
        <strong>5-7 business days</strong> based on your location. In rare
        cases, delivery may take longer due to courier delays or remote areas.
      </p>

      <h3>💰 Shipping Charges</h3>
      <p>
        Shipping charges are calculated based on your delivery location and cart
        value. <strong>Free shipping is available on orders above ₹999</strong>.
      </p>

      <h3>🌍 Delivery Locations</h3>
      <p>
        We currently deliver across all major cities and towns in India. We’re
        working hard to expand our coverage to more remote areas.
      </p>

      <h3>🔁 Delays & Tracking</h3>
      <p>
        Once your order is shipped, you’ll receive a tracking link via SMS or
        email. For any delays beyond 10 working days, feel free to{" "}
        <Link to="/contact" className="ship-contact-link">
          contact us
        </Link>
        .
      </p>

      <h3>❌ Delivery Failures</h3>
      <p>
        If the courier fails to deliver the product due to incorrect address or
        failed attempts, the order will be returned to us and a re-delivery
        charge may apply.
      </p>

      <h3>📦 Packaging</h3>
      <p>
        Every order is packed with care using eco-friendly materials to ensure
        your item reaches safely and with love.
      </p>

      <p className="thanks-msg">Thank you for shopping with Rick Dresses ❤️</p>
    </div>
  );
};

export default Shipping;
