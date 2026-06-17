import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import AssetHeader from '../components/AssetHeader';
import ChartToolbar from '../components/ChartToolbar';
import MainPriceChart from '../components/MainPriceChart';
import StatsGrid from '../components/StatsGrid';
import SocialSidebar from '../components/SocialSidebar';
import { fetchCoinById } from '../services/api';

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCoin = async () => {
      setLoading(true);
      const res = await fetchCoinById(id);
      
      if (res && res.data) {
        // Map API response to component shape
        const c = res.data;
        setCoin({
          id: c._id || c.id || c.symbol,
          rank: c.market_cap_rank || 1,
          name: c.name,
          symbol: (c.symbol || '').toUpperCase(),
          color: "bg-blue-500",
          price: c.current_price || 0,
          percentChange24h: c.price_change_percentage_24h || 0,
          marketCap: c.market_cap || 0,
          volume24h: c.total_volume || 0,
          circulatingSupply: c.circulating_supply || 0,
          maxSupply: c.max_supply || null,
        });
      }
      setLoading(false);
    };
    
    loadCoin();
  }, [id]);

  if (loading) {
    return <div className="w-full py-20 text-center text-textMuted animate-pulse">Loading coin details...</div>;
  }

  if (!coin) {
    return <div className="w-full py-20 text-center text-textMuted">Coin not found.</div>;
  }

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
          <ChartToolbar />
          
          <div className="mt-4 border border-border rounded-xl p-4 bg-background">
             <MainPriceChart coin={coin} />
          </div>

          <StatsGrid coin={coin} />
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-full lg:w-[30%]">
          <SocialSidebar />
        </div>
        
      </div>
    </div>
  );
}

export default CoinDetail;
