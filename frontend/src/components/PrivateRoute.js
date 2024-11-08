import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../authContext';

const PrivateRoute = ({ children }) => {
  // Access authentication state from context
  const { auth } = useContext(AuthContext);

  // If not authenticated, redirect to the login page
  if (!auth) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child components (like Dashboard)
  return children;
};

export default PrivateRoute;
