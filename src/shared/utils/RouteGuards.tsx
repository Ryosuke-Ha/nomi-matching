import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => sessionStorage.getItem("auth") === "true";

export function PublicRoute() {
  return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />;
}

export function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
