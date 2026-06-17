import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fetchCoinHistory } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const TIME_RANGES = [
  { label: '1W', days: 7 },
  { label: '1M', days: 30 },
  { label: 'All', days: 365 },
];

function MainPriceChart({ coin }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRange, setActiveRange] = useState('1W');
  const [historyData, setHistoryData] = useState([]);

  // Fetch all history once
  useEffect(() => {
    if (!coin?.id && !coin?.symbol) return;

    const loadHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        // The backend /history/:coinId returns { data: [...] } sorted by timestamp asc
        const coinId = coin.id || coin.symbol?.toLowerCase();
        const res = await fetchCoinHistory(coinId, 365);
        if (res && res.data && res.data.length > 0) {
          setHistoryData(res.data);
        } else {
          setError('No historical data available for this coin.');
        }
      } catch (err) {
        setError('Failed to load chart data.');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [coin]);

  // Build chart dataset whenever historyData or activeRange changes
  const buildChart = useCallback(() => {
    const chart = chartRef.current;
    if (!chart || !historyData.length) return;

    const range = TIME_RANGES.find(r => r.label === activeRange);
    const sliced = historyData.slice(-range.days);

    const latestPrice = sliced[sliced.length - 1]?.price ?? 0;
    const firstPrice = sliced[0]?.price ?? 0;
    const isPositive = latestPrice >= firstPrice;

    const lineColor = isPositive ? '#16c784' : '#ea3943';

    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, isPositive ? 'rgba(22, 199, 132, 0.35)' : 'rgba(234, 57, 67, 0.35)');
    gradient.addColorStop(1, isPositive ? 'rgba(22, 199, 132, 0.0)' : 'rgba(234, 57, 67, 0.0)');

    const labels = sliced.map(d => d.date);
    const prices = sliced.map(d => d.price);

    setChartData({
      labels,
      datasets: [
        {
          fill: true,
          label: 'Price (USD)',
          data: prices,
          borderColor: lineColor,
          backgroundColor: gradient,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointBackgroundColor: lineColor,
          tension: 0.2,
        },
      ],
    });
  }, [historyData, activeRange]);

  useEffect(() => {
    buildChart();
  }, [buildChart]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    animation: {
      duration: 400,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1a2639',
        titleColor: '#888da1',
        bodyColor: '#ffffff',
        borderColor: '#323b4b',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed.y;
            return `Price: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 4 }).format(val)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
        ticks: {
          color: '#888da1',
          maxTicksLimit: 7,
          maxRotation: 0,
        },
      },
      y: {
        display: true,
        position: 'right',
        grid: { color: '#1e2d3d', drawBorder: false },
        ticks: {
          color: '#888da1',
          callback: (value) => {
            if (value >= 1000) return '$' + (value / 1000).toFixed(1) + 'k';
            return '$' + value.toLocaleString('en-US', { maximumFractionDigits: 4 });
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-textMuted animate-pulse">
        Loading chart data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-red-400 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Time range tabs */}
      <div className="flex items-center gap-1 mb-3">
        {TIME_RANGES.map(({ label }) => (
          <button
            key={label}
            onClick={() => setActiveRange(label)}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              activeRange === label
                ? 'bg-accentBlue text-white'
                : 'text-textMuted hover:text-textMain'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="w-full h-[380px]">
        {chartData && <Line ref={chartRef} options={options} data={chartData} />}
      </div>
    </div>
  );
}

export default MainPriceChart;
