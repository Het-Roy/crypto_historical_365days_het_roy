import React, { useState, useEffect } from 'react';
import StatCards from '../components/StatCards';
import FilterRow from '../components/FilterRow';
import DataTable from '../components/table/DataTable';
import { fetchAllCoins } from '../services/api';
import { aggregateCoinRecords } from '../utils/coinUtils';

function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchAllCoins(1, 200);
        if (res && res.data && res.data.length > 0) {
          const groups = {};
          res.data.forEach(record => {
            const id = record.coin_id;
            if (!groups[id]) groups[id] = [];
            groups[id].push(record);
          });

          const aggregated = Object.values(groups)
            .map(aggregateCoinRecords)
            .filter(Boolean)
            .sort((a, b) => a.rank - b.rank);

          setCoins(aggregated);
        }
      } catch (err) {
        console.error('Failed to load coins:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="w-full">
      <StatCards coins={coins} loading={loading} />
      <FilterRow />
      
      {/* Main Data Table */}
      <DataTable coins={coins} loading={loading} />
    </div>
  );
}

export default Home;
