import axios from "axios";
import { useState } from "react";

export default function UploadForm() {
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();

    for (let file of files) {
      formData.append("files", file);
    }

    formData.append("email", email);

    await axios.post(
      "https://your-backend.onrender.com/api/upload",
      formData
    );

    alert("Uploaded successfully!");
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-bold mb-3">Upload Delivery Files</h2>

      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        className="mb-2"
      />

      <input
        placeholder="Client Email"
        className="border p-2 mr-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}