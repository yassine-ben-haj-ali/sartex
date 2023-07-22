import React from "react";
import { useSelector } from "react-redux";

const ProtectedAdminRoute = ({ children }) => {
  const { Details } = useSelector((state) => state.auth);
  return Details && Details.role == "Admin" ? (
    <>{children}</>
  ) : (
    <div>unotharized</div>
  );
};

export default ProtectedAdminRoute;
