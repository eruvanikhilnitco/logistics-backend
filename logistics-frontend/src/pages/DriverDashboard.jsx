import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b"];

export default function DriverDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email"); // ✅ from login

    axios.get(
      "https://logistics-backend-0zah.onrender.com/api/deliveries",
      {
        params: {
          email: email,
          role: "driver"
        }
      }
    )
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleUpload = async (e) => {
    const files = e.target.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const email = localStorage.getItem("email"); // ✅ dynamic

    formData.append("email", email);

    try {
      await axios.post(
        "https://logistics-backend-0zah.onrender.com/api/upload/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("✅ Uploaded → processed via n8n");
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    }
  };

  const completed = data.filter(d => d.status === "completed").length;
  const pending = data.filter(d => d.status === "pending").length;
  const totalRevenue = data.reduce((acc, d) => acc + d.charges, 0);

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending }
  ];

  const Card = ({ title, value }) => (
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#111827",
        color: "white",
        padding: "20px"
      }}>
        <h2>🚚 AutoLogix</h2>
        <p>Dashboard</p>
        <p>Upload</p>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "30px", background: "#f3f4f6" }}>

        <h1>Driver Dashboard</h1>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px"
        }}>
          <Card title="Total" value={data.length} />
          <Card title="Completed" value={completed} />
          <Card title="Pending" value={pending} />
          <Card title="Revenue" value={`₹${totalRevenue}`} />
        </div>

        {/* Upload */}
        <div style={{
          marginTop: "20px",
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}>
          <h3>📤 Upload Invoice / Receipt</h3>
          <input type="file" multiple onChange={handleUpload} />
        </div>

        {/* Charts */}
        <div style={{ display: "flex", gap: "40px", marginTop: "30px" }}>

          {/* Pie */}
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px"
          }}>
            <PieChart width={300} height={300}>
              <Pie data={pieData} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* Bar */}
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px"
          }}>
            <BarChart width={400} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="shipment_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="charges" fill="#3b82f6" />
            </BarChart>
          </div>

        </div>

      </div>
    </div>
  );
}