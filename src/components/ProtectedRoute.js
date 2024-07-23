import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Token not found, Heading to login page.');
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== requiredRole) {
      alert('Unauthorized, Heading to dashboard page.');
      return <Navigate to="/dashboard" />;
    }
  } catch (error) {
    <Navigate to="/login" />;
    alert('Token not found, Heading to login page.');
    return;
  }

  return children;
};

export default ProtectedRoute;
