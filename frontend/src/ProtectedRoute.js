// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Example auth check

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
