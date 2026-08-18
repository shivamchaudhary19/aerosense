const {
  getGovernmentSummary,
} = require("../services/governmentService");

async function getGovernmentSummaryController(req, res) {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        success: false,
        error: "Location is required",
      });
    }

    const data = await getGovernmentSummary(location);

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
  getGovernmentSummaryController,
};