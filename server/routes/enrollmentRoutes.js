// routes/enrollmentRoutes.js
import express from "express";
import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentsByCourse,
  getEnrollmentsByStudent,
  deleteEnrollment,
} from "../controllers/enrollmentController.js";

const router = express.Router();

// POST /api/enrollments
router.post("/", createEnrollment);

// GET /api/enrollments
router.get("/", getAllEnrollments);

// GET /api/enrollments/course/:courseId
router.get("/course/:courseId", getEnrollmentsByCourse);

// GET /api/enrollments/student/:email
router.get("/student/:email", getEnrollmentsByStudent);

// DELETE /api/enrollments/:id
router.delete("/:id", deleteEnrollment);

export default router;
