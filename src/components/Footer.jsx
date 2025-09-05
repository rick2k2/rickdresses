import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // ✅ Sync footer with navbar theme
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email!");
      return;
    }

    setShowPopup(true);
    setEmail("");

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 - Brand Info */}
        <div className="footer-column footer-brand-column">
          <h3 className="footer_logo">Rick Dresses</h3>
          <p className="footer-tagline">
            Classic ethnic & modern collections curated for every occasion.
            Designed with love from Bengal.
          </p>

          {/* ✅ Moved Theme Toggle Button Below Slogan */}
          <div className="footer-theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
            <span>{theme === "light" ? " Dark Mode" : " Light Mode"}</span>
          </div>
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

      {/* Social Media Icons */}
      <div className="social-icons">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaInstagram />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaYoutube />
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
