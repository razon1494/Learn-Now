import React from "react";
import leraning from "../assets/image/learningportal.svg";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../features/auth/authSlice";
import { Link, Navigate } from "react-router-dom";
export default function NavBar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    Navigate("/");
  };
  return (
    <nav className="shadow-md">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to="/courseplayer">
          <img className="h-10" src={leraning} alt="" />
        </Link>
        <div className="flex items-center gap-3">
          <Link to={"/leaderboard"}>Leaderboard</Link>
          <h2 className="font-bold">{user.name}</h2>
          <Link
            to="/courseplayer"
            className="flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan "
          >
            <span className="cursor-pointer">Playlist</span>
          </Link>
          <button
            onClick={logout}
            className="flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            <span className="cursor-pointer">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
