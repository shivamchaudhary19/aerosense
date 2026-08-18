const { getForecast } = require("../services/forecastService");

async function getForecastController(req, res) {
  try {
    const { location, hours = 24 } = req.query;

    if (!location) {
      return res.status(400).json({
        success: false,
        error: "Location is required",
      });
    }

    const data = await getForecast(location, hours);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    const statusCode =
      error.message === "Location not found" ||
      error.message === "Location is required"
        ? 400
        : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  getForecastController,
};