import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <h1>404⚠️</h1>
        <h2>Oops!👁️ Page Not Found 👋</h2>
        <p>Looks like you're lost in the fashion universe. 👗</p>
        <p>Rick Says Please Sit Back and try agian 😍</p>
        <button onClick={() => navigate("/")}>🏠 Go Back Home</button>
      </div>
    </div>
  );
};

export default PageNotFound;
