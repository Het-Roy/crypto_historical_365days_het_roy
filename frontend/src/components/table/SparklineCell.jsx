import React from 'react';

/**
 * SparklineCell
 * Renders a real mini SVG line chart from an array of price points.
 * Falls back to a placeholder wave if no data is provided.
 *
 * @param {number[]} data      - Array of price values (7 days)
 * @param {boolean}  isPositive - Whether the trend is positive (green) or negative (red)
 */
function SparklineCell({ data = [], isPositive }) {
  const strokeColor = isPositive ? '#16c784' : '#ea3943';

  // If we have real data, compute an SVG polyline path
  if (data && data.length >= 2) {
    const width = 100;
    const height = 30;
    const padding = 2;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1; // avoid division by zero if all prices equal

    // Map each price value to an (x, y) coordinate
    const points = data.map((price, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      // Invert Y: high price → low y (top of SVG)
      const y = padding + ((max - price) / range) * (height - padding * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return (
      <div className="w-[120px] h-[35px] flex items-center justify-end">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
          <polyline
            points={points.join(' ')}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // Fallback: simple static wave placeholder
  const pathData = isPositive
    ? 'M0 25 Q 10 15 20 20 T 40 10 T 60 15 T 80 5 L 100 0'
    : 'M0 5 Q 10 15 20 10 T 40 20 T 60 15 T 80 25 L 100 30';

  return (
    <div className="w-[120px] h-[35px] flex items-center justify-end">
      <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
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
