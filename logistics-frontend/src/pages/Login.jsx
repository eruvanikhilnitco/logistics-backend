import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ✅ added
  const [role, setRole] = useState("driver");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const roleFromURL = searchParams.get("role");
    if (roleFromURL) setRole(roleFromURL);
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("Enter email & password");
    }

    try {
      setLoading(true);

      // ✅ 1. Auth Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // ✅ 2. Fetch user details (role + name)
      const { data: userData, error: dbError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (dbError) throw dbError;

      // ✅ 3. Store in localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("role", userData.role);
      localStorage.setItem("name", userData.name);

      toast.success("Login successful 🚀");

      // ✅ 4. Redirect based on DB role (not UI role)
      navigate(userData.role === "driver" ? "/driver" : "/client");

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center hero-gradient">

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

        {/* Role (UI only, not used for auth) */}
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
          disabled={loading}
          className="btn-accent w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Login →"
          )}
        </button>

        {/* Signup */}
        <p className="text-center text-sm text-slate-400 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Powered by AI Automation
        </p>

      </div>
    </div>
  );
}