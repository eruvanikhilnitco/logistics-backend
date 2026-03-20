import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("driver");

  const navigate = useNavigate();

  const handleSignup = () => {
    if (!name || !email) {
      return toast.error("All fields required");
    }

    // ✅ Store user info
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);

    toast.success("Signup successful 🚀");

    // ✅ Redirect to dashboard directly (better UX)
    navigate(role === "driver" ? "/driver" : "/client");
  };

  return (
    <div className="min-h-screen flex items-center justify-center hero-gradient">

      <div className="card w-[380px] backdrop-blur-xl">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-indigo-400 mb-2">
          Create Account 🚀
        </h1>

        <p className="text-center text-slate-400 mb-6">
          Join AutoLogix Platform
        </p>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm text-slate-400">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

        {/* Role */}
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

        {/* Button */}
        <button
          onClick={handleSignup}
          className="btn-accent w-full"
        >
          Signup →
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-400 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}