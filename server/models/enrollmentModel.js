import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    status: {
      type: String,
      default: "enrolled", // could also be "completed", "dropped"
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
