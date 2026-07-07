import React, { useState, useEffect } from 'react';
import StatCards from '../components/StatCards';
import FilterRow from '../components/FilterRow';
import DataTable from '../components/table/DataTable';
import { fetchCoinSummary } from '../services/api';
import { getCoinColor } from '../utils/coinUtils';

function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('rank');
  const [sortDir, setSortDir] = useState('asc');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCoinSummary();
        if (res && res.data && res.data.length > 0) {
          // Map server aggregation to the format our components expect
          const mapped = res.data.map(coin => ({
            id:              coin.coin_id || coin._id,
            rank:            coin.market_cap_rank ?? 999,
            name:            coin.coin_name,
            symbol:          (coin.symbol || '').toUpperCase(),
            color:           getCoinColor((coin.symbol || '').toUpperCase()),
            price:           coin.price ?? 0,
            percentChange1h: 0,
            percentChange24h: coin.daily_return ?? 0,
            percentChange7d: coin.percentChange7d ?? 0,
            marketCap:       coin.market_cap ?? 0,
            volume24h:       coin.volume ?? 0,
            circulatingSupply: 0,
            maxSupply:       null,
            sparkline:       coin.sparkline || [],
          }));

          setCoins(mapped);
        } else {
          setError('No coin data found in the database.');
        }
      } catch (err) {
        console.error('Failed to load coins:', err);
        setError('Failed to connect to the backend. Make sure the server is running on http://localhost:3000');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Apply filter
  const filtered = coins.filter(coin => {
    if (filter === 'bullish') return coin.percentChange24h > 0;
    if (filter === 'bearish') return coin.percentChange24h < 0;
    if (filter === 'high-volume') return coin.volume24h > 1e9;
    if (filter === 'high-mcap') return coin.marketCap > 1e11;
    return true; // 'all'
  });

  // Apply sort
  const sorted = [...filtered].sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1;
    const fieldMap = {
      rank: 'rank',
      price: 'price',
      marketCap: 'marketCap',
      volume: 'volume24h',
      change24h: 'percentChange24h',
      change7d: 'percentChange7d',
    };
    const field = fieldMap[sortBy] || 'rank';
    return ((a[field] || 0) - (b[field] || 0)) * dir;
  });

  return (
    <div className="w-full">
      <StatCards coins={coins} loading={loading} />

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <FilterRow
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDir={sortDir}
        setSortDir={setSortDir}
        filter={filter}
        setFilter={setFilter}
        totalCoins={coins.length}
        filteredCount={filtered.length}
      />
      
      {/* Main Data Table */}
      <DataTable coins={sorted} loading={loading} />
    </div>
  );
}

export default Home;
