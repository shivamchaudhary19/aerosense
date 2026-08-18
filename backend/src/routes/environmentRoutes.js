const express = require("express");

const {
  getCurrentEnvironmentController,
} = require("../controllers/environmentController");

const router = express.Router();

router.get("/current", getCurrentEnvironmentController);

module.exports = router;