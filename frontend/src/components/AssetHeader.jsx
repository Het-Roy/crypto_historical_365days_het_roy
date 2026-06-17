import React from 'react';
import { Star, Share, Sparkles, ChevronRight } from 'lucide-react';

function AssetHeader({ coin }) {
  const isPositive = coin.percentChange24h >= 0;

  return (
    <div className="flex flex-col gap-4 mb-6">
      
      {/* Top Row: Identity & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo Placeholder */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${coin.color}`}>
            {coin.symbol[0]}
          </div>
          
          <h2 className="text-xl font-bold text-textMain">{coin.name}</h2>
          
          <span className="text-xs font-semibold text-textMuted bg-card border border-border px-1.5 py-0.5 rounded">
            {coin.symbol}
          </span>
          
          <span className="text-xs font-semibold text-textMuted bg-card border border-border px-1.5 py-0.5 rounded">
            #{coin.rank}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border hover:bg-[#1a2639] text-textMain text-xs font-semibold transition-colors">
            <Star size={14} className="text-textMuted" />
            20K
          </button>
          <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-card border border-border hover:bg-[#1a2639] text-textMain transition-colors">
            <Share size={14} className="text-textMuted" />
          </button>
        </div>
      </div>

      {/* Bottom Row: Price & AI Insight */}
      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold text-textMain">
          ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
        </span>
        
        <div className={`flex items-center gap-1 px-2 py-1 rounded font-semibold text-sm ${isPositive ? 'bg-trendUp/10 text-trendUp' : 'bg-trendDown/10 text-trendDown'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(coin.percentChange24h).toFixed(2)}% (24h)
        </div>
      </div>

      {/* AI Insight Link */}
      <div>
        <button className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#3861fb]/10 text-accentBlue hover:bg-[#3861fb]/20 transition-colors border border-accentBlue/20 cursor-pointer">
          <Sparkles size={14} className="text-[#a855f7]" />
          Why is {coin.symbol}'s price {isPositive ? 'up' : 'down'} today?
          <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}

export default AssetHeader;
