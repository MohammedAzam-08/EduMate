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

    // 4. Placeholder for total messages (if implemented)
    const messageCount = 0;

    // 5. Enrollments per course
    const enrollmentsPerCourse = await Enrollment.aggregate([
      { $match: { course: { $in: courseIds } } },
      { $group: { _id: "$course", count: { $sum: 1 } } }
    ]);

    // 6. Materials per course
    const materialsPerCourse = await Material.aggregate([
      { $match: { course: { $in: courseIds } } },
      { $group: { _id: "$course", count: { $sum: 1 } } }
    ]);

    // Mapping counts for quick lookup
    const enrollmentsMap = {};
    enrollmentsPerCourse.forEach(e => {
      enrollmentsMap[e._id.toString()] = e.count;
    });

    const materialsMap = {};
    materialsPerCourse.forEach(m => {
      materialsMap[m._id.toString()] = m.count;
    });

    // 7. Prepare overview data
    const courseOverview = courses.map(course => ({
      name: course.title,
      students: enrollmentsMap[course._id.toString()] || 0,
      materials: materialsMap[course._id.toString()] || 0,
    }));

    // 8. Placeholder for weekly activity (replace with real data later)
    const weeklyActivity = [
      { day: "Mon", messages: 0, views: 0 },
      { day: "Tue", messages: 0, views: 0 },
      { day: "Wed", messages: 0, views: 0 },
      { day: "Thu", messages: 0, views: 0 },
      { day: "Fri", messages: 0, views: 0 },
    ];

    res.status(200).json({
      totalCourses: courses.length,
      totalEnrollments: enrollmentCount,
      totalMaterials: materialCount,
      totalMessages: messageCount,
      courseOverview,
      weeklyActivity,
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
