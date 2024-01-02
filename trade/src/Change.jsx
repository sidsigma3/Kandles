import React, { useState } from 'react';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Select from 'react-select';
import './Change.css'
import Autosuggest from 'react-autosuggest';
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
    Legend
  );
 





const Change = ({ instrumentList }) => {


  const [symbol, setSymbol] = useState('');
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


  const changeHandler = (e) => {
    setSymbol(e.target.value)
  }

  const changeHandler1 = (e) => {
    setDate(e.target.value)
  }

  const handleChange = (selected) => {
    setSelectedOption(selected);
  };
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    
   axios.post(`http://localhost:5000/oi-changes`,{symbol,date})
   .then((response)=>{
      setStockData(response.data);
      setSpotPrice(stockData.spotPrice)
      setError(null);
   })

   console.error(error);
   setError('An error occurred while fetching data');
   setPrice(null);
 
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

  




  if (stockData) {
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
  <Bar options={options1} data={data1} />
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