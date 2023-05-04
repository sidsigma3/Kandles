import React, { useState } from 'react';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Select from 'react-select';
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
 





function Change() {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [date,setDate] = useState(null)
  // const [callDelta, setCallDelta] = useState('');
  // const [callGamma, setCallGamma] = useState('');
  const [spotPrice,setSpotPrice] = useState('')


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


  const changeHandler = (selectedOption) => {
    setSymbol(selectedOption.value)
  }

  const changeHandler1 = (e) => {
    setDate(e.target.value)
  }


  
  

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
          text: 'oi change',
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
          text: 'open interest',
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
        },
      },
    };
    
    labels = stockData.calls.map((option)=>{
      return option.strikePrice
    });

   
    
    data = {
      labels,
      datasets: [
        {
          label: 'calls',
          data: stockData.calls.map((option)=>{
              return option.changeinOpenInterest
          }),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'puts',
          data: stockData.puts.map((option)=>{
              return option.changeinOpenInterest
          }),
          backgroundColor: 'rgb(195, 255, 104)',
        }
      ],
    };


    data1 = {
      labels,
      datasets: [
        {
          label: 'calls',
          data: stockData.calls.map((option)=>{
              return option.openInterest
          }),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'puts',
          data: stockData.puts.map((option)=>{
              return option.openInterest
          }),
          backgroundColor: 'rgb(195, 255, 104)',
        }
      ],
    }

    data2 = {
      labels,
      datasets: [
        {
          label: 'calls',
          data: stockData.calls.map((option)=>{
              return option.lastPrice
          }),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'puts',
          data: stockData.puts.map((option)=>{
              return option.lastPrice
          }),
          backgroundColor: 'rgb(195, 255, 104)',
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
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
    }

  }




  return (
    <div>
      
      <label>
        <h3>Change Data</h3>
        <form onSubmit={handleSubmit}>
        <Select options={op} isSearchable={true} onChange={changeHandler} />
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


          {symbol==='NIFTY' && (<select onChange={changeHandler1} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
            <option selected>DATE</option>
            <option value='20APR2023'>20-Apr-2023</option>
            <option value='27APR2023'>27-Apr-2023</option>
            <option value='04MAY2023'>04-May-2023</option>
            <option value='11MAY2023'>11-May-2023</option>
            <option value='18MAY2023'>18-May-2023</option>
            <option value='25MAY2023'>25-May-2023</option>
            <option value='29JUN2023'>29-Jun-2023</option>

            </select>
)}           

        {symbol!=='NIFTY'&& (
              <select onChange={changeHandler1} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
             <option selected>DATE</option>
            <option value='27-Apr-2023'>27-Apr-2023</option>
            <option value='25-May-2023'>25-May-2023</option>
            <option value='29-Jun-2023'>29-Jun-2023</option>

            </select>

          )}
            <button className='submit btn btn-primary'>Submit</button>
  </form>
  </label>

 

{stockData && ( 
  
  <div>
  <Bar options={options1} data={data1} />
  </div>
  )}

{stockData && ( 
  
  <div>
  <Bar options={options} data={data} />
  </div>
  )}


{stockData && ( 
  
  <div>
  <Line options={options3} data={data3} />
  </div>
  )}



{stockData && ( 
  
  <div>
  <Bar options={options2} data={data2} />
  </div>
  )}



      </div>
  )
}



export default Change