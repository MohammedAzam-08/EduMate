import mongoose from "mongoose";

// Define sub-schema for instructor
const instructorSchema = new mongoose.Schema(
  {
    id: {
      type: String, // Clerk Auth ID
      required: [true, "Instructor ID is required"],
    },
    name: {
      type: String,
      required: [true, "Instructor name is required"],
    },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    instructor: {
      type: instructorSchema,
      required: true,
    },
    duration: {
      type: String,
      required: [true, "Course duration is required"],
    },
    materials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ["General", "Technology", "Business", "Art", "Science"],
      default: "General",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0, "Payment must be a positive number"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount must be a non-negative number"],
      max: [100, "Discount cannot exceed 100"],
    },
    image: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)?$/i.test(v);
        },
        message: "Image must be a valid URL (http/https) ending with an image extension",
      },
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    enrolledCount: {
      type: Number,
      default: 0,
    },
    videoLink: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          return v === "" || /^https?:\/\/.+/.test(v);
        },
        message: "Video link must be a valid URL starting with http or https",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for discounted price
courseSchema.virtual("discountedPrice").get(function () {
  return this.payment - (this.payment * this.discount) / 100;
});

// Indexes for performance
courseSchema.index({ "instructor.id": 1 });
courseSchema.index({ category: 1 });

const Course = mongoose.model("Course", courseSchema);

export default Course;
