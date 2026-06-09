const Coin = require("../models/Coin");

exports.search = async (req, res, next) => {
  try {
    const q = req.query.q || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    if (q === "top-gainers") {
      const data = await Coin.find({ daily_return: { $gt: 0 } }).sort({ daily_return: -1 }).limit(10);
      return res.json({ data });
    }
    
    if (q === "top-losers") {
      const data = await Coin.find({ daily_return: { $lt: 0 } }).sort({ daily_return: 1 }).limit(10);
      return res.json({ data });
    }
    
    if (q === "high-volume") {
      const agg = await Coin.aggregate([
        { $match: { volume: { $ne: null } } },
        { $group: { _id: null, avgValue: { $avg: "$volume" } } }
      ]);
      const avgVolume = agg.length ? agg[0].avgValue : 0;
      
      const data = await Coin.find({ volume: { $gte: avgVolume } }).skip(skip).limit(limit);
      const total = await Coin.countDocuments({ volume: { $gte: avgVolume } });
      return res.json({ data, total, page, totalPages: Math.ceil(total / limit) });
    }
    
    if (q === "trending") {
      const trending = await Coin.aggregate([
        { $group: { _id: "$coin_id", avgVolume: { $avg: "$volume" } } },
        { $sort: { avgVolume: -1 } },
        { $limit: 10 }
      ]);
      return res.json({ data: trending });
    }
    
    if (q === "history") {
      const data = await Coin.find().sort({ timestamp: 1 }).skip(skip).limit(limit);
      const total = await Coin.countDocuments();
      return res.json({ data, total, page, totalPages: Math.ceil(total / limit) });
    }
    
    if (q === "analytics") {
      return res.json({ message: "Redirect to analytics logic or call analytics directly." });
    }
    
    if (q === "prediction") {
      return res.json({ message: "Prediction placeholder hook" });
    }

    // Default search
    const regex = new RegExp(q, "i");
    const filter = {
      $or: [
        { coin_name: regex },
        { symbol: regex },
        { coin_id: regex },
        { month: regex },
        { date: regex },
      ]
    };

    const data = await Coin.find(filter).skip(skip).limit(limit);
    const total = await Coin.countDocuments(filter);
    res.json({ data, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};
