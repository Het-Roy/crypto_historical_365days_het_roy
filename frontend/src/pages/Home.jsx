import React, { useState, useEffect } from 'react';
import StatCards from '../components/StatCards';
import FilterRow from '../components/FilterRow';
import DataTable from '../components/table/DataTable';
import { fetchMarketSummary } from '../services/api';

function Home() {
  const [marketSummary, setMarketSummary] = useState(null);

  useEffect(() => {
    const loadSummary = async () => {
      const res = await fetchMarketSummary();
      if (res && res.data) {
        setMarketSummary(res.data);
      }
    };
    loadSummary();
  }, []);

  return (
    <div className="w-full">
      <StatCards summary={marketSummary} />
      <FilterRow />
      
      {/* Main Data Table */}
      <DataTable />
    </div>
  );
}

export default Home;
