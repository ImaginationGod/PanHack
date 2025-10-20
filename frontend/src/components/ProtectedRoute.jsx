import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    return children; // logged in, render the component
};

export default ProtectedRoute;
