// Coin brand colors by symbol (extended for 100+ coins)
export const COIN_COLORS = {
  BTC:   'bg-orange-500',
  ETH:   'bg-indigo-500',
  SOL:   'bg-purple-500',
  AAVE:  'bg-blue-500',
  BNB:   'bg-yellow-500',
  ADA:   'bg-sky-500',
  XRP:   'bg-blue-700',
  DOT:   'bg-pink-500',
  DOGE:  'bg-yellow-400',
  MATIC: 'bg-violet-500',
  USDT:  'bg-green-600',
  USDC:  'bg-blue-600',
  LINK:  'bg-blue-400',
  UNI:   'bg-pink-400',
  LTC:   'bg-gray-400',
  AVAX:  'bg-red-500',
  TRX:   'bg-red-600',
  SHIB:  'bg-orange-400',
  ATOM:  'bg-indigo-400',
  NEAR:  'bg-emerald-500',
  FIL:   'bg-cyan-500',
  APT:   'bg-teal-500',
  ARB:   'bg-blue-400',
  SUI:   'bg-cyan-400',
  PEPE:  'bg-green-500',
  DAI:   'bg-yellow-600',
  STETH: 'bg-cyan-600',
  WBTC:  'bg-orange-600',
  LEO:   'bg-amber-600',
  OKB:   'bg-blue-500',
  ETC:   'bg-green-700',
  KAS:   'bg-teal-600',
  HBAR:  'bg-gray-600',
  XLM:   'bg-yellow-300',
  XMR:   'bg-orange-500',
  QNT:   'bg-indigo-600',
  VET:   'bg-blue-500',
  BCH:   'bg-green-500',
  HT:    'bg-blue-800',
  TON:   'bg-sky-600',
  WLD:   'bg-gray-500',
  ONDO:  'bg-indigo-500',
  FLR:   'bg-pink-600',
  POL:   'bg-purple-600',
  TAO:   'bg-gray-800',
  CRO:   'bg-blue-900',
  MNT:   'bg-slate-500',
  ZEC:   'bg-amber-500',
  PI:    'bg-purple-400',
  TRUMP: 'bg-red-700',
};

// Helper: get a deterministic color for unknown coins based on symbol hash
function hashColor(symbol) {
  const colors = [
    'bg-rose-500', 'bg-sky-600', 'bg-amber-500', 'bg-emerald-600',
    'bg-violet-600', 'bg-cyan-600', 'bg-fuchsia-500', 'bg-lime-600',
    'bg-teal-500', 'bg-indigo-600', 'bg-orange-600', 'bg-pink-600',
  ];
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) hash = hash * 31 + symbol.charCodeAt(i);
  return colors[Math.abs(hash) % colors.length];
}

export function getCoinColor(symbol) {
  return COIN_COLORS[symbol] || hashColor(symbol);
}

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
    color:           getCoinColor((latest.symbol || '').toUpperCase()),
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
