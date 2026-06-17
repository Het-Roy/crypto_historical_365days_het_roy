import React, { useState } from 'react';
import { LineChart, BarChart2, Plus, ChevronDown, Settings2 } from 'lucide-react';

function ChartToolbar() {
  const [activeMetric, setActiveMetric] = useState('Price');
  const [activeTime, setActiveTime] = useState('24h');
  const [isLog, setIsLog] = useState(false);

  const timeframes = ['24h', '1W', '1M', '1Y', 'All'];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full mb-4">
      
      {/* Left side: Metric Toggles & Chart Type */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        
        {/* Price / Mkt Cap Toggle */}
        <div className="flex bg-card rounded-lg p-0.5 border border-border">
          <button 
            onClick={() => setActiveMetric('Price')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${activeMetric === 'Price' ? 'bg-[#2a303f] text-textMain shadow-sm' : 'text-textMuted hover:text-textMain'}`}
          >
            Price
          </button>
          <button 
            onClick={() => setActiveMetric('Mkt Cap')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${activeMetric === 'Mkt Cap' ? 'bg-[#2a303f] text-textMain shadow-sm' : 'text-textMuted hover:text-textMain'}`}
          >
            Mkt Cap
          </button>
        </div>

        {/* Chart Type Icon */}
        <button className="flex items-center justify-center w-7 h-7 rounded-lg bg-card border border-border text-textMuted hover:text-textMain transition-colors">
          <LineChart size={14} />
        </button>

        {/* TradingView Toggle */}
        <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border text-textMuted hover:text-textMain transition-colors text-xs font-semibold h-7">
          <BarChart2 size={14} />
          TradingView
        </button>

      </div>

      {/* Right side: Compare & Timeframes */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        
        {/* Compare Dropdown */}
        <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-card border border-border text-textMuted hover:text-textMain transition-colors text-xs font-semibold h-7">
          <Plus size={14} />
          Compare
          <ChevronDown size={14} className="ml-1" />
        </button>

        {/* Timeframe Toggles */}
        <div className="flex bg-card rounded-lg p-0.5 border border-border">
          {timeframes.map(tf => (
             <button 
               key={tf}
               onClick={() => setActiveTime(tf)}
               className={`px-2 py-1 rounded-md text-xs font-semibold transition-colors ${activeTime === tf ? 'bg-[#2a303f] text-textMain shadow-sm' : 'text-textMuted hover:text-textMain'}`}
             >
               {tf}
             </button>
          ))}
          
          <div className="w-px bg-border mx-1 my-1"></div>
          
          {/* Log Scale Toggle */}
          <button 
             onClick={() => setIsLog(!isLog)}
             className={`px-2 py-1 rounded-md text-xs font-semibold transition-colors ${isLog ? 'text-accentBlue' : 'text-textMuted hover:text-textMain'}`}
           >
             Log
           </button>
        </div>

        {/* Settings Icon */}
        <button className="flex items-center justify-center w-7 h-7 rounded-lg text-textMuted hover:text-textMain transition-colors ml-1">
          <Settings2 size={16} />
        </button>

      </div>

    </div>
  );
}

export default ChartToolbar;
