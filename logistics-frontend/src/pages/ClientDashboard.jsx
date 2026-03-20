import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");

    axios.get(
      "https://logistics-backend-0zah.onrender.com/api/deliveries",
      {
        params: { email, role: "client" }
      }
    )
      .then(res => setData(res.data))
      .catch(console.log);
  }, []);

  const completed = data.filter(d => d.status === "completed").length;
  const pending = data.filter(d => d.status === "pending").length;

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">

      {/* 🔥 Sidebar */}
      <div className="w-64 sidebar p-6">
        <h2 className="text-xl font-bold text-cyan-400 mb-6">
          AutoLogix 📦
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
              document.getElementById("deliveries").scrollIntoView({ behavior: "smooth" })
            }
            className="block hover:text-white"
          >
            My Deliveries
          </button>

          <button
            onClick={() =>
              document.getElementById("support").scrollIntoView({ behavior: "smooth" })
            }
            className="block hover:text-white"
          >
            Support
          </button>

        </div>
      </div>

      {/* 🔥 Main */}
      <div className="flex-1 p-8">

        {/* ✅ Dashboard */}
        <div id="dashboard">
          <h1 className="text-3xl font-bold mb-6">
            Client Dashboard
          </h1>
        </div>

        {/* 🔥 Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="card">
            <p className="subtext">Total Deliveries</p>
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

        </div>

        {/* ✅ Deliveries */}
        <div id="deliveries" className="section mb-8">
          <h3 className="mb-4 font-semibold">Delivery Details</h3>

          {data.length === 0 ? (
            <div className="h-[150px] flex items-center justify-center text-slate-500 border border-dashed border-slate-700 rounded">
              No deliveries found
            </div>
          ) : (
            <div className="space-y-4">
              {data.map((d, index) => (
                <div
                  key={index}
                  className="bg-slate-800 p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm text-slate-400">Shipment ID</p>
                    <p className="font-semibold">{d.shipment_id}</p>

                    <p className="text-sm mt-2">
                      Status:{" "}
                      <span
                        className={
                          d.status === "completed"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }
                      >
                        {d.status}
                      </span>
                    </p>

                    <p className="text-sm text-slate-400">
                      ₹{d.charges}
                    </p>
                  </div>

                  <button
                    className="btn-primary"
                    onClick={() => alert("Calling Driver...")}
                  >
                    📞 Call
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Support Section */}
        <div id="support" className="section">
          <h3 className="mb-4 font-semibold">Support</h3>

          <div className="text-slate-400">
            For any queries, contact your driver or support team.
          </div>
        </div>

      </div>
    </div>
  );
}