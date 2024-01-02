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