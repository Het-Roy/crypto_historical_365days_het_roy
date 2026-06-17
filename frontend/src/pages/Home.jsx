import React from 'react';
import StatCards from '../components/StatCards';
import FilterRow from '../components/FilterRow';
import DataTable from '../components/table/DataTable';

function Home() {
  return (
    <div className="w-full">
      <StatCards />
      <FilterRow />
      
      {/* Main Data Table */}
      <DataTable />
    </div>
  );
}

export default Home;
