import React from 'react';

function SparklineCell({ data, isPositive }) {
  // A fake simple sparkline drawing since we don't have real 7d point data yet
  // This just creates a wavy line that ends higher if positive, lower if negative
  const strokeColor = isPositive ? '#16c784' : '#ea3943';
  const pathData = isPositive 
    ? "M0 25 Q 10 15 20 20 T 40 10 T 60 15 T 80 5 L 100 0" 
    : "M0 5 Q 10 15 20 10 T 40 20 T 60 15 T 80 25 L 100 30";

  return (
    <div className="w-[120px] h-[35px] flex items-center justify-end">
      <svg viewBox="0 0 100 30" className="w-full h-full preserve-aspect-ratio-none">
        <path 
          d={pathData} 
          fill="none" 
          stroke={strokeColor} 
          strokeWidth="1.5" 
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export default SparklineCell;
