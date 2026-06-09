const express = require("express");
const statsController = require("../controllers/stats");

const router = express.Router();

router.get("/market-cap", statsController.getMarketCap);
router.head("/market-cap", statsController.getMarketCap);
router.get("/monthly-analysis", statsController.getMonthlyAnalysis);
router.get("/market-summary", statsController.getMarketSummary);

router.get("/average-price", statsController.getAveragePrice);
router.get("/average-volume", statsController.getAverageVolume);
router.get("/highest-market-cap", statsController.getHighestMarketCap);
router.get("/highest-volume", statsController.getHighestVolume);
router.get("/top-gainers", statsController.getTopGainers);
router.get("/top-losers", statsController.getTopLosers);
router.get("/coin-count", statsController.getCoinCount);
router.get("/rank-distribution", statsController.getRankDistribution);
router.get("/price-distribution", statsController.getPriceDistribution);
router.get("/volatility-distribution", statsController.getVolatilityDistribution);
router.get("/daily-analysis", statsController.getDailyAnalysis);
router.get("/yearly-analysis", statsController.getYearlyAnalysis);

module.exports = router;
