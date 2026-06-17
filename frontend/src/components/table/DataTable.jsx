import React from 'react';
import { ChevronUp, ChevronDown, Info } from 'lucide-react';
import DataTableRow from './DataTableRow';

const dummyCoins = [
  {
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    color: "bg-orange-500",
    price: 65094.04,
    percentChange1h: -0.19,
    percentChange24h: -0.91,
    percentChange7d: 5.18,
    marketCap: 1304748267735,
    volume24h: 23674516167,
    volumeInCrypto: "363.39K",
    circulatingSupply: 20040000,
    maxSupply: 21000000,
  },
  {
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    color: "bg-blue-600",
    price: 3455.36,
    percentChange1h: -0.63,
    percentChange24h: -1.48,
    percentChange7d: 6.96,
    marketCap: 411844724362,
    volume24h: 11049640375,
    volumeInCrypto: "3.2M",
    circulatingSupply: 120080000,
    maxSupply: null,
  },
  {
    rank: 3,
    name: "Tether",
    symbol: "USDT",
    color: "bg-teal-500",
    price: 0.9989,
    percentChange1h: 0.00,
    percentChange24h: -0.01,
    percentChange7d: -0.03,
    marketCap: 112347559603,
    volume24h: 58120525349,
    volumeInCrypto: "58.17B",
    circulatingSupply: 112347559603,
    maxSupply: null,
  }
];

function DataTable() {
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
          {dummyCoins.map((coin) => (
            <DataTableRow key={coin.symbol} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
