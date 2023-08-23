import React from "react";
import NavBar from "../components/NavBar";
import AdminNavBar from "../components/AdminNavBar";
import QuizzesList from "../components/QuizzesList";

export default function QuizzesAdmin() {
  return (
    <div>
      <AdminNavBar />
      <QuizzesList />
    </div>
  );
}
