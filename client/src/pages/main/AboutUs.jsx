import React from "react";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-12 text-center">
        <h1 className="text-4xl font-bold">About EduMate</h1>
        <p className="mt-4 text-lg md:text-xl">
          Your trusted partner in Online Course Management
        </p>
      </header>

      {/* Main Section */}
      <main className="flex-grow p-8">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* For Instructors Card */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-4">For Instructors</h2>
            <p>
              Our platform provides instructors with an easy-to-use dashboard to create, manage, and deliver
              engaging courses. Upload study materials, track student progress, and facilitate seamless learning experiences.
            </p>
          </motion.div>

          {/* For Students Card */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-4">For Students</h2>
            <p>
              Students can easily browse, enroll in courses, and access study materials from anywhere at any
              time. Stay updated with progress tracking and receive support from instructors.
            </p>
          </motion.div>

          {/* Our Vision Card */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p>
              Our vision is to make education accessible and convenient for everyone. EduMate empowers both
              instructors and students to manage and enhance the learning journey efficiently.
            </p>
          </motion.div>
        </div>

        {/* Values Section */}
        <section className="mt-12 bg-blue-50 py-12">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-700">Our Core Values</h2>
            <p className="mt-4 text-lg">We are committed to delivering high-quality educational experiences.</p>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Innovation Value */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p>We constantly innovate to provide the best tools and features for modern education.</p>
              </motion.div>

              {/* Accessibility Value */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p>Our platform is designed to be accessible on any device, anytime, anywhere.</p>
              </motion.div>

              {/* User-Centric Value */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-2">User-Centric</h3>
                <p>We prioritize the needs of both instructors and students to create an effective learning environment.</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default AboutUs;
