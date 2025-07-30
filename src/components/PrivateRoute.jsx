import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // or use context if available

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
