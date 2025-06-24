import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiBookOpen,
  FiUpload,
  FiUsers,
  FiBarChart2,
  FiMessageSquare,
  FiSettings,
  FiPlus
} from "react-icons/fi";
import { motion } from "framer-motion";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import InstructorSidebar from "../../components/Instructor/InstructorSidebar";
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe

const InstructorDashboard = () => {
  const navigate = useNavigate();

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  const handleLogout = () => {
    localStorage.removeItem("token"); // or any other logout logic
    navigate("/login");
  };

<<<<<<< HEAD
=======
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  const handleNewCourse = () => {
    navigate("/instructor/courses/new");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 to-blue-50">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-800 to-blue-700 text-white flex flex-col p-6 space-y-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 tracking-wide">🎓 EduMate</h2>
        <nav className="flex flex-col space-y-4">
          <NavItem to="/instructor/courses" icon={<FiBookOpen />} label="My Courses" />
          <NavItem to="/instructor/upload-material" icon={<FiUpload />} label="Upload Materials" />
          <NavItem to="/instructor/enrollments" icon={<FiUsers />} label="Manage Enrollments" />
          <NavItem to="/instructor/analytics" icon={<FiBarChart2 />} label="Course Analytics" />
          <NavItem to="/instructor/messages" icon={<FiMessageSquare />} label="Messages" />
          <NavItem to="/instructor/settings" icon={<FiSettings />} label="Profile Settings" />
        </nav>
      </aside>
<<<<<<< HEAD
=======

      {/* Sidebar */}
      <InstructorSidebar />
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Instructor Dashboard 👩‍🏫
          </h1>
          <div className="flex items-center space-x-4">
           <Link to="/instructor/addcourse">
                       <motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
>
  + New Course
</motion.button>

                     </Link>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
            <motion.button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
<<<<<<< HEAD
=======
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
          </div>
        </header>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {[
            { title: "Total Courses", count: 12 },
            { title: "Enrollments", count: 340 },
            { title: "New Messages", count: 5 },
            { title: "Materials Uploaded", count: 58 },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
              <p className="text-4xl font-extrabold mt-2 text-blue-600">{stat.count}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          className="bg-white p-8 rounded-3xl shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activities</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-600">
            <li>Uploaded "React Basics" materials</li>
            <li>Enrolled 10 new students to "Web Development"</li>
            <li>Received a new message from John Doe</li>
          </ul>
        </motion.div>
      </main>
    </div>
  );
};

// NavItem Component
const NavItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-600 hover:text-yellow-300 transition"
  >
    {icon} {label}
  </Link>
);

<<<<<<< HEAD
<<<<<<< HEAD
export default InstructorDashboard;
=======
export default InstructorDashboard;
>>>>>>> dcd67e4 (Updated stylings)
=======
export default InstructorDashboard;
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
