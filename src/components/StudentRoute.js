import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function StudentRoute({ children }) {
  const isLoggedIn = useAuth();
  const auth = useSelector((state) => state.auth);

  return isLoggedIn && auth?.user?.role === "student" ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
