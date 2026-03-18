import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("driver");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ✅ Auto-set role from URL
  useEffect(() => {
    const roleFromURL = searchParams.get("role");
    if (roleFromURL) {
      setRole(roleFromURL);
    }
  }, []);

  const handleLogin = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    // ✅ Save user info
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);

    // ✅ Redirect based on role
    if (role === "driver") {
      navigate("/driver");
    } else {
      navigate("/client");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f3f4f6",
      fontFamily: "sans-serif"
    }}>

      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px"
          }}
        />

        {/* Role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px"
          }}
        >
          <option value="driver">Driver</option>
          <option value="client">Client</option>
        </select>

        {/* Button */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Login
        </button>

      </div>
    </div>
  );
}