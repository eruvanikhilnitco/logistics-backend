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

  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://logistics-backend-0zah.onrender.com/api/deliveries",
        {
          params: { email, role: "driver" }
        }
      );
      setData(res.data);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUpload = async (e) => {
    const files = e.target.files;

    if (!email) {
      toast.error("User not logged in");
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("driver_email", email);

    try {
      setUploading(true);

      await axios.post(
        "https://logistics-backend-0zah.onrender.com/api/upload/upload",
        formData
      );

      toast.success("Uploaded successfully 🚀");
      fetchData();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">

      {/* Sidebar */}
      <div className="w-64 sidebar p-6">
        <h2 className="text-xl font-bold text-indigo-400 mb-6">
          AutoLogix 🚚
        </h2>

        {/* ✅ FIXED SIDEBAR */}
        <div className="flex flex-col gap-3 text-slate-400">

          <button
            onClick={() => document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" })}
            className="text-left hover:text-white"
          >
            Dashboard
          </button>

          <button
            onClick={() => document.getElementById("upload").scrollIntoView({ behavior: "smooth" })}
            className="text-left hover:text-white"
          >
            Upload
          </button>

          <button
            onClick={() => document.getElementById("history").scrollIntoView({ behavior: "smooth" })}
            className="text-left hover:text-white"
          >
            History
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="text-red-400 mt-6 hover:text-red-500 text-left"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">

        {/* Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Driver Dashboard</h1>
          <div className="text-sm text-slate-400">
            👤 {name || "Driver"}
          </div>
        </div>

        {/* Stats */}
        <div id="dashboard" className="grid md:grid-cols-4 gap-6 mb-8">

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

          {/* ✅ FIXED PIE */}
          <div className="card">
            <h3 className="mb-4 font-semibold">
              Delivery Status Overview
            </h3>

            {completed === 0 && pending === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-slate-500 border border-dashed border-slate-700 rounded">
                No delivery status data yet
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
                No revenue data
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