// server.js or index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";


// Load env variables early
dotenv.config();

// ES Module __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
const app = express();
const PORT = process.env.PORT || 5000;

// 🔧 Update this to match your frontend dev URL
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Connect to MongoDB
import connectDB from "./config/db.js";
mongoose.set("strictQuery", true);
connectDB();

  
// Middleware
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));
// Apply CORS globally before other middleware and routes
// Removed duplicate import and usage of cors middleware

app.use(express.json({ limit: "10kb" }));
app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

  
// Static files (e.g., uploaded study materials)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);


// Route to serve files with Content-Disposition attachment for download
app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("File not found");
    }
  });
});


// Routes
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/student", studentRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🎓 EduMate API is running...");
});

// 404 handler
app.use((req, res, next) => {
  console.warn(`🔍 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
import errorHandler from "./middleware/errorHandler.js";
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
