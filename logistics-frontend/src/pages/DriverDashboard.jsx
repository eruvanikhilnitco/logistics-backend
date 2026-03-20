import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

const COLORS = ["#22C55E", "#F59E0B"];

export default function DriverDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");

    axios.get(
      "https://logistics-backend-0zah.onrender.com/api/deliveries",
      {
        params: { email, role: "driver" }
      }
    )
      .then(res => setData(res.data))
      .catch(console.log);
  }, []);

  const handleUpload = async (e) => {
    const files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const email = localStorage.getItem("email");
    formData.append("email", email);

    try {
      await axios.post(
        "https://logistics-backend-0zah.onrender.com/api/upload/upload",
        formData
      );
      alert("✅ Uploaded");
    } catch {
      alert("❌ Upload failed");
    }
  };

  const completed = data.filter(d => d.status === "completed").length;
  const pending = data.filter(d => d.status === "pending").length;
  const revenue = data.reduce((a, b) => a + b.charges, 0);

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending }
  ];

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">

      {/* 🔥 Sidebar */}
      <div className="w-64 sidebar p-6">
        <h2 className="text-xl font-bold text-indigo-400 mb-6">
          AutoLogix 🚚
        </h2>

        <div className="space-y-3 text-slate-400">
          <p className="hover:text-white cursor-pointer">Dashboard</p>
          <p className="hover:text-white cursor-pointer">Upload</p>
          <p className="hover:text-white cursor-pointer">History</p>
        </div>
      </div>

      {/* 🔥 Main */}
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Driver Dashboard
        </h1>

        {/* 🔥 Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="card">
            <p className="subtext">Total</p>
            <h2 className="text-2xl">{data.length}</h2>
          </div>

          <div className="card">
            <p className="subtext">Completed</p>
            <h2 className="text-2xl text-green-400">{completed}</h2>
          </div>

          <div className="card">
            <p className="subtext">Pending</p>
            <h2 className="text-2xl text-yellow-400">{pending}</h2>
          </div>

          <div className="card">
            <p className="subtext">Revenue</p>
            <h2 className="text-2xl text-indigo-400">₹{revenue}</h2>
          </div>

        </div>

        {/* 🔥 Upload */}
        <div className="section mb-8">
          <h3 className="mb-3 font-semibold">Upload Documents</h3>
          <input
            type="file"
            multiple
            onChange={handleUpload}
            className="text-sm"
          />
        </div>

        {/* 🔥 Charts */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="card flex justify-center">
            <PieChart width={300} height={300}>
              <Pie data={pieData} dataKey="value">
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="card">
            <BarChart width={400} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="shipment_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="charges" fill="#4F46E5" />
            </BarChart>
          </div>

        </div>

      </div>
    </div>
  );
}