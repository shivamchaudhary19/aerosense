const express = require("express");
const cors = require("cors");
require("dotenv").config();

const environmentRoutes = require("./routes/environmentRoutes");
const forecastRoutes = require("./routes/forecastRoutes");
const hotspotRoutes = require("./routes/hotspotRoutes");
const alertRoutes = require("./routes/alertRoutes");
const governmentRoutes = require("./routes/governmentRoutes");
const predictionRoutes = require("./routes/predictionRoutes");

const app = express();

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    service: "AeroSense Backend",
  });
});

app.use(
  "/api/environment",
  environmentRoutes
);

app.use(
  "/api/forecast",
  forecastRoutes
);

app.use(
  "/api/hotspots",
  hotspotRoutes
);

app.use(
  "/api/alerts",
  alertRoutes
);

app.use(
  "/api/government",
  governmentRoutes
);

app.use(
  "/api/prediction",
  predictionRoutes
);

/*
 * Unknown API route
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "API endpoint not found",
    path: req.originalUrl,
  });
});

/*
 * Global error handler
 */
app.use(
  (err, req, res, next) => {
    console.error(
      "AeroSense API Error:",
      err
    );

    const statusCode =
      Number.isInteger(err?.statusCode) &&
      err.statusCode >= 400 &&
      err.statusCode < 600
        ? err.statusCode
        : 500;

    res.status(statusCode).json({
      success: false,
      error:
        err?.message ||
        "Internal server error",
    });
  }
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `AeroSense backend running on port ${PORT}`
  );
});