import React from 'react';
import { Info, Triangle } from 'lucide-react';

function StatItem({ title, value, subValue, subIsPositive, rank }) {
  return (
    <div className="flex flex-col py-3 border-b border-border last:border-0 md:border-0 md:p-4 md:border-r md:last:border-r-0">
      <div className="flex items-center gap-1 text-textMuted text-xs font-semibold mb-1">
        {title}
        <Info size={12} className="cursor-help hover:text-textMain transition-colors" />
      </div>
      
      <div className="flex items-end gap-2">
        <span className="text-textMain font-bold text-lg">{value}</span>
        {rank && (
          <span className="text-[10px] bg-card border border-border text-textMuted px-1.5 rounded font-semibold mb-1">
            #{rank}
          </span>
        )}
      </div>

      {subValue && (
        <div className={`flex items-center gap-1 text-xs font-semibold mt-1 ${subIsPositive !== undefined ? (subIsPositive ? 'text-trendUp' : 'text-trendDown') : 'text-textMuted'}`}>
          {subIsPositive !== undefined && (
            <Triangle size={8} className={subIsPositive ? '' : 'rotate-180'} fill="currentColor" />
          )}
          {subValue}
        </div>
      )}
    </div>
  );
}

function StatsGrid({ coin }) {
  // Defensive fallbacks
  if (!coin) return null;

  const mcap = coin.marketCap || 0;
  const vol = coin.volume24h || 0;
  const fdv = mcap * 1.1; // Dummy math for FDV
  const volMcapRatio = mcap > 0 ? ((vol / mcap) * 100).toFixed(2) + '%' : 'N/A';

  return (
    <div className="w-full mt-6 mb-8">
      <h3 className="text-lg font-bold text-textMain mb-4">{coin.name} Performance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 md:gap-y-6">
        
        <StatItem 
          title="Market Cap" 
          value={`$${mcap.toLocaleString()}`} 
          subValue="0.87%" 
          subIsPositive={false}
          rank={coin.rank}
        />
        
        <StatItem 
          title="Volume (24h)" 
          value={`$${vol.toLocaleString()}`} 
          subValue="12.3%" 
          subIsPositive={true}
          rank={coin.rank + 2} // dummy rank
        />

        <StatItem 
          title="Volume/Market cap (24h)" 
          value={volMcapRatio} 
        />

        <StatItem 
          title="Fully Diluted Market Cap" 
          value={`$${fdv.toLocaleString()}`} 
          subValue="0.87%" 
          subIsPositive={false}
        />

        <StatItem 
          title="Circulating Supply" 
          value={`${coin.circulatingSupply?.toLocaleString() || '0'} ${coin.symbol}`} 
        />

        <StatItem 
          title="Total Supply" 
          value={`${(coin.circulatingSupply * 1.05).toLocaleString()} ${coin.symbol}`} 
        />

        <StatItem 
          title="Max Supply" 
          value={coin.maxSupply ? `${coin.maxSupply.toLocaleString()} ${coin.symbol}` : '∞'} 
        />

      </div>
    </div>
  );
}

export default StatsGrid;
