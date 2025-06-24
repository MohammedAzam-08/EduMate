import React, { useState } from "react";
import { motion } from "framer-motion";
<<<<<<< HEAD

const ProfileSettings = () => {
=======
import { useNavigate } from "react-router-dom";
import InstructorLayout from "../../components/Instructor/InstructorLayout";

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const ProfileSettings = () => {
  const navigate = useNavigate();

>>>>>>> dcd67e4 (Updated stylings)
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
<<<<<<< HEAD
    // Send the data to the backend here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-16"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-semibold mb-6 text-center text-indigo-600"
      >
        Profile Settings
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="p-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
            />
            <motion.input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="p-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
            />
          </div>
        </motion.div>

        {/* Change Password */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
              className="p-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
            />
            <motion.input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="p-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
            />
            <motion.input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="p-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
            />
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Preferences</h2>
          <label className="flex items-center space-x-3">
            <motion.input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="w-6 h-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              whileTap={{ scale: 1.1 }}
            />
            <span className="text-lg text-gray-800">
              Receive email notifications about course updates
            </span>
          </label>
        </motion.div>

        {/* Submit */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Update Profile
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ProfileSettings;
=======
    // TODO: Send the data to the backend
  };

  return (
    <InstructorLayout>
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-100 py-12 px-4 sm:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Back Button */}
          {/* Back button removed as per request */}

          {/* Heading */}
          <motion.h1
            className="text-4xl font-bold text-indigo-700 mb-10 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Profile Settings
          </motion.h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Personal Info */}
            <motion.div variants={sectionVariant} custom={1}>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </motion.div>

            {/* Change Password */}
            <motion.div variants={sectionVariant} custom={2}>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                Change Password
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Current Password"
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="p-4 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div variants={sectionVariant} custom={3}>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                Preferences
              </h2>
              <label className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                  className="w-6 h-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-800 text-lg">
                  Receive email notifications about course updates
                </span>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-10 py-4 rounded-full shadow-lg hover:bg-indigo-700 transition"
              >
                Update Profile
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </InstructorLayout>
  );
};


export default ProfileSettings;
>>>>>>> dcd67e4 (Updated stylings)
