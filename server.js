import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.js";

const app = express();

// ✅ VERY IMPORTANT (fixes frontend → backend calls)
app.use(cors());

// ✅ Required for JSON + form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/upload", uploadRoutes);

// ✅ Deliveries API
app.get("/api/deliveries", async (req, res) => {
  try {
    const data = [
      { shipment_id: "123", status: "completed", charges: 500 },
      { shipment_id: "124", status: "pending", charges: 300 }
    ];

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Root check (optional but useful)
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ✅ Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});