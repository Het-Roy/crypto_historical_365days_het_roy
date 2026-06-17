import React from 'react';
import { Flame, ChevronDown, Zap } from 'lucide-react';

function BottomStatusBar() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-background border-t border-border h-[40px] flex items-center justify-between px-4 text-[11px] font-medium text-textMuted z-50 overflow-x-auto no-scrollbar">
      
      {/* Left side stats */}
      <div className="flex items-center gap-4 whitespace-nowrap min-w-max">
        <div className="flex items-center gap-1">
          <span>Cryptos:</span>
          <span className="text-accentBlue hover:underline cursor-pointer">52.45M</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span>Exchanges:</span>
          <span className="text-accentBlue hover:underline cursor-pointer">947</span>
        </div>

        <div className="flex items-center gap-1">
          <span>Market Cap:</span>
          <span className="text-accentBlue hover:underline cursor-pointer">$2.23T</span>
          <span className="text-trendDown ml-1">▼ 0.36%</span>
        </div>

        <div className="flex items-center gap-1">
          <span>24h Vol:</span>
          <span className="text-accentBlue hover:underline cursor-pointer">$68.93B</span>
          <span className="text-trendDown ml-1">▼ 19.23%</span>
        </div>

        <div className="flex items-center gap-1">
          <span>Dominance:</span>
          <span className="text-accentBlue hover:underline cursor-pointer">BTC: 58.4% ETH: 9.5%</span>
        </div>

        <div className="flex items-center gap-1 hover:bg-card px-2 py-1 rounded cursor-pointer transition-colors">
          <Zap size={12} className="text-textMuted" />
          <span>ETH Gas:</span>
          <span className="text-accentBlue">0.49 Gwei</span>
          <ChevronDown size={12} />
        </div>

        <div className="flex items-center gap-1">
          <span>Fear & Greed:</span>
          <span className="text-accentBlue hover:underline cursor-pointer">23/100</span>
        </div>

        <div className="flex items-center gap-1">
          <span>Boost #2</span>
          <Flame size={12} className="text-orange-500" />
          <span className="text-orange-500">BSB</span>
          <span className="text-textMain">🚀 30</span>
        </div>
      </div>

      {/* Right side links */}
      <div className="flex items-center gap-4 whitespace-nowrap ml-4">
        <button className="text-accentBlue hover:underline">Get listed</button>
        <button className="text-accentBlue hover:underline">API</button>
      </div>

    </div>
  );
}

export default BottomStatusBar;
