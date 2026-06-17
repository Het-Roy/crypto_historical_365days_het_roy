import React from 'react';
import SparklineStatCard from './cards/SparklineStatCard';
import GaugeStatCard from './cards/GaugeStatCard';
import GradientBarStatCard from './cards/GradientBarStatCard';
import NewsCard from './cards/NewsCard';

function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <SparklineStatCard 
        title="Market Cap" 
        value="$2.23T" 
        change="0.36%" 
        isPositive={false} 
        sparklineColor="#ea3943" 
      />
      
      <SparklineStatCard 
        title="CMC20" 
        value="$132.77" 
        change="0.87%" 
        isPositive={false} 
        sparklineColor="#ea3943" 
      />

      <GaugeStatCard 
        title="Fear & Greed" 
        score={23} 
        label="Fear" 
      />

      <GradientBarStatCard 
        title="Altcoin Season" 
        score={46} 
        maxScore={100} 
        labelLeft="Bitcoin" 
        labelRight="Altcoin" 
      />

      {/* Spanning 1 col, combining RSI and News in real app might require a different grid, 
          but treating them as individual cards here for simplicity. */}
      <NewsCard 
        source="BTC World News"
        time="8h"
        headline="BlackRock Buys 16.4 Million in $BTC Amid Macro Uncertainty"
        snippet="BlackRock makes a massive move in the crypto market..."
        coinTag="$BTC"
      />
    </div>
  );
}

export default StatCards;
