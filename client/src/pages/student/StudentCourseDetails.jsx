import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import StudentLayout from "../../components/Student/StudentLayout";

const extractYouTubeID = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\\w\/|embed\/|watch\\?v=|\\&v=)([^#\\&\\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const StudentCourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Invalid course ID.");
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError("Course not found.");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading)
    return <div className="p-10 text-lg text-gray-600 animate-pulse">Loading...</div>;
  if (error)
    return <div className="p-10 text-red-600 font-medium">{error}</div>;

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800">
        {/* Hero Section */}
        <motion.div
          className="relative h-[300px] md:h-[450px] overflow-hidden shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={course.image || "/apple.png"}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/apple.png";
            }}
          />
          <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm flex flex-col items-center justify-center px-4">
            <motion.h1
              className="text-white text-4xl md:text-5xl font-bold text-center drop-shadow-xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {course.title}
            </motion.h1>
          </div>
        </motion.div>

        {/* Course Content */}
        <motion.div
          className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 px-6 md:px-10 py-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Left (Main) Column */}
          <div className="md:col-span-2 space-y-10">
            <motion.section
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-blue-700 mb-3">Course Overview</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{course.description}</p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-blue-700 mb-3">Course Details</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
                <li><strong>Instructor:</strong> {course.instructor?.name || "N/A"}</li>
                <li><strong>Duration:</strong> {course.duration || "N/A"}</li>
                <li><strong>Price:</strong> ₹{course.payment || 0}</li>
                <li><strong>Discount:</strong> {course.discount || 0}%</li>
                <li>
                  <strong>Status:</strong>{" "}
                  <span className={course.isPublished ? "text-green-600 font-semibold" : "text-red-600"}>
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </li>
              </ul>
            </motion.section>

            {course.videoLink && (
              <motion.section
                className="bg-blue-100 border border-blue-300 p-6 rounded-xl shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Course Video</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${extractYouTubeID(course.videoLink)}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              </motion.section>
            )}

            {course.tags?.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-200 text-blue-900 text-sm font-medium px-3 py-1 rounded-full shadow"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}

          </div>

          {/* Right Column (Actions) */}
          <motion.div
            className="flex flex-col justify-center items-center bg-white shadow-xl border border-blue-100 rounded-xl p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-6 text-center">Ready to Enroll?</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const studentEmail = localStorage.getItem("userEmail");
                const studentName = localStorage.getItem("userName") || "Student";
                const coursePrice = course ? course.payment : 29.99;
                const courseCurrency = course ? course.currency || 'usd' : 'usd';
                navigate("/payment", {
                  state: {
                    courseId: course._id,
                    studentEmail,
                    studentName,
                    coursePrice,
                    courseCurrency,
                  },
                });
              }}
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 px-8 rounded-lg shadow-lg"
            >
              Enroll Now
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </StudentLayout>
  );
};

export default StudentCourseDetails;
