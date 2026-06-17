import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, MoreHorizontal } from 'lucide-react';

// Dummy chat data
const initialChats = [
  {
    id: 1,
    user: "CryptoWhale99",
    avatar: "C",
    color: "bg-blue-500",
    time: "2m",
    sentiment: "bullish",
    text: "Just bought the dip! Let's go to the moon! 🚀🚀",
    likes: 12,
    replies: 2
  },
  {
    id: 2,
    user: "BearMarketSurvivor",
    avatar: "B",
    color: "bg-red-500",
    time: "15m",
    sentiment: "bearish",
    text: "Looking weak on the 4H chart. I expect a retest of lower support levels soon.",
    likes: 5,
    replies: 0
  },
  {
    id: 3,
    user: "DiamondHands",
    avatar: "D",
    color: "bg-purple-500",
    time: "1h",
    sentiment: "bullish",
    text: "I've been holding since 2018. A 2% drop is nothing.",
    likes: 45,
    replies: 8
  }
];

function SocialSidebar() {
  const [activeTab, setActiveTab] = useState('Live Chat');

  return (
    <div className="w-full flex flex-col h-full bg-background border border-border rounded-xl overflow-hidden">
      
      {/* Tabs */}
      <div className="flex items-center border-b border-border bg-card">
        {['Live Chat', 'News', 'Articles'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === tab 
                ? 'border-accentBlue text-accentBlue' 
                : 'border-transparent text-textMuted hover:text-textMain'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Live Chat' && (
        <div className="flex flex-col flex-grow">
          {/* Input Area */}
          <div className="p-4 border-b border-border bg-[#1a2639]/30">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0"></div>
              <div className="w-full">
                <input 
                  type="text" 
                  placeholder="Bullish or Bearish?" 
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-accentBlue transition-colors"
                />
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 py-1.5 rounded-md bg-trendUp/10 text-trendUp border border-trendUp/20 text-xs font-bold hover:bg-trendUp/20 transition-colors">
                    Bullish
                  </button>
                  <button className="flex-1 py-1.5 rounded-md bg-trendDown/10 text-trendDown border border-trendDown/20 text-xs font-bold hover:bg-trendDown/20 transition-colors">
                    Bearish
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-grow overflow-y-auto">
            {initialChats.map((chat) => (
              <div key={chat.id} className="p-4 border-b border-border/50 hover:bg-[#1a2639]/20 transition-colors">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${chat.color}`}>
                      {chat.avatar}
                    </div>
                    <span className="text-xs font-bold text-textMain">{chat.user}</span>
                    <span className="text-[10px] font-semibold text-textMuted">&bull; {chat.time}</span>
                  </div>
                  <button className="text-textMuted hover:text-textMain">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
                
                <p className="text-sm text-textMain mt-2 mb-3 pl-8">
                  {chat.text}
                </p>

                <div className="flex items-center gap-4 pl-8">
                  <button className="flex items-center gap-1.5 text-textMuted hover:text-textMain text-xs font-semibold transition-colors">
                    <ThumbsUp size={14} /> {chat.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-textMuted hover:text-textMain text-xs font-semibold transition-colors">
                    <MessageSquare size={14} /> {chat.replies}
                  </button>
                </div>
              </div>
            ))}
            
            <div className="p-4 text-center">
              <button className="text-accentBlue text-xs font-bold hover:underline">
                Load more messages
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'Live Chat' && (
        <div className="flex items-center justify-center flex-grow p-8 text-textMuted text-sm">
          {activeTab} content coming soon...
        </div>
      )}

    </div>
  );
}

export default SocialSidebar;
