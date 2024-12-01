import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;

