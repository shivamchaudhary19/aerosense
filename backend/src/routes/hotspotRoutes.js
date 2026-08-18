const express = require("express");

const {
  getHotspotsController,
} = require("../controllers/hotspotController");

const router = express.Router();

router.get("/", getHotspotsController);

module.exports = router;