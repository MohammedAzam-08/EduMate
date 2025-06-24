import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useParams, Link } from "react-router-dom";
=======
import { useParams, Link, useNavigate } from "react-router-dom";
>>>>>>> dcd67e4 (Updated stylings)
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> dcd67e4 (Updated stylings)
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

  if (loading) return <div className="p-10 text-lg text-gray-600">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[450px] overflow-hidden">
        <img
          src={course.image || "/apple.png"}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/apple.png";
          }}
        />
<<<<<<< HEAD
        <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm flex items-center justify-center">
=======
        <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm flex flex-col items-center justify-center px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white/80 hover:bg-white text-blue-900 font-semibold py-2 px-4 rounded-md shadow-md"
          >
            ← Back
          </button>

>>>>>>> dcd67e4 (Updated stylings)
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center drop-shadow-xl">
            {course.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6 md:px-10 py-12">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Course Overview</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{course.description}</p>
          </section>

          {course.videoLink && (
            <section className="bg-blue-50 border border-blue-200 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Course Video URL</h3>
              <a
                href={course.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-words"
              >
                {course.videoLink}
              </a>
            </section>
          )}

          {course.tags?.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4">
          <h3 className="text-xl font-bold text-blue-700">Course Information</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li><strong>Instructor:</strong> {course.instructor?.name || "N/A"}</li>
            <li><strong>Duration:</strong> {course.duration || "N/A"}</li>
            <li><strong>Price:</strong> ₹{course.payment || 0}</li>
            <li><strong>Discount:</strong> {course.discount || 0}%</li>
            <li><strong>Status:</strong> <span className={course.isPublished ? "text-green-600 font-medium" : "text-red-600"}>{course.isPublished ? "Published" : "Draft"}</span></li>
            <li>
              <strong>Course URL:</strong><br />
              <a href={`/courses/${course._id}`} className="text-blue-600 underline break-all">
                /courses/{course._id}
              </a>
            </li>
          </ul>

          <Link
            to="/instructor/courses"
            className="block w-full mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
          >
            ← Back to Course List
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails;
