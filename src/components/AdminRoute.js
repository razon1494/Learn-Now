import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ children }) {
  const isLoggedIn = useAuth();
  const auth = useSelector((state) => state.auth);

  return isLoggedIn && auth?.user?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
