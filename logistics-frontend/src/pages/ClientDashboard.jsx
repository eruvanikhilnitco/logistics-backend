import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(
      "https://logistics-backend-0zah.onrender.com/api/deliveries",
      {
        params: {
          email: "client@test.com",
          role: "client"
        }
      }
    )
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const completed = data.filter(d => d.status === "completed").length;
  const pending = data.filter(d => d.status === "pending").length;

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
        <h2>📦 AutoLogix</h2>
        <p style={{ marginTop: "20px" }}>My Deliveries</p>
        <p>Track</p>
        <p>Support</p>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "30px", background: "#f3f4f6" }}>
        <h1>Client Dashboard</h1>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}>
          <Card title="Total Deliveries" value={data.length} />
          <Card title="Completed" value={completed} />
          <Card title="Pending" value={pending} />
        </div>

        {/* List */}
        <div style={{
          marginTop: "30px",
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}>
          <h3>📋 Delivery Details</h3>

          {data.length === 0 && <p>No deliveries found</p>}

          {data.map((d, index) => (
            <div key={index} style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between"
            }}>
              <div>
                <p><strong>ID:</strong> {d.shipment_id}</p>
                <p>Status: {d.status}</p>
                <p>Charges: ₹{d.charges}</p>
              </div>

              <button
                style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  border: "none"
                }}
                onClick={() => alert("Calling Driver...")}
              >
                📞 Call Driver
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}