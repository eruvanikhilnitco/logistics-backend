const axios = require("axios");

exports.handleUpload = async (req, res) => {
  try {
    const files = req.files;
    const { email } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const formattedFiles = files.map(file => ({
      name: file.originalname,
      data: file.buffer.toString("base64"),
      mimeType: file.mimetype
    }));

    const response = await axios.post(process.env.N8N_WEBHOOK_URL, {
      files: formattedFiles,
      email: email
    });

    res.json({
      message: "Files sent to n8n",
      n8n_response: response.data
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }
};