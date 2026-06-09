const express = require("express");
const analyticsController = require("../controllers/analytics");

const router = express.Router();

router.get("/price/highest", analyticsController.getHighestPrice);
router.get("/price/lowest", analyticsController.getLowestPrice);
router.get("/price/average", analyticsController.getAveragePrice);
router.get("/price/growth", analyticsController.getPriceGrowth);
router.get("/price/drop", analyticsController.getPriceDrop);
router.get("/volume/spike", analyticsController.getVolumeSpike);
router.get("/returns/cumulative", analyticsController.getCumulativeReturns);
router.get("/volatility/high", analyticsController.getHighVolatility);
router.get("/price/history/:coinId", analyticsController.getPriceHistory);
router.get("/price/trend", analyticsController.getPriceTrend);

module.exports = router;
