import axios from "axios";

const handleUpload = async (req, res) => {
  try {
    console.log("BODY:", req.body); // debug

    const files = req.files;

    // 🔥 FIX: extract correctly
    const driver_email =
      req.body.driver_email ||
      req.body["driver_email"] ||
      req.body.email; // fallback

    console.log("DRIVER EMAIL:", driver_email); // 🔥 MUST PRINT

    if (!driver_email) {
      return res.status(400).json({ error: "driver_email missing" });
    }

    const formattedFiles = files.map(file => ({
      name: file.originalname,
      data: file.buffer.toString("base64"),
      mimeType: file.mimetype
    }));

    // ✅ SEND TO N8N (CONFIRMED)
    const response = await axios.post(process.env.N8N_WEBHOOK_URL, {
      driver_email,  // 🔥 MUST APPEAR IN N8N
      files: formattedFiles
    });

    res.json({
      message: "Sent to n8n",
      driver_email
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};

export default { handleUpload };