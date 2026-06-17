import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import SparklineCell from './SparklineCell';

// Format large numbers cleanly: 1,200,000,000 → $1.20B
const formatLargeNumber = (num) => {
  if (!num || num === 0) return '—';
  if (num >= 1e12) return `$${(num / 1e12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}T`;
  if (num >= 1e9)  return `$${(num / 1e9).toLocaleString('en-US',  { minimumFractionDigits: 2, maximumFractionDigits: 2 })}B`;
  if (num >= 1e6)  return `$${(num / 1e6).toLocaleString('en-US',  { minimumFractionDigits: 2, maximumFractionDigits: 2 })}M`;
  return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatPrice = (price) => {
  if (!price) return '—';
  if (price >= 1000)
    return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
};

function DataTableRow({ coin }) {
  const formatPercent = (val) => {
    if (val === null || val === undefined || isNaN(val)) {
      return <span className="text-textMuted">—</span>;
    }
    const isPositive = val >= 0;
    return (
      <span className={`flex items-center justify-end gap-1 font-medium ${isPositive ? 'text-trendUp' : 'text-trendDown'}`}>
        {isPositive ? '▲' : '▼'} {Math.abs(val).toFixed(2)}%
      </span>
    );
  };

  return (
    <tr className="border-b border-border hover:bg-[#1a2639] transition-colors group">
      {/* Rank & Actions */}
      <td className="py-4 px-4 text-textMuted font-semibold text-xs">
        <div className="flex items-center gap-3">
          <Star size={14} className="cursor-pointer hover:text-yellow-400 transition-colors" />
          <span className="w-4 text-center">{coin.rank}</span>
        </div>
      </td>

      {/* Name, Ticker & Buy Button */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white ${coin.color} shrink-0`}>
            {coin.symbol[0]}
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/coins/${coin.id}`} className="font-bold text-textMain hover:text-accentBlue transition-colors">
              {coin.name}
            </Link>
            <span className="text-xs font-semibold text-textMuted bg-card px-1.5 py-0.5 rounded">{coin.symbol}</span>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent border border-accentBlue text-accentBlue px-2 py-0.5 rounded-full text-xs font-semibold ml-2 hover:bg-accentBlue hover:text-white">
              Buy
            </button>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="py-4 px-4 text-right font-semibold text-textMain">
        {formatPrice(coin.price)}
      </td>



      {/* 24h % */}
      <td className="py-4 px-4 text-right">
        {formatPercent(coin.percentChange24h)}
      </td>

      {/* 7d % */}
      <td className="py-4 px-4 text-right">
        {formatPercent(coin.percentChange7d)}
      </td>

      {/* Market Cap */}
      <td className="py-4 px-4 text-right font-medium text-textMain">
        {formatLargeNumber(coin.marketCap)}
      </td>

      {/* Volume (24h) */}
      <td className="py-4 px-4 text-right">
        <div className="flex flex-col items-end">
          <span className="font-medium text-textMain">{formatLargeNumber(coin.volume24h)}</span>
          {coin.volume24h > 0 && coin.price > 0 && (
            <span className="text-[10px] text-textMuted font-semibold">
              {(coin.volume24h / coin.price).toLocaleString('en-US', { maximumFractionDigits: 0 })} {coin.symbol}
            </span>
          )}
        </div>
      </td>



      {/* Last 7 Days Sparkline */}
      <td className="py-4 px-4 text-right">
        <SparklineCell data={coin.sparkline} isPositive={coin.percentChange7d >= 0} />
      </td>
    </tr>
  );
}

export default DataTableRow;
