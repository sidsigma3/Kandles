import React, { useState } from 'react';
import axios from 'axios';

function Greek() {
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

   axios.post(`http://localhost:5000/calculate-greeks`,{symbol,date})
   .then((response)=>{
      setStockData(response.data);
      setSpotPrice(stockData.spotPrice)
      setError(null);
   })

   console.error(error);
   setError('An error occurred while fetching data');
   setPrice(null);
 
  }


  return (
    <div>
      
      <label>
        <h3>Greek Data</h3>
        <form onSubmit={handleSubmit}>
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
            <option value='27JUL2023'>27-Jul-2023</option>

            </select>
)}           

        {symbol!=='NIFTY'&& (
              <select onChange={changeHandler1} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
             <option selected>DATE</option>
            <option value='30NOV2023'>30-Nov-2023</option>
            <option value='28DEC2023'>28-Dec-2023</option>
            <option value='29JUN2023'>29-Jun-2023</option>

            </select>

          )}
            <button className='submit btn btn-primary'>Submit</button>
  </form>
  </label>
  

  {stockData && (
      <div>
        <div><h2>Spot Price:{spotPrice}</h2></div>
          <div className='d-flex justify-content-around'>
            
        <div>
          <h1>Call</h1>
        </div>
        <div><h3>{symbol}</h3></div>
        <div>
          <h1>Put</h1>
        </div>
        </div>
      <table className='table'>
        <thead>
          <tr>
            
          
            
            <th>Gamma</th>
            <th>Vega</th>
            <th>Theta</th>
            <th>Delta</th>
            <th>IV</th>
            <th>Strike Price</th>
            <th>IV</th>
            <th>Delta</th>
            <th>Theta</th>
            <th>Vega</th>
            <th>Gamma</th>
            
           
           
            {/* Add more columns here as needed */}
          </tr>
    
        </thead>
        <tbody>
          {stockData.calls.map((call,index) => (
            <tr key={call.strikePrice}>
              
            
              <td>{call.gamma}</td>
              <td>{call.vega}</td>
              <td>{call.theta}</td>
              <td>{call.delta}</td>
              <td>{call.iv}</td>
              <td>{call.strikePrice}</td>
              <td>{stockData.puts[index].iv}</td>
              <td> {stockData.puts[index].delta}</td>
              <td>{stockData.puts[index].theta}</td>
              <td>{stockData.puts[index].vega}</td>
              <td>{stockData.puts[index].gamma}</td>
              
             
              {/* Add more cells here as needed */}
            </tr>
          ))}
          
          
        </tbody>
      </table>
      </div>
    )}
    


      </div>
  )
}



export default Greek