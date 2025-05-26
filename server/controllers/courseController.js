import Course from "../models/courseModel.js";

// ✅ Get all courses (admin/testing)
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().lean();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses", error: error.message });
  }
};

// ✅ Get only published courses (for students)
export const getPublishedCoursesForStudents = async (req, res) => {
  try {
    const search = req.query.search || "";
    const regex = new RegExp(search, "i"); // case-insensitive regex

    const courses = await Course.find({
      published: true,
      title: { $regex: regex },
    });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses", error });
  }
};

// ✅ Get courses by instructor (via Clerk Auth ID or internal ID)
export const getCoursesByInstructor = async (req, res) => {
  try {
    const instructorId = req.params.instructorId;
    if (!instructorId) {
      return res.status(400).json({ message: "Instructor ID is required" });
    }

    const courses = await Course.find({ "instructor.id": instructorId }).lean();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch instructor's courses", error: error.message });
  }
};

// ✅ Get single course by ID (with materials populated)
export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(courseId).populate("materials").lean();
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to get course", error: error.message });
  }
};

// controllers/courseController.js


// ✅ Create a new course
export const createCourse = async (req, res) => {
  try {
     console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const {
      title,
      description,
      duration,
      materials,
      tags,
      isPublished,
      payment,
      discount,
    } = req.body;

    // Parse instructor from nested form fields
    const instructor = req.body.instructor || {};

    // Basic validation
    if (!title || !description || !instructor.id || !instructor.name || !payment) {
      return res.status(400).json({ message: "Title, description, instructor id and name, and payment are required" });
    }

    // Handle image file path if uploaded
    let image = "";
    if (req.file) {
      const baseURL = process.env.BASE_URL || `http://${req.headers.host}`;
      image = `${baseURL}/uploads/${req.file.filename}`;
    }

    // Parse tags if sent as JSON string
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = JSON.parse(tags);
      } catch {
        parsedTags = [];
      }
    }

    const newCourse = new Course({
      title,
      description,
      instructor,
      duration,
      materials,
      tags: parsedTags,
      isPublished: Boolean(isPublished),
      payment,
      discount,
      image,
      videoLink: req.body.videoLink || "",
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error("Error in createCourse:", error.stack);
    res.status(500).json({ message: "Failed to create course", error: error.message });
  }
};

// ✅ Update an existing course
export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updateData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Failed to update course", error: error.message });
  }
};

// ✅ Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course", error: error.message });
  }
};
