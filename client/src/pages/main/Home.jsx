import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Welcome to EduMate</h1>
          <p className="mt-4 text-lg md:text-xl">Your all-in-one Online Course Management System</p>
          <div className="mt-8">
            <Link
<<<<<<< HEAD
              to="/courses"
=======
              to="/sign-in"
>>>>>>> dcd67e4 (Updated stylings)
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-50 transition"
            >
              Explore Courses
            </Link>
          </div>
        </header>

        {/* Features Section */}
        <main className="flex-grow p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2">Create Courses</h2>
              <p>Create and manage your courses with easy-to-use tools for instructors.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2">Enroll Students</h2>
              <p>Let students enroll, track their progress and access study materials smoothly.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2">Accessible Anytime</h2>
              <p>Use the platform on any device, anytime. No limits on your learning journey!</p>
            </div>
          </div>
        </main>

        {/* Include Footer Component */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
