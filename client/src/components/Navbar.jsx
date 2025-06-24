import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 tracking-tight">
          <Link to="/">EduMate</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Contact Us
          </Link>

          {/* Auth Section */}
          {!token ? (
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition text-sm font-medium">
                Sign In
              </button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700 font-medium">Logged In</span>
              <button
                onClick={handleSignOut}
                className="text-sm px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
