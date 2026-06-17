// Coin brand colors by symbol (extended as needed)
export const COIN_COLORS = {
  BTC:  'bg-orange-500',
  ETH:  'bg-indigo-500',
  SOL:  'bg-purple-500',
  AAVE: 'bg-blue-500',
  BNB:  'bg-yellow-500',
  ADA:  'bg-sky-500',
  XRP:  'bg-blue-700',
  DOT:  'bg-pink-500',
  DOGE: 'bg-yellow-400',
  MATIC:'bg-violet-500',
};

/** Aggregate all records for a coin_id and produce a single summary row */
export function aggregateCoinRecords(records) {
  if (!records.length) return null;

  // Sort chronologically
  const sorted = [...records].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const latest  = sorted[sorted.length - 1];
  const oldest  = sorted[0];

  // Daily return = latest day's daily_return field
  const dailyReturn = latest.daily_return ?? 0;

  // 7-day return: compare price 7 records ago vs latest
  const idx7 = Math.max(0, sorted.length - 8);
  const price7dAgo = sorted[idx7]?.price ?? oldest.price;
  const pct7d = price7dAgo
    ? ((latest.price - price7dAgo) / price7dAgo) * 100
    : 0;

  // Last 7 price points for sparkline
  const sparkline = sorted.slice(-7).map(r => r.price);

  return {
    id:              latest.coin_id,
    rank:            latest.market_cap_rank ?? 999,
    name:            latest.coin_name,
    symbol:          (latest.symbol || '').toUpperCase(),
    color:           COIN_COLORS[(latest.symbol || '').toUpperCase()] || 'bg-blue-500',
    price:           latest.price ?? 0,
    percentChange1h: 0,                 // not in dataset
    percentChange24h: dailyReturn,
    percentChange7d: pct7d,
    marketCap:       latest.market_cap ?? 0,
    volume24h:       latest.volume ?? 0,
    volumeInCrypto:  latest.price ? (latest.volume / latest.price).toFixed(2) : '0',
    circulatingSupply: 0,              // not in dataset
    maxSupply:       null,
    sparkline,
  };
}
