const express = require("express");
const cors = require("cors");
require("dotenv").config();

const environmentRoutes = require("./routes/environmentRoutes");
const forecastRoutes = require("./routes/forecastRoutes");
const hotspotRoutes = require("./routes/hotspotRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "AeroSense Backend",
  });
});

app.use("/api/environment", environmentRoutes);
app.use("/api/forecast", forecastRoutes);
app.use("/api/hotspots", hotspotRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AeroSense backend running on port ${PORT}`);
});