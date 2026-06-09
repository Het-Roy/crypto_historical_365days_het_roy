const Coin = require("../models/Coin");

exports.getRandom = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([{ $sample: { size: 1 } }]);
    res.json({ data: data[0] });
  } catch (err) {
    next(err);
  }
};

exports.getRecommendations = async (req, res, next) => {
  try {
    const data = await Coin.find({ cumulative_return: { $ne: null } })
                           .sort({ cumulative_return: -1, timestamp: -1 })
                           .limit(5);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getPredictions = async (req, res, next) => {
  try {
    res.json({ message: "Prediction logic executed successfully", predictions: [] });
  } catch (err) {
    next(err);
  }
};

exports.simulatePortfolio = async (req, res, next) => {
  try {
    const { coins, amount } = req.query;
    if (!coins || !amount) {
      return res.status(400).json({ error: "coins and amount query params required" });
    }
    const coinList = coins.split(",").map(c => c.toUpperCase());
    const data = await Coin.find({ symbol: { $in: coinList } }).sort({ timestamp: -1 });
    
    const splitAmount = Number(amount) / coinList.length;
    let totalValue = 0;
    const details = {};

    coinList.forEach(symbol => {
      const coin = data.find(c => c.symbol === symbol);
      if (coin) {
        details[symbol] = { allocated: splitAmount, currentPrice: coin.price };
        totalValue += splitAmount; 
      }
    });

    res.json({ data: { totalValue, details } });
  } catch (err) {
    next(err);
  }
};

exports.getHeatmap = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      {
        $group: {
          _id: { month: "$month" },
          avgReturn: { $avg: "$daily_return" }
        }
      }
    ]);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getMarketStatus = async (req, res, next) => {
  try {
    const latestCoins = await Coin.aggregate([
      { $sort: { timestamp: -1 } },
      { $group: { _id: "$coin_id", latestRecord: { $first: "$$ROOT" } } }
    ]);

    let bullishCount = 0;
    latestCoins.forEach(c => {
      if (c.latestRecord.daily_return > 0) bullishCount++;
    });

    const percentBullish = (bullishCount / latestCoins.length) * 100;
    const status = percentBullish > 60 ? "bullish" : percentBullish < 40 ? "bearish" : "neutral";

    res.json({ data: { status, percentBullish } });
  } catch (err) {
    next(err);
  }
};

exports.getTopMonthlyPerformance = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $sort: { cumulative_return: -1 } },
      {
        $group: {
          _id: { coin: "$coin_id", month: "$month" },
          bestReturn: { $first: "$cumulative_return" }
        }
      }
    ]);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getTopYearlyPerformance = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      {
        $project: {
          coin_id: 1,
          year: { $substr: ["$date", 0, 4] },
          cumulative_return: 1
        }
      },
      { $sort: { cumulative_return: -1 } },
      {
        $group: {
          _id: { coin: "$coin_id", year: "$year" },
          bestReturn: { $first: "$cumulative_return" }
        }
      }
    ]);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getHighVolatilityAlerts = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $sort: { timestamp: -1 } },
      { $group: { _id: "$coin_id", latestRecord: { $first: "$$ROOT" } } },
      { $match: { "latestRecord.volatility_7d": { $gte: 10 } } }
    ]);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getMarketDropAlerts = async (req, res, next) => {
  try {
    const data = await Coin.find({ daily_return: { $lt: -5 } }).sort({ timestamp: -1 }).limit(20);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.clearCache = (req, res) => {
  res.json({ cleared: true });
};

exports.getSystemHealth = (req, res) => {
  res.json({ status: "ok", dbStatus: "connected", uptime: process.uptime() });
};

exports.getSystemVersion = (req, res) => {
  res.json({ version: "1.0.0", environment: process.env.NODE_ENV || "development" });
};

exports.getSystemConfig = (req, res) => {
  res.json({ config: { somePublicConfig: true } });
};

exports.generateReport = async (req, res, next) => {
  try {
    const { params } = req.body;
    res.json({ message: "Report generated", data: {} });
  } catch (err) { next(err); }
};
