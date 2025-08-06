import React from "react";
import "../styles/UnderConstruction.css";
const UnderConstruction = () => {
  return (
    <div className="under-construction">
      <div className="content">
        <h1>👷‍♂️ Rick Dresses</h1>
        <h2>is in Development Mode</h2>
        <p className="message">
          We’re working hard to bring something amazing.
        </p>
        <p className="reopen-time">
          🕛 Expected Reopen: <strong>Tomorrow at 12:00 AM</strong>
        </p>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default UnderConstruction;
