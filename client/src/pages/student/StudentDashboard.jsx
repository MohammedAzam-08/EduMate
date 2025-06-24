import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
import {
  FiBookOpen,
  FiInbox,
  FiDownload,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
<<<<<<< HEAD
=======
import { motion } from "framer-motion";
import axios from "axios";
import StudentLayout from "../../components/Student/StudentLayout";
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
    axios.get("http://localhost:5000/api/enrollments/student")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));

    axios.get("http://localhost:5000/api/messages/student")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    axios.get("http://localhost:5000/api/study-materials/student")
<<<<<<< HEAD
=======
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get("http://localhost:5000/api/my-enrollments", config)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));

    axios.get("http://localhost:5000/api/messages", config)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    axios.get("http://localhost:5000/api/materials", config)
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
      .then((res) => setMaterials(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 to-indigo-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-800 to-indigo-700 text-white flex flex-col p-6 space-y-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-4 tracking-wide">🎓 EduMate</h2>
        <nav className="flex flex-col space-y-4 text-base font-medium">
          <NavItem to="/student/available-courses" icon={<FiBookOpen />} label="Available Courses" />
          <NavItem to="/student/enrollments" icon={<FiInbox />} label="My Enrollments" />
          <NavItem to="/student/study-materials" icon={<FiDownload />} label="Study Materials" />
          <NavItem to="/student/messages" icon={<FiMessageSquare />} label="Messages" />
          <NavItem to="/student/settings" icon={<FiSettings />} label="Profile Settings" />
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">👋 Student Dashboard</h1>
        </header>

        {/* Welcome Banner */}
        <motion.div
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl mb-10 shadow-xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold">Welcome back to EduMate!</h2>
          <p className="mt-2 text-sm">
            You have <strong>{courses.length}</strong> enrolled courses and <strong>{messages.length}</strong> new messages.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {[
            { title: "Enrolled Courses", count: courses.length },
            { title: "New Messages", count: messages.length },
            { title: "Materials Downloaded", count: materials.length },
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
              <p className="text-4xl font-extrabold mt-2 text-indigo-600">{stat.count}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enrolled Courses List */}
        <motion.div
          className="bg-white p-8 rounded-3xl shadow-xl overflow-x-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Enrolled Courses 📚</h2>
          {courses.length > 0 ? (
            <table className="w-full text-sm border-separate border-spacing-y-3">
              <thead>
                <tr className="text-gray-600 bg-gray-100 rounded-xl overflow-hidden">
                  <th className="p-3 text-left">Course Title</th>
                  <th className="p-3 text-left">Instructor</th>
                  <th className="p-3 text-left">Progress</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, idx) => (
                  <tr key={idx} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 rounded-xl transition">
                    <td className="p-3">{course.courseTitle}</td>
                    <td className="p-3">{course.instructorName}</td>
                    <td className="p-3">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress || 0}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{course.progress || 0}% completed</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">You are not enrolled in any courses yet.</p>
          )}
        </motion.div>
      </main>
    </div>
  );
};

// NavItem Component
const NavItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-indigo-600 hover:text-yellow-300 transition"
  >
    {icon} {label}
  </Link>
);

<<<<<<< HEAD
export default StudentDashboard;
=======
    <StudentLayout>
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Student Dashboard 🎓</h1>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Enrolled Courses" value={courses.length} />
        <StatCard title="New Messages" value={messages.length} />
        <StatCard title="Materials Downloaded" value={materials.length} />
        <StatCard title="Progress Avg" value="72%" />
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-8 rounded-3xl shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activities</h2>
        <ul className="list-disc ml-5 text-gray-700 space-y-2">
          <li>Downloaded "React Basics" materials</li>
          <li>Enrolled in "Full Stack Web Development"</li>
          <li>Received new message from Instructor John</li>
        </ul>
      </div>

      {/* Enrolled Courses Table */}
      <div className="bg-white p-8 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Enrolled Courses 📚</h2>
        {courses.length > 0 ? (
          <table className="w-full text-sm border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-600 bg-gray-100 rounded-xl">
                <th className="p-3 text-left">Course Title</th>
                <th className="p-3 text-left">Instructor</th>
                <th className="p-3 text-left">Progress</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, idx) => (
                <tr key={idx} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 rounded-xl transition">
                  <td className="p-3">{course.courseTitle}</td>
                  <td className="p-3">{course.instructorName}</td>
                  <td className="p-3">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-indigo-600 h-3 rounded-full"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{course.progress || 0}% completed</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">You are not enrolled in any courses yet.</p>
        )}
      </div>
    </StudentLayout>
  );
};

// StatCard Component
const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
    <h3 className="text-md font-semibold text-gray-600">{title}</h3>
    <p className="text-4xl font-bold text-blue-700 mt-2">{value}</p>
  </div>
);

export default StudentDashboard;
>>>>>>> dcd67e4 (Updated stylings)
=======
export default StudentDashboard;
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
