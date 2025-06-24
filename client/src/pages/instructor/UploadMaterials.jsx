import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";
import InstructorLayout from "../../components/Instructor/InstructorLayout";
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const UploadMaterials = ({ instructorName }) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
    // Fetch courses from server on component mount
=======
>>>>>>> dcd67e4 (Updated stylings)
=======
    // Fetch courses from server on component mount
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setMessage("Failed to load courses. Please try again later.");
      }
    };
    fetchCourses();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !courseId || !title) {
      setMessage("❗ Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("uploaderName", instructorName);
    formData.append("uploaderRole", "instructor");

    try {
      setLoading(true);
      await axios.post(`http://localhost:5000/api/materials/${courseId}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Material uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      setCourseId("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
    <motion.div
      className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 p-6"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <motion.div
        className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-blue-100 backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-6">📤 Upload Study Material</h2>

        {message && (
          <div
            className={`mb-4 px-4 py-3 rounded-xl text-sm shadow ${
              message.includes("✅")
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-6">
          {/* Course Dropdown */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Course <span className="text-red-500">*</span>
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Material Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. React Basics PDF"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              placeholder="Optional brief description"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Upload File <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX, PPT, PPTX</p>
          </div>

          {/* Submit Button */}
          <div>
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition"
            >
              {loading ? "Uploading..." : "Upload Material"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
<<<<<<< HEAD
=======
    <InstructorLayout>
      <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 p-6 max-w-2xl mx-auto">
        <motion.div
          className="bg-white shadow-2xl rounded-3xl p-10 border border-blue-100 backdrop-blur-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* Back Button */}
          {/* Back button removed as per request */}

          <h2 className="text-3xl font-bold text-blue-700 mb-6">📤 Upload Study Material</h2>

          {message && (
            <div
              className={`mb-4 px-4 py-3 rounded-xl text-sm shadow ${
                message.includes("✅")
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-6">
            {/* Course Dropdown */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Course <span className="text-red-500">*</span>
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              >
                <option value="">-- Select Course --</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Material Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. React Basics PDF"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                placeholder="Optional brief description"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
            </div>

            {/* File Upload */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Upload File <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX, PPT, PPTX</p>
            </div>

            {/* Submit Button */}
            <div>
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition"
              >
                {loading ? "Uploading..." : "Upload Material"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </InstructorLayout>
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  );
};

export default UploadMaterials;
