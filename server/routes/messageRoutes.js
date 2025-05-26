import express from "express";
import {
  sendMessage,
  getMessagesForUser,
  getMessagesByCourse,
  getEnrolledStudentsForInstructor,
} from "../controllers/messageController.js";

const router = express.Router();

// 🔸 Send a message
router.post("/", sendMessage);

// 🔸 Get messages for a user (by email)
router.get("/user/:email", getMessagesForUser);

// 🔸 Get messages for a course
router.get("/course/:courseId", getMessagesByCourse);

// 🔸 Get enrolled students for an instructor
router.get("/enrolled-students/:instructorId", getEnrolledStudentsForInstructor);

export default router;
