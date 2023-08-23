import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth();
  const auth = useSelector((state) => state.auth);
  return !isLoggedIn ? (
    children
  ) : auth?.user?.role === "student" ? (
    <Navigate to="/courseplayer" />
  ) : (
    <Navigate to="/admin/dashboard" />
  );
}
