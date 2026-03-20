import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../supabase";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ✅ added
  const [role, setRole] = useState("driver");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      return toast.error("All fields required");
    }

    try {
      setLoading(true);

      // ✅ 1. Create Auth User
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) throw error;

      // ✅ 2. Store extra user data
      const { error: dbError } = await supabase.from("users").insert([
        {
          name,
          email,
          role
        }
      ]);

      if (dbError) throw dbError;

      toast.success("Signup successful 🚀");

      // ✅ Redirect to login
      navigate("/login");

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
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

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-slate-400">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="input mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          disabled={loading}
          className="btn-accent w-full"
        >
          {loading ? "Creating..." : "Signup →"}
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