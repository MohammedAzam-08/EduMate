import Message from "../models/messageModel.js";
import Course from "../models/courseModel.js";
import Enrollment from "../models/enrollmentModel.js";

// ✅ Send a new message (Student or Instructor)
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

// ✅ Get all messages for a user (Student or Instructor)
// @route   GET /api/messages/user/:email
export const getMessagesForUser = async (req, res) => {
  try {
    const email = req.params.email;

    const messages = await Message.find({
      $or: [{ senderName: email }, { recipientName: email }]
    }).sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
};

// ✅ Get all messages for a specific course
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

// ✅ Get all enrolled students for an instructor
// @route   GET /api/messages/enrolled-students/:instructorId
export const getEnrolledStudentsForInstructor = async (req, res) => {
  try {
    const instructorId = req.params.instructorId;

    if (!instructorId) {
      return res.status(400).json({ message: "Instructor ID is required" });
    }

    const courses = await Course.find({ "instructor.id": instructorId }).lean();
    const courseIds = courses.map(course => course._id);

    const enrollments = await Enrollment.find({ course: { $in: courseIds } }).populate("student");

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

// ✅ Get all enrolled instructors for a student
// @route   GET /api/messages/enrolled-instructors/:studentId
export const getEnrolledInstructorsForStudent = async (req, res) => {
  try {
    const studentEmail = req.params.studentEmail;

    if (!studentEmail) {
      return res.status(400).json({ message: "Student email is required" });
    }

    const enrollments = await Enrollment.find({ "student.email": studentEmail }).populate("course");

    const instructorMap = new Map();
    for (const enrollment of enrollments) {
      if (enrollment.course && enrollment.course.instructor) {
        const instructor = enrollment.course.instructor;
        if (instructor.name && instructor.id) {
          instructorMap.set(instructor.id, {
            email: instructor.id,
            name: instructor.name
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
