import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("driver");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const roleFromURL = searchParams.get("role");
    if (roleFromURL) setRole(roleFromURL);
  }, []);

  const handleLogin = () => {
    if (!email) return alert("Enter email");

    localStorage.setItem("email", email);
    localStorage.setItem("role", role);

    navigate(role === "driver" ? "/driver" : "/client");
  };

  return (
    <div className="min-h-screen flex items-center justify-center hero-gradient">

      {/* Card */}
      <div className="card w-[380px] backdrop-blur-xl">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-center text-indigo-400 mb-2">
          AutoLogix 🚚
        </h1>

        <p className="text-center text-slate-400 mb-6">
          AI Logistics Platform
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-slate-400">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Role Toggle */}
        <div className="mb-6">
          <label className="text-sm text-slate-400">Select Role</label>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setRole("driver")}
              className={`flex-1 py-2 rounded-lg ${
                role === "driver"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-700 text-slate-300"
              }`}
            >
              Driver
            </button>

            <button
              onClick={() => setRole("client")}
              className={`flex-1 py-2 rounded-lg ${
                role === "client"
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-700 text-slate-300"
              }`}
            >
              Client
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="btn-accent w-full"
        >
          Login →
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Powered by AI Automation
        </p>
      </div>
    </div>
  );
}