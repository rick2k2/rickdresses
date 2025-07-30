import React from "react";
import "../styles/LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner" />
      <h2 className="loading-text">Rick Dresses</h2>
    </div>
  );
};

export default LoadingScreen;
