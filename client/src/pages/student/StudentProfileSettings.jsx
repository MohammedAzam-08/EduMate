import React, { useEffect, useState } from "react";
import axios from "axios";
import { LockIcon, MailIcon } from "lucide-react";
import { motion } from "framer-motion";

const StudentProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    preferences: { darkMode: false },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-8">
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Profile Settings
      </motion.h1>

      <div className="flex flex-col md:flex-row max-w-5xl mx-auto gap-10">

        {/* Settings Main */}
        <motion.main
          className="flex-1 space-y-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* Email Section */}
          <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-gray-700 flex items-center gap-3 mb-5">
              <MailIcon className="w-6 h-6 text-indigo-500" />
              Update Email
            </h2>
            <label className="block text-sm text-gray-600 mb-2">Your email address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </section>

          {/* Password Section */}
          <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-gray-700 flex items-center gap-3 mb-5">
              <LockIcon className="w-6 h-6 text-indigo-500" />
              Change Password
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-2">New password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                  value={profile.password}
                  onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Confirm new password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                onClick={handleUpdate}
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition"
              >
                Update Profile
              </button>
            </div>
          </section>

        </motion.main>
      </div>
    </div>
  );
};

export default StudentProfileSettings;
