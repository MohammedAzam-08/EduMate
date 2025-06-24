// models/analyticsModel.js
import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    instructor: {
      type: String, // Instructor name or ID
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    stats: {
      totalCourses: Number,
      totalEnrollments: Number,
      totalMaterials: Number,
      totalMessages: Number,
    },
  },
  { timestamps: true }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);
export default Analytics;
