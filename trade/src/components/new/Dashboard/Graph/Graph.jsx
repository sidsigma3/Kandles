import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import './Graph.css'
import { Form } from 'react-bootstrap'
const Graph = ({ selectedInstrument }) => {
  const [financialData, setFinancialData] = useState([]);
  const [graphType, setGraphType] = useState('line'); // 'line' or 'candlestick'


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const instrument = selectedInstrument.instrument_key
        const response = await axios.post('http://localhost:5000/getGraph', {instrument} );
        
        const candleData = response.data.candle;
        setFinancialData(candleData);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };

    fetchData();
  }, [selectedInstrument]);

  const toggleGraphType = () => {
    setGraphType(prevType => (prevType === 'line' ? 'candlestick' : 'line'));
  };


  
  const options = {
    chart: {
      id: 'area-datetime',
      type: graphType === 'line' ? 'area' : 'candlestick', // Change chart type based on graphType state
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
    // fill: {
    //   type: 'gradient',
    //   gradient: {
    //     shadeIntensity: 1,
    //     opacityFrom: 0.7,
    //     opacityTo: 0.9,
    //     stops: [0, 100],
    //   },
    // },
    
    // stroke: {
    //   curve: 'smooth', // Set the curve property to 'smooth' for smooth lines
    // },

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
      data: graphType === 'line'
        ? financialData.map(data => [new Date(data[0]).getTime(), data[4]]).reverse()
        : financialData.map(data => ({
            x: new Date(data[0]).getTime(),
            y: [data[1], data[2], data[3], data[4]],
          })).reverse(),
    },
  ];

  

  return (
    <div className='overview-graph'>
    <h5>{selectedInstrument.name}</h5>
    <Form style={{display:'flex'}}>
      <Form.Check
        type='switch'
        id='custom-switch'
        checked={graphType === 'candlestick'}
        onChange={toggleGraphType}
      />
      <span>switch Graph Type</span>
    </Form>
    <ReactApexChart options={options} series={series} type={graphType === 'line' ? 'area' : 'candlestick'} height={400} />
  </div>

  )
};

export default Graph;
