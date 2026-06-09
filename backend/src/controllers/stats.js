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
