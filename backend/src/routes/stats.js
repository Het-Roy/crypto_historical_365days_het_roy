const express = require("express");
const statsController = require("../controllers/stats");

const router = express.Router();

router.get("/market-cap", statsController.getMarketCap);
router.get("/monthly-analysis", statsController.getMonthlyAnalysis);
router.get("/market-summary", statsController.getMarketSummary);

module.exports = router;
