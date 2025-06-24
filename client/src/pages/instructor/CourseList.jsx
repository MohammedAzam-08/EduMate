<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CourseList() {
  const [courses, setCourses] = useState([]);

  const backendBaseURL = "http://localhost:5000";
  const placeholderImage = "/images/react.jpg"; // Use public folder image path as fallback
<<<<<<< HEAD
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import InstructorLayout from "../../components/Instructor/InstructorLayout";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const backendBaseURL = "http://localhost:5000";
  const placeholderImage = "/images/react.jpg";
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(backendBaseURL + "/api/courses");
        setCourses(response.data);
<<<<<<< HEAD
<<<<<<< HEAD
        console.log("Fetched courses:", response.data); // Added console log for debugging image URLs
=======
        console.log("Fetched courses:", response.data);
>>>>>>> dcd67e4 (Updated stylings)
=======
        console.log("Fetched courses:", response.data); // Added console log for debugging image URLs
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

<<<<<<< HEAD
<<<<<<< HEAD
  // Helper to get full image URL
=======
>>>>>>> dcd67e4 (Updated stylings)
=======
  // Helper to get full image URL
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  const getImageURL = (image) => {
    if (!image) return placeholderImage;
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }
<<<<<<< HEAD
<<<<<<< HEAD
    // If relative path, prepend backend base URL
=======
>>>>>>> dcd67e4 (Updated stylings)
=======
    // If relative path, prepend backend base URL
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
    return backendBaseURL + (image.startsWith("/") ? "" : "/") + image;
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-gray-400 to-blue-500 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
=======
    <InstructorLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header Section */}
          <motion.div
>>>>>>> dcd67e4 (Updated stylings)
=======
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-gray-400 to-blue-500 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
          className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-md">
            Your Instructor Courses
          </h1>
        </motion.div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
        {/* Courses Grid */}
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
        {courses.length === 0 ? (
          <motion.p
            className="text-gray-100 text-xl text-center mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            No courses available yet. Start by creating your first course!
          </motion.p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {courses.map((course) => {
              const discountedPrice = (
                course.payment - (course.payment * course.discount) / 100
              ).toFixed(2);

              const imageURL = getImageURL(course.image);

              return (
                <motion.div
                  key={course._id}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={imageURL}
                    alt={course.title}
                    className="h-40 w-full object-cover rounded-t-xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholderImage;
                    }}
                  />
                  <p className="text-xs text-gray-600 px-2 py-1 break-all">
                    Image URL: {imageURL}
                  </p>

                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                      {course.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {course.description}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Duration: {course.duration}
                    </p>

                    <div className="mb-4">
                      <span className="text-lg font-semibold text-green-600 mr-2">
                        ₹{discountedPrice}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{course.payment}
                      </span>
                      <span className="ml-2 text-sm text-red-600 font-medium">
                        {course.discount}% off
                      </span>
                    </div>

                    <div className="mt-auto pt-3 flex justify-between items-center">
                      <Link
                        to={`/instructor/enrollments/${course._id}`}
                        className="text-green-600 hover:underline text-sm font-medium"
                      >
                        Enrollments
                      </Link>
                      <Link
                        to={`/courses/${course._id}`}
                        className="text-indigo-600 hover:underline text-sm font-medium"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
      </div>
    </div>
  );
}

export default CourseList;
<<<<<<< HEAD
=======


      </div>
    </InstructorLayout>
  );
}

export default CourseList;
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
