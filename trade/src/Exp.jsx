import { useState } from 'react';
import axios from 'axios';
import './exp.css'

import { Button } from 'react-bootstrap';


function Exp() {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [date,setDate] = useState(null)


  const changeHandler = (e) => {
    setSymbol(e.target.value)
  }

  const changeHandler1 = (e) => {
    setDate(e.target.value)
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    

    axios
      .post(`http://localhost:5000/api/stock`,{symbol,date})
      .then((response) => {
        setStockData(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError('An error occurred while fetching data');
        setPrice(null);
      });
  };




  return (
    <div className="App">


    <div>
      <label>
        <h3>Option Chain Data</h3>
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
            </select>


          <select onChange={changeHandler1} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
            <option selected>DATE</option>
            <option value='27-Apr-2023'>27-Apr-2023</option>
            <option value='25-May-2023'>25-May-2023</option>
            <option value='29-Jun-2023'>29-Jun-2023</option>

            </select>

            <button className='submit btn btn-primary'>Submit</button>
  </form>
  </label>
    </div>


   
    {stockData && (
      <div>
          <div className='d-flex justify-content-around'>
        <div>
          <h1>Call</h1>
        </div>
        <div><h3>{symbol}</h3></div>
        <div>
          <h1>Put</h1>
        </div>
        </div>
      <table>
        <thead>
          <tr>
            
            <th>OI Change</th>
            <th>OI</th>   
            <th>Volume</th>
            <th>IV</th>
            <th>LTP</th>
            <th>CHNG</th>
            <th>Strike Price</th>
            <th>CHNG</th>
            <th>LTP</th>
            <th>IV</th>
            <th>Volume</th>
            <th>OI</th> 
            <th>OI Change</th>
           
            {/* Add more columns here as needed */}
          </tr>
    
        </thead>
        <tbody>
          {stockData.calls.map((call,index) => (
            <tr key={call.strikePrice}>
              
              <td>{call.changeinOpenInterest}</td>
              <td>{call.openInterest}</td>
             <td> {call.totalTradedVolume}</td>
             <td>{call.impliedVolatility}</td>
              <td>{call.lastPrice}</td>
              <td>{call.change}</td>
              <td>{call.strikePrice}</td>
              <td>{stockData.puts[index].change}</td>
              <td>{stockData.puts[index].lastPrice}</td>
              <td>{stockData.puts[index].impliedVolatility}</td>
              <td> {stockData.puts[index].totalTradedVolume}</td>
              <td>{stockData.puts[index].openInterest}</td>
              <td>{stockData.puts[index].changeinOpenInterest}</td>


              {/* Add more cells here as needed */}
            </tr>
          ))}
          
          
        </tbody>
      </table>
      </div>
    )}
    


    {error && <div>Error: {error}</div>}
  </div>
  )
}

export default Exp;
