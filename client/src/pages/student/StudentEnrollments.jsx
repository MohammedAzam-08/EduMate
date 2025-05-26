import React, { useEffect, useState } from "react";
import axios from "axios";
import { GraduationCapIcon } from "lucide-react";
import { motion } from "framer-motion";

const StudentEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const studentEmail = localStorage.getItem("userEmail");
    if (!studentEmail) {
      console.error("No student email found");
      return;
    }
    axios
      .get(`http://localhost:5000/api/enrollments/student/${studentEmail}`)
      .then((res) => setEnrollments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-6 sm:p-10">
      <motion.h2
        className="text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-3"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <GraduationCapIcon className="text-indigo-600 w-8 h-8" />
        My Enrollments
      </motion.h2>

      {enrollments.length === 0 ? (
        <motion.div
          className="text-center text-gray-500 mt-20 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          You haven&apos;t enrolled in any courses yet.
        </motion.div>
      ) : (
        <motion.div
          className="overflow-x-auto bg-white shadow-2xl rounded-2xl border border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Course Title</th>
                <th className="px-6 py-4">Instructor</th>
                <th className="px-6 py-4">Enrolled On</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {enrollments.map((enroll, index) => (
                <motion.tr
                  key={enroll._id}
                  className="border-t hover:bg-gray-50 transition"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <td className="px-6 py-4 font-medium">
                    {enroll.course?.title || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {typeof enroll.course?.instructor === "object"
                      ? enroll.course.instructor.name
                      : enroll.course?.instructor || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(enroll.enrollmentDate).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default StudentEnrollments;
