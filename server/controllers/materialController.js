// controllers/materialController.js
import Material from "../models/materialModel.js"; // ✅ Correct
import Course from "../models/courseModel.js"; // ✅ matches file name exactly
import fs from "fs";
import path from "path";

// Upload material
import mongoose from "mongoose";

export const uploadMaterial = async (req, res) => {
  const { courseId } = req.params;
  const { title, description, uploaderName, uploaderRole } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: "Invalid courseId" });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const newMaterial = new Material({
      title,
      description,
      fileUrl: `/uploads/${req.file.filename}`,
      courseId,
      courseTitle: course.title,
      uploaderName,
      uploaderRole,
      uploadedAt: new Date(),
    });

    await newMaterial.save();
    res.status(201).json({ message: "Material uploaded successfully", material: newMaterial });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during upload" });
  }
};

// Get materials by course
export const getMaterialsByCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const materials = await Material.find({ courseId });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch materials" });
  }
};

// Get materials by student's enrolled courses
export const getMaterialsByStudentCourses = async (req, res) => {
  const { studentEmail } = req.params;

  try {
    const enrolledCourses = await Course.find({ enrolledStudents: studentEmail });
    const courseIds = enrolledCourses.map((course) => course._id);
    const materials = await Material.find({ courseId: { $in: courseIds } });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch materials for student" });
  }
};

// Get materials by student's enrolled courses using studentId
export const getMaterialsByStudentIdCourses = async (req, res) => {
  const { studentId } = req.params;

  try {
    const enrolledCourses = await Course.find({ enrolledStudents: studentId });
    const courseIds = enrolledCourses.map((course) => course._id);
    const materials = await Material.find({ courseId: { $in: courseIds } });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch materials for student by ID" });
  }
};

// Get materials uploaded by an instructor
export const getMaterialsByInstructor = async (req, res) => {
  const { instructorName } = req.params;

  try {
    const instructorCourses = await Course.find({ instructorName });
    const courseIds = instructorCourses.map((course) => course._id);
    const materials = await Material.find({ courseId: { $in: courseIds } });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch instructor materials" });
  }
};
