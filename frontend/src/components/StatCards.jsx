import React from 'react';
import SparklineStatCard from './cards/SparklineStatCard';

// Helper to format large numbers cleanly
const formatLargeNumber = (num) => {
  if (!num || num === 0) return '$0.00';
  if (num >= 1e12) return `$${(num / 1e12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}T`;
  if (num >= 1e9)  return `$${(num / 1e9).toLocaleString('en-US',  { minimumFractionDigits: 2, maximumFractionDigits: 2 })}B`;
  if (num >= 1e6)  return `$${(num / 1e6).toLocaleString('en-US',  { minimumFractionDigits: 2, maximumFractionDigits: 2 })}M`;
  return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

function StatCards({ coins = [], loading = false }) {
  if (loading || !coins || coins.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-card rounded-xl p-4 border border-border h-[130px] flex animate-pulse">
             <div className="w-full h-full bg-[#1a2639] rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Calculate Global Market Cap
  const totalMarketCap = coins.reduce((acc, coin) => acc + (coin.marketCap || 0), 0);
  
  // Calculate Total 24h Volume
  const totalVolume = coins.reduce((acc, coin) => acc + (coin.volume24h || 0), 0);

  // Find Best Gainer (Highest 24h % change)
  const gainer = [...coins].sort((a, b) => (b.percentChange24h || 0) - (a.percentChange24h || 0))[0];
  
  // Find Worst Loser (Lowest 24h % change)
  const loser = [...coins].sort((a, b) => (a.percentChange24h || 0) - (b.percentChange24h || 0))[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Global Market Cap */}
      <SparklineStatCard 
        title="Global Market Cap" 
        value={formatLargeNumber(totalMarketCap)} 
        change="" 
        isPositive={true} 
        sparklineColor="#3b82f6" // blue
      />
      
      {/* Global 24h Volume */}
      <SparklineStatCard 
        title="Global 24h Volume" 
        value={formatLargeNumber(totalVolume)} 
        change="" 
        isPositive={true} 
        sparklineColor="#8b5cf6" // purple
      />

      {/* Top Gainer */}
      <SparklineStatCard 
        title="Top Gainer (24h)" 
        value={gainer ? gainer.name : '—'} 
        change={gainer ? `${gainer.percentChange24h > 0 ? '+' : ''}${(gainer.percentChange24h || 0).toFixed(2)}%` : ''} 
        isPositive={gainer ? gainer.percentChange24h >= 0 : true} 
        sparklineColor="#16c784" // green
      />

      {/* Top Loser */}
      <SparklineStatCard 
        title="Top Loser (24h)" 
        value={loser ? loser.name : '—'} 
        change={loser ? `${loser.percentChange24h > 0 ? '+' : ''}${(loser.percentChange24h || 0).toFixed(2)}%` : ''} 
        isPositive={loser ? loser.percentChange24h >= 0 : false} 
        sparklineColor="#ea3943" // red
      />
    </div>
  );
}

export default StatCards;
