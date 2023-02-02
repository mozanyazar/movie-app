import React, { Children, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../store/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to="/createAccount" />;
  }
  return children;
};

export default ProtectedRoute;
