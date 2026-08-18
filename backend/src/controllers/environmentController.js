const {
  getCurrentEnvironment,
} = require("../services/environmentService");

async function getCurrentEnvironmentController(req, res) {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        error: "Location is required",
      });
    }

    const data = await getCurrentEnvironment(location);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    const statusCode =
      error.message === "Unsupported location" ? 400 : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  getCurrentEnvironmentController,
};