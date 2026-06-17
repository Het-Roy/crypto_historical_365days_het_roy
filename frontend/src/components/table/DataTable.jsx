import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Info } from 'lucide-react';
import DataTableRow from './DataTableRow';
import { fetchAllCoins } from '../../services/api';

function DataTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await fetchAllCoins(1, 50);
      
      // Map API data to our component's expected shape if necessary
      // Assuming the backend returns { data: [...] } where each item has coin properties
      if (res && res.data) {
        const mappedCoins = res.data.map((c, index) => ({
          id: c._id || c.id || c.symbol,
          rank: c.market_cap_rank || index + 1,
          name: c.name,
          symbol: (c.symbol || '').toUpperCase(),
          color: "bg-blue-500", // Fallback color
          price: c.current_price || 0,
          percentChange1h: c.price_change_percentage_1h_in_currency || 0,
          percentChange24h: c.price_change_percentage_24h || 0,
          percentChange7d: c.price_change_percentage_7d_in_currency || 0,
          marketCap: c.market_cap || 0,
          volume24h: c.total_volume || 0,
          volumeInCrypto: c.current_price ? (c.total_volume / c.current_price).toFixed(2) : "0",
          circulatingSupply: c.circulating_supply || 0,
          maxSupply: c.max_supply || null,
        }));
        setCoins(mappedCoins);
      }
      setLoading(false);
    };
    
    loadData();
  }, []);

  return (
    <div className="w-full overflow-x-auto pb-4">
      <table className="w-full min-w-[1000px] text-sm text-left">
        {/* Table Header */}
        <thead className="text-xs font-semibold text-textMain border-y border-border bg-background sticky top-[108px] z-40">
          <tr>
            <th className="py-3 px-4 w-10">
              <div className="flex items-center gap-1 cursor-pointer hover:text-accentBlue">
                # <div className="flex flex-col -space-y-1 opacity-50"><ChevronUp size={10}/><ChevronDown size={10}/></div>
              </div>
            </th>
            <th className="py-3 px-4 text-left">
              <div className="flex items-center gap-1 cursor-pointer hover:text-accentBlue">
                Name <div className="flex flex-col -space-y-1 opacity-50"><ChevronUp size={10}/><ChevronDown size={10}/></div>
              </div>
            </th>
            <th className="py-3 px-4 text-right">
              <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-accentBlue">
                Price <div className="flex flex-col -space-y-1 opacity-50"><ChevronUp size={10}/><ChevronDown size={10}/></div>
              </div>
            </th>
            <th className="py-3 px-4 text-right">
              <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-accentBlue">
                1h % <div className="flex flex-col -space-y-1 opacity-50"><ChevronUp size={10}/><ChevronDown size={10}/></div>
              </div>
            </th>
            <th className="py-3 px-4 text-right">
              <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-accentBlue">
                24h % <div className="flex flex-col -space-y-1 opacity-50"><ChevronUp size={10}/><ChevronDown size={10}/></div>
              </div>
            </th>
            <th className="py-3 px-4 text-right">
              <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-accentBlue">
                7d % <div className="flex flex-col -space-y-1 opacity-50"><ChevronUp size={10}/><ChevronDown size={10}/></div>
              </div>
            </th>
            <th className="py-3 px-4 text-right">
              <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-accentBlue">
                <Info size={12} className="text-textMuted mr-0.5" />
                Market Cap <div className="flex flex-col -space-y-1 opacity-50"><ChevronUp size={10}/><ChevronDown size={10}/></div>
              </div>
            </th>
            <th className="py-3 px-4 text-right">
              <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-accentBlue">
                <Info size={12} className="text-textMuted mr-0.5" />
                Volume(24h) <div className="flex flex-col -space-y-1 opacity-50"><ChevronUp size={10}/><ChevronDown size={10}/></div>
              </div>
            </th>
            <th className="py-3 px-4 text-right">
              <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-accentBlue">
                <Info size={12} className="text-textMuted mr-0.5" />
                Circulating Supply <div className="flex flex-col -space-y-1 opacity-50"><ChevronUp size={10}/><ChevronDown size={10}/></div>
              </div>
            </th>
            <th className="py-3 px-4 text-right whitespace-nowrap">
              Last 7 Days
            </th>
          </tr>
        </thead>
        
        {/* Table Body */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="10" className="py-12 text-center text-textMuted">
                <div className="animate-pulse">Loading coins...</div>
              </td>
            </tr>
          ) : coins.length > 0 ? (
            coins.map((coin) => (
              <DataTableRow key={coin.id} coin={coin} />
            ))
          ) : (
            <tr>
              <td colSpan="10" className="py-12 text-center text-textMuted">
                No coins found or backend is asleep.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
