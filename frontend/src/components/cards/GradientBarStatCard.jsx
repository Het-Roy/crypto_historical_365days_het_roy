import React from 'react';
import { ChevronRight } from 'lucide-react';

function GradientBarStatCard({ title, score, maxScore, labelLeft, labelRight }) {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="bg-card rounded-xl p-4 border border-border w-full flex flex-col justify-between shadow-sm cursor-pointer hover:bg-[#1a2639] transition-colors">
      <div className="flex items-center text-textMuted text-xs font-semibold mb-2 hover:text-textMain transition-colors">
        {title} <ChevronRight size={14} className="ml-0.5" />
      </div>
      
      <div className="flex items-end gap-1 mb-4">
        <span className="text-white text-xl font-bold">{score}</span>
        <span className="text-textMuted text-xs font-semibold mb-1">/{maxScore}</span>
      </div>

      <div className="w-full mt-auto">
        <div className="flex justify-between text-[10px] text-textMuted font-semibold mb-1 uppercase tracking-wider">
          <span>{labelLeft}</span>
          <span>{labelRight}</span>
        </div>
        <div className="relative h-1.5 w-full rounded-full bg-gradient-to-r from-orange-400 via-blue-400 to-accentBlue overflow-visible">
          {/* Draggable Dot Indicator */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow border-2 border-background"
            style={{ left: `calc(${percentage}% - 6px)` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default GradientBarStatCard;
