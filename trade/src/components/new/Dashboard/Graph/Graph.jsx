import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import './Graph.css'
const Graph = ({ selectedInstrument }) => {
  const [financialData, setFinancialData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/getGraph', { selectedInstrument });
        const candleData = response.data.candle;
        setFinancialData(candleData);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };

    fetchData();
  }, [selectedInstrument]);

  const options = {
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 400,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'dd MMM yyyy',
      },
      categories: financialData.map(data => new Date(data[0]).getTime()).reverse(),
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          // Round the value to 2 decimal places
          return value.toFixed(2);
        },
        tooltip: {
          enabled: true,
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
  };

  const series = [
    {
      name: 'Price',
      data: financialData.map(data => [new Date(data[0]).getTime(), data[4]]).reverse(),
    },
  ];

  return (
 <div className='overview-graph'>
   <h4>{selectedInstrument}</h4>  
  <ReactApexChart options={options} series={series} type="area" height={400} />
  </div>

  )
};

export default Graph;
