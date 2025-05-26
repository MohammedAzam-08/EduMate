import Course from "../models/courseModel.js";
import Enrollment from "../models/enrollmentModel.js";
import Material from "../models/materialModel.js";

// @desc    Get analytics for an instructor
// @route   GET /api/analytics/instructor/:instructorName
export const getInstructorCourseAnalytics = async (req, res) => {
  const { instructorName } = req.params;

  try {
    // 1. Get all courses by instructor
    const courses = await Course.find({ "instructor.name": instructorName });
    const courseIds = courses.map(course => course._id);

    // 2. Get total enrollments for these courses
    const enrollmentCount = await Enrollment.countDocuments({ course: { $in: courseIds } });

    // 3. Get total materials uploaded by instructor
    const materialCount = await Material.countDocuments({ uploadedBy: instructorName });

    // 4. Placeholder for messages if you implement them
    const messageCount = 0;

    res.status(200).json({
      totalCourses: courses.length,
      totalEnrollments: enrollmentCount,
      totalMaterials: materialCount,
      totalMessages: messageCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch instructor analytics", error: error.message });
  }
};

// @desc    Get analytics for a student's progress
// @route   GET /api/analytics/student/:studentEmail
export const getStudentProgressAnalytics = async (req, res) => {
  const { studentEmail } = req.params;

  try {
    const enrollments = await Enrollment.find({ "student.email": studentEmail }).populate("course");

    const totalCourses = enrollments.length;
    const completedCourses = enrollments.filter(e => e.status === "completed").length;
    const inProgressCourses = enrollments.filter(e => e.status === "enrolled").length;
    const droppedCourses = enrollments.filter(e => e.status === "dropped").length;

    res.status(200).json({
      totalCourses,
      completedCourses,
      inProgressCourses,
      droppedCourses,
      enrolledCourses: enrollments.map(e => ({
        courseTitle: e.course.title,
        status: e.status,
        enrolledOn: e.enrollmentDate,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student analytics", error: error.message });
  }
};
