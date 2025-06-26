import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Loader2,
  GraduationCap,
  Trash2,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InstructorLayout from "../../components/Instructor/InstructorLayout";

const statusColors = {
  enrolled: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  dropped: "bg-red-100 text-red-800",
};

const Enrollments = () => {
  const { courseId } = useParams();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const url = courseId
          ? `http://localhost:5000/api/enrollments/course/${courseId}`
          : `http://localhost:5000/api/enrollments`;

        const res = await axios.get(url);
        setEnrollments(res.data);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [courseId]);

  const handleRemove = (id) => {
    alert(`Remove student with enrollment ID: ${id}`);
  };

  const handleMessage = (email) => {
    alert(`Send message to: ${email}`);
  };

  return (
    <InstructorLayout>
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 md:px-8 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-10 border-b-2 border-blue-100 pb-4 flex items-center gap-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GraduationCap size={32} /> Enrolled Students
        </motion.h1>

        {loading ? (
          <div className="flex justify-center mt-20">
            <Loader2 className="animate-spin text-blue-500" size={36} />
          </div>
        ) : enrollments.length === 0 ? (
          <motion.div
            className="text-center text-gray-500 text-lg mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            No students have enrolled in this course yet.
          </motion.div>
        ) : (
          <motion.div
            className="overflow-x-auto bg-white rounded-xl shadow-xl ring-1 ring-gray-200"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Email</th>
                  <th className="px-6 py-3 text-left font-semibold">Enrollment Date</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence>
                  {enrollments.map((enrollment, index) => {
                    const statusClass =
                      statusColors[enrollment.status] || "bg-gray-100 text-gray-700";

                    return (
                      <motion.tr
                        key={enrollment._id}
                        className="hover:bg-gray-50 transition-all duration-200"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                          {enrollment.student?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                          {enrollment.student?.email || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                          {enrollment.enrollmentDate
                            ? new Date(enrollment.enrollmentDate).toLocaleDateString()
                            : new Date(enrollment.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusClass}`}
                          >
                            {enrollment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleMessage(enrollment.student?.email)}
                            className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition"
                          >
                            <MessageSquare className="mr-1 w-4 h-4" />
                            Message
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRemove(enrollment._id)}
                            className="inline-flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition"
                          >
                            <Trash2 className="mr-1 w-4 h-4" />
                            Remove
                          </motion.button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.div>
    </InstructorLayout>
  );
};

export default Enrollments;
