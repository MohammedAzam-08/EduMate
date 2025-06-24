import Course from "../models/courseModel.js";
import Enrollment from "../models/enrollmentModel.js";
import Material from "../models/materialModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// Available Courses
export const getAvailableCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses", error: err.message });
  }
};

// My Enrollments
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.user._id }).populate("courseId");
    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enrollments", error: err.message });
  }
};

// Study Materials (for enrolled courses)
export const getStudyMaterials = async (req, res) => {
  try {
    const enrolledCourses = await Enrollment.find({ studentId: req.user._id }).select("courseId");
    const courseIds = enrolledCourses.map((e) => e.courseId);
    const materials = await Material.find({ course: { $in: courseIds } });
    res.status(200).json(materials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch materials", error: err.message });
  }
};

// Messages (received)
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ receiverId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  const { name, email, notifications } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, notifications },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  try {
    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect current password" });

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to change password", error: err.message });
  }
};
