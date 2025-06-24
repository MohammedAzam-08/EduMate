import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiBookOpen,
  FiUpload,
  FiUsers,
  FiBarChart2,
  FiMessageSquare,
  FiSettings,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const InstructorSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
<aside className="w-64 bg-gradient-to-b from-blue-800 to-blue-700 text-white flex flex-col pt-0 px-6 pb-6 space-y-6 shadow-lg sticky top-0 h-screen">
      <h2
        className="text-3xl font-bold mb-6 tracking-wide cursor-pointer"
        onClick={() => navigate("/instructor-dashboard")}
      >
        🎓 EduMate
      </h2>
      <nav className="flex flex-col space-y-4">
        <NavItem to="/instructor/courses" icon={<FiBookOpen />} label="My Courses" />
        <NavItem to="/instructor/upload-material" icon={<FiUpload />} label="Upload Materials" />
        <NavItem to="/instructor/enrollments" icon={<FiUsers />} label="Manage Enrollments" />
        <NavItem to="/instructor/analytics" icon={<FiBarChart2 />} label="Course Analytics" />
        <NavItem to="/instructor/messages" icon={<FiMessageSquare />} label="Messages" />
        <NavItem to="/instructor/settings" icon={<FiSettings />} label="Profile Settings" />
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition shadow"
      >
        Logout
      </button>
    </aside>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 py-2 px-3 rounded-lg transition ${
        isActive ? "bg-blue-600 text-yellow-300" : "hover:bg-blue-600 hover:text-yellow-300"
      }`
    }
  >
    {icon} {label}
  </NavLink>
);

export default InstructorSidebar;
