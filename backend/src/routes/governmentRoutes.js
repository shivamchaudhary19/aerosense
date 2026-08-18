const express = require("express");

const {
  getGovernmentSummaryController,
} = require("../controllers/governmentController");

const router = express.Router();

router.get("/summary", getGovernmentSummaryController);

module.exports = router;