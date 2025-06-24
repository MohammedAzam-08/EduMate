import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { motion } from "framer-motion";
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent } from "../../components/ui/card.jsx";
import { Input } from "../../components/ui/input.jsx";

<<<<<<< HEAD
<<<<<<< HEAD
=======
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 1) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: -120 },
  visible: (i = 1) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const bounceIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i = 1) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1 * i,
      type: "spring",
      stiffness: 120,
    },
  }),
};

>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
export default function LandingPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses/available")
      .then((res) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
        console.log("Courses fetched:", res.data);  // Added for debugging image URLs
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
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
<<<<<<< HEAD
=======
  const testimonials = [
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
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-cyan-50 to-white font-sans"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <motion.nav
        className="flex items-center justify-between bg-white shadow-lg py-4 px-10 border-b border-gray-200 rounded-b-2xl backdrop-blur-md"
        variants={slideIn}
        custom={1}
      >
        <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
          <motion.img
            src="/images/logo.jpg"
            alt="Logo"
            className="w-16 h-16 rounded-full shadow-lg"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <span className="text-4xl font-extrabold text-green-700 tracking-tight">EduMate</span>
        </motion.div>
        <motion.div className="flex items-center space-x-6">
          <Link to="/sign-in">
            <Button variant="outline" className="px-6 py-2 text-sm rounded-full border-2 border-gray-400 hover:border-blue-500 transition duration-300">
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
              Log in
            </Button>
          </Link>
          <Link to="/sign-up">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
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
<<<<<<< HEAD
=======
            <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6 py-2 text-sm rounded-full shadow-xl">
              Join for free
            </Button>
          </Link>
        </motion.div>
      </motion.nav>

      <motion.header className="text-center py-24 px-4 bg-gradient-to-b from-white to-blue-50" variants={fadeInUp} custom={2}>
        <motion.h2 className="text-6xl font-extrabold mb-6 leading-tight text-gray-800 tracking-tight">
          Empower your future with <br />
          courses designed to {" "}
          <motion.span
            className="text-blue-700 underline underline-offset-8 decoration-wavy decoration-2"
            whileHover={{ scale: 1.05 }}
          >
            fit your choice.
          </motion.span>
        </motion.h2>
        <motion.p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
          World-class instructors. Interactive content. Supportive community.
        </motion.p>

        <motion.div
          className="flex justify-center gap-3 max-w-xl mx-auto"
          variants={bounceIn}
          custom={3}
        >
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
          <Input
            placeholder="Search for courses"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
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
<<<<<<< HEAD
=======
            className="rounded-full px-6 py-4 border-2 border-blue-400 shadow-xl w-full"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 py-4 text-lg font-semibold shadow-lg">
            Search
          </Button>
        </motion.div>
      </motion.header>

      <section className="px-10 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {loading ? (
          <p className="text-center col-span-full">Loading courses...</p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">No courses found.</p>
        ) : (
          filteredCourses.slice(0, 4).map((course, idx) => (
            <motion.div
              key={idx}
              variants={bounceIn}
              custom={idx + 4}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={course.image || "/images/default-course.jpg"}
                alt={course.title}
                className="h-48 w-full object-cover rounded-t-3xl"
              />
              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{course.instructorName || "Instructor"}</p>
                <div className="flex items-center text-yellow-500 text-base mb-2">
                  {"★".repeat(4)}{"☆".repeat(1)}
                </div>
                <p className="text-blue-600 font-bold text-lg">
                  {course.price ? `$${course.price}` : "Free"}
                </p>
              </CardContent>
            </motion.div>
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
          ))
        )}
      </section>

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
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
<<<<<<< HEAD
=======
      <motion.div className="flex justify-center mb-20" variants={fadeInUp} custom={8}>
        <Link to="/sign-in">
          <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-full shadow-md">
            Show all courses
          </Button>
        </Link>
      </motion.div>

      <section className="bg-gradient-to-t from-indigo-50 to-white py-20 px-6">
        <h2 className="text-center text-5xl font-bold mb-14 text-gray-800">
          What Our Learners Say
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {testimonials.map((user, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              custom={idx + 9}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition duration-300"
            >
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={user.img}
                  alt={user.name}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
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
<<<<<<< HEAD
=======
                  className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">{user.name}</h4>
                  <p className="text-sm text-gray-500">{user.title}</p>
                </div>
              </div>
              <div className="flex text-yellow-500 mb-3 text-lg">
                {"★".repeat(user.rating)}{"☆".repeat(5 - user.rating)}
              </div>
              <p className="text-gray-700 text-base italic">“{user.text}”</p>
              <Button variant="link" className="px-0 mt-4 text-blue-600 font-medium">
                Read more
              </Button>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  );
}
