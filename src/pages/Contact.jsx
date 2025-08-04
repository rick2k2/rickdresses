import React, { useState } from "react";
import "../styles/Contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../utils/axiosConfig";

const Contact = () => {
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!name || !email || !message) {
      toast.error("Please fill in all fields before sending.");
      return;
    }

    try {
      await axios.post("/contact", { name, email, message });

      toast.success(
        "Thank you for contacting us. Your message has been received. We will reach out to you very soon.",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        }
      );

      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    }
  };
  return (
    <div className="page-container-contact">
      <h2>Contact Us</h2>

      <div className="contact-card">
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:rickdresses@gmail.com">rickdresses@gmail.com</a>
        </p>
        <p>
          <strong>Phone:</strong> <a href="tel:+919734033538">+91-9734033538</a>
        </p>
        <p>
          <strong>Address:</strong> Rick Dresses, Makhaltore, Murshidabad-
          742401, West Bengal
        </p>
        <p>
          <strong>Instagram:</strong>{" "}
          <a
            href="https://instagram.com/rick_dresses"
            target="_blank"
            rel="noopener noreferrer"
          >
            @rick_dresses
          </a>
        </p>
        <p>
          <strong>Business Hours:</strong> Mon - Sat: 8am - 9pm
        </p>
      </div>

      <div className="contact-socials">
        <a
          href="https://instagram.com/rick_dresses"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/assests/instagram.png" alt="Instagram" />
        </a>
        <a href="mailto:rickdresses@gmail.com">
          <img src="/assests/gmail.png" alt="Gmail" />
        </a>
        <a href="tel:+919734033538">
          <img src="/assests/phone.png" alt="Phone" />
        </a>
      </div>

      <div className="contact-form">
        <h3>Or Leave Us a Message</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send Message</button>
        <p className="coming-soon">Contact us via filling this details</p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Contact;
