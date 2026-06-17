import React from 'react';
import { ChevronRight } from 'lucide-react';

function NewsCard({ source, time, headline, snippet, coinTag }) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border w-full flex flex-col shadow-sm cursor-pointer hover:bg-[#1a2639] transition-colors">
      <div className="flex items-center text-textMuted text-xs font-semibold mb-3 hover:text-textMain transition-colors">
        <span className="text-orange-500 mr-1">▶</span> {source} &middot; {time}
      </div>
      
      <h4 className="text-white text-sm font-bold mb-1 leading-snug line-clamp-2">
        {headline}
      </h4>
      
      <div className="text-textMuted text-xs leading-snug line-clamp-2">
        {coinTag && (
          <span className="inline-flex items-center bg-[#2a303f] text-accentBlue px-1 rounded mr-1 font-semibold">
             <span className="text-orange-400 mr-0.5">₿</span> {coinTag}
          </span>
        )}
        {snippet}
      </div>
    </div>
  );
}

export default NewsCard;
