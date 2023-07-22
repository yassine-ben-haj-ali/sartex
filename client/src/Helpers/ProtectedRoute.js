import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { Token } = useSelector((state) => state.auth);
  return Token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
