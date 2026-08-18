const {
  getPrediction,
} = require("../services/predictionService");

async function getPredictionController(req, res) {
  try {
    const location = String(
      req.query.location || ""
    ).trim();

    if (!location) {
      return res.status(400).json({
        success: false,
        error: "Location is required",
      });
    }

    const data = await getPrediction(
      location
    );

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
      "Prediction controller error:",
      error
    );

    const statusCode =
      error?.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      error:
        error?.message ||
        "Failed to generate AQI prediction",
    });
  }
}

module.exports = {
  getPredictionController,
};