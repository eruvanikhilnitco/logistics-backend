import express from "express";
import multer from "multer";
import controller from "../controllers/uploadController.js";

const router = express.Router();

// ✅ memory storage required for base64
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ route
router.post("/upload", upload.array("files"), controller.handleUpload);

export default router;