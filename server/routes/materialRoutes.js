// routes/materialRoutes.js
import express from "express";
import {
  uploadMaterial,
  getMaterialsByCourse,
  getMaterialsByStudentCourses,
  getMaterialsByStudentIdCourses,
  getMaterialsByInstructor,
} from "../controllers/materialController.js";

import upload from "../utils/fileUpload.js";

const router = express.Router();

router.post("/:courseId/upload", upload.single("file"), uploadMaterial);
router.get("/course/:courseId", getMaterialsByCourse);
router.get("/student/:studentEmail", getMaterialsByStudentCourses);
router.get("/student/id/:studentId", getMaterialsByStudentIdCourses);
router.get("/instructor/:instructorName", getMaterialsByInstructor);

export default router;
