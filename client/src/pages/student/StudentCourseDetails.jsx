import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentCourseDetails = () => {
  const { courseId } = useParams(); // get ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/courses/${courseId}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [courseId]);

  if (loading) return <div className="p-6">Loading course...</div>;
  if (!course) return <div className="p-6 text-red-600">Course not found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <img
        src={course.image || "/vite.svg"}
        alt={course.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-700 mb-4">{course.description}</p>
      <p><strong>Instructor:</strong> {course.instructor?.name || course.instructor}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
    </div>
  );
};

export default StudentCourseDetails;
