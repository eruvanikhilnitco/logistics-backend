import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import DriverDashboard from "./pages/DriverDashboard";
import ClientDashboard from "./pages/ClientDashboard"; // ✅ added

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/client" element={<ClientDashboard />} /> {/* ✅ added */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;