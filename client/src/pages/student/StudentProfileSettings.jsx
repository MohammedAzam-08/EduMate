import React, { useEffect, useState } from "react";
import axios from "axios";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../components/Student/StudentLayout";

const StudentProfileSettings = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    preferences: { emailNotifications: false },
  });

  const [loading, setLoading] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile/student")
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  const handleUpdate = () => {
    if (profile.password && profile.password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    axios
      .put("http://localhost:5000/api/profile/student", profile)
      .then(() => {
        alert("Profile updated successfully.");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Failed to update profile.");
      });
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 text-lg">Loading Profile Settings...</div>
    );
  }

  return (
    <StudentLayout>
      <div className="bg-white mx-6 md:mx-auto max-w-4xl shadow-xl rounded-2xl p-8 mb-12">
        <motion.h1
          className="text-3xl font-extrabold text-center text-indigo-700 mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Profile Settings
        </motion.h1>

        {/* Personal Info */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-indigo-700 mb-3">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
        </section>

        {/* Password */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-indigo-700 mb-3">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={profile.password}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </section>

        {/* Preferences */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-indigo-700 mb-3">Preferences</h2>
          <label className="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={profile.preferences.emailNotifications}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences,
                    emailNotifications: e.target.checked,
                  },
                })
              }
              className="w-5 h-5 accent-indigo-600"
            />
            Receive email notifications about course updates
          </label>
        </section>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleUpdate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold px-10 py-3 rounded-full shadow-md transition"
          >
            Update Profile
          </button>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentProfileSettings;
