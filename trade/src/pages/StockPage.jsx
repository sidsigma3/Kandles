import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import './StockPage.css'
import io from 'socket.io-client';



const StockPage = (prop) => {
  const [capital, setCapital] = useState(0);
  const [optionPrice, setOptionPrice] = useState(0);
  const [optionType, setOptionType] = useState('MP');
  const [optionSL, setOptionSL] = useState(0);
  const [optionProfit, setOptionProfit] = useState(0);
  const [tradeAmount, setTradeAmount] = useState(0);
  const [tradeQuantity, setTradeQuantity] = useState(0);
  const [capitalExposed, setCapitalExposed] = useState(0);
  const [capitalRisk, setCapitalRisk] = useState(0);
  const [toWin, setToWin] = useState(0);
  const [toLose, setToLose] = useState(0);
  const[rewardToRisk,setrewardToRisk] =useState()
  const[numTrade,setNumTrade] =useState()
  const [holdings,setHoldings] =useState()
  const [pnl,setPnl] = useState()
  const [activeTrade, setActiveTrade] = useState(null);
  // const [pnlArray, setPnlArray] = useState(Array(numTrades).fill(null));
  const handleOptionTypeChange = () => {
    if (optionType === 'MP') {
      setOptionType('LP');
    } else {
      setOptionType('MP');
    }
  };


  // useEffect(() => {
  //   const socket = io('http://localhost:5000'); // Connect to the backend server
  
  //   // Listen for 'update' event and update the data state
  //   socket.on('holdings', (data) => {
      
  //     if(data && Object.keys(data).length > 0){
  //       setPnl(data)
  //       }  
   
      
  //   });
  
  //   return () => {
  //     socket.disconnect(); // Disconnect the socket when component unmounts
  //   };
  // }, []);
  
  // useEffect(()=>{
    
  //     setPnl(localStorage.getItem('pnl').pnl)

  //     // setPnl(localStorage.getItem('pnl'))
  // },[])


  useEffect(()=>{
    
    setPnl(prop.pnl)
   setCapital(prop.props2)
   setOptionSL(prop.props1)
   setCapitalRisk(prop.props3)
   setOptionPrice(prop.props)
    setrewardToRisk(prop.props4)
    setNumTrade(prop.props7)

    const calculatedOptionProfit = prop.props1 * prop.props4;
    const calculatedTradeQuantity = Math.floor(prop.props5);
    const calculatedTradeAmount = Math.floor(calculatedTradeQuantity * prop.props);
    const calculatedCapitalExposed=(calculatedTradeAmount/prop.props2)*100
    const calculatedWin=calculatedTradeAmount*(calculatedOptionProfit/100)
    const calculatedLoss = calculatedTradeAmount*(optionSL/100)

    
   setOptionProfit(calculatedOptionProfit)
    setTradeQuantity(calculatedTradeQuantity)
    setTradeAmount(calculatedTradeAmount)
    setToWin(calculatedWin.toFixed(2))
    setToLose(calculatedLoss.toFixed(2))
    setCapitalExposed(Math.floor(calculatedCapitalExposed))

    
},[prop])

  

  const handlepunch = () => {
    prop.handlep()
    console.log(prop.props6)
    const trade = {
        pro:prop.props6.pro,
        order:prop.props6.order,
        triggerPrice:prop.props6.triggerPrice,
        type:prop.props6.type,
        quantity:tradeQuantity,
        symbol:prop.props6.symbol

    }


    // axios.post(`http://localhost:5000/punch`,trade)
    // .then((response) => {
    //     console.log(response)
    //     toast.success('order placed', {autoClose:3000})
    //     setPnl(response.data)

       
    //     localStorage.setItem('pnl',response.data)

    // })
    // .catch((error) => {
    // console.log(error)
    // });
  
  };

  const pageNumber = 1; // Set the default page number to 1

  return (
    <div>
    <div className="stock-page">
      <h2>Trade</h2>
      <div className="input-container">
        <p>Capital </p>
        <h6>{capital}</h6> 
        <p>
          Option Price:
          <input type="number" value={optionPrice} onChange={(e) => setOptionPrice(e.target.value)} />
          <button onClick={handleOptionTypeChange}>{optionType}</button>
        
        </p>
        <p className='d-flex'>
            <div> Option SL: </div> 
          <div className='option'>-{optionSL}%</div>
        </p>
        <p className='d-flex'>
          Option Profit: <div className='option'> {optionProfit} % </div>
        </p>
        <p className='d-flex'>
          Trade Amount: <div className='option'> {tradeAmount} </div>
        </p>
        <p className='d-flex'>
          Trade Quantity: <div className='option'> {tradeQuantity} </div>
        </p>
        <p className='d-flex'>
          Capital Exposed: <div className='option'> {capitalExposed} % </div>
        </p>
        <p className='d-flex'>
          Capital Risk: <div className='option'> -{capitalRisk}% </div>
        </p>
        <p className='d-flex'>
          To Win: <div className='option'> {toWin} </div>
        </p>
        <p className='d-flex'>
          To Lose: <div className='option'> {toLose}  </div>
        </p>
        <button onClick={handlepunch}>Punch</button>
      </div>

      {/* {pnl && Object.values(pnl).map((item, index) => (
      <div key={index}>
        P&amp;L  {item.pnl}
      </div>
    ))} */}


    </div>
    {pnl && Object.values(pnl).map((item, index) => (

        <div key ={index} 
        
        className='stock-page'>

            
            P&amp;L  {item.pnl}

        </div>
 ))}

    </div>
  


  );
};

export default StockPage;