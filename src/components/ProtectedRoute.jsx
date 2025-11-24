import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  // Stop here if we are still checking localStorage
  if (loading) {
    return <div className="p-4 text-center">Loading Auth...</div>;
  }

  // If user exists AND is admin, show content
  // Otherwise, redirect to login
  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
