import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getAvailableCourses,
  getMyEnrollments,
  getStudyMaterials,
  getMessages,
  updateProfile,
  changePassword
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/available-courses", protect, getAvailableCourses);
router.get("/my-enrollments", protect, getMyEnrollments);
router.get("/materials", protect, getStudyMaterials);
router.get("/messages", protect, getMessages);
router.put("/profile/update", protect, updateProfile);
router.put("/profile/change-password", protect, changePassword);

export default router;
