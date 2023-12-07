import React, { useState } from 'react';
import axios from 'axios';
import './MaxPain.css'
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
    Legend
  );
 





function MaxPain() {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [date,setDate] = useState(null)
  // const [callDelta, setCallDelta] = useState('');
  // const [callGamma, setCallGamma] = useState('');
  const [spotPrice,setSpotPrice] = useState('')


  const changeHandler = (e) => {
    setSymbol(e.target.value)
  }

  const changeHandler1 = (e) => {
    setDate(e.target.value)
  }




  const handleSubmit = async (event) => {
    event.preventDefault();

   axios.post(`http://localhost:5000/max-pain`,{symbol,date})
   .then((response)=>{
      setStockData(response.data);
      setSpotPrice(stockData.spotPrice)
      setError(null);
      console.log(stockData)
   })

   console.error(error);
   setError('An error occurred while fetching data');
   setPrice(null);
 
  }

  let options = null;
  let data = null;
  let labels = null;
  
  if (stockData) {
    options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: symbol,
        },
      },
      
    };
    
    labels = stockData.map((option)=>{
      return option.strikePrice
    });
    
    data = {
      labels,
      datasets: [
        {
          label: 'max-pain',
          data: stockData.map((option)=>{
              return option.maxPain
          }),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
    };
  }




  return (
    <div className='max-pain'>
      
      <label>
        <h3>MaxPain Data</h3>
        <form className='max-pain-form' onSubmit={handleSubmit}>
            <select onChange={changeHandler} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
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
            </select>


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
            <option value='28-Nov-2023'>28-Nov-2023</option>
            <option value='30-Dec-2023'>30-Dec-2023</option>
            <option value='29-Jun-2023'>29-Jun-2023</option>

            </select>

          )}
            <button className='submit btn btn-primary'>Submit</button>
  </form>
  </label>
  


  {stockData && ( 
  
  <div className='max-pain-canvas'>
  <Bar options={options} data={data} />
  </div>
  
  )}
 



      </div>
  )
}



export default MaxPain