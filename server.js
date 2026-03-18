import express from "express";
import uploadRoutes from "./routes/upload.js";

const app = express();

app.use(express.json());

// existing route
app.use("/api/upload", uploadRoutes);

// 👇 ADD THIS BLOCK HERE
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

// server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});