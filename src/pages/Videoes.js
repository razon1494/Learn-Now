import React from "react";
import NavBar from "../components/NavBar";
import AdminNavBar from "../components/AdminNavBar";
import VideoLists from "../components/VideoLists";

export default function Videoes() {
  return (
    <div>
      <AdminNavBar />
      <VideoLists />
    </div>
  );
}
