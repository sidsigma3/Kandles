import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const Losers = () => {
  const [losers, setLosers] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:5000/top-movers')
      .then((res) => {
        const data = res.data.data;
        const sortedData = data.sort((a, b) => parseFloat(b.per) - parseFloat(a.per));

        // Extracting the top 5 losers
        const top5Losers = sortedData.slice(-10);

        setLosers(top5Losers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // TreeMap configuration
  const options = {
    chart: {
      type: 'treemap',
      height: 400,
      toolbar: {
        show: false,
      },
    },
    title: {
      text: '',
    },
    colors: ['#FF0000', '#FF5733','#FE3B0D',],
  };

  const series = [{
    data: losers.map(stock => ({
      x: stock.symbol,
      y: Math.abs(parseFloat(stock.per)),
   
     
    })),
  }];

  return (
    <div className='movers'>
     
      <ReactApexChart options={options} series={series} type="treemap" height='100%' />

      {/* Render the table for losers */}
      {/* <table className="movers-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Low</th>
            <th>High</th>
            <th>Change</th>
            <th>LTP</th>
          </tr>
        </thead>

        <tbody>
          {losers.map((stock, index) => (
            <tr key={index}>
              <td>{stock.symbol}</td>
              <td>{stock.low}</td>
              <td>{stock.high}</td>
              <td>{stock.iislPtsChange}</td>
              <td>{stock.ltP}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Losers;
