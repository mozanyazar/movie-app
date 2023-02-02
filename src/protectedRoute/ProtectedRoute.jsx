import React, { Children, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../store/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  if (user != null) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
