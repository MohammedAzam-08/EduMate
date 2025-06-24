import express from "express";
import upload from "../utils/fileUpload.js";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesByInstructor,
  getPublishedCoursesForStudents,
} from "../controllers/courseController.js";

// Optional: import middleware for auth/protection if needed
// import { protect, isInstructor, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Get all courses (Admin/testing purpose)
// @route   GET /api/courses
router.get("/", getAllCourses);

// @desc    Get only published courses (for students)
// @route   GET /api/courses/available
router.get("/available", getPublishedCoursesForStudents);

// @desc    Get courses by instructor ID
// @route   GET /api/courses/instructor/:instructorId
router.get("/instructor/:instructorId", getCoursesByInstructor);

// @desc    Get a single course by course ID
// @route   GET /api/courses/:id
router.get("/:id", getCourseById);

// @desc    Create a new course
// @route   POST /api/courses
<<<<<<< HEAD
router.post("/", upload.single("image"), createCourse); // Optionally add: protect, isInstructor
=======
import multer from "multer";

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === "Unsupported file type") {
    return res.status(400).json({ message: err.message });
  }
  next(err);
};

router.post("/", upload.single("image"), multerErrorHandler, createCourse); // Optionally add: protect, isInstructor
>>>>>>> dcd67e4 (Updated stylings)

// @desc    Update a course
// @route   PUT /api/courses/:id
router.put("/:id", updateCourse); // Optionally add: protect, isInstructor

// @desc    Delete a course
// @route   DELETE /api/courses/:id
router.delete("/:id", deleteCourse); // Optionally add: protect, isInstructor or isAdmin

export default router;
