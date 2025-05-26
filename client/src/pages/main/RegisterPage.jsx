import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70 },
  },
};

export default function RegisterPage() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !mobile || !email || !password) {
      setError("All fields are required.");
      setSuccessMessage("");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      setSuccessMessage("");
      return;
    }

    try {
      setError("");
      setSubmitted(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          mobile,
          email,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      // Show success message before redirect
      setSuccessMessage("Registration successful! Redirecting...");
      setSubmitted(false);

      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
      setSubmitted(false);
    }
  };

  return (
    <motion.div
      className="w-screen min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-12 text-center"
        variants={itemVariants}
      >
        <motion.h1 className="text-4xl font-bold" variants={itemVariants}>
          Join Our Learning Platform!
        </motion.h1>
        <motion.p className="mt-4 text-lg md:text-xl" variants={itemVariants}>
          Create an account and unlock your potential.
        </motion.p>
      </motion.header>

      <main className="flex-grow flex items-center justify-center px-4 py-8 overflow-hidden">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 h-full">
          {/* Left Image Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 relative overflow-hidden rounded-xl shadow-lg h-full"
          >
            <div className="z-10 max-w-lg text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                Achieve More with Expert Educators
              </h1>
              <p className="text-lg text-blue-100">
                Join <span className="font-bold">10+ crore</span> learners. Prepare smart. Learn better.
              </p>
            </div>
            <img
              src="/images/education-bg.jpg"
              alt="Education"
              className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
            />
          </motion.div>

          {/* Right Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-xl shadow-lg w-full flex items-center justify-center"
          >
            <div className="w-full max-w-md space-y-6">
              {/* Title */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
                <p className="text-sm text-gray-500 mt-2">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/sign-in")}
                    className="text-blue-600 font-medium cursor-pointer hover:underline"
                  >
                    Log in
                  </span>
                </p>
              </div>

              {/* Role Selection */}
              <div className="flex gap-3">
                <button
                  onClick={() => setRole("student")}
                  className={`w-1/2 py-2 rounded-md font-semibold border transition ${role === "student"
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:border-blue-400"
                    }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setRole("instructor")}
                  className={`w-1/2 py-2 rounded-md font-semibold border transition ${role === "instructor"
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:border-blue-400"
                    }`}
                >
                  Instructor
                </button>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                    setSuccessMessage("");
                  }}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Mobile Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Mobile Number</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    setError("");
                    setSuccessMessage("");
                  }}
                  placeholder="Enter your mobile number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setSuccessMessage("");
                  }}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                    setSuccessMessage("");
                  }}
                  placeholder="Enter a secure password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Error & Success Messages */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm text-red-500"
                  >
                    {error}
                  </motion.p>
                )}
                {successMessage && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm text-green-600"
                  >
                    {successMessage}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-200 shadow-sm"
                >
                  Register
                </button>
              </div>

              {/* Divider
              <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
                <hr className="flex-1 border-gray-300" />
                Other log in options
                <hr className="flex-1 border-gray-300" />
              </div> */}

              {/* Social Buttons */}
              {/* <div className="flex justify-center gap-4">
                <button className="border px-4 py-2 rounded hover:bg-gray-50">
                  <img src="/images/google.jpg" alt="Google" className="w-5 h-5" />
                </button>
                <button className="border px-4 py-2 rounded hover:bg-gray-50">
                  <img src="/images/facebook.jpg" alt="Facebook" className="w-5 h-5" />
                </button>
                <button className="border px-4 py-2 rounded hover:bg-gray-50">
                  <img src="/images/apple.png" alt="Apple" className="w-5 h-5" />
                </button>
              </div> */}

              {/* Help Center */}
              <p className="text-xs text-center text-gray-400 mt-6">
                Need help?{" "}
                <span
                  onClick={() => navigate("/contact")}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Visit Help Center
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
