import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.js";
import { createClient } from "@supabase/supabase-js";

const app = express();

// ✅ Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/upload", uploadRoutes);

// ✅ Deliveries API (FILTERED BY USER)
app.get("/api/deliveries", async (req, res) => {
  try {
    const { email, role } = req.query;

    let query = supabase.from("deliveries").select("*");

    // 🔥 FILTER LOGIC
    if (role === "driver") {
      query = query.eq("driver_email", email);
    } else if (role === "client") {
      query = query.eq("client_email", email);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Root check
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ✅ Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});