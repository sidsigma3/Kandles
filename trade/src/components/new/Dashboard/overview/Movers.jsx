// Movers.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import './Movers.css';

const Movers = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  useEffect(() => {
    axios.post(`http://localhost:5000/top-movers`)
      .then((res) => {
        const data = res.data.data;
        const sortedData = data.sort((a, b) => parseFloat(b.per) - parseFloat(a.per));

        // Extracting the top 5 gainers and losers
        const top5Gainers = sortedData.slice(0, 10);
        const top5Losers = sortedData.slice(-5);

        setGainers(top5Gainers);
        setLosers(top5Losers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const chartOptions = {
    chart: {
      type: 'treemap',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
      },
    },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
    legend: {
      show: false,
    },
    colors: ['#008000','#4EC14A'],
  };

  const chartSeries = [
    {
      data: gainers.map(stock => ({
        x: stock.symbol,
        y: parseFloat(stock.per),
        
      
      })),
    },
  ];

  return (
    <div className='movers'>
      <ReactApexChart options={chartOptions} series={chartSeries} type="treemap" height='100%' width='100%'  />
    </div>
  );
};

export default Movers;
