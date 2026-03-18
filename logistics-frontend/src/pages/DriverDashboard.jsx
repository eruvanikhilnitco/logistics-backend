import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

export default function DriverDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://logistics-backend-0zah.onrender.com/api/deliveries")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  // ✅ Upload Function (FIXED)
  const handleUpload = async (e) => {
    const files = e.target.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("email", "client@email.com");

    try {
      const res = await axios.post(
        "https://logistics-backend-0zah.onrender.com/api/upload/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(res.data);
      alert("✅ Uploaded → processed via n8n");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Upload failed");
    }
  };

  // ✅ Stats
  const completed = data.filter(d => d.status === "completed").length;
  const pending = data.filter(d => d.status === "pending").length;
  const totalRevenue = data.reduce((acc, d) => acc + d.charges, 0);

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚚 Driver Dashboard</h1>

      {/* Stats */}
      <div style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
        fontWeight: "bold"
      }}>
        <div>📦 Total: {data.length}</div>
        <div>✅ Completed: {completed}</div>
        <div>⏳ Pending: {pending}</div>
        <div>💰 ₹{totalRevenue}</div>
      </div>

      {/* Upload Section */}
      <div style={{
        marginBottom: "30px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "10px"
      }}>
        <h3>📤 Upload Invoice / Receipt</h3>
        <input type="file" multiple onChange={handleUpload} />
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: "40px" }}>

        {/* Pie Chart */}
        <PieChart width={300} height={300}>
          <Pie data={pieData} dataKey="value">
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Bar Chart */}
        <BarChart width={400} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="shipment_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="charges" fill="#3b82f6" />
        </BarChart>

      </div>
    </div>
  );
}