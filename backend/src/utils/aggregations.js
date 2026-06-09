// utils/aggregations.js
const Coin = require("../models/Coin");

const getDynamicAverage = async (field) => {
  const result = await Coin.aggregate([
    { $match: { [field]: { $ne: null } } },
    { $group: { _id: null, avgValue: { $avg: `$${field}` } } }
  ]);
  return result.length ? result[0].avgValue : 0;
};

module.exports = {
  getDynamicAverage,
};
