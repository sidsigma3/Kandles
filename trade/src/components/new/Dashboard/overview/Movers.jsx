// Movers.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import './Movers.css';

const Movers = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  const [gainersWithLogo, setGainersWithLogo] = useState([]);

useEffect(()=>{
  setGainersWithLogo([
    {
      "ptsC": "8.60",
      "wklo": "101.55",
      "iislPtsChange": "8.60",
      "symbol": "TATASTEEL",
      "cAct": "-",
      "mPC": "10.95",
      "wkhi": "149.80",
      "wklocm_adj": "332.00",
      "trdVolM": "94.15",
      "wkhicm_adj": "579.90",
      "mVal": "13.86",
      "ltP": "149.45",
      "xDt": "31-DEC-2999",
      "trdVol": "941.54",
      "ntP": "1,385.86",
      "yPC": "41.66",
      "previousClose": "140.85",
      "dayEndClose": "-",
      "high": "149.80",
      "iislPercChange": "6.11",
      "low": "143.00",
      "per": "6.11",
      "open": "143.00",
      "logoUrl": "https://logo.clearbit.com/www.tata.com"
    },
    {
      "ptsC": "154.45",
      "wklo": "2,100.00",
      "iislPtsChange": "154.45",
      "symbol": "LT",
      "cAct": "-",
      "mPC": "-0.04",
      "wkhi": "3,737.90",
      "wklocm_adj": "951.50",
      "trdVolM": "3.67",
      "wkhicm_adj": "1,776.60",
      "mVal": "13.17",
      "ltP": "3,632.00",
      "xDt": "31-DEC-2999",
      "trdVol": "36.71",
      "ntP": "1,316.61",
      "yPC": "71.70",
      "previousClose": "3,477.55",
      "dayEndClose": "-",
      "high": "3,658.35",
      "iislPercChange": "4.44",
      "low": "3,500.00",
      "per": "4.44",
      "open": "3,501.65",
      "logoUrl": "https://logo.clearbit.com/www.larsentoubro.com"
    },
    {
      "ptsC": "33.00",
      "wklo": "649.05",
      "iislPtsChange": "33.00",
      "symbol": "JSWSTEEL",
      "cAct": "-",
      "mPC": "2.60",
      "wkhi": "895.75",
      "wklocm_adj": "804.00",
      "trdVolM": "4.44",
      "wkhicm_adj": "1,366.50",
      "mVal": "3.68",
      "ltP": "833.10",
      "xDt": "31-DEC-2999",
      "trdVol": "44.41",
      "ntP": "367.94",
      "yPC": "23.11",
      "previousClose": "800.10",
      "dayEndClose": "-",
      "high": "836.75",
      "iislPercChange": "4.12",
      "low": "804.25",
      "per": "4.12",
      "open": "804.25",
      "logoUrl": "https://logo.clearbit.com/www.jsw.in"
    },
    {
      "ptsC": "137.10",
      "wklo": "2,321.00",
      "iislPtsChange": "137.10",
      "symbol": "TITAN",
      "cAct": "-",
      "mPC": "0.69",
      "wkhi": "3,886.95",
      "wklocm_adj": "202.45",
      "trdVolM": "1.15",
      "wkhicm_adj": "425.00",
      "mVal": "4.25",
      "ltP": "3,761.50",
      "xDt": "31-DEC-2999",
      "trdVol": "11.45",
      "ntP": "425.09",
      "yPC": "57.89",
      "previousClose": "3,624.40",
      "dayEndClose": "-",
      "high": "3,767.70",
      "iislPercChange": "3.78",
      "low": "3,626.00",
      "per": "3.78",
      "open": "3,630.00",
      "logoUrl": "https://logo.clearbit.com/www.titan.com"
    },
    {
      "ptsC": "19.25",
      "wklo": "314.50",
      "iislPtsChange": "19.25",
      "symbol": "BPCL",
      "cAct": "INTERIM DIVIDEND - RS 21 PER SHARE",
      "mPC": "23.58",
      "wkhi": "687.95",
      "wklocm_adj": "316.05",
      "trdVolM": "6.35",
      "wkhicm_adj": "785.00",
      "mVal": "3.95",
      "ltP": "623.10",
      "xDt": "12-DEC-2023",
      "trdVol": "63.55",
      "ntP": "394.85",
      "yPC": "97.25",
      "previousClose": "603.85",
      "dayEndClose": "-",
      "high": "627.25",
      "iislPercChange": "3.19",
      "low": "609.00",
      "per": "3.19",
      "open": "611.00",
      "logoUrl": "https://logo.clearbit.com/www.bharatpetroleum.in"
    },
    {
      "ptsC": "15.85",
      "wklo": "381.00",
      "iislPtsChange": "15.85",
      "symbol": "HINDALCO",
      "cAct": "-",
      "mPC": "-8.70",
      "wkhi": "620.50",
      "wklocm_adj": "96.70",
      "trdVolM": "7.58",
      "wkhicm_adj": "198.90",
      "mVal": "3.92",
      "ltP": "519.70",
      "xDt": "31-DEC-2999",
      "trdVol": "75.84",
      "ntP": "391.75",
      "yPC": "25.82",
      "previousClose": "503.85",
      "dayEndClose": "-",
      "high": "522.50",
      "iislPercChange": "3.15",
      "low": "510.00",
      "per": "3.15",
      "open": "510.00",
      "logoUrl": "https://logo.clearbit.com/www.hindalco.com"
    },
    {
      "ptsC": "28.85",
      "wklo": "400.45",
      "iislPtsChange": "28.85",
      "symbol": "TATAMOTORS",
      "cAct": "-",
      "mPC": "14.00",
      "wkhi": "980.40",
      "wklocm_adj": "332.10",
      "trdVolM": "8.36",
      "wkhicm_adj": "550.70",
      "mVal": "8.13",
      "ltP": "979.05",
      "xDt": "31-DEC-2999",
      "trdVol": "83.59",
      "ntP": "812.87",
      "yPC": "129.82",
      "previousClose": "950.20",
      "dayEndClose": "-",
      "high": "980.40",
      "iislPercChange": "3.04",
      "low": "956.70",
      "per": "3.04",
      "open": "958.95",
      "logoUrl": "https://logo.clearbit.com/www.tatamotors.com"
    },
    {
      "ptsC": "31.25",
      "wklo": "810.30",
      "iislPtsChange": "31.25",
      "symbol": "ICICIBANK",
      "cAct": "-",
      "mPC": "6.54",
      "wkhi": "1,086.85",
      "wklocm_adj": "943.60",
      "trdVolM": "10.70",
      "wkhicm_adj": "1,779.00",
      "mVal": "11.52",
      "ltP": "1,083.45",
      "xDt": "31-DEC-2999",
      "trdVol": "106.98",
      "ntP": "1,151.79",
      "yPC": "26.53",
      "previousClose": "1,052.20",
      "dayEndClose": "-",
      "high": "1,086.85",
      "iislPercChange": "2.97",
      "low": "1,054.00",
      "per": "2.97",
      "open": "1,055.00",
      "logoUrl": "https://logo.clearbit.com/www.icicibank.com"
    },
    {
      "ptsC": "43.65",
      "wklo": "990.20",
      "iislPtsChange": "43.65",
      "symbol": "INDUSINDBK",
      "cAct": "-",
      "mPC": "-0.09",
      "wkhi": "1,694.50",
      "wklocm_adj": "369.50",
      "trdVolM": "2.52",
      "wkhicm_adj": "776.00",
      "mVal": "3.79",
      "ltP": "1,518.55",
      "xDt": "31-DEC-2999",
      "trdVol": "25.23",
      "ntP": "378.91",
      "yPC": "37.99",
      "previousClose": "1,474.90",
      "dayEndClose": "-",
      "high": "1,519.95",
      "iislPercChange": "2.96",
      "low": "1,477.85",
      "per": "2.96",
      "open": "1,480.00",
      "logoUrl": "https://logo.clearbit.com/www.nseindia.com"
    },
    {
      "ptsC": "62.45",
      "wklo": "1,527.05",
      "iislPtsChange": "62.45",
      "symbol": "GRASIM",
      "cAct": "RIGHTS 6:179 @ PREMIUM RS 1810/-",
      "mPC": "6.01",
      "wkhi": "2,258.00",
      "wklocm_adj": "2,426.35",
      "trdVolM": "0.63",
      "wkhicm_adj": "3,789.00",
      "mVal": "1.40",
      "ltP": "2,253.85",
      "xDt": "10-JAN-2024",
      "trdVol": "6.27",
      "ntP": "140.05",
      "yPC": "41.43",
      "previousClose": "2,191.40",
      "dayEndClose": "-",
      "high": "2,258.00",
      "iislPercChange": "2.85",
      "low": "2,196.75",
      "per": "2.85",
      "open": "2,209.00",
      "logoUrl": "https://logo.clearbit.com/www.grasim.com"
    }
  ])


},[])
  
  // useEffect(() => {
  //   const fetchDomainsAndSetLogos = async () => {
  //     const promises = gainers.map(async (gainer) => {
  //       try {
  //         // Await the domain name directly here
  //         const domain = await searchForDomainName(gainer.symbol);
  //         const logoUrl = `https://logo.clearbit.com/${domain}`;
  //         return { ...gainer, domain };
  //       } catch (error) {
  //         console.error("Error fetching domain for symbol:", gainer.symbol, error);
  //         return { ...gainer, logoUrl: 'path/to/default/logo.png' }; // Provide a fallback logo URL in case of an error
  //       }
  //     });
  
  //     const results = await Promise.all(promises);
  //     console.log(results);
  //     setGainersWithLogo(results);
  //   };
  
  //   fetchDomainsAndSetLogos();
  // }, [gainers])

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

  // const chartSeries = [
  //   {
  //     data: gainers.map(stock => ({
  //       x: stock.symbol,
  //       y: parseFloat(stock.per),

      
  //     })),
  //   },
  // ];

  const chartSeries = [
    {
      data: gainers.map((stock) => ({
        x: stock.symbol,
        y: parseFloat(stock.per),
        logo: `https://logo.clearbit.com/${stock.symbol.toLowerCase()}.com`,
      })),
    },
  ];





  const searchForDomainName = async (companyName) => {
    const apiKey = 'AIzaSyCMhgl6zQmdXIz89HsyREfg_e4b0haDQc8';
    const cx = 'd5188f8c512954229';
    const query = companyName;
  
    try {
      const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          key: apiKey,
          cx: cx,
          q: query,
        },
      });
  
      // Assuming the first result is the company's official website
      const domain = response.data.items[0]?.displayLink;
      console.log(domain);
      return domain;
    } catch (error) {
      console.error('Error searching for domain name:', error);
      throw error; // Ensure that errors are properly propagated
    }
  };
  

  useEffect(()=>{
    console.log(searchForDomainName('OpenAI'));
  },[])
  // Example usage
  

  return (
    // <div className='movers'>
    //   <ReactApexChart options={chartOptions} series={chartSeries} type="treemap" height='100%' width='100%'  />
    // </div>
     <div className='movers'>
      <table>
        <thead >
          <tr>
            <th className='pb-5'></th>
            <th>Symbol</th>
            <th>Last Traded Price</th>
            <th>Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {gainersWithLogo.map((gainer) => (
            <tr key={gainer.symbol}>
              <td>
                <img src={gainer.logoUrl} alt={gainer.symbol}  />
              </td>
              <td>{gainer.symbol}</td>
              <td>{gainer.ltP}</td>
              <td>{gainer.per}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movers;
