const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const uploadRoute = require("./routes/upload");
app.use("/api", uploadRoute);

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.listen(3000, () => console.log("Server running on port 3000"));