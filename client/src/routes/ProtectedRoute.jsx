import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
