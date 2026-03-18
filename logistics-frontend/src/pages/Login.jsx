import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("driver");
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);

    if (role === "driver") navigate("/driver");
    else navigate("/client");
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Login</h1>

      <input
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="driver">Driver</option>
        <option value="client">Client</option>
      </select>

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}