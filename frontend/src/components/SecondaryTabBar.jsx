import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const tabs = [
  "Top",
  "Trending",
  "Watchlist",
  "Stocks",
  "Prediction Markets",
  "Most Visited",
  "New",
  "Gainers"
];

function SecondaryTabBar() {
  const [activeTab, setActiveTab] = useState("Top");

  return (
    <div className="w-full bg-background border-b border-border px-4 md:px-6 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-6 min-w-max h-[48px]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative h-full flex items-center text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab ? 'text-textMain' : 'text-textMuted hover:text-textMain'
            }`}
          >
            {tab}
            {/* Active Tab Indicator */}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accentBlue rounded-t-sm" />
            )}
          </button>
        ))}

        {/* 'More' dropdown placeholder */}
        <button className="h-full flex items-center gap-1 text-sm font-semibold text-textMuted hover:text-textMain whitespace-nowrap transition-colors">
          More <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}

export default SecondaryTabBar;
