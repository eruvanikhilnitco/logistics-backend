import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1E293B",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />
    </>
  </StrictMode>
);