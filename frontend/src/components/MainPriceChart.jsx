import React, { useRef, useEffect, useState } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

function MainPriceChart({ coin }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  // Determine line color based on 24h performance
  const isPositive = coin?.percentChange24h >= 0;
  const lineColor = isPositive ? '#16c784' : '#ea3943';

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // Create a smooth gradient fill under the line
    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, isPositive ? 'rgba(22, 199, 132, 0.4)' : 'rgba(234, 57, 67, 0.4)');
    gradient.addColorStop(1, isPositive ? 'rgba(22, 199, 132, 0.0)' : 'rgba(234, 57, 67, 0.0)');

    // Generate dummy data (e.g., 24 hours of data points)
    const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    
    // Simulate some realistic looking volatility starting around the current price
    let currentPrice = coin?.price || 50000;
    const dataPoints = [currentPrice];
    for(let i=1; i<24; i++) {
        // Random walk
        const change = currentPrice * (Math.random() * 0.04 - 0.02); // +/- 2% max per hour
        currentPrice += change;
        dataPoints.push(currentPrice);
    }

    setChartData({
      labels,
      datasets: [
        {
          fill: true,
          label: 'Price',
          data: dataPoints,
          borderColor: lineColor,
          backgroundColor: gradient,
          borderWidth: 2,
          pointRadius: 0, // hide points by default for a clean line
          pointHoverRadius: 6,
          pointBackgroundColor: lineColor,
          tension: 0.1, // Slight smoothing, but mostly jagged like real crypto charts
        },
      ],
    });
  }, [coin, isPositive, lineColor]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1a2639',
        titleColor: '#888da1',
        bodyColor: '#ffffff',
        borderColor: '#323b4b',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#888da1',
          maxTicksLimit: 6,
        }
      },
      y: {
        display: true,
        position: 'right', // Standard for crypto charts to have price on the right
        grid: {
          color: '#323b4b',
          borderDash: [5, 5],
          drawBorder: false,
        },
        ticks: {
          color: '#888da1',
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      },
    },
  };

  return (
    <div className="w-full h-[400px] bg-background">
      {chartData && <Line ref={chartRef} options={options} data={chartData} />}
    </div>
  );
}

export default MainPriceChart;
