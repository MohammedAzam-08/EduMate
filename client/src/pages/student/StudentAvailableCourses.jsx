import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BookOpenIcon, SearchIcon } from "lucide-react";
import { motion } from "framer-motion";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import StudentLayout from "../../components/Student/StudentLayout";
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe

const StudentAvailableCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const studentEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses/available")
      .then((res) => {
        setCourses(res.data);
        setFilteredCourses(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(term)
    );
    setFilteredCourses(filtered);
  };

  const handleEnroll = async (courseId) => {
    try {
      const studentName = localStorage.getItem("userName") || "Student";
      await axios.post("http://localhost:5000/api/enrollments", {
        student: {
          email: studentEmail,
          name: studentName,
        },
        course: courseId,
      });
      alert("Enrolled successfully!");
      navigate("/student/enrollments");
    } catch (error) {
      console.error("Enrollment failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Enrollment failed.");
    }
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-6 sm:p-10">
=======
    <StudentLayout>

>>>>>>> dcd67e4 (Updated stylings)
=======
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-6 sm:p-10">
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3 mb-4">
          <BookOpenIcon className="text-indigo-600 w-8 h-8" />
          Explore Available Courses
        </h2>
        <div className="flex items-center bg-white rounded-lg shadow-md px-4 py-2 max-w-md">
          <SearchIcon className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full outline-none border-none text-gray-700 placeholder-gray-400 bg-transparent"
          />
        </div>
      </motion.div>

      {filteredCourses.length > 0 ? (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course._id}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <img
                src={course.image || "/vite.svg"}
                alt={course.title}
                className="h-48 w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/vite.svg";
                }}
              />
              <div className="p-5 space-y-3 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {course.description}
                </p>

                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <span className="font-medium text-gray-700">Instructor:</span>{" "}
                    {typeof course.instructor === "object" && course.instructor !== null
                      ? course.instructor.name
                      : course.instructor}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Duration:</span>{" "}
                    {course.duration}
                  </p>
                </div>

                <div className="mt-auto pt-4 flex gap-2">
                  <Link
                    to={`/courses/${course._id}`}
                    className="flex-1 text-center bg-indigo-500 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-300"
                  >
                    View Course →
                  </Link>
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="flex-1 bg-green-500 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-300"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center text-gray-500 mt-16 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          No courses match your search. Please try another keyword.
        </motion.div>
      )}
<<<<<<< HEAD
<<<<<<< HEAD
    </div>
=======
    </StudentLayout>
>>>>>>> dcd67e4 (Updated stylings)
=======
    </div>
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  );
};

export default StudentAvailableCourses;
