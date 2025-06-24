import express from "express";
import {
  sendMessage,
  getMessagesForUser,
  getMessagesByCourse,
  getEnrolledStudentsForInstructor,
<<<<<<< HEAD
<<<<<<< HEAD
=======
  getEnrolledInstructorsForStudent,
>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
// 🔸 Get enrolled instructors for a student
router.get("/enrolled-instructors/:studentId", getEnrolledInstructorsForStudent);

>>>>>>> dcd67e4 (Updated stylings)
=======
>>>>>>> 70aafdc5eadd0685073bf38bd0671143f60e1abe
export default router;
