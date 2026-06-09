const Coin = require("../models/Coin");

exports.getMarketCap = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $sort: { timestamp: -1 } },
      { $group: { _id: "$coin_id", latest_mc: { $first: "$market_cap" } } },
      { $group: { _id: null, total: { $sum: "$latest_mc" } } }
    ]);
    res.json({ result: data.length ? data[0].total : 0, label: "Total Market Cap" });
  } catch (err) {
    next(err);
  }
};

exports.getMonthlyAnalysis = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      {
        $group: {
          _id: "$month",
          avgPrice: { $avg: "$price" },
          avgVolume: { $avg: "$volume" },
          avgReturn: { $avg: "$daily_return" },
          coinCount: { $addToSet: "$coin_id" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Convert coinCount array to length
    const formatted = data.map(d => ({
      ...d,
      coinCount: d.coinCount.length
    }));
    
    res.json({ data: formatted });
  } catch (err) {
    next(err);
  }
};

exports.getMarketSummary = async (req, res, next) => {
  try {
    const totalCoins = (await Coin.distinct("coin_id")).length;
    const marketCapAggr = await Coin.aggregate([
      { $sort: { timestamp: -1 } },
      { $group: { _id: "$coin_id", latest_mc: { $first: "$market_cap" } } },
      { $group: { _id: null, total: { $sum: "$latest_mc" } } }
    ]);
    const totalMarketCap = marketCapAggr.length ? marketCapAggr[0].total : 0;
    
    const avgPriceAggr = await Coin.aggregate([
      { $group: { _id: null, avgPrice: { $avg: "$price" } } }
    ]);
    const avgPrice = avgPriceAggr.length ? avgPriceAggr[0].avgPrice : 0;

    const topGainer = await Coin.findOne({ daily_return: { $ne: null } }).sort({ daily_return: -1 });
    const topLoser = await Coin.findOne({ daily_return: { $ne: null } }).sort({ daily_return: 1 });

    res.json({
      data: {
        totalCoins,
        totalMarketCap,
        avgPrice,
        topGainer,
        topLoser
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getAveragePrice = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([{ $group: { _id: null, avgPrice: { $avg: "$price" } } }]);
    res.json({ result: data.length ? data[0].avgPrice : 0, label: "Average Price" });
  } catch (err) { next(err); }
};

exports.getAverageVolume = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([{ $group: { _id: null, avgVolume: { $avg: "$volume" } } }]);
    res.json({ result: data.length ? data[0].avgVolume : 0, label: "Average Volume" });
  } catch (err) { next(err); }
};

exports.getHighestMarketCap = async (req, res, next) => {
  try {
    const data = await Coin.find({ market_cap: { $ne: null } }).sort({ market_cap: -1 }).limit(1);
    res.json({ data: data[0] });
  } catch (err) { next(err); }
};

exports.getHighestVolume = async (req, res, next) => {
  try {
    const data = await Coin.find({ volume: { $ne: null } }).sort({ volume: -1 }).limit(1);
    res.json({ data: data[0] });
  } catch (err) { next(err); }
};

exports.getTopGainers = async (req, res, next) => {
  try {
    const data = await Coin.find({ daily_return: { $ne: null } }).sort({ daily_return: -1 }).limit(10);
    res.json({ data });
  } catch (err) { next(err); }
};

exports.getTopLosers = async (req, res, next) => {
  try {
    const data = await Coin.find({ daily_return: { $ne: null } }).sort({ daily_return: 1 }).limit(10);
    res.json({ data });
  } catch (err) { next(err); }
};

exports.getCoinCount = async (req, res, next) => {
  try {
    const uniqueCoins = await Coin.distinct("coin_id");
    res.json({ result: uniqueCoins.length, label: "Total Unique Coins" });
  } catch (err) { next(err); }
};

exports.getRankDistribution = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { rank: { $ne: null } } },
      { $bucket: { groupBy: "$rank", boundaries: [1, 11, 51, 101, 500, 1000], default: "1000+" } }
    ]);
    res.json({ data });
  } catch (err) { next(err); }
};

exports.getPriceDistribution = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { price: { $ne: null } } },
      { $bucket: { groupBy: "$price", boundaries: [0, 1, 10, 100, 1000, 10000, 50000], default: "50000+" } }
    ]);
    res.json({ data });
  } catch (err) { next(err); }
};

exports.getVolatilityDistribution = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { volatility_7d: { $ne: null } } },
      { $bucket: { groupBy: "$volatility_7d", boundaries: [0, 5, 10, 20, 50, 100], default: "100+" } }
    ]);
    res.json({ data });
  } catch (err) { next(err); }
};

exports.getDailyAnalysis = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      {
        $group: {
          _id: "$date",
          avgPrice: { $avg: "$price" },
          avgVolume: { $avg: "$volume" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json({ data });
  } catch (err) { next(err); }
};

exports.getYearlyAnalysis = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      {
        $group: {
          _id: { $substr: ["$month", 0, 4] },
          avgPrice: { $avg: "$price" },
          avgVolume: { $avg: "$volume" },
          avgReturn: { $avg: "$daily_return" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json({ data });
  } catch (err) { next(err); }
};
