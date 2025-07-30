import React, { useEffect, useState } from "react";
import "../styles/IdlePopup.css"; // Style file

const IdlePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const idleTime = 3000; // 2 seconds

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowPopup(true);
      }, idleTime);
    };

    // Activity events
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // start initially

    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleRegister = () => {
    // Navigate to register page
    window.location.href = "/register";
  };

  return (
    showPopup && (
      <div className="idle-popup-overlay">
        <div className="idle-popup-box">
          <h3>আপনি এখনো রেজিস্টার করেননি!</h3>
          <p>সেরা অফার পেতে এখনই রেজিস্টার করুন।</p>
          <div className="popup-buttons">
            <button onClick={handleRegister}>Register Now</button>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    )
  );
};

export default IdlePopup;
