import React from 'react';
import { ChevronDown, Filter, Columns, ChevronDown as CaretDown, Activity, DollarSign, Layers } from 'lucide-react';

function FilterRow() {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 mt-2">
      
      {/* Left side: Network Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar min-w-max pb-1 lg:pb-0">
        
        {/* Active Pill */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accentBlue/10 border border-accentBlue text-accentBlue text-xs font-semibold whitespace-nowrap transition-colors">
          <Layers size={14} />
          All Networks
        </button>

        {/* Network Pills */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border hover:bg-[#1a2639] text-textMain text-xs font-semibold whitespace-nowrap transition-colors">
           <div className="w-3.5 h-3.5 bg-yellow-400 rounded-full"></div>
           BSC
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border hover:bg-[#1a2639] text-textMain text-xs font-semibold whitespace-nowrap transition-colors">
           <div className="w-3.5 h-3.5 bg-purple-500 rounded-full"></div>
           Solana
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border hover:bg-[#1a2639] text-textMain text-xs font-semibold whitespace-nowrap transition-colors">
           <div className="w-3.5 h-3.5 bg-blue-500 rounded-full"></div>
           Base
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border hover:bg-[#1a2639] text-textMain text-xs font-semibold whitespace-nowrap transition-colors">
           <div className="w-3.5 h-3.5 bg-gray-300 rounded-full"></div>
           Ethereum
        </button>

        <button className="flex items-center gap-1 text-textMuted hover:text-textMain text-xs font-semibold whitespace-nowrap transition-colors ml-1">
          More <ChevronDown size={14} />
        </button>

      </div>

      {/* Right side: Metric Filters & Table Controls */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar min-w-max">
         <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-textMuted hover:text-textMain hover:bg-card text-xs font-semibold whitespace-nowrap transition-colors">
            <DollarSign size={14} /> Market Cap <CaretDown size={14} />
         </button>
         <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-textMuted hover:text-textMain hover:bg-card text-xs font-semibold whitespace-nowrap transition-colors">
            <Activity size={14} /> Volume(24h) <CaretDown size={14} />
         </button>

         <div className="w-px h-4 bg-border mx-1"></div>

         <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-card border border-border hover:bg-[#1a2639] text-textMain text-xs font-semibold whitespace-nowrap transition-colors">
            <Filter size={14} /> Filters
         </button>
         <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-card border border-border hover:bg-[#1a2639] text-textMain text-xs font-semibold whitespace-nowrap transition-colors">
            <Columns size={14} /> Columns
         </button>
      </div>

    </div>
  );
}

export default FilterRow;
