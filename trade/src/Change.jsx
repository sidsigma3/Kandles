import React, { useState ,useRef ,useEffect} from 'react';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Select from 'react-select';
import './Change.css'
import Autosuggest from 'react-autosuggest';
import Annotation from 'chartjs-plugin-annotation';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
     LineElement,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import { Line } from 'react-chartjs-2'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Annotation
  );
 





const Change = ({ instrumentList }) => {


  const [symbol, setSymbol] = useState('NIFTY');
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [date,setDate] = useState(null)
  const [instrumentOptions, setInstrumentOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  // const [callDelta, setCallDelta] = useState('');
  // const [callGamma, setCallGamma] = useState('');
  const [spotPrice,setSpotPrice] = useState('')
  const [filteredNames, setFilteredNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [underlyingPrice,setUnderlyingPrice] =useState()

  const chartRef = useRef(null);

  const op = [
  
    { value:'HCLTECH',label:'HCLTECH'},
    {value:'TCS',label:'TCS'},
    {value:'BPCL',label:'BPCL'},
    {value:'NTPC',label:'NTPC'},
    {value:'COALINDIA',label:'COALINDIA'},
    {value:'DLF',label:'DLF'},
    {value:'ITC',label:'ITC'},
    {value:'WIPRO',label:'WIPRO'},
    {value:'NIFTY',label:'NIFTY'},


];

  let strikeIndex

  const changeHandler = (e) => {
    setSymbol(e.target.value)
  }

  const changeHandler1 = (e) => {
    setDate(e.target.value)
  }

  const handleChange = (selected) => {
    setSelectedOption(selected);
  };
  


  
  const highlightMiddlePart = () => {
    
    if (chartRef.current) {
      
      // const chart = chartRef.current;
      console.log(chartRef.current.scales)

      if (stockData) {
        
    
        const chart = chartRef.current;
        const atmStrike = stockData.calls.reduce((closest, call) => {
          const difference = Math.abs(call.strikePrice - underlyingPrice);
          if (difference < Math.abs(closest.strikePrice - underlyingPrice)) {
            return call;
          }
          return closest;
        }, stockData.calls[0]);

        // Use atmStrike.strikePrice as the ATM strike price in your options
       const strike = atmStrike.strikePrice;
       strikeIndex = labels.indexOf(strike);
       const annotation = {
        type: 'line',
        mode: 'vertical',
        scaleID: 'x',
        value: strikeIndex,
        borderColor: 'rgba(255, 99, 132, 0.8)',
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          content: 'ATM',
          position: 'start',
          display:true
        }
      };
    
        // const lowestMaxPainIndex = stockData.reduce((minIndex, current, currentIndex, array) => {
        //   return current.maxPain < array[minIndex].maxPain ? currentIndex : minIndex;
        // }, 0);
    
        // const lowestMaxPainData = stockData[lowestMaxPainIndex];
        // const lowestMaxPainStrikePrice = lowestMaxPainData.strikePrice;
        // const labels = stockData.map((option) => option.strikePrice);
        // const lowestMaxPainIndexOnXAxis = labels.indexOf(lowestMaxPainStrikePrice);
        // console.log('Lowest Max Pain Index:', lowestMaxPainIndex);
        // console.log('Lowest Max Pain Data:', lowestMaxPainData);
        // console.log('Lowest Max Pain Strike Price:', lowestMaxPainStrikePrice);
  
  
        // const annotation = {
        //   type: 'line',
        //   mode: 'vertical',
        //   scaleID: 'x',
        //   value: lowestMaxPainIndexOnXAxis,
        //   borderColor: 'rgba(255, 99, 132, 0.8)',
        //   borderWidth: 2,
        //   borderDash: [5, 5],
        //   label: {
        //     content: 'Max Pain',
        //     position: 'start',
        //     display:true
        //   }
        // };
  
        console.log('Annotation Object:', annotation);
        console.log('Existing Annotations:', chart.options.plugins.annotation.annotations)
  
        chart.options.plugins.annotation.annotations = [annotation];
        chart.update();
        console.log('Existing Annotations:', chart.options.plugins.annotation.annotations)
      }
  
      
    }
  };
  
  useEffect(() => {
    highlightMiddlePart();
  }, [stockData,chartRef]);
  


  useEffect(()=>{
    console.log('hua kya')
    handleSubmit()

  },[symbol])


useEffect(()=>{
setStockData({
  "calls": [
    {
      "strikePrice": 18650,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 3319.1,
      "openInterest": 491,
      "changeinOpenInterest": -157,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 18700,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 3295,
      "openInterest": 936,
      "changeinOpenInterest": -86,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 18750,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 3301,
      "openInterest": 16,
      "changeinOpenInterest": -7,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 18800,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 3127,
      "openInterest": 75,
      "changeinOpenInterest": -13,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 18850,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 0,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 18900,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 3333.25,
      "openInterest": 13,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 18950,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2985,
      "openInterest": 4,
      "changeinOpenInterest": -1,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19000,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2910,
      "openInterest": 5317,
      "changeinOpenInterest": -2328,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19050,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2868.55,
      "openInterest": 3,
      "changeinOpenInterest": 1,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19100,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2800,
      "openInterest": 25,
      "changeinOpenInterest": -8,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19150,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 3060,
      "openInterest": 5,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19200,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2752,
      "openInterest": 38,
      "changeinOpenInterest": -8,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19250,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2953.75,
      "openInterest": 2,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19300,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2665,
      "openInterest": 85,
      "changeinOpenInterest": -10,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19350,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2853.6,
      "openInterest": 177,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19400,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2561.95,
      "openInterest": 81,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19450,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 0,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19500,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2400,
      "openInterest": 1094,
      "changeinOpenInterest": -638,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19550,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 1,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19600,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2385.2,
      "openInterest": 179,
      "changeinOpenInterest": -37,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19650,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2350,
      "openInterest": 4,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19700,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2305,
      "openInterest": 261,
      "changeinOpenInterest": -95,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19750,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 6,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19800,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2160.1,
      "openInterest": 119,
      "changeinOpenInterest": -34,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19850,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2266.6,
      "openInterest": 5,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19900,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2002.25,
      "openInterest": 121,
      "changeinOpenInterest": -12,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19950,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 34,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20000,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1909.8,
      "openInterest": 7510,
      "changeinOpenInterest": -268,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20050,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 19,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20100,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1810,
      "openInterest": 62,
      "changeinOpenInterest": -67,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20150,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1860,
      "openInterest": 4,
      "changeinOpenInterest": 1,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20200,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1760,
      "openInterest": 105,
      "changeinOpenInterest": -135,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20250,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1777.15,
      "openInterest": 94,
      "changeinOpenInterest": 64,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20300,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1630,
      "openInterest": 149,
      "changeinOpenInterest": -175,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20350,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1675,
      "openInterest": 37,
      "changeinOpenInterest": -2,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20400,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1505,
      "openInterest": 157,
      "changeinOpenInterest": -602,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20450,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1570,
      "openInterest": 23,
      "changeinOpenInterest": 3,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20500,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1401,
      "openInterest": 3520,
      "changeinOpenInterest": -550,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20550,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 18,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20600,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1383.1,
      "openInterest": 200,
      "changeinOpenInterest": -83,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20650,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1299,
      "openInterest": 25,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20700,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1213.7,
      "openInterest": 1167,
      "changeinOpenInterest": -7,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20750,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 67,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20800,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1125,
      "openInterest": 1651,
      "changeinOpenInterest": -8,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20850,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1180,
      "openInterest": 85,
      "changeinOpenInterest": -38,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20900,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1016.45,
      "openInterest": 1944,
      "changeinOpenInterest": -4,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20950,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 950,
      "openInterest": 105,
      "changeinOpenInterest": 20,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21000,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 914,
      "openInterest": 6866,
      "changeinOpenInterest": -1357,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21050,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 154,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21100,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 812,
      "openInterest": 1588,
      "changeinOpenInterest": -17,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21150,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 762.2,
      "openInterest": 227,
      "changeinOpenInterest": -14,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21200,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 707.55,
      "openInterest": 2102,
      "changeinOpenInterest": -20,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21250,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 662.1,
      "openInterest": 236,
      "changeinOpenInterest": -30,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21300,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 611.55,
      "openInterest": 4093,
      "changeinOpenInterest": -209,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21350,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 562,
      "openInterest": 358,
      "changeinOpenInterest": -31,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21400,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 510.85,
      "openInterest": 3385,
      "changeinOpenInterest": 106,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21450,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 464.1,
      "openInterest": 380,
      "changeinOpenInterest": -35,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21500,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 416.2,
      "openInterest": 16159,
      "changeinOpenInterest": -540,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21550,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 366.9,
      "openInterest": 480,
      "changeinOpenInterest": 61,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21600,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 318.35,
      "openInterest": 5014,
      "changeinOpenInterest": -268,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21650,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 275.25,
      "openInterest": 731,
      "changeinOpenInterest": -36,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21700,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 231.65,
      "openInterest": 10019,
      "changeinOpenInterest": -1173,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21750,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 190.5,
      "openInterest": 1836,
      "changeinOpenInterest": 798,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21800,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 153.75,
      "openInterest": 27335,
      "changeinOpenInterest": 9100,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21850,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 122.4,
      "openInterest": 6628,
      "changeinOpenInterest": 4519,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21900,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 95.05,
      "openInterest": 45755,
      "changeinOpenInterest": 29871,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21950,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 72.9,
      "openInterest": 42413,
      "changeinOpenInterest": 38218,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22000,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 55,
      "openInterest": 219377,
      "changeinOpenInterest": 144832,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22050,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 41.3,
      "openInterest": 104649,
      "changeinOpenInterest": 94148,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22100,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 30.8,
      "openInterest": 241782,
      "changeinOpenInterest": 171746,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22150,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 22.8,
      "openInterest": 143774,
      "changeinOpenInterest": 93795,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22200,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 16.45,
      "openInterest": 362810,
      "changeinOpenInterest": 213805,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22250,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 11.8,
      "openInterest": 167645,
      "changeinOpenInterest": 98931,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22300,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 8.35,
      "openInterest": 282865,
      "changeinOpenInterest": 137393,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22350,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 5.95,
      "openInterest": 121322,
      "changeinOpenInterest": 65257,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22400,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 4.4,
      "openInterest": 226429,
      "changeinOpenInterest": 109382,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22450,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 3.45,
      "openInterest": 106372,
      "changeinOpenInterest": 52445,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22500,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2.9,
      "openInterest": 291490,
      "changeinOpenInterest": 129683,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22550,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2.55,
      "openInterest": 100701,
      "changeinOpenInterest": 41829,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22600,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2.25,
      "openInterest": 160305,
      "changeinOpenInterest": 40900,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22650,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2.15,
      "openInterest": 79923,
      "changeinOpenInterest": 27666,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22700,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2,
      "openInterest": 195944,
      "changeinOpenInterest": 58529,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22750,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.85,
      "openInterest": 60288,
      "changeinOpenInterest": -11699,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22800,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.7,
      "openInterest": 134957,
      "changeinOpenInterest": -19212,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22850,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.65,
      "openInterest": 37764,
      "changeinOpenInterest": -11992,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22900,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.55,
      "openInterest": 58149,
      "changeinOpenInterest": 2631,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22950,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.55,
      "openInterest": 19115,
      "changeinOpenInterest": -2083,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23000,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.55,
      "openInterest": 261790,
      "changeinOpenInterest": 1246,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23050,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.55,
      "openInterest": 43429,
      "changeinOpenInterest": -375,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23100,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.45,
      "openInterest": 68064,
      "changeinOpenInterest": 2573,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23150,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.4,
      "openInterest": 17315,
      "changeinOpenInterest": -5190,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23200,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.35,
      "openInterest": 52072,
      "changeinOpenInterest": 2116,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23250,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.35,
      "openInterest": 13931,
      "changeinOpenInterest": -1941,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23300,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.35,
      "openInterest": 27028,
      "changeinOpenInterest": 6447,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23350,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.3,
      "openInterest": 6099,
      "changeinOpenInterest": -411,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23400,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.3,
      "openInterest": 17672,
      "changeinOpenInterest": 1710,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23450,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.2,
      "openInterest": 8895,
      "changeinOpenInterest": -35,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23500,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.25,
      "openInterest": 84482,
      "changeinOpenInterest": -10778,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23550,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.1,
      "openInterest": 5218,
      "changeinOpenInterest": -809,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23600,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.1,
      "openInterest": 30264,
      "changeinOpenInterest": -13162,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23650,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.05,
      "openInterest": 3705,
      "changeinOpenInterest": -1902,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23700,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.1,
      "openInterest": 13940,
      "changeinOpenInterest": 576,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23750,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.1,
      "openInterest": 4138,
      "changeinOpenInterest": -730,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23800,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.1,
      "openInterest": 28701,
      "changeinOpenInterest": 7935,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23850,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.1,
      "openInterest": 13559,
      "changeinOpenInterest": 494,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23900,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.15,
      "openInterest": 21246,
      "changeinOpenInterest": 6118,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23950,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.1,
      "openInterest": 28278,
      "changeinOpenInterest": 3203,
      "underlyingValue": 21950.8
    }
  ],
  "puts": [
    {
      "strikePrice": 18650,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.05,
      "openInterest": 124177,
      "changeinOpenInterest": 78648,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 18700,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 6268,
      "changeinOpenInterest": 3240,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 18750,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 2191,
      "changeinOpenInterest": 438,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 18800,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 1352,
      "changeinOpenInterest": 171,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 18850,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 966,
      "changeinOpenInterest": 335,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 18900,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 1673,
      "changeinOpenInterest": -5,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 18950,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.15,
      "openInterest": 1131,
      "changeinOpenInterest": 176,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19000,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.2,
      "openInterest": 21288,
      "changeinOpenInterest": 1230,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19050,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 1527,
      "changeinOpenInterest": 414,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19100,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 988,
      "changeinOpenInterest": 106,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19150,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 3093,
      "changeinOpenInterest": 1075,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19200,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.15,
      "openInterest": 4342,
      "changeinOpenInterest": 1762,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19250,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.15,
      "openInterest": 842,
      "changeinOpenInterest": 210,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19300,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.15,
      "openInterest": 2091,
      "changeinOpenInterest": 398,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19350,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 934,
      "changeinOpenInterest": 97,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19400,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 2207,
      "changeinOpenInterest": 618,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19450,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 2134,
      "changeinOpenInterest": 440,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19500,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 27758,
      "changeinOpenInterest": -2093,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19550,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 1052,
      "changeinOpenInterest": -18,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19600,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.1,
      "openInterest": 5817,
      "changeinOpenInterest": -4773,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19650,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.15,
      "openInterest": 1431,
      "changeinOpenInterest": 439,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19700,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.15,
      "openInterest": 22469,
      "changeinOpenInterest": -2259,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19750,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.15,
      "openInterest": 742,
      "changeinOpenInterest": 224,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19800,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.15,
      "openInterest": 5446,
      "changeinOpenInterest": 1527,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19850,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.15,
      "openInterest": 719,
      "changeinOpenInterest": 79,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19900,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.25,
      "openInterest": 1554,
      "changeinOpenInterest": -14,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 19950,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.2,
      "openInterest": 1967,
      "changeinOpenInterest": 1211,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20000,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.3,
      "openInterest": 41774,
      "changeinOpenInterest": -1829,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20050,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.15,
      "openInterest": 1413,
      "changeinOpenInterest": 634,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20100,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.25,
      "openInterest": 4410,
      "changeinOpenInterest": -1388,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20150,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.2,
      "openInterest": 1160,
      "changeinOpenInterest": 148,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20200,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.25,
      "openInterest": 7630,
      "changeinOpenInterest": 464,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20250,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.15,
      "openInterest": 2075,
      "changeinOpenInterest": 919,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20300,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.25,
      "openInterest": 6613,
      "changeinOpenInterest": 161,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20350,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.25,
      "openInterest": 1860,
      "changeinOpenInterest": 565,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20400,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.25,
      "openInterest": 6334,
      "changeinOpenInterest": 1097,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20450,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.2,
      "openInterest": 3362,
      "changeinOpenInterest": 1754,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20500,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.35,
      "openInterest": 36693,
      "changeinOpenInterest": 1533,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20550,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.35,
      "openInterest": 2317,
      "changeinOpenInterest": 297,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20600,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.3,
      "openInterest": 12486,
      "changeinOpenInterest": 155,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20650,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.3,
      "openInterest": 4540,
      "changeinOpenInterest": 2579,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20700,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.45,
      "openInterest": 20128,
      "changeinOpenInterest": -3314,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20750,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.5,
      "openInterest": 11767,
      "changeinOpenInterest": -2141,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20800,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.45,
      "openInterest": 15151,
      "changeinOpenInterest": -12526,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20850,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.55,
      "openInterest": 8151,
      "changeinOpenInterest": -5770,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20900,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.5,
      "openInterest": 20250,
      "changeinOpenInterest": -4634,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 20950,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.55,
      "openInterest": 17236,
      "changeinOpenInterest": -394,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21000,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.55,
      "openInterest": 138431,
      "changeinOpenInterest": 2064,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21050,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.6,
      "openInterest": 7334,
      "changeinOpenInterest": -1352,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21100,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.6,
      "openInterest": 34609,
      "changeinOpenInterest": -9511,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21150,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.7,
      "openInterest": 11841,
      "changeinOpenInterest": -2562,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21200,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.8,
      "openInterest": 64986,
      "changeinOpenInterest": 1562,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21250,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.85,
      "openInterest": 17330,
      "changeinOpenInterest": -2464,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21300,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0.95,
      "openInterest": 67750,
      "changeinOpenInterest": 7312,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21350,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.25,
      "openInterest": 33850,
      "changeinOpenInterest": 3021,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21400,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1.6,
      "openInterest": 99334,
      "changeinOpenInterest": 14124,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21450,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 2.25,
      "openInterest": 39628,
      "changeinOpenInterest": 9968,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21500,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 3.45,
      "openInterest": 201811,
      "changeinOpenInterest": 19430,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21550,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 5.1,
      "openInterest": 37479,
      "changeinOpenInterest": 12120,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21600,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 7.85,
      "openInterest": 90569,
      "changeinOpenInterest": 8786,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21650,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 12.45,
      "openInterest": 45263,
      "changeinOpenInterest": 14776,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21700,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 19.25,
      "openInterest": 93189,
      "changeinOpenInterest": -7334,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21750,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 28.9,
      "openInterest": 42477,
      "changeinOpenInterest": 4564,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21800,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 42.6,
      "openInterest": 133807,
      "changeinOpenInterest": 33857,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21850,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 60.8,
      "openInterest": 51747,
      "changeinOpenInterest": 12594,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21900,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 83.9,
      "openInterest": 100397,
      "changeinOpenInterest": 1845,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 21950,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 111.55,
      "openInterest": 53351,
      "changeinOpenInterest": 11734,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22000,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 143.65,
      "openInterest": 145555,
      "changeinOpenInterest": -27073,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22050,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 180,
      "openInterest": 29596,
      "changeinOpenInterest": -5018,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22100,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 219.85,
      "openInterest": 76266,
      "changeinOpenInterest": -43984,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22150,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 261.4,
      "openInterest": 28326,
      "changeinOpenInterest": -25765,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22200,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 305.25,
      "openInterest": 60281,
      "changeinOpenInterest": -42944,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22250,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 350.8,
      "openInterest": 14505,
      "changeinOpenInterest": -10558,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22300,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 397.35,
      "openInterest": 21061,
      "changeinOpenInterest": -11454,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22350,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 444.2,
      "openInterest": 6523,
      "changeinOpenInterest": 446,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22400,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 492.1,
      "openInterest": 15689,
      "changeinOpenInterest": 67,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22450,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 542.5,
      "openInterest": 1106,
      "changeinOpenInterest": -218,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22500,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 590.5,
      "openInterest": 15483,
      "changeinOpenInterest": -525,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22550,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 639.9,
      "openInterest": 391,
      "changeinOpenInterest": -241,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22600,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 696,
      "openInterest": 1073,
      "changeinOpenInterest": -36,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22650,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 751.2,
      "openInterest": 182,
      "changeinOpenInterest": -72,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22700,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 793,
      "openInterest": 1543,
      "changeinOpenInterest": -1638,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22750,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 850,
      "openInterest": 295,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22800,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 902,
      "openInterest": 295,
      "changeinOpenInterest": 2,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22850,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 896.9,
      "openInterest": 78,
      "changeinOpenInterest": -10,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22900,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 988.05,
      "openInterest": 140,
      "changeinOpenInterest": -28,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 22950,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 949.15,
      "openInterest": 78,
      "changeinOpenInterest": -16,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23000,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1088.35,
      "openInterest": 7274,
      "changeinOpenInterest": -1843,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23050,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1046.9,
      "openInterest": 55,
      "changeinOpenInterest": -1,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23100,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1175.85,
      "openInterest": 79,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23150,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1057.65,
      "openInterest": 7,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23200,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1235.85,
      "openInterest": 119,
      "changeinOpenInterest": -4,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23250,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1157.65,
      "openInterest": 6,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23300,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1343.45,
      "openInterest": 97,
      "changeinOpenInterest": -5,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23350,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 4,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23400,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1307.7,
      "openInterest": 38,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23450,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 0,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23500,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1600.95,
      "openInterest": 1708,
      "changeinOpenInterest": -870,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23550,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 1,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23600,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1573.9,
      "openInterest": 12,
      "changeinOpenInterest": -8,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23650,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 20,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23700,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1673.85,
      "openInterest": 48,
      "changeinOpenInterest": -2,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23750,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 60,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23800,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1834,
      "openInterest": 55,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23850,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 75,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23900,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 1863,
      "openInterest": 6,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    },
    {
      "strikePrice": 23950,
      "expiryDate": "29-Feb-2024",
      "underlying": "NIFTY",
      "lastPrice": 0,
      "openInterest": 7,
      "changeinOpenInterest": 0,
      "underlyingValue": 21950.8
    }
  ],
  "pcr": [
    252.6500508646999,
    6.6935397757608115,
    132.8181818181818,
    17.91390728476821,
    1933,
    123.96296296296296,
    251.44444444444446,
    4.0034790785143395,
    436.42857142857144,
    38.76470588235294,
    562.4545454545455,
    112.79220779220779,
    337,
    24.461988304093566,
    5.264788732394366,
    27.085889570552148,
    4269,
    25.36180904522613,
    701.6666666666666,
    32.409470752089135,
    318.1111111111111,
    85.92543021032505,
    114.23076923076923,
    45.57740585774059,
    130.8181818181818,
    12.794238683127572,
    57.028985507246375,
    5.562146328473471,
    72.48717948717949,
    70.568,
    257.8888888888889,
    72.32701421800948,
    21.962962962962962,
    44.23745819397993,
    49.61333333333334,
    40.21904761904762,
    143.08510638297872,
    10.422809260048288,
    125.27027027027027,
    62.276807980049874,
    178.05882352941177,
    17.2406852248394,
    174.33333333333334,
    9.174386920980927,
    95.3391812865497,
    10.414245307276936,
    163.3791469194313,
    20.160416514963956,
    47.47249190938511,
    21.78753541076487,
    52.050549450549454,
    30.909155766944114,
    73.27906976744185,
    16.550751190912422,
    94.42259414225941,
    29.34116083296411,
    104.1484888304862,
    12.488721804511279,
    78.00104058272633,
    18.061521587396552,
    61.87764866712235,
    9.300813413843006,
    23.12959433705418,
    4.89500832251102,
    7.806819038998265,
    2.1942170886560084,
    1.2578895870418616,
    0.6634932935237206,
    0.28281549362395425,
    0.31543432630566726,
    0.19702033392569615,
    0.16615147577040906,
    0.08652483961692978,
    0.07445764859977622,
    0.05376991077500051,
    0.06929088303423361,
    0.010402124609274014,
    0.05311836920928813,
    0.0038877275909494895,
    0.006696588700949125,
    0.0022834335333162337,
    0.007877230542321933,
    0.004901432279788019,
    0.002189578200544616,
    0.002078671768459797,
    0.0024161858657426117,
    0.004106615050613376,
    0.027787486558908746,
    0.0012779332020861397,
    0.0011680097554525486,
    0.00043313793999595737,
    0.002294877334485573,
    0.00046656856763449734,
    0.0036073034019645928,
    0.0007377653906057873,
    0.0021785259584099588,
    0.000056208195154853575,
    0.020223123132009586,
    0.0002874389192296637,
    0.00041302516149283817,
    0.005532316826339225,
    0.0034790717693052617,
    0.014618823245137127,
    0.0019336968451126248,
    0.005568051919318559,
    0.00030593274186336574,
    0.00026521915943207737
  ]
})
},[])



  const handleSubmit = async (event) => {
    event.preventDefault();
    
   axios.post(`http://localhost:5000/oi-changes`,{symbol,date})
   .then((response)=>{
      setStockData(response.data);
     
      setUnderlyingPrice(response.data.calls[0].underlyingValue)
      setError(null);
   }).catch((err)=>{
    console.error(error);
    setError('An error occurred while fetching data');
    setPrice(null);

   })
 
  }

  let options = null;
  let data = null;
  let labels = null;
  let labels1 = null;
  let options2=null;
  let options1 = null;
  let options3 = null;
  let data1 = null;
  let data2 = null;
  let data3= null;
  
  

// Find the ATM strike price


// Rest of your code
// options = {
//   // ... other options
//   annotation: {
//     annotations: [
//       {
//         type: 'line',
//         mode: 'vertical',
//         scaleID: 'x',
//         value: maxOpenInterestStrike, // Set this to the ATM strike price
//         borderColor: 'red', // Change the color as needed
//         borderWidth: 2,
//         label: {
//           content: 'ATM',
//           enabled: true,
//           position: 'top',
//         },
//       },
//     ],
//   },
// };




  if (stockData) {

   
  // console.log('Annotation Object:', annotation);
  // console.log('Existing Annotations:', chart.options.plugins.annotation.annotations)

  // chart.options.plugins.annotation.annotations = [annotation];
  // chart.update();
  // console.log('Existing Annotations:', chart.options.plugins.annotation.annotations)



    options = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'OI change',
          font: {
        size: 20, // Set the desired font size for the title
      },
        },
        annotation: {
          annotations: [
            {
              type: 'line',
              mode: 'vertical',
              scaleID: 'x',
              value: strikeIndex, // Replace with your ATM strike price
              borderColor: 'rgba(255, 99, 132, 0.8)',
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                content: `ATM  ${strikeIndex}`,
                position: 'start',
                display: true,
              },
            },
          ],
        },
      },
      scales: {
        y: {
          grid: {
            display: true,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };

    options1 = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Open Interest',
          font: {
            size: 20, // Set the desired font size for the title
          },
        },
        annotation: {
          annotations: [] // Annotations will be added dynamically
        }
      },
      scales: {
        y: {
          grid: {
            display: true,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };


    // options1 = {
    //   responsive: true,
    //   maintainAspectRatio: true,
    //   plugins: {
    //     legend: {
    //       position: 'top',
    //     },
    //     title: {
    //       display: true,
    //       text: 'Open Interest',
    //       font: {
    //         size: 20, // Set the desired font size for the title
    //       },
    //     },
    //     annotation: {
    //       annotations:
    //        [
    //         {
    //           type: 'line',
    //           mode: 'vertical',
    //           scaleID: 'x',
    //           value: strike, // Set this to the ATM strike price
    //           borderColor: 'red', // Change the color as needed
    //           borderWidth: 2,
    //           label: {
    //             content: 'ATM',
    //             display: true,
    //             position: 'start',
    //           },
    //         },
    //       ],
    //     },
    //   },
    //   scales: {
    //     y: {
    //       grid: {
    //         display: true,
    //       },
    //     },
    //     x: {
    //       grid: {
    //         display: false,
    //       },
    //     },
    //   },
    // };

    // options1 = {
    //   responsive: true,
    //   maintainAspectRatio: true,
    //   plugins: {
    //     legend: {
    //       position: 'top',
    //     },
    //     title: {
    //       display: true,
    //       text: 'Open Interest',
    //       font: {
    //         size: 20, // Set the desired font size for the title
    //       },
    //     },
    //     annotation: {
    //       drawTime: 'beforeDatasetsDraw', // Draw annotations before datasets are drawn
    //       annotations: [
    //         {
    //           type: 'line',
    //           mode: 'vertical',
    //           scaleID: 'x',
    //           value: '21750', // Set this to the ATM strike price
    //           borderColor: 'rgb(255, 99, 132)',
    //           borderWidth: 2,
    //           borderDash: [5, 5],
    //           label: {
    //             content: 'ATM',
    //             position: 'top',
    //             enabled: true, // Enable the label
    //           },
    //         },
    //       ],
    //     },
    //   },
    //   scales: {
    //     y: {
    //       grid: {
    //         display: true,
    //       },
    //     },
    //     x: {
    //       grid: {
    //         display: false,
    //       },
    //     },
    //   },
    // };
    
    
    options2 = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Last Price',
          font: {
            size: 20, // Set the desired font size for the title
          },
        },
      },
      scales: {
        y: {
          grid: {
            display: true,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };

    options3 = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'PCR',
          font: {
            size: 20, // Set the desired font size for the title
          },
        },
      },
      scales: {
        y: {
          grid: {
            display: true,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };
    
    const findMaxOpenInterest = (options) => {
      return options.reduce((max, option) => {
          return option.openInterest > max.openInterest ? option : max;
      }, options[0]);
  };
  
  const maxOpenInterestCall = findMaxOpenInterest(stockData.calls);
  const maxOpenInterestPut = findMaxOpenInterest(stockData.puts);
  const maxOpenInterestStrike = maxOpenInterestCall.strikePrice;


    const sliceDataAroundStrike = (options, targetStrike, numStrikes) => {
      const targetIndex = options.findIndex(option => option.strikePrice === targetStrike);
      const startIndex = Math.max(0, targetIndex - numStrikes);
      const endIndex = Math.min(options.length - 1, targetIndex + numStrikes);
  
      return options.slice(startIndex, endIndex + 1);
  };
  
  const numStrikesToInclude = 35; // Adjust as needed
  const slicedCalls = sliceDataAroundStrike(stockData.calls, maxOpenInterestStrike, numStrikesToInclude);
  const slicedPuts = sliceDataAroundStrike(stockData.puts, maxOpenInterestStrike, numStrikesToInclude);

  labels = slicedCalls.map(option => option.strikePrice);
  labels1 = stockData.calls.map((option)=>{
    return option.strikePrice
  });

  data1 = {
      labels,
      datasets: [
          {
              label: 'calls',
              data: slicedCalls.map(option => option.openInterest),
              backgroundColor: '#FB3A3A',
          },
          {
              label: 'puts',
              data: slicedPuts.map(option => option.openInterest),
              backgroundColor: '#0E7F0E',
          },
      ],
  };
  
  data = {
      labels,
      datasets: [
          {
              label: 'calls',
              data: slicedCalls.map(option => option.changeinOpenInterest),
              backgroundColor: '#FB3A3A',
          },
          {
              label: 'puts',
              data: slicedPuts.map(option => option.changeinOpenInterest),
              backgroundColor: '#0E7F0E',
          },
      ],
  };
  
    // labels = stockData.calls.map((option)=>{
    //   return option.strikePrice
    // });

   
    
    // data = {
    //   labels,
    //   datasets: [
    //     {
    //       label: 'calls',
    //       data: stockData.calls.map((option)=>{
    //           return option.changeinOpenInterest
    //       }),
    //       backgroundColor: '#FB3A3A',
    //     },
    //     {
    //       label: 'puts',
    //       data: stockData.puts.map((option)=>{
    //           return option.changeinOpenInterest
    //       }),
    //       backgroundColor: '#0E7F0E',
    //     }
    //   ],
    // };


    // data1 = {
    //   labels,
    //   datasets: [
    //     {
    //       label: 'calls',
    //       data: stockData.calls.map((option)=>{
    //           return option.openInterest
    //       }),
    //       backgroundColor: '#FB3A3A',
    //     },
    //     {
    //       label: 'puts',
    //       data: stockData.puts.map((option)=>{
    //           return option.openInterest
    //       }),
    //       backgroundColor: '#0E7F0E',
    //     }
    //   ],
    // }

    data2 = {
      labels,
      datasets: [
        {
          label: 'calls',
          data: stockData.calls.map((option)=>{
              return option.lastPrice
          }),
          backgroundColor: '#FB3A3A',
        },
        {
          label: 'puts',
          data: stockData.puts.map((option)=>{
              return option.lastPrice
          }),
          backgroundColor: '#0E7F0E',
        }
      ],
    }


    data3 = {
      labels,
      datasets: [
        {
          label: 'pcr',
          data: stockData.pcr.map((option)=>{
              return option
          }),
          backgroundColor: '#FB3A3A',
        }
      ],
    }

  }


  

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0
      ? []
      : instrumentList.filter((instrument) => {
          const name = instrument.toLowerCase();
          return name.includes(inputValue);
        });
  };
  
  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div>
     <h6>{suggestion}</h6> 
    </div>
  );

  
  const onSuggestionsFetchRequested = ({ value }) => {
    setFilteredNames(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setFilteredNames([]);
  };


  const handleSuggestionSelected = (_, { suggestion }) => {
    console.log(suggestion)
    setSymbol(suggestion)
 
  };

  return (
    <div className='oi-change'>

{/* 
       <form onSubmit={handleSubmit}>
      <Select
        className="change-select"
        options={instrumentList}
        isSearchable={true}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form> */}


      
      <label>
        <h3>Change Data</h3>
        <form onSubmit={handleSubmit}>
        {/* <Select className='change-select' options={op} isSearchable={true} onChange={changeHandler} /> */}
            {/* <select onChange={changeHandler} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
          <option selected>Open Stocks</option>
          <option value='HCLTECH'>HCLTECH</option>
          <option value='TCS'>TCS</option>
          <option value='BPCL'>BPCL</option>
          <option value='NTPC'>NTPC</option>
          <option value='COALINDIA'>COALINDIA</option>
          <option value='DLF'>DLF</option>
          <option value='ITC'>ITC</option>
          <option value='WIPRO'>WIPRO</option>
          <option value='NIFTY'>NIFTY</option>
            </select> */}

        <Autosuggest
        
          suggestions={filteredNames}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: 'Search instrument',
            value: searchTerm,
            onChange: (e, { newValue }) => setSearchTerm(newValue),
            style: {
              width: '100%', // Set the width to 100% to fill the available space
              height:'44px',
              fontSize:'17px',
              color:'black',
              border: '1px solid #ccc',
              borderRadius: '3px',
              textAlign:'center'
            },
          }}
          onSuggestionSelected={handleSuggestionSelected}
        />



          {symbol==='NIFTY' && (<select onChange={changeHandler1} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
            <option selected>DATE</option>
            {/* <option value='20APR2023'>20-Apr-2023</option>
            <option value='27APR2023'>27-Apr-2023</option>
            <option value='04MAY2023'>04-May-2023</option>
            <option value='11MAY2023'>11-May-2023</option>
            <option value='18MAY2023'>18-May-2023</option>
            <option value='25MAY2023'>25-May-2023</option>
            <option value='29JUN2023'>29-Jun-2023</option> */}
            <option value="28DEC2023">28-Dec-2023</option>
              <option value="04JAN2024">04-Jan-2024</option>
              <option value="11JAN2024">11-Jan-2024</option>
              <option value="18JAN2024">18-Jan-2024</option>
              <option value="25JAN2024">25-Jan-2024</option>
              <option value="01FEB2024">01-Feb-2024</option>
              <option value="29FEB2024">29-Feb-2024</option>
              <option value="28MAR2024">28-Mar-2024</option>
              <option value="27JUN2024">27-Jun-2024</option>
              <option value="26SEP2024">26-Sep-2024</option>
              <option value="26DEC2024">26-Dec-2024</option>
              <option value="26JUN2025">26-Jun-2025</option>
              <option value="24DEC2025">24-Dec-2025</option>
              <option value="25JUN2026">25-Jun-2026</option>
              <option value="31DEC2026">31-Dec-2026</option>
              <option value="24JUN2027">24-Jun-2027</option>
              <option value="30DEC2027">30-Dec-2027</option>
              <option value="29JUN2028">29-Jun-2028</option>
            
            </select>
            )}           

        {symbol!=='NIFTY' && symbol!=='BANKNIFTY' && (
              <select onChange={changeHandler1} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
             <option selected>DATE</option>
             <option value='28-Dec-2023'>28-Dec-2023</option>
            <option value='25-Jan-2024'>25-Jan-2024</option>
            <option value='29-Feb-2024'>29-Feb-2024</option>

            </select>

          )}


          {symbol==='BANKNIFTY'&& (
              <select onChange={changeHandler1} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
             <option selected>DATE</option>
             <option value="28-Dec-2023">28-Dec-2023</option>
             <option value="03JAN2024">03-Jan-2024</option>
             <option value="10JAN2024">10-Jan-2024</option>
             <option value="17JAN2024">17-Jan-2024</option>
             <option value="25JAN2024">25-Jan-2024</option>
             <option value="31JAN2024">31-Jan-2024</option>
             <option value="29FEB2024">29-Feb-2024</option>
             <option value="28MAR2024">28-Mar-2024</option>
             <option value="27JUN2024">27-Jun-2024</option>
             <option value="26SEP2024">26-Sep-2024</option>

            </select>

          )}


            <button className='submit btn btn-primary'>Submit</button>
  </form>
  </label>

 

{stockData && ( 
  
  <div className='oi-canvas'>
  <Bar ref={chartRef} options={options1} data={data1} />
  </div>
  )}

{stockData && ( 
  
  <div className='oi-canvas'>
  <Bar options={options} data={data} />
  </div>
  )}


{stockData && ( 
  
  <div className='oi-canvas'>
  <Line options={options3} data={data3} />
  </div>
  )}



{stockData && ( 
  
  <div className='oi-canvas'>
  <Bar options={options2} data={data2} />
  </div>
  )}



      </div>
  )
}



export default Change