const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controllers/uploadController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.array("files", 3), controller.handleUpload);

module.exports = router;