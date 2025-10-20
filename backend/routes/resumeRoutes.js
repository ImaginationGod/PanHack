import express from "express";
import multer from "multer";
import { analyzeResume } from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// File upload setup
const upload = multer({ dest: "uploads/" });

// POST /api/resume/analyze
router.post("/analyze", protect, upload.single("resume"), analyzeResume);

export default router;