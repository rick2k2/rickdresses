import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email!");
      return;
    }

    // ✅ Show success popup
    setShowPopup(true);

    // ✅ Reset email field after subscription
    setEmail("");

    // ✅ Auto-close popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 - Brand Info */}
        <div className="footer-column">
          <h3 className="footer_logo">Rick Dresses</h3>
          <p>
            Classic ethnic & modern collections curated for every occasion.
            Designed with love from Bengal.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Customer Service */}
        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li>
              <Link to="/faq">FAQs</Link>
            </li>
            <li>
              <Link to="/returns">Returns & Exchanges</Link>
            </li>
            <li>
              <Link to="/shipping">Shipping Info</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div className="footer-column">
          <h4>Newsletter</h4>
          <p>Get the latest updates & offers in your inbox.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Social Media */}
      <div className="social-icons">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assests/facebook.png" alt="Facebook" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assests/instagram.png" alt="Instagram" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src="/assests/youtube.png" alt="YouTube" />
        </a>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Rick Dresses. All rights reserved.
        </p>
      </div>

      {/* ✅ Success Popup */}
      {showPopup && (
        <div className="subscribe-popup">
          <div className="popup-content">
            <h3>🎉 Subscription Successful!</h3>
            <p>
              You have subscribed to our site. Latest updates will be sent to
              your email soon.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
