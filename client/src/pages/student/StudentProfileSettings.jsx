import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
import { LockIcon, MailIcon } from "lucide-react";
import { motion } from "framer-motion";

const StudentProfileSettings = () => {
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StudentLayout from "../../components/Student/StudentLayout";

const StudentProfileSettings = () => {
  const navigate = useNavigate();
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
<<<<<<< HEAD
<<<<<<< HEAD
    preferences: { darkMode: false },
=======
    preferences: { emailNotifications: false },
>>>>>>> dcd67e4 (Updated stylings)
=======
    preferences: { darkMode: false },
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
  const handleBack = () => {
    navigate(-1);
  };

>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 text-lg">Loading Profile Settings...</div>
    );
  }

  return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
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
<<<<<<< HEAD
=======
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
              placeholder="Current Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
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
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
  );
};

export default StudentProfileSettings;
