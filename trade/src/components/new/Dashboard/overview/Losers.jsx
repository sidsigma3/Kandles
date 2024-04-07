import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const Losers = () => {
  const [losers, setLosers] = useState([]);
  const [losersWithLogo, setLosersWithLogo] = useState([]);


  useEffect(()=>{
    setLosersWithLogo([
      {
        "ptsC": "-2.30",
        "wklo": "981.05",
        "iislPtsChange": "-2.30",
        "symbol": "TECHM",
        "cAct": "-",
        "mPC": "-3.51",
        "wkhi": "1,416.30",
        "wklocm_adj": "1,662.00",
        "trdVolM": "1.36",
        "wkhicm_adj": "2,734.00",
        "mVal": "1.73",
        "ltP": "1,271.55",
        "xDt": "31-DEC-2999",
        "trdVol": "13.59",
        "ntP": "173.41",
        "yPC": "12.84",
        "previousClose": "1,273.85",
        "dayEndClose": "-",
        "high": "1,287.00",
        "iislPercChange": "-0.18",
        "low": "1,268.00",
        "per": "-0.18",
        "open": "1,287.00",
        "logoUrl": "https://logo.clearbit.com/www.techmahindra.com"
      },
      {
        "ptsC": "-10.80",
        "wklo": "2,730.00",
        "iislPtsChange": "-10.80",
        "symbol": "DIVISLAB",
        "cAct": "-",
        "mPC": "-2.08",
        "wkhi": "4,074.40",
        "wklocm_adj": "1,097.00",
        "trdVolM": "0.29",
        "wkhicm_adj": "1,888.05",
        "mVal": "1.03",
        "ltP": "3,478.00",
        "xDt": "31-DEC-2999",
        "trdVol": "2.94",
        "ntP": "102.52",
        "yPC": "22.24",
        "previousClose": "3,488.80",
        "dayEndClose": "-",
        "high": "3,519.00",
        "iislPercChange": "-0.31",
        "low": "3,474.00",
        "per": "-0.31",
        "open": "3,491.00",
        "logoUrl": "https://logo.clearbit.com/www.divislabs.com"
      },
      {
        "ptsC": "-8.55",
        "wklo": "1,054.00",
        "iislPtsChange": "-8.55",
        "symbol": "SBILIFE",
        "cAct": "-",
        "mPC": "10.36",
        "wkhi": "1,569.35",
        "wklocm_adj": ".00",
        "trdVolM": "0.92",
        "wkhicm_adj": ".00",
        "mVal": "1.43",
        "ltP": "1,544.00",
        "xDt": "31-DEC-2999",
        "trdVol": "9.23",
        "ntP": "143.10",
        "yPC": "38.09",
        "previousClose": "1,552.55",
        "dayEndClose": "-",
        "high": "1,569.35",
        "iislPercChange": "-0.55",
        "low": "1,542.90",
        "per": "-0.55",
        "open": "1,564.90",
        "logoUrl": "https://logo.clearbit.com/www.sbilife.co.in"
      },
      {
        "ptsC": "-33.15",
        "wklo": "4,132.20",
        "iislPtsChange": "-33.15",
        "symbol": "LTIM",
        "cAct": "-",
        "mPC": "-1.59",
        "wkhi": "6,442.00",
        "wklocm_adj": ".00",
        "trdVolM": "0.44",
        "wkhicm_adj": ".00",
        "mVal": "2.34",
        "ltP": "5,267.70",
        "xDt": "31-DEC-2999",
        "trdVol": "4.44",
        "ntP": "234.38",
        "yPC": "11.04",
        "previousClose": "5,300.85",
        "dayEndClose": "-",
        "high": "5,348.45",
        "iislPercChange": "-0.63",
        "low": "5,257.00",
        "per": "-0.63",
        "open": "5,315.00",
        "logoUrl": "https://logo.clearbit.com/www.ltimindtree.com"
      },
      {
        "ptsC": "-11.25",
        "wklo": "852.00",
        "iislPtsChange": "-11.25",
        "symbol": "CIPLA",
        "cAct": "-",
        "mPC": "11.54",
        "wkhi": "1,494.00",
        "wklocm_adj": "366.50",
        "trdVolM": "1.80",
        "wkhicm_adj": "673.00",
        "mVal": "2.65",
        "ltP": "1,469.10",
        "xDt": "31-DEC-2999",
        "trdVol": "18.03",
        "ntP": "265.24",
        "yPC": "63.31",
        "previousClose": "1,480.35",
        "dayEndClose": "-",
        "high": "1,494.00",
        "iislPercChange": "-0.76",
        "low": "1,460.00",
        "per": "-0.76",
        "open": "1,494.00",
        "logoUrl": "https://logo.clearbit.com/www.cipla.com"
      },
      {
        "ptsC": "-40.20",
        "wklo": "4,153.00",
        "iislPtsChange": "-40.20",
        "symbol": "BRITANNIA",
        "cAct": "-",
        "mPC": "-3.27",
        "wkhi": "5,386.05",
        "wklocm_adj": "809.10",
        "trdVolM": "0.28",
        "wkhicm_adj": "1,729.80",
        "mVal": "1.37",
        "ltP": "4,925.00",
        "xDt": "31-DEC-2999",
        "trdVol": "2.77",
        "ntP": "136.75",
        "yPC": "12.45",
        "previousClose": "4,965.20",
        "dayEndClose": "-",
        "high": "4,986.70",
        "iislPercChange": "-0.81",
        "low": "4,920.00",
        "per": "-0.81",
        "open": "4,965.20",
        "logoUrl": "https://logo.clearbit.com/www.britannia.co.in"
      },
      {
        "ptsC": "-17.35",
        "wklo": "1,185.30",
        "iislPtsChange": "-17.35",
        "symbol": "INFY",
        "cAct": "-",
        "mPC": "0.31",
        "wkhi": "1,733.00",
        "wklocm_adj": "2,880.00",
        "trdVolM": "5.55",
        "wkhicm_adj": "4,402.20",
        "mVal": "9.24",
        "ltP": "1,656.55",
        "xDt": "31-DEC-2999",
        "trdVol": "55.53",
        "ntP": "923.83",
        "yPC": "10.73",
        "previousClose": "1,673.90",
        "dayEndClose": "-",
        "high": "1,671.95",
        "iislPercChange": "-1.04",
        "low": "1,653.50",
        "per": "-1.04",
        "open": "1,669.00",
        "logoUrl": "https://logo.clearbit.com/www.infosys.com"
      },
      {
        "ptsC": "-18.80",
        "wklo": "922.45",
        "iislPtsChange": "-18.80",
        "symbol": "SUNPHARMA",
        "cAct": "INTERIM DIVIDEND - RS 8.50 PER SHARE",
        "mPC": "13.66",
        "wkhi": "1,587.80",
        "wklocm_adj": "552.55",
        "trdVolM": "3.34",
        "wkhicm_adj": "932.50",
        "mVal": "5.23",
        "ltP": "1,559.15",
        "xDt": "09-FEB-2024",
        "trdVol": "33.43",
        "ntP": "523.31",
        "yPC": "62.53",
        "previousClose": "1,577.95",
        "dayEndClose": "-",
        "high": "1,581.90",
        "iislPercChange": "-1.19",
        "low": "1,548.05",
        "per": "-1.19",
        "open": "1,580.00",
        "logoUrl": "https://logo.clearbit.com/sunpharma.com"
      },
      {
        "ptsC": "-20.35",
        "wklo": "1,016.25",
        "iislPtsChange": "-20.35",
        "symbol": "HCLTECH",
        "cAct": "INTERIM DIVIDEND - RS 12 PER SHARE",
        "mPC": "5.40",
        "wkhi": "1,697.35",
        "wklocm_adj": "1,057.60",
        "trdVolM": "2.12",
        "wkhicm_adj": "1,776.25",
        "mVal": "3.51",
        "ltP": "1,643.50",
        "xDt": "19-JAN-2024",
        "trdVol": "21.21",
        "ntP": "350.75",
        "yPC": "49.26",
        "previousClose": "1,663.85",
        "dayEndClose": "-",
        "high": "1,679.20",
        "iislPercChange": "-1.22",
        "low": "1,639.10",
        "per": "-1.22",
        "open": "1,675.45",
        "logoUrl": "https://logo.clearbit.com/www.hcltech.com"
      },
      {
        "ptsC": "-236.50",
        "wklo": "4,297.00",
        "iislPtsChange": "-236.50",
        "symbol": "DRREDDY",
        "cAct": "-",
        "mPC": "5.94",
        "wkhi": "6,505.90",
        "wklocm_adj": "2,246.50",
        "trdVolM": "0.48",
        "wkhicm_adj": "3,666.25",
        "mVal": "3.04",
        "ltP": "6,187.75",
        "xDt": "31-DEC-2999",
        "trdVol": "4.81",
        "ntP": "303.74",
        "yPC": "42.44",
        "previousClose": "6,424.25",
        "dayEndClose": "-",
        "high": "6,473.00",
        "iislPercChange": "-3.68",
        "low": "6,176.05",
        "per": "-3.68",
        "open": "6,449.00",
        "logoUrl": "https://logo.clearbit.com/www.drreddys.com"
      }
    ])

  },[])


  // useEffect(() => {
  //   const fetchDomainsAndSetLogos = async () => {
  //     const promises = losers.map(async (gainer) => {
  //       try {
  //         // Remove the authorization header since it's not needed
  //         // const response = await axios.get(`https://company.clearbit.com/v1/domains/find?name=${gainer.symbol}`);
  //         const response = await axios.get(`https://api.marcomrobot.com/v2/lookup/company/${gainer.symbol}`, {
  //           headers: {
  //             'Authorization': 'Bearer 96dc79699bef35144e5127505df84c24e705a7ec84da046ed85197e07d965b63',
  //             'Content-Type': 'application/json'
  //           }
  //         });
  //         const domain = response.data.domain;
  //         const logoUrl = `https://logo.clearbit.com/${domain}`;
  //         return { ...gainer, logoUrl };
  //       } catch (error) {
  //         console.error("Error fetching domain for symbol:", gainer.symbol, error);
  //         // Provide a fallback logo URL in case of an error
  //         return { ...gainer, logoUrl: 'path/to/default/logo.png' }; 
  //       }
  //     });

  //     const results = await Promise.all(promises);
  //     setLosersWithLogo(results);
  //   };

  //   fetchDomainsAndSetLogos();
  // }, [losers]);


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
       <table>
        <thead >
          <tr >
            <th className='pb-5'></th>
            <th>Symbol</th>
            <th>Last Traded Price</th>
            <th>Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {losersWithLogo.map((gainer) => (
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
      {/* {gainersWithLogo.map((gainer) => (
            <tr key={gainer.symbol}>
              <td>
                <img src={`https://logo.clearbit.com/${gainer.symbol.toLowerCase()}.com`} alt={gainer.symbol}  />
              </td>
              <td>{gainer.symbol}</td>
              <td>{gainer.ltP}</td>
              <td>{gainer.per}</td>
            </tr>
          ))} */}
     
      {/* <ReactApexChart options={options} series={series} type="treemap" height='100%' /> */}

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
