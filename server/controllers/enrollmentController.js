import Enrollment from "../models/enrollmentModel.js";
import Course from "../models/courseModel.js";

// Create a new enrollment
export const createEnrollment = async (req, res) => {
  try {
    const { student, course } = req.body;

    // Validate course existence
    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Prevent duplicate enrollment
    const alreadyEnrolled = await Enrollment.findOne({
      "student.email": student.email,
      course,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Student already enrolled in this course" });
    }

    const newEnrollment = new Enrollment({ student, course });
    const saved = await newEnrollment.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Enrollment failed", error: error.message });
  }
};

// Get all enrollments (admin/debug)
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate("course");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrollments", error: error.message });
  }
};

// Get all enrollments for a specific course (Instructor)
export const getEnrollmentsByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const enrollments = await Enrollment.find({ course: courseId }).populate("course");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course enrollments", error: error.message });
  }
};

// Get all enrollments for a specific student (Student)
export const getEnrollmentsByStudent = async (req, res) => {
  try {
    const studentEmail = req.params.email;
    const enrollments = await Enrollment.find({ "student.email": studentEmail }).populate("course");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student enrollments", error: error.message });
  }
};

// Delete an enrollment (Unenroll)
export const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }
    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete enrollment", error: error.message });
  }
};
