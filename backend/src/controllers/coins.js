const Coin = require("../models/Coin");
const { getPaginationParams, getPaginationResponse } = require("../utils/pagination");
const { getSortObject, sortMap } = require("../utils/sortMapper");
const { getDynamicAverage } = require("../utils/aggregations");

// HEAD & OPTIONS
exports.options = (req, res) => {
  res.set("Allow", "GET,POST,HEAD,OPTIONS").status(204).end();
};

exports.head = async (req, res, next) => {
  try {
    await Coin.find({}).limit(1);
    res.end();
  } catch (err) {
    next(err);
  }
};

// Bulk ops
exports.bulkCreate = async (req, res, next) => {
  try {
    if (!req.body.coins || !Array.isArray(req.body.coins)) {
      return res.status(400).json({ error: "Validation failed", fields: [{ field: "coins", message: "coins array is required" }] });
    }
    const result = await Coin.insertMany(req.body.coins, { ordered: false });
    res.status(201).json({ message: "Coins created successfully", data: result });
  } catch (err) {
    if (err.name === "BulkWriteError") {
      res.status(207).json({ message: "Partial success", data: err.insertedDocs || [] });
    } else {
      next(err);
    }
  }
};

exports.bulkUpdate = async (req, res, next) => {
  try {
    if (!req.body.updates || !Array.isArray(req.body.updates)) {
      return res.status(400).json({ error: "updates array is required" });
    }
    const ops = req.body.updates.map(update => ({
      updateOne: {
        filter: { _id: update._id },
        update: { $set: update.data }
      }
    }));
    await Coin.bulkWrite(ops);
    res.json({ message: "Bulk update completed" });
  } catch (err) {
    next(err);
  }
};

exports.bulkDelete = async (req, res, next) => {
  try {
    if (!req.body.ids || !Array.isArray(req.body.ids)) {
      return res.status(400).json({ error: "ids array is required" });
    }
    await Coin.deleteMany({ _id: { $in: req.body.ids } });
    res.json({ message: "Bulk delete completed" });
  } catch (err) {
    next(err);
  }
};

exports.exists = async (req, res, next) => {
  try {
    const exists = await Coin.exists({ _id: req.params.id });
    res.json({ exists: !!exists });
  } catch (err) {
    next(err);
  }
};

// Info Routes (Static)
exports.getLatest = async (req, res, next) => {
  try {
    const data = await Coin.find().sort({ timestamp: -1 }).limit(50);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getTopMarketCap = async (req, res, next) => {
  try {
    const data = await Coin.find({ market_cap: { $ne: null } }).sort({ market_cap: -1 }).limit(10);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getTopVolume = async (req, res, next) => {
  try {
    const data = await Coin.find({ volume: { $ne: null } }).sort({ volume: -1 }).limit(10);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getTopGainers = async (req, res, next) => {
  try {
    const data = await Coin.find({ daily_return: { $gt: 0 } }).sort({ daily_return: -1 }).limit(10);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getTopLosers = async (req, res, next) => {
  try {
    const data = await Coin.find({ daily_return: { $lt: 0 } }).sort({ daily_return: 1 }).limit(10);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getOldest = async (req, res, next) => {
  try {
    const data = await Coin.find().sort({ timestamp: 1 }).limit(10);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getNewest = async (req, res, next) => {
  try {
    const data = await Coin.find().sort({ timestamp: -1 }).limit(10);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getTrending = async (req, res, next) => {
  try {
    const trending = await Coin.aggregate([
      {
        $group: {
          _id: "$coin_id",
          avgVolume: { $avg: "$volume" }
        }
      },
      { $sort: { avgVolume: -1 } },
      { $limit: 10 }
    ]);
    res.json({ data: trending });
  } catch (err) {
    next(err);
  }
};

exports.getRecent = async (req, res, next) => {
  try {
    const data = await Coin.find().sort({ updatedAt: -1 }).limit(20);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

// Sort routes
exports.sortPriceAsc = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const data = await Coin.find().sort({ price: 1 }).skip(skip).limit(limit);
    const total = await Coin.countDocuments();
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.sortPriceDesc = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const data = await Coin.find().sort({ price: -1 }).skip(skip).limit(limit);
    const total = await Coin.countDocuments();
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.sortVolumeDesc = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const data = await Coin.find().sort({ volume: -1 }).skip(skip).limit(limit);
    const total = await Coin.countDocuments();
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.sortRankAsc = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const data = await Coin.find().sort({ market_cap_rank: 1 }).skip(skip).limit(limit);
    const total = await Coin.countDocuments();
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.sortReturnDesc = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const data = await Coin.find().sort({ daily_return: -1 }).skip(skip).limit(limit);
    const total = await Coin.countDocuments();
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

// Filter routes
exports.filterHighPrice = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const agg = await Coin.aggregate([{ $match: { price: { $ne: null } } }, { $group: { _id: null, avgValue: { $avg: "$price" } } }]);
    const avgPrice = agg.length ? agg[0].avgValue : 0;
    const filter = { price: { $gte: avgPrice } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterLowPrice = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const agg = await Coin.aggregate([{ $match: { price: { $ne: null } } }, { $group: { _id: null, avgValue: { $avg: "$price" } } }]);
    const avgPrice = agg.length ? agg[0].avgValue : 0;
    const filter = { price: { $lt: avgPrice } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterHighVolume = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const agg = await Coin.aggregate([{ $match: { volume: { $ne: null } } }, { $group: { _id: null, avgValue: { $avg: "$volume" } } }]);
    const avgVolume = agg.length ? agg[0].avgValue : 0;
    const filter = { volume: { $gte: avgVolume } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterLowVolume = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const agg = await Coin.aggregate([{ $match: { volume: { $ne: null } } }, { $group: { _id: null, avgValue: { $avg: "$volume" } } }]);
    const avgVolume = agg.length ? agg[0].avgValue : 0;
    const filter = { volume: { $lt: avgVolume } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterHighMarketCap = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const agg = await Coin.aggregate([{ $match: { market_cap: { $ne: null } } }, { $group: { _id: null, avgValue: { $avg: "$market_cap" } } }]);
    const avgMarketCap = agg.length ? agg[0].avgValue : 0;
    const filter = { market_cap: { $gte: avgMarketCap } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterLowMarketCap = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const agg = await Coin.aggregate([{ $match: { market_cap: { $ne: null } } }, { $group: { _id: null, avgValue: { $avg: "$market_cap" } } }]);
    const avgMarketCap = agg.length ? agg[0].avgValue : 0;
    const filter = { market_cap: { $lt: avgMarketCap } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterHighVolatility = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const filter = { volatility_7d: { $gte: 8 } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterLowVolatility = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const filter = { volatility_7d: { $lt: 3 } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterHighReturn = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const filter = { daily_return: { $gte: 5 } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterNegativeReturn = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const filter = { daily_return: { $lt: 0 } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterBullish = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const filter = { daily_return: { $gt: 0 } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterBearish = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const filter = { daily_return: { $lt: 0 } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterProfitable = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const filter = { cumulative_return: { $gt: 0 } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterLossMaking = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const filter = { cumulative_return: { $lte: 0 } };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.filterMissingValues = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const filter = { $or: Coin.NULLABLE_FIELDS.map(f => ({ [f]: null })) };
    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

// Parameterized Info Routes
exports.getByName = async (req, res, next) => {
  try {
    const data = await Coin.findOne({ coin_name: new RegExp(req.params.coinName, 'i') });
    if (!data) return res.status(404).json({ error: "Coin not found" });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getBySymbol = async (req, res, next) => {
  try {
    const data = await Coin.find({ symbol: req.params.symbol.toUpperCase() });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getByRank = async (req, res, next) => {
  try {
    const rank = Number(req.params.rank);
    if (isNaN(rank)) return res.status(400).json({ error: "Rank must be a number" });
    const data = await Coin.find({ market_cap_rank: rank }).sort({ timestamp: -1 });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getByMonth = async (req, res, next) => {
  try {
    if (!/^\d{4}-\d{2}$/.test(req.params.month)) {
      return res.status(400).json({ error: "Invalid date. Use YYYY-MM-DD for date or YYYY-MM for month" });
    }
    const data = await Coin.find({ month: req.params.month });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getByDate = async (req, res, next) => {
  try {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(req.params.date)) {
      return res.status(400).json({ error: "Invalid date. Use YYYY-MM-DD" });
    }
    const data = await Coin.find({ date: req.params.date });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

// Analytics per Coin
exports.getPerformance = async (req, res, next) => {
  try {
    const data = await Coin.find({ coin_id: req.params.coinId }).sort({ timestamp: 1 });
    if (!data.length) return res.status(404).json({ error: "Coin not found", id: req.params.coinId });
    
    const startPrice = data[0].price;
    const endPrice = data[data.length - 1].price;
    const totalReturn = ((endPrice - startPrice) / startPrice) * 100;
    
    let bestDay = data[0];
    let worstDay = data[0];
    data.forEach(d => {
      if (d.daily_return > bestDay.daily_return) bestDay = d;
      if (d.daily_return < worstDay.daily_return) worstDay = d;
    });

    res.json({ data: { startPrice, endPrice, totalReturn, bestDay, worstDay } });
  } catch (err) {
    next(err);
  }
};

exports.getVolatility = async (req, res, next) => {
  try {
    const data = await Coin.find({ coin_id: req.params.coinId }, { date: 1, volatility_7d: 1 }).sort({ timestamp: 1 });
    const avg = await Coin.aggregate([
      { $match: { coin_id: req.params.coinId, volatility_7d: { $ne: null } } },
      { $group: { _id: null, avgVol: { $avg: "$volatility_7d" } } }
    ]);
    res.json({ data, avgVolatility: avg.length ? avg[0].avgVol : 0 });
  } catch (err) {
    next(err);
  }
};

exports.getMarketCapHistory = async (req, res, next) => {
  try {
    const data = await Coin.find({ coin_id: req.params.coinId }, { date: 1, market_cap: 1 }).sort({ timestamp: 1 });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getVolumeHistory = async (req, res, next) => {
  try {
    const data = await Coin.find({ coin_id: req.params.coinId }, { date: 1, volume: 1 }).sort({ timestamp: 1 });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getReturnsHistory = async (req, res, next) => {
  try {
    const data = await Coin.find({ coin_id: req.params.coinId }, { date: 1, daily_return: 1, cumulative_return: 1 }).sort({ timestamp: 1 });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.compareTwo = async (req, res, next) => {
  try {
    const [c1, c2] = await Promise.all([
      Coin.findOne({ coin_id: req.params.coin1 }).sort({ timestamp: -1 }),
      Coin.findOne({ coin_id: req.params.coin2 }).sort({ timestamp: -1 })
    ]);
    res.json({ data: { [req.params.coin1]: c1, [req.params.coin2]: c2 } });
  } catch (err) {
    next(err);
  }
};

exports.compareThree = async (req, res, next) => {
  try {
    const [c1, c2, c3] = await Promise.all([
      Coin.findOne({ coin_id: req.params.coin1 }).sort({ timestamp: -1 }),
      Coin.findOne({ coin_id: req.params.coin2 }).sort({ timestamp: -1 }),
      Coin.findOne({ coin_id: req.params.coin3 }).sort({ timestamp: -1 })
    ]);
    res.json({ data: { [req.params.coin1]: c1, [req.params.coin2]: c2, [req.params.coin3]: c3 } });
  } catch (err) {
    next(err);
  }
};

exports.getPrice = async (req, res, next) => {
  try {
    const data = await Coin.findOne({ coin_id: req.params.coinId }).sort({ timestamp: -1 });
    if (!data) return res.status(404).json({ error: "Coin not found", id: req.params.coinId });
    res.json({ data: { price: data.price } });
  } catch (err) {
    next(err);
  }
};

exports.getHistoryMonth = async (req, res, next) => {
  try {
    const data = await Coin.find({ coin_id: req.params.coinId, month: req.params.month }).sort({ timestamp: 1 });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const data = await Coin.find({ coin_id: req.params.coinId }).sort({ timestamp: 1 });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

// List and CRUD
exports.list = async (req, res, next) => {
  try {
    const query = req.query;
    const filter = {};
    const sortMap = { price: "price", volume: "volume", marketCap: "market_cap", dailyReturn: "daily_return", rank: "market_cap_rank", volatility: "volatility_7d", cumulativeReturn: "cumulative_return", timestamp: "timestamp", month: "month", name: "coin_name" };
    const sort = {};
    if (query.sort && sortMap[query.sort]) sort[sortMap[query.sort]] = -1;

    if (query.price) filter.price = Number(query.price);
    if (query.volume) filter.volume = Number(query.volume);
    if (query.rank) filter.market_cap_rank = Number(query.rank);
    if (query.month) filter.month = query.month;
    if (query.dailyReturn) filter.daily_return = Number(query.dailyReturn);
    if (query.volatility) filter.volatility_7d = Number(query.volatility);
    if (query.marketCap) filter.market_cap = Number(query.marketCap);
    if (query.symbol) filter.symbol = query.symbol.toUpperCase();

    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) filter.price.$gte = Number(query.minPrice);
      if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const data = await Coin.find(filter).sort(sort).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);

    res.json({ data: data, total: total, page: page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newCoin = await Coin.create(req.body);
    res.status(201).json({ message: "Coin created successfully", data: newCoin });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Record already exists" });
    }
    next(err);
  }
};

// ID specific CRUD
exports.getById = async (req, res, next) => {
  try {
    const data = await Coin.findById(req.params.id);
    if (!data) return res.status(404).json({ error: "Coin not found", id: req.params.id });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.replace = async (req, res, next) => {
  try {
    const data = await Coin.findOneAndReplace({ _id: req.params.id }, req.body, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ error: "Coin not found", id: req.params.id });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const data = await Coin.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ error: "Coin not found", id: req.params.id });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const data = await Coin.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ error: "Coin not found", id: req.params.id });
    res.json({ message: "Coin deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
};

exports.headById = async (req, res, next) => {
  try {
    const data = await Coin.findById(req.params.id);
    if (!data) return res.status(404).end();
    res.end();
  } catch (err) {
    next(err);
  }
};

exports.optionsById = (req, res) => {
  res.set("Allow", "GET,PUT,PATCH,DELETE,HEAD,OPTIONS").status(204).end();
};
