import express from "express";
import {
  getInstructorCourseAnalytics,
  getStudentProgressAnalytics,
} from "../controllers/analyticsController.js";

const router = express.Router();

// 🔸 Instructor: Get analytics for their courses
router.get("/instructor/:instructorName", getInstructorCourseAnalytics);

// 🔸 Student: Get their own course progress analytics
router.get("/student/:studentEmail", getStudentProgressAnalytics);

export default router;
