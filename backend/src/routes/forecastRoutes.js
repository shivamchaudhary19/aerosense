const express = require("express");

const {
  getForecastController,
} = require("../controllers/forecastController");

const router = express.Router();

router.get("/", getForecastController);

module.exports = router;