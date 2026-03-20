import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

const COLORS = ["#22C55E", "#F59E0B"];

export default function DriverDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");

    axios.get(
      "https://logistics-backend-0zah.onrender.com/api/deliveries",
      {
        params: { email, role: "driver" }
      }
    )
      .then(res => setData(res.data))
      .catch(() => toast.error("Failed to load data"))
      .finally(() => setLoading(false));
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
      setUploading(true);

      await axios.post(
        "https://logistics-backend-0zah.onrender.com/api/upload/upload",
        formData
      );

      toast.success("Uploaded successfully 🚀");
    } catch {
      toast.error("Upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  const completed = data.filter(d => d.status === "completed").length;
  const pending = data.filter(d => d.status === "pending").length;
  const revenue = data.reduce((a, b) => a + b.charges, 0);

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending }
  ];

  // ✅ LOADING SCREEN
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">

      {/* 🔥 Sidebar */}
      <div className="w-64 sidebar p-6">
        <h2 className="text-xl font-bold text-indigo-400 mb-6">
          AutoLogix 🚚
        </h2>

        <div className="space-y-3 text-slate-400">

          <button
            onClick={() =>
              document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" })
            }
            className="block hover:text-white"
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              document.getElementById("upload").scrollIntoView({ behavior: "smooth" })
            }
            className="block hover:text-white"
          >
            Upload
          </button>

          <button
            onClick={() =>
              document.getElementById("history").scrollIntoView({ behavior: "smooth" })
            }
            className="block hover:text-white"
          >
            History
          </button>

        </div>
      </div>

      {/* 🔥 Main */}
      <div className="flex-1 p-8">

        {/* Dashboard */}
        <div id="dashboard">
          <h1 className="text-3xl font-bold mb-6">
            Driver Dashboard
          </h1>
        </div>

        {/* Stats */}
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

        {/* Upload */}
        <div id="upload" className="section mb-8">
          <h3 className="mb-3 font-semibold">Upload Documents</h3>

          {uploading ? (
            <p className="text-yellow-400">Uploading...</p>
          ) : (
            <input type="file" multiple onChange={handleUpload} />
          )}
        </div>

        {/* Charts */}
        <div id="history" className="grid md:grid-cols-2 gap-6">

          {/* PIE */}
          <div className="card">
            <h3 className="mb-4 font-semibold">
              Delivery Status Overview
            </h3>

            {data.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-slate-500 border border-dashed border-slate-700 rounded">
                No data yet (Upload invoices to generate insights)
              </div>
            ) : (
              <PieChart width={300} height={300}>
                <Pie data={pieData} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </div>

          {/* BAR */}
          <div className="card">
            <h3 className="mb-4 font-semibold">
              Revenue per Shipment
            </h3>

            {data.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-slate-500 border border-dashed border-slate-700 rounded">
                No revenue data available
              </div>
            ) : (
              <BarChart width={400} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="shipment_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="charges" fill="#4F46E5" />
              </BarChart>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}