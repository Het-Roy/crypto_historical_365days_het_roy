import React from 'react';
import { ChevronUp, ChevronDown, Info } from 'lucide-react';

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
        
        {/* Table Body Placeholder (Rows will be added in PR 8) */}
        <tbody>
          <tr>
            <td colSpan="10" className="py-12 text-center text-textMuted border-b border-border border-dashed">
              Rows component will be injected here in the next PR.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
