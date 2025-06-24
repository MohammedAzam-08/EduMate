import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import InstructorLayout from "../../components/Instructor/InstructorLayout";
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const CourseAnalytics = ({ instructorName }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe

  const courseData = [
    { name: "React Basics", students: 120, materials: 10 },
    { name: "Advanced JS", students: 90, materials: 8 },
    { name: "UI Design", students: 70, materials: 6 },
    { name: "Node.js", students: 100, materials: 9 },
  ];

  const activityData = [
    { day: "Mon", messages: 5, views: 40 },
    { day: "Tue", messages: 8, views: 60 },
    { day: "Wed", messages: 3, views: 30 },
    { day: "Thu", messages: 10, views: 75 },
    { day: "Fri", messages: 6, views: 50 },
  ];
<<<<<<< HEAD
=======
  const navigate = useNavigate();

  // const courseData = [
  //   { name: "React Basics", students: 120, materials: 10 },
  //   { name: "Advanced JS", students: 90, materials: 8 },
  //   { name: "UI Design", students: 70, materials: 6 },
  //   { name: "Node.js", students: 100, materials: 9 },
  // ];

  // const activityData = [
  //   { day: "Mon", messages: 5, views: 40 },
  //   { day: "Tue", messages: 8, views: 60 },
  //   { day: "Wed", messages: 3, views: 30 },
  //   { day: "Thu", messages: 10, views: 75 },
  //   { day: "Fri", messages: 6, views: 50 },
  // ];

  const courseData = stats?.courseOverview || [];
  const activityData = stats?.weeklyActivity || [];
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
<<<<<<< HEAD
<<<<<<< HEAD
=======
        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("User token not found in localStorage");
          setLoading(false);
          return;
        }
        // Decode token to get instructorName
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const user = JSON.parse(jsonPayload);
        const instructorName = user.id; // or user.name if available

        if (!instructorName) {
          console.error("Instructor name not found in token");
          setLoading(false);
          return;
        }

>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
        const response = await axios.get(
          `http://localhost:5000/api/analytics/instructor/${instructorName}`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  }, [instructorName]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div
        className="max-w-7xl mx-auto space-y-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-gray-800 border-b pb-4"
          whileHover={{ scale: 1.02 }}
        >
          📊 Instructor Analytics
        </motion.h1>

        {loading ? (
          <motion.div
            className="text-center text-blue-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading analytics...
          </motion.div>
        ) : stats ? (
          <>
            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <StatCard title="Courses" value={stats.totalCourses} color="text-blue-600" index={0} />
              <StatCard title="Enrollments" value={stats.totalEnrollments} color="text-green-600" index={1} />
              <StatCard title="Materials" value={stats.totalMaterials} color="text-yellow-500" index={2} />
              <StatCard title="Messages" value={stats.totalMessages || 0} color="text-purple-500" index={3} />
            </motion.div>

            {/* Charts */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {/* Enrollments & Materials Chart */}
              <motion.div
                className="bg-white p-6 rounded-2xl shadow-lg border"
                variants={fadeIn}
                custom={1}
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Enrollments & Materials Overview
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={courseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#3b82f6" name="Students" />
                    <Bar dataKey="materials" fill="#10b981" name="Materials" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Weekly Activity Chart */}
              <motion.div
                className="bg-white p-6 rounded-2xl shadow-lg border"
                variants={fadeIn}
                custom={2}
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Weekly Activity</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="messages"
                      stroke="#6366f1"
                      strokeWidth={2}
                      name="Messages"
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Views"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="text-red-500 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Failed to load analytics data.
          </motion.div>
        )}
      </motion.div>
    </motion.div>
<<<<<<< HEAD
=======
  }, []);

  return (
    <InstructorLayout>
      <motion.div
        className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 p-6 sm:p-10">
          <motion.div
            className="max-w-7xl mx-auto space-y-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Button */}
            {/* Back button removed as per request */}

            <motion.h1
              className="text-4xl font-extrabold text-gray-800 border-b pb-4"
              whileHover={{ scale: 1.02 }}
            >
              📊 Instructor Analytics
            </motion.h1>

            {loading ? (
              <motion.div
                className="text-center text-blue-600 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Loading analytics...
              </motion.div>
            ) : stats ? (
              <>
                {/* Stats Cards */}
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  <StatCard title="Courses" value={stats.totalCourses} color="text-blue-600" index={0} />
                  <StatCard title="Enrollments" value={stats.totalEnrollments} color="text-green-600" index={1} />
                  <StatCard title="Materials" value={stats.totalMaterials} color="text-yellow-500" index={2} />
                  <StatCard title="Messages" value={stats.totalMessages || 0} color="text-purple-500" index={3} />
                </motion.div>

                {/* Charts */}
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.2,
                      },
                    },
                  }}
                >
                  {/* Enrollments & Materials Chart */}
                  <motion.div
                    className="bg-white p-6 rounded-2xl shadow-lg border"
                    variants={fadeIn}
                    custom={1}
                  >
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                      Enrollments & Materials Overview
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={courseData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="students" fill="#3b82f6" name="Students" />
                        <Bar dataKey="materials" fill="#10b981" name="Materials" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Weekly Activity Chart */}
                  <motion.div
                    className="bg-white p-6 rounded-2xl shadow-lg border"
                    variants={fadeIn}
                    custom={2}
                  >
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Weekly Activity</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="messages"
                          stroke="#6366f1"
                          strokeWidth={2}
                          name="Messages"
                        />
                        <Line
                          type="monotone"
                          dataKey="views"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          name="Views"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                </motion.div>
              </>
            ) : (
              <motion.div
                className="text-red-500 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Failed to load analytics data.
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </InstructorLayout>
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  );
};

const StatCard = ({ title, value, color, index }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-md p-6 text-center border hover:shadow-xl transition duration-300"
    variants={fadeIn}
    custom={index}
  >
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </motion.div>
);

export default CourseAnalytics;
<<<<<<< HEAD
<<<<<<< HEAD
=======
            
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
