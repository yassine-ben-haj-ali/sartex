import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({children}) => {
  const { Token } = useSelector((state) => state.auth);
  return Token ? <Navigate to="/products" /> : <>{children}</>;
};

export default PublicRoute;
