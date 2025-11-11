import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-pink-400 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        💞 My Gift
      </Link>
      <div className="space-x-4">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}
