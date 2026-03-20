import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import DriverDashboard from "./pages/DriverDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// ✅ Auth Check
const isAuthenticated = () => {
  return localStorage.getItem("role");
};

// ✅ Protected Route
const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <HashRouter>
      <Routes>

        {/* ✅ Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected */}
        <Route
          path="/driver"
          element={
            <ProtectedRoute role="driver">
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client"
          element={
            <ProtectedRoute role="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </HashRouter>
  );
}

export default App;