import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  TimeScale,
  TimeSeriesScale,
  registerables
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';

// Register the necessary components and the zoom plugin
ChartJS.register(...registerables, zoomPlugin);

const TradeGraph = ({ filteredTrades, closePrices, winPercentage ,lossPercentage }) => {
  // Parse and round close prices
  const parsedClosePrices = useMemo(() => {
    return closePrices.map(priceData => ({
      date: new Date(priceData.date),
      close: Math.round(priceData.close),
    }));
  }, [closePrices]);

  // Extract and format buy and sell data
  const buyData = useMemo(() => {
    return filteredTrades.filter(trade => trade.action === 'Buy').map(trade => ({
      date: new Date(trade.date),
      price: trade.price,
      tradeNumber: trade.tradeNumber,
    }));
  }, [filteredTrades]);

  const sellData = useMemo(() => {
    return filteredTrades.filter(trade => trade.action === 'Sell').map(trade => ({
      date: new Date(trade.date),
      price: trade.price,
      tradeNumber: trade.tradeNumber,
    }));
  }, [filteredTrades]);

  const longEntryData = useMemo(() => {
    return filteredTrades.filter(trade => trade.signalType === 'Long Entry').map(trade => ({
      date: new Date(trade.date),
      price: trade.price,
      tradeNumber: trade.tradeNumber,
    }));
  }, [filteredTrades]);

  const shortEntryData = useMemo(() => {
    return filteredTrades.filter(trade => trade.signalType === 'Short Entry').map(trade => ({
      date: new Date(trade.date),
      price: trade.price,
      tradeNumber: trade.tradeNumber,
    }));
  }, [filteredTrades]);

  const longExitData = useMemo(() => {
    return filteredTrades.filter(trade => trade.signalType === 'Long Exit').map(trade => ({
      date: new Date(trade.date),
      price: trade.price,
      tradeNumber: trade.tradeNumber,
    }));
  }, [filteredTrades]);

  const shortExitData = useMemo(() => {
    return filteredTrades.filter(trade => trade.signalType === 'Short Exit').map(trade => ({
      date: new Date(trade.date),
      price: trade.price,
      tradeNumber: trade.tradeNumber,
    }));
  }, [filteredTrades]);

  // Prepare chart data
  const chartData = useMemo(() => {
    return {
      labels: parsedClosePrices.map(data => data.date),
      datasets: [
        {
          label: 'Close Prices',
          data: parsedClosePrices.map(data => ({ x: data.date, y: data.close })),
          borderColor: '#607D8B',
          backgroundColor: '#607D8B',
          pointRadius: 0,
          fill: false,
          borderWidth: 1,
          tension: 0.6, // Smooth the line
        },
        {
          label: 'Long Entry',
          data: longEntryData.map(data => ({ x: data.date, y: data.price, tradeNumber: data.tradeNumber })),
          borderColor: 'green',
          backgroundColor: 'green',
          pointRadius: 6,
          pointStyle: 'rect',
          showLine: false,
        },
        {
          label: 'Long Exit',
          data: longExitData.map(data => ({ x: data.date, y: data.price, tradeNumber: data.tradeNumber })),
          borderColor: 'red',
          backgroundColor: 'red',
          pointRadius: 6,
          pointStyle: 'rect',
          showLine: false,
        },
        {
          label: 'Short Entry',
          data: shortEntryData.map(data => ({ x: data.date, y: data.price, tradeNumber: data.tradeNumber })),
          borderColor: 'green',
          backgroundColor: 'green',
          pointRadius: 7,
          pointStyle: 'triangle',
          showLine: false,
        },
        {
          label: 'Short Exit',
          data: shortExitData.map(data => ({ x: data.date, y: data.price, tradeNumber: data.tradeNumber })),
          borderColor: 'red',
          backgroundColor: 'red',
          pointRadius: 7,
          pointStyle: 'triangle',
          showLine: false,
        },
      ],
    };
  }, [parsedClosePrices, longEntryData, longExitData, shortEntryData, shortExitData]);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
        },
        grid: {
          display: false
        },
      },
    },
    plugins: {
      // title: {
      //   display: true,
      //   // text: `Trade Graph`,
      //   position: 'top',
      //   align:'middle',
      //   font: {
      //     size: 20,
      //   },
      //   padding: {
      //     top: 10,
      //     bottom: 10,
      //   },
      // },
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (context.dataset.label === 'Close Prices') {
                label += `${context.parsed.y}`;
              } else {
                label += `${context.parsed.y} (Trade #${context.raw.tradeNumber})`;
              }
            }
            return label;
          }
        },

        usePointStyle: true,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
        },
      },
    },
    elements: {
      point: {
        radius: 3
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '268px'  , paddingLeft :10 ,paddingBottom:18}}>
      <div className='d-flex justify-content-between mx-2 mt-1 p-2'>
          <h4
          style={{
            color: 'var(--Dark, #1A1E29)',
            textAlign: 'center',
            fontFamily: "Open Sans",
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            letterSpacing: '-0.28px',
            textTransform: 'capitalize',

         }}
          >Win Rate :  {winPercentage}%</h4>
         <h4 style={{
            color: 'var(--Dark, #1A1E29)',
            textAlign: 'center',
            fontFamily: "Open Sans",
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            letterSpacing: '-0.28px',
            textTransform: 'capitalize',

         }}>Loss Rate: {lossPercentage}%</h4>
        
        </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TradeGraph;
