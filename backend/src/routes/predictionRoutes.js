const express = require("express");

const {
  getPredictionController,
} = require("../controllers/predictionController");

const router = express.Router();

router.get("/", getPredictionController);

module.exports = router;