import React from 'react';
import StatCards from '../components/StatCards';
import FilterRow from '../components/FilterRow';

function Home() {
  return (
    <div className="w-full">
      <StatCards />
      <FilterRow />
      {/* Placeholders for upcoming components */}
      <div className="mt-4 text-textMuted border border-dashed border-border p-8 rounded text-center">
         Data Table will go here
      </div>
    </div>
  );
}

export default Home;
