const express = require("express");

const {
  getAlertsController,
} = require("../controllers/alertController");

const router = express.Router();

router.get("/", getAlertsController);

module.exports = router;