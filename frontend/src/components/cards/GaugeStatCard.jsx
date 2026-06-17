import React from 'react';
import { ChevronRight } from 'lucide-react';

function GaugeStatCard({ title, score, label }) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border w-full flex flex-col items-center justify-between shadow-sm cursor-pointer hover:bg-[#1a2639] transition-colors">
      <div className="w-full flex items-center text-textMuted text-xs font-semibold mb-2 hover:text-textMain transition-colors">
        {title} <ChevronRight size={14} className="ml-0.5" />
      </div>
      
      <div className="relative w-24 h-12 mt-2 overflow-hidden">
        {/* Semicircle Track */}
        <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-[8px] border-border box-border"></div>
        {/* Semicircle Fill (Gradient approximation using conic-gradient) */}
        <div 
          className="absolute top-0 left-0 w-24 h-24 rounded-full border-[8px] border-transparent box-border"
          style={{
            borderTopColor: '#ea3943',   // Red
            borderRightColor: '#f1a53a', // Orange
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            transform: 'rotate(45deg)', // Rotate to align top-half
          }}
        ></div>
        {/* Pointer / Value Label inside gauge */}
        <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end leading-none">
          <span className="text-white text-xl font-bold">{score}</span>
          <span className="text-textMuted text-[10px] uppercase tracking-wider font-semibold mt-1">{label}</span>
        </div>
      </div>
    </div>
  );
}

export default GaugeStatCard;
