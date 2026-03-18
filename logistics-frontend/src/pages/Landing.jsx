import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-blue-600">
          AutoLogix 🚚
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login?role=driver")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Driver Login
          </button>

          <button
            onClick={() => navigate("/login?role=client")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Client Login
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h2 className="text-5xl font-bold mb-4">
          AI Logistics Automation
        </h2>

        <p className="text-gray-600 max-w-xl mb-6">
          Upload invoices → AI extracts data → Clients receive delivery details instantly.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Get Started
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-6 px-10 pb-20">

        <div className="bg-white p-6 shadow rounded">
          <h3 className="font-bold mb-2">📄 OCR Automation</h3>
          <p className="text-gray-600">
            Extract invoice data automatically using AI.
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3 className="font-bold mb-2">📊 Analytics</h3>
          <p className="text-gray-600">
            Track deliveries and performance insights.
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3 className="font-bold mb-2">📬 Notifications</h3>
          <p className="text-gray-600">
            Clients get real-time updates and emails.
          </p>
        </div>

      </div>
    </div>
  );
}