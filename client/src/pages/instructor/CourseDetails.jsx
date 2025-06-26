import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StudentLayout from "../../components/Student/StudentLayout";

const CourseDetails = () => {
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

  if (loading) return <div className="p-10 text-lg text-gray-600">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">{error}</div>;

  return (
    <StudentLayout>
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
          <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm flex flex-col items-center justify-center px-4">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 bg-white/80 hover:bg-white text-blue-900 font-semibold py-2 px-4 rounded-md shadow-md"
            >
              ← Back
            </button>
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

              <section>
                <h2 className="text-2xl font-semibold text-blue-700 mb-2">Course Details</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Instructor:</strong> {course.instructor?.name || "N/A"}</li>
                  <li><strong>Duration:</strong> {course.duration || "N/A"}</li>
                  <li><strong>Price:</strong> ₹{course.payment || 0}</li>
                  <li><strong>Discount:</strong> {course.discount || 0}%</li>
                  <li>
                    <strong>Status:</strong>{" "}
                    <span className={course.isPublished ? "text-green-600 font-medium" : "text-red-600"}>
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </li>
                </ul>
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
        </div>
      </div>
    </StudentLayout>
  );
};

export default CourseDetails;

