<<<<<<< HEAD
=======

>>>>>>> dcd67e4 (Updated stylings)
import Message from "../models/messageModel.js";
import Course from "../models/courseModel.js";
import Enrollment from "../models/enrollmentModel.js";

// @desc    Send a new message (Student or Instructor)
// @route   POST /api/messages
export const sendMessage = async (req, res) => {
  try {
    const { senderName, senderRole, recipientName, messageText, courseId } = req.body;

    if (!senderName || !senderRole || !recipientName || !messageText) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = new Message({
      senderName,
      senderRole,
      recipientName,
      messageText,
      courseId, // optional
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
};

// @desc    Get all messages for a user (Student or Instructor)
// @route   GET /api/messages/user/:email
export const getMessagesForUser = async (req, res) => {
  try {
    const email = req.params.email;

    const messages = await Message.find({
      $or: [
        { senderName: email },
        { recipientName: email }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
};

// @desc    Get all messages for a specific course
// @route   GET /api/messages/course/:courseId
export const getMessagesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const messages = await Message.find({ courseId }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages by course", error: error.message });
  }
};

// @desc    Get all enrolled students for an instructor
// @route   GET /api/messages/enrolled-students/:instructorId
export const getEnrolledStudentsForInstructor = async (req, res) => {
  try {
    const instructorId = req.params.instructorId;

    if (!instructorId) {
      return res.status(400).json({ message: "Instructor ID is required" });
    }

    // Get courses by instructor
    const courses = await Course.find({ "instructor.id": instructorId }).lean();
    const courseIds = courses.map(course => course._id);

    // Get enrollments for these courses
    const enrollments = await Enrollment.find({ course: { $in: courseIds } }).populate("student");

    // Aggregate unique students
    const studentMap = new Map();
    enrollments.forEach(enrollment => {
      if (enrollment.student && enrollment.student.email) {
        studentMap.set(enrollment.student.email, {
          email: enrollment.student.email,
          name: enrollment.student.name || enrollment.student.email
        });
      }
    });

    const students = Array.from(studentMap.values());

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrolled students", error: error.message });
  }
};
<<<<<<< HEAD
=======

// @desc    Get all enrolled instructors for a student
// @route   GET /api/messages/enrolled-instructors/:studentId
export const getEnrolledInstructorsForStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // Get enrollments for the student
    const enrollments = await Enrollment.find({ student: studentId }).populate({
      path: "course",
      populate: {
        path: "instructor.id",
        model: "User"
      }
    });

    // Aggregate unique instructors
    const instructorMap = new Map();
    for (const enrollment of enrollments) {
      if (enrollment.course && enrollment.course.instructor) {
        const instructor = enrollment.course.instructor;
        if (instructor.id && instructor.id.email) {
          instructorMap.set(instructor.id.email, {
            email: instructor.id.email,
            name: instructor.id.name || instructor.id.email
          });
        }
      }
    }

    const instructors = Array.from(instructorMap.values());

    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrolled instructors", error: error.message });
  }
};
>>>>>>> dcd67e4 (Updated stylings)
