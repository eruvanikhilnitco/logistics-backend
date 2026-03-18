import express from "express";
import multer from "multer";
import controller from "../controllers/uploadController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.array("files", 3), controller.handleUpload);

export default router;