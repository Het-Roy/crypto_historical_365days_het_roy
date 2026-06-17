import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Megaphone } from 'lucide-react';
import SparklineCell from './SparklineCell';

function DataTableRow({ coin }) {
  // Helpers for formatting
  const formatPercent = (val) => {
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
          <Star size={14} className="cursor-pointer hover:text-textMain transition-colors" />
          <span className="w-4 text-center">{coin.rank}</span>
        </div>
      </td>

      {/* Name, Ticker & Buy Button */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          {/* Logo Placeholder */}
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${coin.color}`}>
            {coin.symbol[0]}
          </div>
          
          <div className="flex items-center gap-2">
            <Link to={`/coins/${coin.symbol.toLowerCase()}`} className="font-bold text-textMain hover:text-accentBlue transition-colors">
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
      <td className="py-4 px-4 text-right font-medium text-textMain">
        ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
      </td>

      {/* 1h % */}
      <td className="py-4 px-4 text-right">
        {formatPercent(coin.percentChange1h)}
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
        ${coin.marketCap.toLocaleString()}
      </td>

      {/* Volume (24h) */}
      <td className="py-4 px-4 text-right">
        <div className="flex flex-col items-end">
          <span className="font-medium text-textMain">${coin.volume24h.toLocaleString()}</span>
          <span className="text-[10px] text-textMuted font-semibold">{coin.volumeInCrypto} {coin.symbol}</span>
        </div>
      </td>

      {/* Circulating Supply */}
      <td className="py-4 px-4 text-right">
        <div className="flex flex-col items-end">
          <span className="font-medium text-textMain">{coin.circulatingSupply.toLocaleString()} {coin.symbol}</span>
          {/* Tiny progress bar for supply if max supply exists */}
          {coin.maxSupply && (
             <div className="w-24 h-1 bg-border rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-textMuted" style={{ width: `${(coin.circulatingSupply / coin.maxSupply) * 100}%`}}></div>
             </div>
          )}
        </div>
      </td>

      {/* Last 7 Days Sparkline */}
      <td className="py-4 px-4 text-right">
        <SparklineCell isPositive={coin.percentChange7d >= 0} />
      </td>
    </tr>
  );
}

export default DataTableRow;
