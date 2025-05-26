import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent } from "../../components/ui/card.jsx";
import { Input } from "../../components/ui/input.jsx";

export default function LandingPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses/available")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white shadow-sm py-4 px-10">
        <div className="flex items-center space-x-3">
          <img src="/images/logo.jpg" alt="Logo" className="w-14 h-14" />
          <span className="text-2xl font-bold text-green-600">EduMate</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/sign-in">
            <Button variant="outline" className="px-6 py-2 text-sm">
              Log in
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 text-sm">
              Join for free
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">
          Empower your future with the <br />
          courses designed to{" "}
          <span className="text-blue-600 underline underline-offset-8 decoration-wavy">
            fit your choice.
          </span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          We bring together world-class instructors, interactive content, and a
          supportive community to help you achieve your personal and
          professional goals.
        </p>

        {/* Search */}
        <div className="flex justify-center gap-2 max-w-md mx-auto">
          <Input
            placeholder="Search for courses"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full px-5"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
            Search
          </Button>
        </div>
      </header>

      {/* Course Cards */}
      <section className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-center col-span-full">Loading courses...</p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No courses found.
          </p>
        ) : (
          filteredCourses.slice(0, 4).map((course, idx) => (
            <Card key={idx} className="overflow-hidden">
              <img
                src={course.image || "/images/default-course.jpg"}
                alt={course.title}
                className="h-40 w-full object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-bold">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {course.instructorName || "Instructor"}
                </p>
                <div className="flex items-center text-yellow-500 text-sm mb-2">
                  {"★".repeat(4)}{"☆".repeat(1)}
                </div>
                <p className="text-blue-600 font-bold">
                  {course.price ? `$${course.price}` : "Free"}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </section>

      {/* Show All Button */}
      <div className="flex justify-center mb-12">
        <Link to="/student/available-courses">
          <Button variant="outline" className="rounded-full">
            Show all courses
          </Button>
        </Link>
      </div>

      {/* Testimonials */}
      <section className="bg-gray-50 py-12 px-4">
        <h2 className="text-center text-3xl font-bold mb-8">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              name: "Donald Jackman",
              title: "SWE 1 @ Amazon",
              rating: 5,
              text: "I've been using Edemy for two years. It's incredibly user-friendly, making my work much easier.",
              img: "/images/sayad.jpeg",
            },
            {
              name: "Richard Nelson",
              title: "SWE 2 @ Samsung",
              rating: 4,
              text: "Interactive courses, great instructors, and a clean UI — love the experience.",
              img: "/images/azam.jpeg",
            },
            {
              name: "Kammu Washington",
              title: "SWE 2 @ Rupa UnderGarments",
              rating: 1,
              text: "User-friendly interface and high-quality content. It’s my go-to for learning.",
              img: "/images/arhan.jpeg",
            },
          ].map((user, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="text-sm text-gray-500">{user.title}</p>
                </div>
              </div>
              <div className="flex text-yellow-500 mb-2">
                {"★".repeat(user.rating)}{"☆".repeat(5 - user.rating)}
              </div>
              <p className="text-gray-700 text-sm">{user.text}</p>
              <Button variant="link" className="px-0 mt-2 text-blue-600">
                Read more
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
