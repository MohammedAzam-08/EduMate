import React from "react";
import { Link } from "react-router-dom";
import {
  FiBookOpen,
  FiInbox,
  FiDownload,
  FiMessageSquare,
  FiSettings,
} from "react-icons/fi";

const StudentSidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col p-6 space-y-6 shadow-xl sticky top-0 h-screen">
      <Link to="/student-dashboard" className="cursor-pointer">
        <h2 className="text-3xl font-bold mb-4 tracking-wide">🎓 EduMate</h2>
      </Link>
      <nav className="flex flex-col space-y-4 text-base font-medium">
        <NavItem to="/student/available-courses" icon={<FiBookOpen />} label="Available Courses" />
        <NavItem to="/student/enrollments" icon={<FiInbox />} label="My Enrollments" />
        <NavItem to="/student/study-materials" icon={<FiDownload />} label="Study Materials" />
        <NavItem to="/student/messages" icon={<FiMessageSquare />} label="Messages" />
        <NavItem to="/student/settings" icon={<FiSettings />} label="Profile Settings" />
      </nav>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition font-medium"
      >
        Logout
      </button>
    </aside>
  );
};

const NavItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-600 hover:text-yellow-300 transition"
  >
    {icon} {label}
  </Link>
);

export default StudentSidebar;
