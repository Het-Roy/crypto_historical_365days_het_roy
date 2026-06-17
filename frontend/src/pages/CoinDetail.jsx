import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import AssetHeader from '../components/AssetHeader';
import ChartToolbar from '../components/ChartToolbar';
import MainPriceChart from '../components/MainPriceChart';
import StatsGrid from '../components/StatsGrid';
import SocialSidebar from '../components/SocialSidebar';
import { fetchCoinHistory } from '../services/api';

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCoin = async () => {
      setLoading(true);
      try {
        // Fetch full history for this coin_id and derive the summary from the latest record
        const res = await fetchCoinHistory(id, 365);

        if (res && res.data && res.data.length > 0) {
          const sorted = [...res.data].sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );
          const latest = sorted[sorted.length - 1];
          const oldest = sorted[0];

          const pct24h = latest.daily_return ?? 0;

          // 7-day % change
          const idx7 = Math.max(0, sorted.length - 8);
          const price7dAgo = sorted[idx7]?.price ?? oldest.price;
          const pct7d = price7dAgo
            ? ((latest.price - price7dAgo) / price7dAgo) * 100
            : 0;

          // Total return from first record
          const totalReturn = oldest.price
            ? ((latest.price - oldest.price) / oldest.price) * 100
            : 0;

          setCoin({
            id:                 id,
            rank:               latest.market_cap_rank ?? '–',
            name:               latest.coin_name,
            symbol:             (latest.symbol || '').toUpperCase(),
            color:              'bg-blue-500',
            price:              latest.price ?? 0,
            percentChange24h:   pct24h,
            percentChange7d:    pct7d,
            totalReturn,
            marketCap:          latest.market_cap ?? 0,
            volume24h:          latest.volume ?? 0,
            volatility7d:       latest.volatility_7d ?? 0,
            ma7:                latest.price_ma7 ?? 0,
            ma30:               latest.price_ma30 ?? 0,
            cumulativeReturn:   latest.cumulative_return ?? 0,
            allTimeHigh:        Math.max(...sorted.map(r => r.price)),
            allTimeLow:         Math.min(...sorted.map(r => r.price)),
            circulatingSupply:  0,
            maxSupply:          null,
          });
        } else {
          setCoin(null);
        }
      } catch (err) {
        console.error('Failed to load coin detail:', err);
        setCoin(null);
      } finally {
        setLoading(false);
      }
    };

    loadCoin();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full py-20 text-center text-textMuted animate-pulse">
        Loading coin details...
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="w-full py-20 text-center text-textMuted">
        Coin not found. Make sure the backend is running.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Breadcrumb */}
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

        {/* Right Column */}
        <div className="w-full lg:w-[30%]">
          <SocialSidebar />
        </div>

      </div>
    </div>
  );
}

export default CoinDetail;
