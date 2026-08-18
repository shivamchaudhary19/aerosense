const express = require("express");

const {
  getCurrentEnvironmentController,
  getAirQualityController,
} = require("../controllers/environmentController");

const router = express.Router();

router.get("/current", getCurrentEnvironmentController);
router.get("/air-quality", getAirQualityController);

module.exports = router;