import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './MaxPain.css';
import Annotation from 'chartjs-plugin-annotation';
import Autosuggest from 'react-autosuggest';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Annotation
);

function MaxPain( { instrumentList }) {
  const [symbol, setSymbol] = useState('');
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [date, setDate] = useState(null);

  const [filteredNames, setFilteredNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const chartRef = useRef(null);

  const changeHandler = (e) => {
    setSymbol(e.target.value);
  };

  const changeHandler1 = (e) => {
    setDate(e.target.value);
  };

  const highlightMiddlePart = () => {
    if (chartRef.current) {
     
      const chart = chartRef.current;
      console.log(chartRef.current.scales)
     
      const xAxes = chart.scales.x;
      const middleIndex = Math.floor(xAxes.max / 2);

      // const lowestMaxPainData = stockData.reduce((min, current) => current.maxPain < min.maxPain ? current : min, stockData[0]);
      // const lowestMaxPainStrikePrice = lowestMaxPainData.strikePrice;

      if (stockData && stockData.length > 0) {
        const lowestMaxPainIndex = stockData.reduce((minIndex, current, currentIndex, array) => {
          return current.maxPain < array[minIndex].maxPain ? currentIndex : minIndex;
        }, 0);
    
        const lowestMaxPainData = stockData[lowestMaxPainIndex];
        const lowestMaxPainStrikePrice = lowestMaxPainData.strikePrice;
        const labels = stockData.map((option) => option.strikePrice);
        const lowestMaxPainIndexOnXAxis = labels.indexOf(lowestMaxPainStrikePrice);
        console.log('Lowest Max Pain Index:', lowestMaxPainIndex);
        console.log('Lowest Max Pain Data:', lowestMaxPainData);
        console.log('Lowest Max Pain Strike Price:', lowestMaxPainStrikePrice);


        const annotation = {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x',
          value: lowestMaxPainIndexOnXAxis,
          borderColor: 'rgba(255, 99, 132, 0.8)',
          borderWidth: 2,
          borderDash: [5, 5],
          label: {
            content: 'Max Pain',
            position: 'start',
            display:true
          }
        };

        console.log('Annotation Object:', annotation);
        console.log('Existing Annotations:', chart.options.plugins.annotation.annotations)

        chart.options.plugins.annotation.annotations = [annotation];
        chart.update();
        console.log('Existing Annotations:', chart.options.plugins.annotation.annotations)
      }

      
    }
  };


  useEffect(()=>{
    setStockData([
      {
        "strikePrice": 18650,
        "maxPain": 580545440000
      },
      {
        "strikePrice": 18700,
        "maxPain": 570024580000
      },
      {
        "strikePrice": 18750,
        "maxPain": 559540045000
      },
      {
        "strikePrice": 18800,
        "maxPain": 549066640000
      },
      {
        "strikePrice": 18850,
        "maxPain": 538600425000
      },
      {
        "strikePrice": 18900,
        "maxPain": 528138965000
      },
      {
        "strikePrice": 18950,
        "maxPain": 517686050000
      },
      {
        "strikePrice": 19000,
        "maxPain": 507239405000
      },
      {
        "strikePrice": 19050,
        "maxPain": 496926900000
      },
      {
        "strikePrice": 19100,
        "maxPain": 486622095000
      },
      {
        "strikePrice": 19150,
        "maxPain": 476322410000
      },
      {
        "strikePrice": 19200,
        "maxPain": 466038485000
      },
      {
        "strikePrice": 19250,
        "maxPain": 455777545000
      },
      {
        "strikePrice": 19300,
        "maxPain": 445520855000
      },
      {
        "strikePrice": 19350,
        "maxPain": 435275075000
      },
      {
        "strikePrice": 19400,
        "maxPain": 425034880000
      },
      {
        "strikePrice": 19450,
        "maxPain": 414806180000
      },
      {
        "strikePrice": 19500,
        "maxPain": 404588205000
      },
      {
        "strikePrice": 19550,
        "maxPain": 394514765000
      },
      {
        "strikePrice": 19600,
        "maxPain": 384446640000
      },
      {
        "strikePrice": 19650,
        "maxPain": 374408660000
      },
      {
        "strikePrice": 19700,
        "maxPain": 364377910000
      },
      {
        "strikePrice": 19750,
        "maxPain": 354461855000
      },
      {
        "strikePrice": 19800,
        "maxPain": 344549535000
      },
      {
        "strikePrice": 19850,
        "maxPain": 334665170000
      },
      {
        "strikePrice": 19900,
        "maxPain": 324784735000
      },
      {
        "strikePrice": 19950,
        "maxPain": 314912640000
      },
      {
        "strikePrice": 20000,
        "maxPain": 305050720000
      },
      {
        "strikePrice": 20050,
        "maxPain": 295434380000
      },
      {
        "strikePrice": 20100,
        "maxPain": 285825230000
      },
      {
        "strikePrice": 20150,
        "maxPain": 276238005000
      },
      {
        "strikePrice": 20200,
        "maxPain": 266657200000
      },
      {
        "strikePrice": 20250,
        "maxPain": 257115070000
      },
      {
        "strikePrice": 20300,
        "maxPain": 247584155000
      },
      {
        "strikePrice": 20350,
        "maxPain": 238087045000
      },
      {
        "strikePrice": 20400,
        "maxPain": 228599595000
      },
      {
        "strikePrice": 20450,
        "maxPain": 219144575000
      },
      {
        "strikePrice": 20500,
        "maxPain": 209706075000
      },
      {
        "strikePrice": 20550,
        "maxPain": 200475010000
      },
      {
        "strikePrice": 20600,
        "maxPain": 191255720000
      },
      {
        "strikePrice": 20650,
        "maxPain": 182100320000
      },
      {
        "strikePrice": 20700,
        "maxPain": 172968340000
      },
      {
        "strikePrice": 20750,
        "maxPain": 163940455000
      },
      {
        "strikePrice": 20800,
        "maxPain": 154970775000
      },
      {
        "strikePrice": 20850,
        "maxPain": 146083290000
      },
      {
        "strikePrice": 20900,
        "maxPain": 137236450000
      },
      {
        "strikePrice": 20950,
        "maxPain": 128499865000
      },
      {
        "strikePrice": 21000,
        "maxPain": 119850025000
      },
      {
        "strikePrice": 21050,
        "maxPain": 111910650000
      },
      {
        "strikePrice": 21100,
        "maxPain": 104009305000
      },
      {
        "strikePrice": 21150,
        "maxPain": 96288685000
      },
      {
        "strikePrice": 21200,
        "maxPain": 88629180000
      },
      {
        "strikePrice": 21250,
        "maxPain": 81292295000
      },
      {
        "strikePrice": 21300,
        "maxPain": 74041040000
      },
      {
        "strikePrice": 21350,
        "maxPain": 67145365000
      },
      {
        "strikePrice": 21400,
        "maxPain": 60416415000
      },
      {
        "strikePrice": 21450,
        "maxPain": 54194360000
      },
      {
        "strikePrice": 21500,
        "maxPain": 48173655000
      },
      {
        "strikePrice": 21550,
        "maxPain": 43243795000
      },
      {
        "strikePrice": 21600,
        "maxPain": 38498225000
      },
      {
        "strikePrice": 21650,
        "maxPain": 34265280000
      },
      {
        "strikePrice": 21700,
        "maxPain": 30247615000
      },
      {
        "strikePrice": 21750,
        "maxPain": 26747800000
      },
      {
        "strikePrice": 21800,
        "maxPain": 23468930000
      },
      {
        "strikePrice": 21850,
        "maxPain": 20956330000
      },
      {
        "strikePrice": 21900,
        "maxPain": 18738795000
      },
      {
        "strikePrice": 21950,
        "maxPain": 17281390000
      },
      {
        "strikePrice": 22000,
        "maxPain": 16303530000
      },
      {
        "strikePrice": 22050,
        "maxPain": 17111500000
      },
      {
        "strikePrice": 22100,
        "maxPain": 18604800000
      },
      {
        "strikePrice": 22150,
        "maxPain": 21672635000
      },
      {
        "strikePrice": 22200,
        "maxPain": 25584210000
      },
      {
        "strikePrice": 22250,
        "maxPain": 31585500000
      },
      {
        "strikePrice": 22300,
        "maxPain": 38483620000
      },
      {
        "strikePrice": 22350,
        "maxPain": 46903275000
      },
      {
        "strikePrice": 22400,
        "maxPain": 55968350000
      },
      {
        "strikePrice": 22450,
        "maxPain": 66213835000
      },
      {
        "strikePrice": 22500,
        "maxPain": 76988515000
      },
      {
        "strikePrice": 22550,
        "maxPain": 89287050000
      },
      {
        "strikePrice": 22600,
        "maxPain": 102095215000
      },
      {
        "strikePrice": 22650,
        "maxPain": 115702435000
      },
      {
        "strikePrice": 22700,
        "maxPain": 129712885000
      },
      {
        "strikePrice": 22750,
        "maxPain": 144715485000
      },
      {
        "strikePrice": 22800,
        "maxPain": 160021460000
      },
      {
        "strikePrice": 22850,
        "maxPain": 176003210000
      },
      {
        "strikePrice": 22900,
        "maxPain": 192176855000
      },
      {
        "strikePrice": 22950,
        "maxPain": 208641505000
      },
      {
        "strikePrice": 23000,
        "maxPain": 225201270000
      },
      {
        "strikePrice": 23050,
        "maxPain": 243112305000
      },
      {
        "strikePrice": 23100,
        "maxPain": 261245070000
      },
      {
        "strikePrice": 23150,
        "maxPain": 279716330000
      },
      {
        "strikePrice": 23200,
        "maxPain": 298274095000
      },
      {
        "strikePrice": 23250,
        "maxPain": 317092465000
      },
      {
        "strikePrice": 23300,
        "maxPain": 335980800000
      },
      {
        "strikePrice": 23350,
        "maxPain": 355006465000
      },
      {
        "strikePrice": 23400,
        "maxPain": 374063595000
      },
      {
        "strikePrice": 23450,
        "maxPain": 393212130000
      },
      {
        "strikePrice": 23500,
        "maxPain": 412406935000
      },
      {
        "strikePrice": 23550,
        "maxPain": 432042155000
      },
      {
        "strikePrice": 23600,
        "maxPain": 451703460000
      },
      {
        "strikePrice": 23650,
        "maxPain": 471516480000
      },
      {
        "strikePrice": 23700,
        "maxPain": 491347950000
      },
      {
        "strikePrice": 23750,
        "maxPain": 511249140000
      },
      {
        "strikePrice": 23800,
        "maxPain": 531171935000
      },
      {
        "strikePrice": 23850,
        "maxPain": 551239135000
      },
      {
        "strikePrice": 23900,
        "maxPain": 571375015000
      },
      {
        "strikePrice": 23950,
        "maxPain": 591620675000
      }
    ])


  },[])


  useEffect(() => {
    highlightMiddlePart();
  }, [stockData,chartRef]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`http://localhost:5000/max-pain`, { symbol, date })
      .then((response) => {
        setStockData(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('An error occurred while fetching data');
      });
  };

  let options = null;
  let data = null;
  let labels = null;

  if (stockData) {
    options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: symbol,
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

    labels = stockData.map((option) => {
      return option.strikePrice;
    });

    data = {
      labels,
      datasets: [
        {
          label: 'max-pain',
          data: stockData.map((option) => {
            return option.maxPain;
          }),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
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
    <div className='max-pain'>
      
      <label>
        <h3>MaxPain Data</h3>
        <form className='max-pain-form' onSubmit={handleSubmit}>
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
              <option value="28-Dec-2023">28-Dec-2023</option>
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
            <option value='25JAN2024'>25-Jan-2024</option>
            <option value='29FEB2024'>29-Feb-2024</option>

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
  
  <div className='max-pain-canvas'>
  <Bar ref={chartRef} options={options} data={data} />
  </div>
  
  )}
 



      </div>
  )
}



export default MaxPain