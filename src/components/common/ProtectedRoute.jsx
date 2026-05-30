import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  if (!token) {
    // Redirect to login page and record location to redirect back
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
