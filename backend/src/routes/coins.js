const express = require("express");
const coinsController = require("../controllers/coins");

const router = express.Router();

// HEAD & OPTIONS
router.options("/", coinsController.options);
router.head("/", coinsController.head);

// Bulk ops
router.post("/bulk-create", coinsController.bulkCreate);
router.patch("/bulk-update", coinsController.bulkUpdate);
router.delete("/bulk-delete", coinsController.bulkDelete);
router.get("/exists/:id", coinsController.exists);

// Info Routes (Static)
router.get("/latest", coinsController.getLatest);
router.get("/top-market-cap", coinsController.getTopMarketCap);
router.get("/top-volume", coinsController.getTopVolume);
router.get("/top-gainers", coinsController.getTopGainers);
router.get("/top-losers", coinsController.getTopLosers);
router.get("/oldest", coinsController.getOldest);
router.get("/newest", coinsController.getNewest);
router.get("/trending", coinsController.getTrending);
router.get("/recent", coinsController.getRecent);

// Sort routes
router.get("/sort/price-asc", coinsController.sortPriceAsc);
router.get("/sort/price-desc", coinsController.sortPriceDesc);
router.get("/sort/volume-desc", coinsController.sortVolumeDesc);
router.get("/sort/rank-asc", coinsController.sortRankAsc);
router.get("/sort/return-desc", coinsController.sortReturnDesc);

// Filter routes
router.get("/filter/high-price", coinsController.filterHighPrice);
router.get("/filter/low-price", coinsController.filterLowPrice);
router.get("/filter/high-volume", coinsController.filterHighVolume);
router.get("/filter/low-volume", coinsController.filterLowVolume);
router.get("/filter/high-market-cap", coinsController.filterHighMarketCap);
router.get("/filter/low-market-cap", coinsController.filterLowMarketCap);
router.get("/filter/high-volatility", coinsController.filterHighVolatility);
router.get("/filter/low-volatility", coinsController.filterLowVolatility);
router.get("/filter/high-return", coinsController.filterHighReturn);
router.get("/filter/negative-return", coinsController.filterNegativeReturn);
router.get("/filter/bullish", coinsController.filterBullish);
router.get("/filter/bearish", coinsController.filterBearish);
router.get("/filter/profitable", coinsController.filterProfitable);
router.get("/filter/loss-making", coinsController.filterLossMaking);
router.get("/filter/missing-values", coinsController.filterMissingValues);

// Parameterized Info Routes
router.get("/name/:coinName", coinsController.getByName);
router.get("/symbol/:symbol", coinsController.getBySymbol);
router.get("/rank/:rank", coinsController.getByRank);
router.get("/month/:month", coinsController.getByMonth);
router.get("/date/:date", coinsController.getByDate);

// Analytics per Coin
router.get("/performance/:coinId", coinsController.getPerformance);
router.get("/volatility/:coinId", coinsController.getVolatility);
router.get("/market-cap/:coinId", coinsController.getMarketCapHistory);
router.get("/volume/:coinId", coinsController.getVolumeHistory);
router.get("/returns/:coinId", coinsController.getReturnsHistory);
router.get("/compare/:coin1/:coin2", coinsController.compareTwo);
router.get("/compare/:coin1/:coin2/:coin3", coinsController.compareThree);
router.get("/price/:coinId", coinsController.getPrice);
router.get("/history/:coinId/:month", coinsController.getHistoryMonth);
router.get("/history/:coinId", coinsController.getHistory);

// List and CRUD
router.get("/", coinsController.list);
router.post("/", coinsController.create);

// ID specific CRUD
router.get("/:id", coinsController.getById);
router.put("/:id", coinsController.replace);
router.patch("/:id", coinsController.update);
router.delete("/:id", coinsController.delete);
router.head("/:id", coinsController.headById);
router.options("/:id", coinsController.optionsById);

module.exports = router;
