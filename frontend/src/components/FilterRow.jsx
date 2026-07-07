import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Filter, TrendingUp, TrendingDown, BarChart3, DollarSign, Activity } from 'lucide-react';

function FilterRow({
  sortBy, setSortBy, sortDir, setSortDir,
  filter, setFilter,
  totalCoins, filteredCount,
}) {
  const toggleSortDir = () => setSortDir(d => d === 'asc' ? 'desc' : 'asc');

  const filterButtons = [
    { key: 'all', label: 'All Coins', icon: null },
    { key: 'bullish', label: 'Bullish', icon: <TrendingUp size={14} className="text-trendUp" /> },
    { key: 'bearish', label: 'Bearish', icon: <TrendingDown size={14} className="text-trendDown" /> },
    { key: 'high-volume', label: 'High Volume', icon: <BarChart3 size={14} /> },
    { key: 'high-mcap', label: 'High Market Cap', icon: <DollarSign size={14} /> },
  ];

  const sortOptions = [
    { key: 'rank', label: 'Rank' },
    { key: 'price', label: 'Price' },
    { key: 'marketCap', label: 'Market Cap' },
    { key: 'volume', label: 'Volume' },
    { key: 'change24h', label: '24h Change' },
    { key: 'change7d', label: '7d Change' },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 mt-2">
      
      {/* Left side: Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar min-w-max pb-1 lg:pb-0">
        <Filter size={14} className="text-textMuted shrink-0" />
        {filterButtons.map(fb => (
          <button
            key={fb.key}
            onClick={() => setFilter(fb.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === fb.key
                ? 'bg-accentBlue/10 border border-accentBlue text-accentBlue'
                : 'bg-card border border-border hover:bg-[#1a2639] text-textMain'
            }`}
          >
            {fb.icon}
            {fb.label}
          </button>
        ))}
        {filter !== 'all' && (
          <span className="text-xs text-textMuted ml-2">
            Showing {filteredCount} of {totalCoins}
          </span>
        )}
      </div>

      {/* Right side: Sort Controls */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar min-w-max">
        <Activity size={14} className="text-textMuted shrink-0" />
        <span className="text-xs text-textMuted font-semibold whitespace-nowrap">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-1.5 text-xs font-semibold text-textMain focus:outline-none focus:border-accentBlue appearance-none cursor-pointer"
        >
          {sortOptions.map(opt => (
            <option key={opt.key} value={opt.key}>{opt.label}</option>
          ))}
        </select>
        <button
          onClick={toggleSortDir}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-card border border-border hover:bg-[#1a2639] text-textMain text-xs font-semibold transition-colors"
          title={`Sort ${sortDir === 'asc' ? 'Ascending' : 'Descending'}`}
        >
          {sortDir === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          {sortDir === 'asc' ? 'Asc' : 'Desc'}
        </button>
      </div>

    </div>
  );
}

export default FilterRow;
