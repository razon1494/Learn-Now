import React from "react";
import NavBar from "../components/NavBar";
import AdminNavBar from "../components/AdminNavBar";
import VideoLists from "../components/VideoLists";
import { AssignmentsList } from "../components/AssignmentsList";

export default function Assignments() {
  return (
    <div>
      <AdminNavBar />
      <AssignmentsList />
    </div>
  );
}
