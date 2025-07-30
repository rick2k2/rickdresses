import React from "react";
import "../styles/Returns.css";

const Returns = () => {
  return (
    <div className="page-container-return">
      <h2>Returns & Exchanges</h2>

      <p>
        At <strong>Rick Dresses</strong>, we prioritize your satisfaction. If
        you're not fully happy with your purchase, we’re here to help.
      </p>

      <h3>📦 Return Policy</h3>
      <p>
        You can initiate a return within <strong>7 days of delivery</strong> for
        eligible items. Products must be:
      </p>
      <ul>
        <li>Unused and unwashed</li>
        <li>In original packaging with tags attached</li>
        <li>Free from damage or stains</li>
      </ul>

      <h3>🔁 Exchange Policy</h3>
      <p>
        Need a different size or color? We offer{" "}
        <strong>one-time free exchanges</strong> for the same product category.
        Simply contact us within 7 days of receiving your item.
      </p>

      <h3>❌ Non-Returnable Items</h3>
      <p>The following items are not eligible for return:</p>
      <ul>
        <li>Items marked "Final Sale"</li>
        <li>Customized or tailored products</li>
      </ul>

      <h3>🛠 Defective or Wrong Product?</h3>
      <p>
        We’re truly sorry! Please email us at{" "}
        <a href="mailto:rickdresses@gmail.com">rickdresses@gmail.com</a> with:
      </p>
      <ul>
        <li>Your Order ID</li>
        <li>Clear images of the defect</li>
        <li>Description of the issue</li>
      </ul>
      <p>We’ll quickly arrange a pickup and send a replacement or refund.</p>

      <h3>💸 Refund Process</h3>
      <p>
        Once your return is approved and received, we’ll initiate your refund
        within <strong>5-7 working days</strong> to your original payment
        method.
      </p>

      <p className="thanks-note">
        Thanks for choosing Rick Dresses ❤️ Your trust means the world to us.
      </p>
    </div>
  );
};

export default Returns;
