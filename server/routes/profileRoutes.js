import express from "express";
import { updateProfile, changePassword } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js"; // make sure this file uses export

const router = express.Router();

router.put("/update", protect, updateProfile);
router.put("/change-password", protect, changePassword);

export default router;
