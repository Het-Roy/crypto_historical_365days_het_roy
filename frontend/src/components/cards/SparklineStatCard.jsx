import React from 'react';
import { ChevronRight } from 'lucide-react';

function SparklineStatCard({ title, value, change, isPositive, sparklineColor }) {
  // Simple SVG path for a fake sparkline for UI purposes
  const fakeSparklinePath = isPositive 
    ? "M0 20 Q 10 10 20 15 T 40 5 T 60 10 T 80 0 L 80 30 L 0 30 Z" 
    : "M0 5 Q 10 15 20 10 T 40 20 T 60 15 T 80 25 L 80 30 L 0 30 Z";
    
  return (
    <div className="bg-card rounded-xl p-4 border border-border w-full flex flex-col justify-between shadow-sm cursor-pointer hover:bg-[#1a2639] transition-colors">
      <div className="flex items-center text-textMuted text-xs font-semibold mb-2 hover:text-textMain transition-colors">
        {title} <ChevronRight size={14} className="ml-0.5" />
      </div>
      
      <div className="flex items-end gap-2 mb-3">
        <span className="text-white text-xl font-bold">{value}</span>
        <span className={`text-xs font-semibold mb-0.5 ${isPositive ? 'text-trendUp' : 'text-trendDown'}`}>
          {isPositive ? '▲' : '▼'} {change}
        </span>
      </div>

      <div className="h-10 w-full mt-auto">
        <svg viewBox="0 0 80 30" className="w-full h-full preserve-aspect-ratio-none">
          <path 
            d={fakeSparklinePath} 
            fill="none" 
            stroke={sparklineColor} 
            strokeWidth="1.5" 
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}

export default SparklineStatCard;
