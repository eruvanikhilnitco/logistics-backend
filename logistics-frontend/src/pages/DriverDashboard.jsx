import { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import { getDeliveries } from "../services/api";

export default function DriverDashboard() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getDeliveries();
      setDeliveries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow p-5">
        <h2 className="text-xl font-bold mb-6 text-blue-600">
          AutoLogix
        </h2>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-6">
          Driver Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 shadow rounded">
            Total: {deliveries.length}
          </div>

          <div className="bg-white p-4 shadow rounded text-green-600">
            Completed: {
              deliveries.filter(d => d.status === "completed").length
            }
          </div>

          <div className="bg-white p-4 shadow rounded text-red-500">
            Pending: {
              deliveries.filter(d => d.status === "pending").length
            }
          </div>
        </div>

        {/* Upload */}
        <UploadForm />

        {/* Table */}
        <div className="mt-6 bg-white p-4 shadow rounded">
          <h2 className="font-bold mb-3">Deliveries</h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th>ID</th>
                <th>Status</th>
                <th>Charges</th>
              </tr>
            </thead>

            <tbody>
              {deliveries.map((d, i) => (
                <tr key={i} className="border-b">
                  <td>{d.shipment_id}</td>
                  <td>{d.status}</td>
                  <td>₹{d.charges}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}