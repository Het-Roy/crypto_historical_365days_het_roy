import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Info } from 'lucide-react';
import DataTableRow from './DataTableRow';

function DataTable({ coins = [], loading = false }) {
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState('desc');

  // Client-side sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sorted = [...coins].sort((a, b) => {
    if (!sortField) return 0;
    const dir = sortDir === 'asc' ? 1 : -1;
    return (a[sortField] - b[sortField]) * dir;
  });

  const SortIcon = ({ field }) => (
    <div className="flex flex-col -space-y-1 opacity-50">
      <ChevronUp  size={10} className={sortField === field && sortDir === 'asc'  ? 'opacity-100' : ''} />
      <ChevronDown size={10} className={sortField === field && sortDir === 'desc' ? 'opacity-100' : ''} />
    </div>
  );

  const SortTh = ({ label, field, right = true }) => (
    <th className="py-3 px-4 text-right">
      <div
        className={`flex items-center ${right ? 'justify-end' : ''} gap-1 cursor-pointer hover:text-accentBlue`}
        onClick={() => handleSort(field)}
      >
        {label} <SortIcon field={field} />
      </div>
    </th>
  );

  return (
    <div className="w-full overflow-x-auto pb-4">
      <table className="w-full min-w-[1000px] text-sm text-left">
        {/* Table Header */}
        <thead className="text-xs font-semibold text-textMain border-y border-border bg-background sticky top-[60px] z-40">
          <tr>
            <th className="py-3 px-4 w-10">
              <div
                className="flex items-center gap-1 cursor-pointer hover:text-accentBlue"
                onClick={() => handleSort('rank')}
              >
                # <SortIcon field="rank" />
              </div>
            </th>
            <th className="py-3 px-4 text-left">Name</th>
            <SortTh label="Price"           field="price" />

            <SortTh label="24h %"           field="percentChange24h" />
            <SortTh label="7d %"            field="percentChange7d" />
            <SortTh label={<><Info size={12} className="inline mr-0.5 text-textMuted" />Market Cap</>}   field="marketCap" />
            <SortTh label={<><Info size={12} className="inline mr-0.5 text-textMuted" />Volume(24h)</>}  field="volume24h" />

            <th className="py-3 px-4 text-right whitespace-nowrap">Last 7 Days</th>
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
          ) : sorted.length > 0 ? (
            sorted.map((coin) => (
              <DataTableRow key={coin.id} coin={coin} />
            ))
          ) : (
            <tr>
              <td colSpan="10" className="py-12 text-center text-textMuted">
                No coins found. Make sure the backend is running on <code>http://localhost:3000</code>.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
