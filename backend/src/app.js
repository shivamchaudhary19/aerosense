const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "AeroSense Backend",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AeroSense backend running on port ${PORT}`);
});