import { useState,useEffect } from 'react';
import axios from 'axios';
import './exp.css'

import { Button } from 'react-bootstrap';
import queryString from 'query-string';
import Autosuggest from 'react-autosuggest';
function Exp({ instrumentList }) {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [date,setDate] = useState(null)
  const [requestToken,setrequestToken] = useState(null)
  const [filteredNames, setFilteredNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    setrequestToken(queryParams.request_token);
  }, []); 


  // const queryParams = queryString.parse(window.location.search);
  // setrequestToken(queryParams.request_token)
 
  const changeHandler = (e) => {
    setSymbol(e.target.value)
  }

  const changeHandler1 = (e) => {
    setDate(e.target.value)
  }



  const handleSubmit = (event) => {
    event.preventDefault();
   
   
    axios.post(`http://localhost:5000/stock`,{symbol,date,requestToken})
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
    <div className="option-chain">


    <div>
      <label>
        <h3>Option Chain Data</h3>
        <form onSubmit={handleSubmit}>
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



        {symbol!=='NIFTY'&& (
              <select onChange={changeHandler1} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
             <option selected>DATE</option>
            <option value='28-Dec-2023'>28-Dec-2023</option>
            <option value='25-Jan-2024'>25-Jan-2024</option>
            <option value='29-Feb-2024'>29-Feb-2024</option>
            </select>

          )}  

            <button className='submit btn btn-primary'>Submit</button>
  </form>
  </label>
    </div>


   
    {stockData && (
      <div className='option-table'>
          <div className='d-flex justify-content-around'>
        <div>
          <h1>Call</h1>
        </div>
        <div><h3>{symbol}</h3></div>
        <div>
          <h1>Put</h1>
        </div>
        </div>
    
      <div style={{ display: 'flex' }}>
          
            <table className='table'>
            <thead>
          <tr>
            
            <th>OI Change</th>
            <th>OI</th>   
            <th>Volume</th>
            <th>IV</th>
            <th>LTP</th>
            <th>CHNG</th>
          
           
          
          </tr>
    
        </thead>
       

            {stockData.calls.map((call, index) => (
              <tr
                key={call.strikePrice}
                className={
                  call.strikePrice === call.underlyingValue
                    ? 'atm-row'
                    : call.strikePrice > call.underlyingValue
                    ? 'call-otm-row'
                    : 'call-itm-row '
                }
              >
              <td>{call.changeinOpenInterest}</td>
              <td>{call.openInterest}</td>
             <td> {call.totalTradedVolume}</td>
             <td>{call.impliedVolatility}</td>
              <td>{call.lastPrice}</td>
              <td>{Math.round(call.change)}</td>
            
              
  </tr>
))}




            </table>


            <table className='table-strike'>
            <thead>
          <tr>
            
           
            <th>Strike Price</th>
           
          </tr>
    
        </thead>
        

{stockData.calls.map((call, index) => (
  <tr
    key={call.strikePrice}
  >
              {/* <td>{call.changeinOpenInterest}</td>
              <td>{call.openInterest}</td>
             <td> {call.totalTradedVolume}</td>
             <td>{call.impliedVolatility}</td>
              <td>{call.lastPrice}</td>
              <td>{Math.round(call.change)}</td> */}
              <td>{call.strikePrice}</td>
              {/* <td>{Math.round(stockData.puts[index].change)}</td>
              <td>{stockData.puts[index].lastPrice}</td>
              <td>{stockData.puts[index].impliedVolatility}</td>
              <td> {stockData.puts[index].totalTradedVolume}</td>
              <td>{stockData.puts[index].openInterest}</td>
              <td>{stockData.puts[index].changeinOpenInterest}</td> */}
              
  </tr>
))}

         </table>


          
            <table  className='table'>
            <thead>
          <tr>
            
            {/* <th>OI Change</th>
            <th>OI</th>   
            <th>Volume</th>
            <th>IV</th>
            <th>LTP</th>
            <th>CHNG</th>
            <th>Strike Price</th> */}
            <th>CHNG</th>
            <th>LTP</th>
            <th>IV</th>
            <th>Volume</th>
            <th>OI</th> 
            <th>OI Change</th>
           
            {/* Add more columns here as needed */}
          </tr>
    
        </thead>
        

{stockData.calls.map((call, index) => (
  <tr
    key={call.strikePrice}
    className={
      call.strikePrice === call.underlyingValue
        ? 'atm-row'
        : call.strikePrice > call.underlyingValue
        ? 'call-itm-row '
        : 'call-otm-row'
    }
  >
              {/* <td>{call.changeinOpenInterest}</td>
              <td>{call.openInterest}</td>
             <td> {call.totalTradedVolume}</td>
             <td>{call.impliedVolatility}</td>
              <td>{call.lastPrice}</td>
              <td>{Math.round(call.change)}</td>
              <td>{call.strikePrice}</td> */}
              <td>{Math.round(stockData.puts[index].change)}</td>
              <td>{stockData.puts[index].lastPrice}</td>
              <td>{stockData.puts[index].impliedVolatility}</td>
              <td> {stockData.puts[index].totalTradedVolume}</td>
              <td>{stockData.puts[index].openInterest}</td>
              <td>{stockData.puts[index].changeinOpenInterest}</td>
              
  </tr>
))}

            </table>
          </div>

      </div>



    )}
    


    {error && <div>Error: {error}</div>}
  </div>
  )
}

export default Exp;
  