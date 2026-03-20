import axios from "axios";

const handleUpload = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔥 DEBUG (must show driver_email)

    const files = req.files;
    const driver_email = req.body.driver_email; // ✅ ensure correct key

    if (!driver_email) {
      return res.status(400).json({ error: "driver_email missing" });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const formattedFiles = files.map(file => ({
      name: file.originalname,
      data: file.buffer.toString("base64"),
      mimeType: file.mimetype
    }));

    // ✅ SEND TO N8N
    const response = await axios.post(process.env.N8N_WEBHOOK_URL, {
      driver_email,   // 🔥 important
      files: formattedFiles
    });

    res.json({
      message: "Files sent to n8n",
      driver_email, // debug response
      n8n_response: response.data
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

export default { handleUpload };