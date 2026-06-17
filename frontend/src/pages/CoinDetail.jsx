import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import AssetHeader from '../components/AssetHeader';

// Dummy data to match the table
const dummyCoins = {
  "btc": {
    rank: 1, name: "Bitcoin", symbol: "BTC", color: "bg-orange-500", price: 65094.04, percentChange24h: -0.91,
  },
  "eth": {
    rank: 2, name: "Ethereum", symbol: "ETH", color: "bg-blue-600", price: 3455.36, percentChange24h: -1.48,
  },
  "usdt": {
    rank: 3, name: "Tether", symbol: "USDT", color: "bg-teal-500", price: 0.9989, percentChange24h: -0.01,
  }
};

function CoinDetail() {
  const { id } = useParams();
  const coin = dummyCoins[id?.toLowerCase()] || dummyCoins.btc;

  return (
    <div className="w-full">
      {/* Simple Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-textMuted mb-4">
        <Link to="/" className="hover:text-accentBlue transition-colors">Cryptocurrencies</Link>
        <ChevronRight size={12} />
        <Link to="/" className="hover:text-accentBlue transition-colors">Coins</Link>
        <ChevronRight size={12} />
        <span className="text-textMain">{coin.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column */}
        <div className="w-full lg:w-[70%]">
          <AssetHeader coin={coin} />
          
          <div className="mt-8 text-textMuted border border-dashed border-border p-8 rounded text-center">
             ChartToolbar, MainPriceChart, and StatsGrid will go here
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-full lg:w-[30%]">
          <div className="text-textMuted border border-dashed border-border p-8 rounded text-center h-full min-h-[400px]">
             SocialSidebar will go here
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default CoinDetail;
