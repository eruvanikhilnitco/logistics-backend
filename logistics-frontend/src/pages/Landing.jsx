import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const goToLogin = (role) => {
    if (role) navigate(`/login?role=${role}`);
    else navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* 🔥 Navbar */}
      <div className="flex justify-between items-center px-10 py-5 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-indigo-400">
          AutoLogix 🚚
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => goToLogin("driver")}
            className="btn-primary"
          >
            Driver Login
          </button>

          <button
            onClick={() => goToLogin("client")}
            className="btn-secondary"
          >
            Client Login
          </button>
        </div>
      </div>

      {/* 🔥 Hero Section */}
      <div className="text-center py-24 px-6 hero-gradient">

        <h2 className="text-5xl font-bold mb-6 leading-tight">
          AI-Powered <span className="text-indigo-400">Logistics Automation</span>
        </h2>

        <p className="text-slate-400 max-w-xl mx-auto mb-8">
          Upload invoices → AI extracts data → Clients receive delivery updates instantly.
          Smarter logistics with real-time automation.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => goToLogin()}
            className="btn-accent"
          >
            Get Started →
          </button>

          <button className="btn-secondary">
            Learn More
          </button>
        </div>
      </div>

      {/* 🔥 Features */}
      <div className="grid md:grid-cols-3 gap-6 px-10 py-20">

        <div className="card hover:scale-105">
          <h3 className="text-lg font-semibold mb-2">📄 OCR Automation</h3>
          <p className="text-slate-400">
            Extract invoice data instantly using AI-powered OCR workflows.
          </p>
        </div>

        <div className="card hover:scale-105">
          <h3 className="text-lg font-semibold mb-2">📊 Smart Analytics</h3>
          <p className="text-slate-400">
            Visualize delivery performance with real-time insights.
          </p>
        </div>

        <div className="card hover:scale-105">
          <h3 className="text-lg font-semibold mb-2">📬 Notifications</h3>
          <p className="text-slate-400">
            Automated updates and alerts for clients and drivers.
          </p>
        </div>

      </div>

      {/* 🔥 Highlight Section (Premium like your reference) */}
      <div className="grid md:grid-cols-2 gap-10 px-10 py-20 items-center">

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Technology that <span className="text-red-400">listens, learns, works</span>
          </h2>

          <p className="text-slate-400">
            We combine automation, AI, and analytics to build intelligent logistics systems
            that reduce manual effort and increase efficiency.
          </p>

          <button className="btn-primary mt-6">
            Know More →
          </button>
        </div>

        <div className="card h-[250px] flex items-center justify-center">
          <p className="text-slate-500">[ Illustration / Image here ]</p>
        </div>

      </div>

      {/* 🔥 CTA Section (RED GRADIENT — IMPORTANT) */}
      <div className="cta-gradient text-center py-16 px-6 mx-10 rounded-xl">

        <h2 className="text-3xl font-bold mb-4">
          Ready to automate your logistics?
        </h2>

        <p className="mb-6 text-white/80">
          Start using AI-powered workflows today.
        </p>

        <button
          onClick={() => goToLogin()}
          className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold"
        >
          Get Started
        </button>
      </div>

      {/* 🔥 Footer */}
      <div className="mt-20 border-t border-slate-800 px-10 py-10 text-center text-slate-500">
        © 2026 AutoLogix — AI Logistics Platform
      </div>

    </div>
  );
}