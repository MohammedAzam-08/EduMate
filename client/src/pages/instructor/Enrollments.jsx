import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import { Loader2, GraduationCap, Trash2, Mail, MessageSquare } from "lucide-react";
=======
import { useParams, useNavigate } from "react-router-dom";
import {
  Loader2,
  GraduationCap,
  Trash2,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import InstructorLayout from "../../components/Instructor/InstructorLayout";
>>>>>>> dcd67e4 (Updated stylings)

const statusColors = {
  enrolled: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  dropped: "bg-red-100 text-red-800",
};

const Enrollments = () => {
  const { courseId } = useParams();
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> dcd67e4 (Updated stylings)
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        let res;
        if (courseId) {
<<<<<<< HEAD
          res = await axios.get(`http://localhost:5000/api/enrollments/course/${courseId}`);
=======
          res = await axios.get(
            `http://localhost:5000/api/enrollments/course/${courseId}`
          );
>>>>>>> dcd67e4 (Updated stylings)
        } else {
          res = await axios.get("http://localhost:5000/api/enrollments");
        }
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
<<<<<<< HEAD
    // Implement your remove logic here
=======
>>>>>>> dcd67e4 (Updated stylings)
    alert(`Remove student with enrollment ID: ${id}`);
  };

  const handleMessage = (email) => {
<<<<<<< HEAD
    // Implement your message logic here
=======
>>>>>>> dcd67e4 (Updated stylings)
    alert(`Send message to: ${email}`);
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
=======
    <InstructorLayout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Back Button */}
        {/* Back button removed as per request */}

>>>>>>> dcd67e4 (Updated stylings)
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-8 border-b pb-3 flex items-center gap-3">
          <GraduationCap size={32} /> Enrolled Students
        </h1>

        {loading ? (
          <div className="flex justify-center mt-20">
            <Loader2 className="animate-spin text-blue-500" size={36} />
          </div>
        ) : enrollments.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-16">
            No students have enrolled in this course yet.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Enrollment Date</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {enrollments.map((enrollment) => {
                  const statusClass =
                    statusColors[enrollment.status] || "bg-gray-100 text-gray-700";
                  return (
                    <tr key={enrollment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                        {enrollment.student?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {enrollment.student?.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
<<<<<<< HEAD
                      {enrollment.enrollmentDate
  ? new Date(enrollment.enrollmentDate).toLocaleDateString()
  : new Date(enrollment.createdAt).toLocaleDateString()}

=======
                        {enrollment.enrollmentDate
                          ? new Date(enrollment.enrollmentDate).toLocaleDateString()
                          : new Date(enrollment.createdAt).toLocaleDateString()}
>>>>>>> dcd67e4 (Updated stylings)
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusClass}`}
                        >
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                        <button
                          onClick={() => handleMessage(enrollment.student.email)}
                          className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg"
                        >
                          <MessageSquare className="mr-1 w-4 h-4" />
                          Message
                        </button>
                        <button
                          onClick={() => handleRemove(enrollment._id)}
                          className="inline-flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-lg"
                        >
                          <Trash2 className="mr-1 w-4 h-4" />
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
<<<<<<< HEAD
    </div>
=======
    </InstructorLayout>
>>>>>>> dcd67e4 (Updated stylings)
  );
};

export default Enrollments;
