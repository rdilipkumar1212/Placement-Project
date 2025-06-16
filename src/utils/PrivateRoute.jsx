import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to signin
    return <Navigate to="/signin" />;
  }

  try {
    // Decode the JWT
    const decodedToken = jwtDecode(token);
    const { exp } = decodedToken;

    // Check if token has expired
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem('token'); // Remove expired token
      return <Navigate to="/signin" />;
    }

    // If the token is valid, render the children
    return children;
  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem('token'); // Remove invalid token
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
