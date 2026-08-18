const { getPrediction } = require("../services/predictionService");

async function getPredictionController(req, res) {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        success: false,
        error: "Location is required",
      });
    }

    const data = await getPrediction(location);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  getPredictionController,
};