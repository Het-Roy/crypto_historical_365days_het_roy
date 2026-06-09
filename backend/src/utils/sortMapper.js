const sortMap = {
  price: "price",
  volume: "volume",
  marketCap: "market_cap",
  dailyReturn: "daily_return",
  rank: "market_cap_rank",
  volatility: "volatility_7d",
  cumulativeReturn: "cumulative_return",
  timestamp: "timestamp",
  month: "month",
  name: "coin_name",
};

const getSortObject = (query) => {
  const sort = {};
  if (query.sort && sortMap[query.sort]) {
    sort[sortMap[query.sort]] = -1; // Default to desc, or adjust if sort-asc is used
  }
  return sort;
};

module.exports = { sortMap, getSortObject };
