const Coin = require("../models/Coin");

exports.getHighestPrice = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { price: { $ne: null } } },
      { $sort: { price: -1 } },
      { $limit: 1 }
    ]);
    res.json({ data: data[0] });
  } catch (err) {
    next(err);
  }
};

exports.getLowestPrice = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { price: { $ne: null } } },
      { $sort: { price: 1 } },
      { $limit: 1 }
    ]);
    res.json({ data: data[0] });
  } catch (err) {
    next(err);
  }
};

exports.getAveragePrice = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { price: { $ne: null } } },
      { $group: { _id: null, avgPrice: { $avg: "$price" } } }
    ]);
    res.json({ result: data.length ? data[0].avgPrice : 0, label: "Average Price" });
  } catch (err) {
    next(err);
  }
};

exports.getPriceGrowth = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $group: { _id: "$month", avgPrice: { $avg: "$price" } } },
      { $sort: { _id: 1 } }
    ]);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getPriceDrop = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { daily_return: { $lt: -5 } } },
      { $sort: { daily_return: 1 } }
    ]);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getVolumeSpike = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { volume: { $ne: null }, price_ma7: { $ne: null } } },
      { $match: { $expr: { $gt: ["$volume", { $multiply: ["$price_ma7", 2] }] } } }
    ]);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getCumulativeReturns = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { cumulative_return: { $ne: null } } },
      { $group: { _id: "$coin_id", history: { $push: { date: "$date", return: "$cumulative_return" } } } }
    ]);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getHighVolatility = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { volatility_7d: { $gte: 8 } } },
      { $sort: { volatility_7d: -1 } }
    ]);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getPriceHistory = async (req, res, next) => {
  try {
    const data = await Coin.find({ coin_id: req.params.coinId }, { date: 1, price: 1 }).sort({ timestamp: 1 });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getPriceTrend = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $group: { _id: "$month", avgPrice: { $avg: "$price" } } },
      { $sort: { _id: 1 } }
    ]);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getHighestVolume = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { volume: { $ne: null } } },
      { $sort: { volume: -1 } },
      { $limit: 1 }
    ]);
    res.json({ data: data[0] });
  } catch (err) {
    next(err);
  }
};

exports.getLowestVolume = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { volume: { $ne: null } } },
      { $sort: { volume: 1 } },
      { $limit: 1 }
    ]);
    res.json({ data: data[0] });
  } catch (err) {
    next(err);
  }
};

exports.getAverageVolume = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { volume: { $ne: null } } },
      { $group: { _id: null, avgVolume: { $avg: "$volume" } } }
    ]);
    res.json({ result: data.length ? data[0].avgVolume : 0, label: "Average Volume" });
  } catch (err) {
    next(err);
  }
};

exports.getTopReturns = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { daily_return: { $ne: null } } },
      { $sort: { daily_return: -1 } },
      { $limit: 10 }
    ]);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getNegativeReturns = async (req, res, next) => {
  try {
    const data = await Coin.aggregate([
      { $match: { daily_return: { $lt: 0 } } },
      { $sort: { daily_return: 1 } }
    ]);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};
