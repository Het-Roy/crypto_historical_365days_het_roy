const express = require("express");
const advancedController = require("../controllers/advanced");

const router = express.Router();

router.get("/random", advancedController.getRandom);
router.get("/recommendations", advancedController.getRecommendations);
router.get("/predictions", advancedController.getPredictions);
router.get("/portfolio/simulate", advancedController.simulatePortfolio);
router.get("/heatmap", advancedController.getHeatmap);
router.get("/market-status", advancedController.getMarketStatus);
router.get("/performance/top-monthly", advancedController.getTopMonthlyPerformance);
router.get("/performance/top-yearly", advancedController.getTopYearlyPerformance);
router.get("/alerts/high-volatility", advancedController.getHighVolatilityAlerts);
router.get("/alerts/market-drop", advancedController.getMarketDropAlerts);
router.get("/cache/clear", advancedController.clearCache);
router.get("/system/health", advancedController.getSystemHealth);
router.head("/system/health", advancedController.getSystemHealth);
router.options("/system/health", (req, res) => res.set("Allow", "GET,HEAD,OPTIONS").status(204).end());
router.get("/system/version", advancedController.getSystemVersion);
router.get("/system/config", advancedController.getSystemConfig);
router.post("/report", advancedController.generateReport);

module.exports = router;
