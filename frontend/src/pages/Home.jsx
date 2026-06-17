import React from 'react';
import StatCards from '../components/StatCards';

function Home() {
  return (
    <div className="w-full">
      <StatCards />
      {/* Placeholders for upcoming components */}
      <div className="mt-8 text-textMuted border border-dashed border-border p-8 rounded text-center">
         Filter Row & Data Table will go here
      </div>
    </div>
  );
}

export default Home;
