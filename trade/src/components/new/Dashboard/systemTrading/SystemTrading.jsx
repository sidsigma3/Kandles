import React from 'react'
import { useState,useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Autosuggest from 'react-autosuggest';
import { List } from 'react-virtualized'
import axios from 'axios';
import './SystemTrading.css'
import queryString from 'query-string';
import io from 'socket.io-client';
import { FaInfoCircle } from 'react-icons/fa';
import Subscribe from '../subscription/Subscribe';

import useRazorpay from "react-razorpay";

const SystemTrading = ({ trades, setTrades ,setRenderedContent}) => {
    const [capitalRiskPerDay, setCapitalRiskPerDay] = useState();
  const [capital, setCapital] = useState(0);
  const [numTrades, setNumTrades] = useState(0);
  const [numTrade, setNumTrade] = useState(0);
  const [index, setIndex] = useState('default');
  const [strike, setStrike] = useState(0);
  const [type, setType] = useState('default');
  const [trailingSL, setTrailingSL] = useState(false);
  const [trailingSLType, setTrailingSLType] = useState('%');
  const [trailingSLValue, setTrailingSLValue] = useState();
  const [buyAtLow, setBuyAtLow] = useState(false);
  const [buyAtLowType, setBuyAtLowType] = useState('%');
  const [buyAtLowValue, setBuyAtLowValue] = useState(0);
  const [protectProfit, setProtectProfit] = useState(false);
  const [protectProfitType, setProtectProfitType] = useState('%');
  const [protectProfitValue, setProtectProfitValue] = useState();
  const [takeProfit, setTakeProfit] = useState(false);
  const [takeProfitType, setTakeProfitType] = useState('%');
  const [takeProfitValue, setTakeProfitValue] = useState(0);
  const [stopLoss, setStopLoss] = useState();
  const [product,setProduct] = useState() 
  const [orderType,setOrderType] = useState()
  const [triggerPrice,setTriggerPrice] = useState()
  const [validity,setValidity] = useState()
  const [rewardToRisk,setRewardToRisk] = useState()
  const [quantity,setQuantity]=useState()
  const [tradingInfo,setTradingInfo] =useState({})
  const [pnl,setPnl]=useState()
  const [pnlArray, setPnlArray] = useState(Array(numTrades).fill(null));
  const [totalPnl, setTotalPnl] = useState(0);
  const [stopLossPrice,setStopLossPrice] = useState()
  const [squareOffPrice,setSquareOffPrice] = useState()
  const [instruments, setInstruments] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const[minCapitalRisk,setMinCapitalRisk] = useState()
  const[maxCapitalRisk,setMaxCapitalRisk] = useState()
  const [pnlPercentage,setPnlPercentage] =useState()
  const [tradeCompletionStatus, setTradeCompletionStatus] = useState([]);
  // const [tradeCompletionStatus, setTradeCompletionStatus] = useState(Array(numTrades).fill(false));
  const [currentTrade,setCurrentTrade] = useState()
  const [step,setStep] = useState()
  const [strikeArray,setStrikeArray] = useState(Array(numTrades).fill(strike))
  const [capitalRiskPerDayArray, setCapitalRiskPerDayArray] =  useState(Array(numTrades).fill(capitalRiskPerDay));
  const [tradedArray,setTradedArray] = useState(Array(numTrades).fill(false));
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState("")
  const [exchange, setExchange] = useState()
  const [remainingTime, setRemainingTime] = useState(null)
  const [timerValue,setTimerValue] = useState()
  // const [trades, setTrades] = useState([]);
  const [systemTrades,setSystemTrades] = useState([])
  const [lotSize,setLotSize] = useState()
  const [isSubscriber, setIsSubscriber] = useState(true)
  const [incrementalBuy,setIncrementalBuy] = useState()
  const [blurred, setBlurred] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isConnectComplete, setConnectComplete] = useState(false);
  const [requestToken,setrequestToken] = useState(null)
  const hasExecuted = useRef(false);

  const rollRef = useRef(null);
  const socketRef = useRef(null);

  const navigate = useNavigate();



   



  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
  
    // Check if instruments is not null before using filter
    if (instruments && Array.isArray(instruments)) {
      return instruments
        .filter(
          (instrument) =>
            instrument &&
            instrument.tradingsymbol &&
            instrument.tradingsymbol.toLowerCase().includes(inputValueLowerCase)
        )
        .map((instrument) => instrument.tradingsymbol);
    }
  
    // Return an empty array if instruments is null or not an array
    return [];
  };


  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Callback when user clears input
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };



  const handleLogin = async () => {
    // Send a request to the backend to initiate the Kite login process
    try {
      const response = await axios.post('http://localhost:5000/kite');
      // Handle the response as needed, e.g., redirecting to the Kite login page
      // window.location.href = response.data.loginUrl;
    } catch (error) {
      console.error('Error initiating login:', error);
    }
  };








  const handleCapitalChange = (e) => {
    setCapital(Number(e.target.value));
    localStorage.setItem('capital', e.target.value); 

  };

  const handleNumTradesChange = (e) => {
    setNumTrade(Number(e.target.value));
    localStorage.setItem('numTrade', e.target.value); 
  };

  const handleIndexChange = (e) => {
    setIndex(e.target.value);
    localStorage.setItem('index', e.target.value); 
    setSelectedInstrument(e.target.value);
    socketRef.current.disconnect()
    setTriggerPrice(0 )
  };

  const handleStrikeChange = (e) => {
    setStrike(Number(e.target.value));
    localStorage.setItem('strike', e.target.value); 
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    localStorage.setItem('type', e.target.value); 
  };


  const handleRewardToRiskChange = (e) => {
    setRewardToRisk(e.target.value);
    localStorage.setItem('rewardToRisk', e.target.value); 
  };
  

  const handleTrailingSLChange = (e) => {
    setTrailingSL(e.target.checked);
  };

  const handleTrailingSLTypeChange = (e) => {
    setTrailingSLType(e.target.value);
  };

  const handleTrailingSLValueChange = (e) => {
    setTrailingSLValue(Number(e.target.value));
  };

  const handleBuyAtLowChange = (e) => {
    setBuyAtLow(e.target.checked);
  };

  const handleBuyAtLowTypeChange = (e) => {
    setBuyAtLowType(e.target.value);
  };

  const handleBuyAtLowValueChange = (e) => {
    setBuyAtLowValue(Number(e.target.value));
  };

  const handleProtectProfitChange = (e) => {
    setProtectProfit(e.target.checked);
  };

  const handleProtectProfitTypeChange = (e) => {
    setProtectProfitType(e.target.value);
  };

  const handleProtectProfitValueChange = (e) => {
    setProtectProfitValue(Number(e.target.value));
  };

  const handleIncrementalBuy = (e) =>{
    setIncrementalBuy(e.target.value)
  }

  const handleTakeProfitChange = (e) => {
    setTakeProfit(e.target.checked);
  };

  const handleTakeProfitTypeChange = (e) => {
    setTakeProfitType(e.target.value);
  };

  const handleTakeProfitValueChange = (e) => {
    setTakeProfit(Number(e.target.value));
  };

  const [activePage, setActivePage] = useState(0);

  const handlePageButtonClick = (index) => {
   
    setActivePage(index);
  
  };


  const handleStopLossChange = (e) => {
    setStopLoss(e.target.value);
    localStorage.setItem('stopLoss',Number( e.target.value)) ; 
};

  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
    localStorage.setItem('orderType',e.target.value); 
  };

  const handleProductChange = (e) => {
    setProduct(e.target.value);
    localStorage.setItem('product', e.target.value); 
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    localStorage.setItem('quantity', e.target.value); 
  };

  // const handleCapitalRiskPerDayChange = (e) => {
  //   setCapitalRiskPerDay(e.target.value);
  //   localStorage.setItem('capitalRiskPerDay',e.target.value); 
  // };

  const handleTriggerPriceChange = (e) => {
    setTriggerPrice(e.target.value);
    localStorage.setItem('triggerPrice', e.target.value); 
  };

  const handleMaxCapitalRiskChange = (e) =>{
      setMaxCapitalRisk(Number(e.target.value))
      localStorage.setItem('maxCapitalRisk',e.target.value)

      if (e.target.value>10){
        toast.warning('Capital Risk should less than 10%')
      }

  }

  const handleMinCapitalRiskChange = (e) =>{
    setMinCapitalRisk(Number(e.target.value))
    localStorage.setItem('minCapitalRisk',e.target.value)


}

const handleTimerValue = (e) =>{
      setTimerValue(Number(e.target.value))
      setRemainingTime(Number(e.target.value));
      localStorage.setItem('timer', e.target.value)
}

const styles = {
  suggestion: {
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    cursor: ' pointer',
  },
};

const renderSuggestion = (suggestion) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSuggestionSelected(null, { suggestion });
    }
  };

  return (
    <div
      {...styles.suggestion}
      onClick={() => handleSuggestionSelected(null, { suggestion })}
      onKeyDown={handleKeyDown}
    >
      {suggestion}
    </div>
  );
};

// Render a virtualized list of suggestions
// const renderSuggestionsContainer = ({ containerProps, children }) => {
//     if (suggestions.length === 0) {
//         return null; // Don't render the container if there are no suggestions
//       }
//   return (
//     <div
//     {...containerProps}
//     style={{
//       position: 'absolute',
//       zIndex: 1,
//       width: '20%',
//       maxHeight: '200px',
//       background: 'white', // Set the background color to white or any desired color
//       boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow for depth
//       overflowY: 'auto', // Enable vertical scrolling if needed
//     }}
//   >
//     <List
//       width={300}
//       height={200}
//       rowCount={suggestions.length}
//       rowHeight={30}
//       rowRenderer={({ index, key, style }) => (
//         <div
//           key={key}
//           style={{ ...style, cursor: 'pointer' }}
//           onClick={() => handleSuggestionSelected(null, { suggestion: suggestions[index] })}
//         >
//           {renderSuggestion(suggestions[index])}
//         </div>
//       )}
//     >
//       {children}
//     </List>
//   </div>
//   );
// };


const renderSuggestionsContainer = ({ containerProps, children }) => {
  if (suggestions.length === 0) {
    return null; // Don't render the container if there are no suggestions
  }

  // Sort the suggestions based on whether they include "NIFTY" or not
  const sortedSuggestions = suggestions.sort((a, b) => {
    const isANiftyOption = a.includes('NIFTY');
    const isBNiftyOption = b.includes('NIFTY');

    if (isANiftyOption && !isBNiftyOption) {
      return -1; // NIFTY options come first
    } else if (!isANiftyOption && isBNiftyOption) {
      return 1; // NIFTY options come first
    } else {
      return 0; // Keep the original order for other suggestions
    }
  });

  return (
    <div
      {...containerProps}
      style={{
        position: 'absolute',
        zIndex: 1,
        width: '20%',
        maxHeight: '200px',
        background: 'white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
      }}
    >
      <List
        width={300}
        height={200}
        rowCount={sortedSuggestions.length}
        rowHeight={30}
        rowRenderer={({ index, key, style }) => (
          <div
            key={key}
            style={{ ...style, cursor: 'pointer' }}
            onClick={() => {
              console.log('Clicked on suggestion:', sortedSuggestions[index]);
              handleSuggestionSelected(null, { suggestion: sortedSuggestions[index] });
            }}
          >
            {renderSuggestion(sortedSuggestions[index])}
          </div>
        )}
      >
        {children}
      </List>
    </div>
  );
};

const inputProps = {
  placeholder: 'Search for a trading symbol...',
  value
  ,
  onChange: (_, { newValue }) => {
    setValue(newValue);
  
  },
  style: {
    width: '350px', // Set the width to 100% to fill the available space
   
  },
  
};

// const handleSuggestionSelected = (_, { suggestion }) => {
//     const { tradingsymbol, exchange , lotsize } = instruments.find(
//       (instrument) => instrument.tradingsymbol === suggestion
//     );
//     console.log(tradingsymbol,exchange)
//     setExchange(exchange);
//     localStorage.setItem('exchange', exchange)
//     localStorage.setItem('index',suggestion)
//     setSelectedValue(suggestion); // Set the selected value in the state
//     setSuggestions([]);
//     setIndex(suggestion)
//     setValue(suggestion)
//     setLotSize(lotsize)
//     socketRef.current.disconnect()
//   };

const handleSuggestionSelected = (_, { suggestion }) => {
  console.log('Selected suggestion:', suggestion);
  const matchingInstrument = instruments.find(
    (instrument) => instrument.tradingsymbol === suggestion
  );

  if (matchingInstrument) {
    // Check if the selected suggestion is a Nifty option
    const isNiftyOption = matchingInstrument.tradingsymbol.includes('NIFTY');

    // Continue with the rest of the logic based on the selected suggestion
    const { tradingsymbol, exchange, lotsize } = matchingInstrument;
    console.log(tradingsymbol, exchange);
    setExchange(exchange);
    localStorage.setItem('exchange', exchange);
    localStorage.setItem('index', suggestion);
    setSelectedValue(suggestion);
    setSuggestions([]);
    setIndex(suggestion);
    setValue(suggestion);
    setLotSize(lotsize);
    socketRef.current.disconnect();
  }
};

  const [Razorpay] = useRazorpay();
  const subscribeHandle = () => {
    setRenderedContent(<Subscribe />);

    // console.log('achha')
    //     axios.post('http://localhost:5000/payment')
    //     .then((res)=>{
          

    //         const data =res.data

    //         const options = {
    //             key: 'rzp_test_u9YDoBJGjerFbp', // Enter the Key ID generated from the Dashboard
    //             amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //             currency: "INR",
    //             name: "Tradiant",
    //             description: "Subscription Payment",
    //             // image: "https://example.com/your_logo",
    //             order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
    //             handler: function (response) {
    //               alert(response.razorpay_payment_id);
    //               alert(response.razorpay_order_id);
    //               alert(response.razorpay_signature);
    //             },
    //             prefill: {
    //               name: "Piyush Garg",
    //               email: "youremail@example.com",
    //               contact: "9999999999",
    //             },
    //             notes: {
    //               address: "Razorpay Corporate Office",
    //             },
    //             theme: {
    //               color: "#3399cc",
    //             },
    //           };

            

    //           const rzp1 = new Razorpay(options);
    //           rzp1.open();


    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })

  }

  const handlePunch = () => {
    
    const isOption = (symbol) => {
      return symbol.includes('CE') || symbol.includes('PE');
    };

    const exchange = isOption(index) ? 'NFO' : 'NSE';

    const trade = {
      pro:product,
      order:orderType,
      triggerPrice:triggerPrice,
      type:type,
      quantity:Math.floor(quantity),
      symbol:index,
      stopLoss:stopLossPrice,
      squareOff:squareOffPrice,
      trailingSL:trailingSLValue,
      protectProfit:protectProfitValue,
      exchange:exchange
  }
  // rollRef.current = roll;
  console.log(trade)


  const last  = [...tradedArray]
  // last[roll] = true
  setTradedArray(last)


  

  axios.post(`http://localhost:5000/punch`,{trade})
  .then((response) => {
      console.log(response)

      const calculatedOptionProfit = stopLoss * rewardToRisk;
      const calculatedTradeQuantity = Math.floor(quantity);
      const calculatedTradeAmount = Math.floor(calculatedTradeQuantity * response.data.avgPrice);
      const calculatedCapitalExposed=(calculatedTradeAmount/capital)*100
      const calculatedWin=calculatedTradeAmount*(calculatedOptionProfit/100)
      const calculatedLoss = calculatedTradeAmount*(stopLoss/100)
      const currentTime = new Date().toLocaleString()


      const tempTrade = {
        symbol:index,
        tradeNum:response.data.tradeId,
        optionProfit:calculatedOptionProfit,
        quantity:calculatedTradeQuantity,
        optionSl:stopLoss,
        optionPrice:response.data.avgPrice,
        capitalRisk:capitalRiskPerDay,
        tradeAmount:calculatedTradeAmount,
        capitalExposed:Math.floor(calculatedCapitalExposed),
        toWin:Math.round(calculatedWin),
        toLoss:Math.round(calculatedLoss),
        pnl: 0,
        status: 'Ongoing',
        pro:product,
        order:orderType,
        triggerPrice:triggerPrice,
        type:type,
        // quantity:Math.floor(quantity),
        stopLoss:stopLossPrice,
        squareOff:squareOffPrice,
        trailingSL:trailingSLValue,
        protectProfit:protectProfitValue,
        time:currentTime,
        exchange:exchange

      }

      const tempTrade1 = {
        symbol:index,
        tradeNum:response.data.tradeId,
        // optionProfit:calculatedOptionProfit,
        quantity:calculatedTradeQuantity,
        // optionSl:stopLoss,
        optionPrice:response.data.avgPrice,
        // capitalRisk:capitalRiskPerDay,
        // tradeAmount:calculatedTradeAmount,
        // capitalExposed:Math.floor(calculatedCapitalExposed),
        // toWin:Math.round(calculatedWin),
        // toLoss:Math.round(calculatedLoss),
        // pnl: 0,
        status: 'completed',
        pro:product,
        order:orderType,
        triggerPrice:triggerPrice,
        type:type,
        // quantity:Math.floor(quantity),
        // stopLoss:stopLossPrice,
        // squareOff:squareOffPrice,
        // trailingSL:trailingSLValue,
        // protectProfit:protectProfitValue,
        time:currentTime,
        exchange:exchange

      }

     
    
      console.log(tempTrade)

      setTrades((prevTrades) => {
        const updatedTrades = [...prevTrades, tempTrade1];
        localStorage.setItem('Trades', JSON.stringify(updatedTrades));
        return updatedTrades; // This is important to ensure the state is updated
      });

      setSystemTrades((prevTrades) => {
        const updatedTrades = [...prevTrades, tempTrade];
        localStorage.setItem('systemTrades', JSON.stringify(updatedTrades));
        return updatedTrades; // This is important to ensure the state is updated
      });
      


      console.log(trades)

      toast.success('order placed', {autoClose:3000})

      // const notificationSound = document.getElementById('notificationSound');
      // if (notificationSound) {
      //   notificationSound.play();
      // }

      // // setPnl(response.data)
      // // localStorage.setItem('pnl',response.data)
      // setCurrentTrade(response.data.tradeId)
      // console.log(response.data)

      // const recent = [...strikeArray]
      // recent[roll] = response.data.avgPrice
      // setStrikeArray(recent)
     
      
      // console.log('okkokok')
      // console.log(recent)



  })
  .catch((error) => {
  console.log(error)
  });
  





 

  const socket = io('http://localhost:5000')

 ; // Connect to the backend server

  // Listen for 'update' event and update the data state
  socket.on('holdings', (data) => {

   

    setSystemTrades((prevTrades) => {
      const updatedTrades = prevTrades.map((trade) => {
        if (trade.tradeNum === data.tradeId && trade.status==='Ongoing') {
          // Assuming data.pnl is the PNL value from the socket emit
          return { ...trade, pnl: data.finalPnl.pnl };
        }
        return trade;
      });

      localStorage.setItem('systemTrades', JSON.stringify(updatedTrades));
      return updatedTrades;
    });

    // const updatedTrades = trades.map((trade) => {
    //   // Check if the trade in the state matches the one in live PNL data
    //   if (data[trade.tradeNum]) {
    //     // If yes, update the PNL attribute of the trade
    //     return {
    //       ...trade,
    //       pnl: data[trade.tradeNum].pnl,
    //       // Update other attributes as needed
    //     };
    //   }
    //   // If no match, return the trade as is
    //   return trade;
    // });

    // // Update the state with the modified trades
    // setTrades(updatedTrades);

    // console.log(data)
    if(data && Object.keys(data).length > 0){

      const updatedPnlArray = [...pnlArray]; // Create a new copy of pnlArray
      // updatedPnlArray[roll] = data[roll];
      setPnlArray(updatedPnlArray);
      
      setPnl(data)
      localStorage.setItem('pnl',data)
      }  
    

  });

  return () => {
    socket.disconnect(); // Disconnect the socket when component unmounts
  };
  
  } 





  const handleExit = (roll) => {

  //   setTrades((prevTrades) => {
  //     const updatedTrades = [...prevTrades];

  //     // Check if the trade at the specified index exists
  //     if (updatedTrades[roll]) {
  //         updatedTrades[roll].status = 'Completed';
  //         localStorage.setItem('trades', JSON.stringify(updatedTrades));
  //     } else {
  //         console.error(`Trade at index ${roll} does not exist.`);
  //     }

  //     return updatedTrades;
  // });
  
      console.log(trades)
     if (trades[roll]) {
      // Access trade details
      const { pro, order, triggerPrice, type, quantity, symbol, stopLoss, squareOff ,optionPrice,exchange,tradeNum} = systemTrades[roll];
      const currentTime =  new Date().toLocaleString()
      // Create trade object for exit
      const exitTrade = {
        pro: pro,
        order: order,
        triggerPrice:triggerPrice,
        type: type === 'BUY' ? 'SELL' : 'BUY', // Toggle BUY/SELL
        quantity: Math.floor(quantity),
        symbol: symbol,
        stopLoss: stopLoss,
        squareOff: squareOff,
        exchange:exchange
      }

     

    console.log(type) 
    console.log(trades)

     axios.post(`http://localhost:5000/exit`,{exitTrade,roll})
     .then((response) => {
         console.log(response)
         toast.success('order Exit', {autoClose:3000})

          const avgPrice = response.data.avgPrice
          const finalPnl=(avgPrice-optionPrice) *quantity
          const tempTrade = {
            symbol:symbol,
            tradeNum:tradeNum,
           
            // optionSl:stopLoss,
            optionPrice:response.data.avgPrice,
            // capitalRisk:capitalRiskPerDay,
            // tradeAmount:calculatedTradeAmount,
            // capitalExposed:Math.floor(calculatedCapitalExposed),
            // toWin:Math.round(calculatedWin),
            // toLoss:Math.round(calculatedLoss),
            // pnl: 0,
            status: 'completed',
            pro:pro,
            order:order,
            // triggerPrice:triggerPrice,
            type: type === 'BUY' ? 'SELL' : 'BUY',
            quantity:Math.floor(quantity),
            // stopLoss:stopLossPrice,
            // squareOff:squareOffPrice,
            // trailingSL:trailingSLValue,
            // protectProfit:protectProfitValue,
            time:currentTime,
            exchange:exchange
    
          }


         // setPnl(response.data)
         // localStorage.setItem('pnl',response.data)
         setCurrentTrade(response.data)
         console.log(response.data)

         setTrades((prevTrades) => {
          const updatedTrades = [...prevTrades,tempTrade];
          localStorage.setItem('Trades', JSON.stringify(updatedTrades));
          // Check if the trade at the specified index exists
          // if (updatedTrades[roll]) {
          //     // updatedTrades[roll].status = 'Completed';
          //     // updatedTrades[roll].pnl = finalPnl    
          //     // localStorage.setItem('trades', JSON.stringify(updatedTrades));
          // } else {
          //     console.error(`Trade at index ${roll} does not exist.`);
          // }
    
          return updatedTrades;
       });

       setSystemTrades((prevTrades) => {
        const updatedTrades = [...prevTrades];
  
        // Check if the trade at the specified index exists
        if (updatedTrades[roll]) {
            updatedTrades[roll].status = 'Completed';
            updatedTrades[roll].pnl = finalPnl    
            localStorage.setItem('systemTrades', JSON.stringify(updatedTrades));
        } else {
            console.error(`Trade at index ${roll} does not exist.`);
        }
  
        return updatedTrades;
     });



     })
     .catch((error) => {
     console.log(error)
     });

    }
   }




  useEffect(() => {
    
    const queryParams = queryString.parse(window.location.search);
    if(!requestToken){
    setrequestToken(queryParams.request_token);
    }
  }, []); 


 useEffect(() => {
    if (requestToken && !hasExecuted.current) {
      hasExecuted.current = true;
      axios
        .post(`http://localhost:5000/connect/kite`, { requestToken })
        .then((response) => {
          console.log('achaa')
          console.log(response);
          setConnectComplete(true);
          setLoggedIn(true)
          // Save connection state to local storage
          localStorage.setItem('isConnectCompleted', 'true');
          setBlurred(false);
          // navigate('/system-trading');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [requestToken]);



  useEffect(() => {
    if (requestToken) {
    // Check local storage for connection state on component mount
    const storedConnectComplete = localStorage.getItem('isConnectCompleted');
    if (storedConnectComplete === 'true') {
      setConnectComplete(true);
      setLoggedIn(true)
    }
  }
  }, [requestToken]);

  useEffect(() => {
    const calculateQuantity = () => {
      const riskCapital = (capitalRiskPerDay / 100) * capital;
      const rawQuantity = (riskCapital / ((stopLoss / 100) * strike)).toFixed(1);
      const adjustedQuantity = Math.floor(rawQuantity / lotSize) * lotSize;
      setQuantity(adjustedQuantity);
    };
  
    calculateQuantity();
  }, [capitalRiskPerDay, capital, stopLoss, strike, lotSize]);

useEffect(()=>{

  setTriggerPrice(strike)
  console.log(instruments)

},[orderType]) 


useEffect(()=>{
  console.log(minCapitalRisk,maxCapitalRisk)

  const tempRisk=(minCapitalRisk+maxCapitalRisk)/2 

  setCapitalRiskPerDay(tempRisk);


  const mid = maxCapitalRisk-minCapitalRisk 
  const calculatedStep= mid/numTrade
  // setStep(Number(calculatedStep.toFixed(2)))
  localStorage.setItem('capitalRiskPerDay',minCapitalRisk); 
  
   // Initialize to 0 or any default value
  // initialCapitalRiskArray[0] = minCapitalRisk; // Set the initial value for the first trade
  console.log(numTrade)
  setCapitalRiskPerDayArray((prevArray) => {
    // Create a new array based on the previous state
    const updatedArray = Array(numTrade).fill(minCapitalRisk);
    // Update the local storage with the new array
    localStorage.setItem('capitalRiskPerDayArray', JSON.stringify(updatedArray));
    // Return the updated array to set it as the new state
    return updatedArray;
  });


 },[minCapitalRisk,maxCapitalRisk,numTrade]) 



  useEffect(()=>{   
    axios.post(`http://localhost:5000/user-info`)
        .then((response) => {
            setCapital(response.data.capital)
            console.log(response.data)
            const fetchedInstruments = response.data.instruments
            const flattenedInstruments = [].concat(...fetchedInstruments);
            // setInstruments(flattenedInstruments);

            const instrumentNames = fetchedInstruments.map((instrument,index) => ({
              name: instrument.name,
              tradingsymbol: instrument.tradingsymbol,
              id:index,
              exchange:instrument.exchange,
              lotsize:instrument.lot_size

            }));

            
            console.log(instrumentNames)

            setInstruments(instrumentNames)
            console.log(flattenedInstruments)
            console.log(instruments)
            localStorage.setItem('capital',response.data.capital)
            localStorage.setItem('instruments',instrumentNames)
  

        })
        .catch((error) => {
        console.log(error)
        });

      
    },[])



    

    useEffect(()=>{
      axios.post(`http://localhost:5000/trade-info`,{index,exchange})
          .then((response) => {
              // setStrike(response.data.strike)
              
          })
          .catch((error) => {
          console.log(error)
          });



          // const socket = io('http://localhost:5000'); // Connect to the backend server
          
          // // Listen for 'update' event and update the data state
          // socket.on('strike', (data) => {
          //     const name = data.index
          //     const price = data.strike
          //     console.log(data)
          //   if (name===index && price){
          //     setStrike(price)
          //   }
          // });

                
              },[index,exchange])    



              useEffect(() => {
                // Create the socket connection once when the component mounts
                socketRef.current = io('http://localhost:5000');
              
                // Listen for 'strike' event and update the data state
                socketRef.current.on('strike', (data) => {
                 
                  const name = data.index
                  const price =data.strike
                 
                  if(name===index){
                 
                  setStrike(price);
                  
                  // setStrikeArray((strikeArray) => {
                  //   const updatedArray = [...strikeArray];
                   
                  //   for (let i = 0; i < updatedArray.length; i++) {
                     
                  //     if (tradedArray[i]===false) {
                 
                  //       // Update only if the trade is not completed
                  //       updatedArray[i] =price
                  //     }
                  //   }
                                         
                  //   return updatedArray;
                  // });



                  }
                });
                
               
                return () => {
                  socketRef.current.disconnect();
                };
              }, [index]); 


              useEffect(()=>{
                  const socket = io('http://localhost:5000'); // Connect to the backend server

              // Listen for 'update' event and update the data state
                  socket.on('holdings', (data) => {
                  
                  // console.log(data)
                // if(data && Object.keys(data).length > 0){
            
                  const updatedPnlArray = [...pnlArray]; // Create a new copy of pnlArray
                  updatedPnlArray[0] = data[0];
                  setPnlArray(updatedPnlArray);
                  localStorage.setItem('pnlArray',updatedPnlArray)
                //   setPnl(data)
                //   localStorage.setItem('pnl',data)
                //   }  
      
        
              });
            
              return () => {
                socket.disconnect(); // Disconnect the socket when component unmounts
              };
              
      
              },[])
      

              useEffect(() => {
    
   
                setExchange(localStorage.getItem('exchange'))
                setCapital(localStorage.getItem('capital'))
                setCapitalRiskPerDay(localStorage.getItem('capitalRiskPerDay'))
                setNumTrades(localStorage.getItem('numTrades'));
                setIndex(localStorage.getItem('index'));
                setStrike(localStorage.getItem('strike'));
                setType(localStorage.getItem('type'));
                setStopLoss(localStorage.getItem('stopLoss'));
                setNumTrade(localStorage.getItem('numTrade'))
                setQuantity(localStorage.getItem('quantity'))
                setTradingInfo(localStorage.getItem('tradingInfo'))
                setTriggerPrice(localStorage.getItem('triggerPrice'))
                setProduct(localStorage.getItem('product'))
                setOrderType(localStorage.getItem('orderType'))
                setRewardToRisk(localStorage.getItem('rewardToRisk'))
                setMaxCapitalRisk(Number(localStorage.getItem('maxCapitalRisk')))
                setMinCapitalRisk(Number(localStorage.getItem('minCapitalRisk')))
                setCapitalRiskPerDayArray(localStorage.getItem('capitalRiskPerDayArray'))
                setInstruments(localStorage.getItem('instruments'))
                // setPnlArray(localStorage.getItem('pnl'))
                // setTrades(localStorage.getItem('trades')|| [])
                const storedTrades = localStorage.getItem('systemTrades');

// Parse the storedTrades string into an array or use an empty array if null or undefined
                const tradesArray = storedTrades ? JSON.parse(storedTrades) : [];

                // Set the trades state with the parsed array
                setSystemTrades(tradesArray);

              }, []);
              


              useEffect(()=>{

                const calculatedTotalPnl = systemTrades.reduce((total, trade) => total + trade.pnl, 0);
                setTotalPnl(calculatedTotalPnl.toFixed(2));
                setPnlPercentage(((calculatedTotalPnl/capital)*100).toFixed(2))



              },[systemTrades])


  return (

    <div className={`system-trading-container ${blurred ? 'blurred' : ''}`}>
      <ToastContainer></ToastContainer>
      {loggedIn ? (
            <div className='system-trading-left'>
                    <div className='system-trading-input'>
                                        <div className="centered-row">
                            <div className="Capital_Value">
                                <div className="input-field-1">
                                <div className="input-capital">
                                <label htmlFor="capital">Capital:</label>
                                <input  type='number' id="capital" value={Math.round(capital)} onChange={handleCapitalChange} /> 
                                </div>     
                                <div class='trade-type-input'> 
                                <div>  
                                 <span className="info-icon" title="Select the type of product you want to trade:
                                                        - Intraday (MIS): Short-term trades within a single day.
                                                        - Longterm (CNC): Trades with no intraday restrictions.">
                                          <FaInfoCircle />
                                        </span>
                                <label htmlFor="product-type">Product type:</label>
                                </div>
                                     <div>
                                        <select id="product-type" value={product || ''} onChange={handleProductChange} defaultValue="default">
                                          <option value="default">--select--</option>
                                          <option value="MIS">Intraday</option>
                                          <option value="CNC">Longterm</option>
                                        </select>
                                       
                                  </div>
{/*                                 
                                <div class="form-check col" >
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault1" checked={product==='MIS'} onChange={handleProductChange} value='MIS'/>
                                    <label class="form-check-label" for="flexRadioDefault1" >
                                        Intraday
                                    </label>
                                    </div>
                                    <div class="form-check col">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" checked={product==='CNC'} onChange={handleProductChange} value='CNC'/>
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Longterm
                                    </label>
                                    </div> */}
                                    </div>
                                {/* <p>Capital Risk per day:</p> */}
                                
                                {/* <label htmlFor="rewardToRisk">Capital risk per day:</label>
                                    <input
                                    type="number"
                                    id="rewardToRisk"
                                    value={capitalRiskPerDay}
                                    onChange={handleCapitalRiskPerDayChange}
                                    /> */}
                                
                               
                                <div className='capital-risk-input'>
                                  <div>
                                <span className="info-icon" title=" Enter the minimumand maximum percentage of your capital that you are willing
                                                                           to risk on trades in a single day.">
                                    <FaInfoCircle />
                                  </span>

                                <label htmlFor="minCapitalRisk">Capital risk per day(%):</label>
                                </div>
                                <div className='risk-range'>
                                <input
                                    type="number"
                                    id="minCapitalRisk"
                                    min={0}
                                    value={minCapitalRisk}
                                    onChange={handleMinCapitalRiskChange}
                                />

                                    <div>-</div>
                                <input
                                    type="number"
                                    min={0}
                                    id="maxCapitalRisk"
                                    value={maxCapitalRisk}
                                    onChange={handleMaxCapitalRiskChange}
                                />
                                  
                                </div>
                                </div>
                                
                                
                                <div className='risk-input'>
                                    <div className='reward-risk-input'>

                                      <div>
                                    <span className="info-icon" title=" Enter the desired ratio of potential profit to potential loss for
                                                                        your trades.">
                                    <FaInfoCircle />
                                  </span>
                                    <label htmlFor="rewardToRisk">Reward to Risk:</label>
                                    </div>
                                   <div>
                                    <input
                                    min={0}
                                
                                    type="number"
                                    id="rewardToRisk"
                                    value={rewardToRisk}
                                    onChange={handleRewardToRiskChange}

                                    />
                                  
                                    </div>
                                    </div>
                                    <div className='stoploss-input'>
                                      <div>
                                    <span className="info-icon" title=" Enter the percentage at which you want to set your stop loss. This
                                                                             is the maximum acceptable loss for your trade.">
                                    <FaInfoCircle />
                                  </span>
                                        <label>Stop loss(%)</label>
                                    </div>
                                        <div>
                                        <input min={0} type='number' value={stopLoss} onChange={handleStopLossChange} ></input>
                                     
                                   </div>
                                    </div>

                                
                                {/* <div className='no-trades-input'>
                                    <label>
                                    Number of Trades: </label>
                                    <input type="number" value={numTrade} onChange={handleNumTradesChange} />
                                
                                </div> */}

                                </div>
                                
                                </div>
                            </div>
                            <div className="Trade_Value">

                                <div className="input-field-instrument">
                                <label htmlFor="index">Instrument:</label>
                            
                                    <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                                    getSuggestionValue={(suggestion) => suggestion}
                                    renderSuggestion={renderSuggestion}
                                    renderSuggestionsContainer={renderSuggestionsContainer}
                                    inputProps={inputProps}
                                    onSuggestionSelected={handleSuggestionSelected}
                                    focusInputOnSuggestionClick={true}
                                    />

                                  
                                </div>


                                <div className="input-field-strike">
                                   <div className='info-col'>
                                    <span className="info-icon" title="Select the type of product you want to trade:
                                                        - Intraday (MIS): Short-term trades within a single day.
                                                        - Longterm (CNC): Trades with no intraday restrictions.">
                                          <FaInfoCircle />
                                        </span>
                                    </div>
                                        <div className='col' >
                                <label htmlFor="strike">Strike Price:</label>

                                <input type="number" id="strike" value={strike} onChange={handleStrikeChange} />
                                </div>
                        
                                </div>


                                <div className='input-field-trigger'>
                                  <div className='info-col'>
                                  <span className="info-icon" title="Select the type of product you want to trade:
                                                        - Intraday (MIS): Short-term trades within a single day.
                                                        - Longterm (CNC): Trades with no intraday restrictions.">
                                          <FaInfoCircle />
                                        </span>
                                  </div>

                                    <div className='col'>
                                   
                                    <label>Trigger Price</label>
                                    <input type='number' value={triggerPrice} onChange={handleTriggerPriceChange}></input>
                                </div>  
                                

                                </div>


                                <div className='order-type-input'>
                                  <div>
                                <span className="info-icon" title="Select the type of product you want to trade:
                                                        - Intraday (MIS): Short-term trades within a single day.
                                                        - Longterm (CNC): Trades with no intraday restrictions.">
                                          <FaInfoCircle />
                                        </span>
                                        </div>
                                        <div className='col'>
                                    <label htmlFor="order-type">Order Type:</label>
                                    <select id="order-type" value={orderType || ''} onChange={handleOrderTypeChange} defaultValue="default">
                                        <option value="default">--select--</option>
                                        <option value="MARKET">Market</option>
                                        <option value="LIMIT">Limit</option>
                                        <option value="SL">SL</option>
                                        <option value="SL-M">SL-M</option>
                                    </select>

                                      </div>

                                         {/* <div class="form-check ">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1" checked={orderType==='MARKET'} onChange={handleOrderTypeChange} value='MARKET'/>
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Market
                                        </label>
                                        </div>
                                        <div class="form-check ">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault2" checked={orderType==='LIMIT'} onChange={handleOrderTypeChange} value='LIMIT' />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Limit
                                        </label>
                                        </div>



                                <div class="form-check ">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1" checked={orderType==='SL'} onChange={handleOrderTypeChange} value='SL'/>
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            SL
                                        </label>
                                        </div>
                                        <div class="form-check ">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault2" checked={orderType==='SL-M'} onChange={handleOrderTypeChange} value='SL-M'/>
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            SL-M
                                        </label>
                                        </div> */}

                                </div>


                                <div className="buy-sell-input">
                                  <div>
                                <span className="info-icon" title="Select the type of product you want to trade:
                                                        - Intraday (MIS): Short-term trades within a single day.
                                                        - Longterm (CNC): Trades with no intraday restrictions.">
                                          <FaInfoCircle />
                                        </span>
                                        </div>
                                        <div className='col' >
                                <label htmlFor="type">Sell / Buy </label>
                                <select id="type" value={type || ''} onChange={handleTypeChange} defaultValue="default">
                                    <option value="default">--select--</option>
                                    <option value="SELL">SELL</option>
                                    <option value="BUY">BUY</option>
                                </select>
                                </div>
                                </div>

                                <div className='quantity-input'>
                                  <div>
                                <span className="info-icon" title="Select the type of product you want to trade:
                                                        - Intraday (MIS): Short-term trades within a single day.
                                                        - Longterm (CNC): Trades with no intraday restrictions.">
                                          <FaInfoCircle />
                                        </span>
                                        </div>
                                        <div className='col' >
                                  <label>Quantity</label>
                                  <input  value={Math.round(quantity)}></input>
                                  </div>
                                </div>
                                
                                

                                {/* <div>
                                  <label>Quantity</label>
                                  <input>{quantity}</input>
                                </div> */}

                            </div>

                            <div className="Type_Value">
                              {isSubscriber ? (
                                <>

                                  <div className="input-field-trailing-sl">
                                  
                                  <div>
                                  <span className="info-icon" title="Select the type of product you want to trade:
                                                      - Intraday (MIS): Short-term trades within a single day.
                                                      - Longterm (CNC): Trades with no intraday restrictions.">
                                        <FaInfoCircle />
                                      </span>
                                 
                                 </div>
                                 <div className='col'>
                                  <label htmlFor="trailingSL-value">Trailing Stop Loss :</label>
                                  <div className="input-field-8">
                               
                                  <input type="number"  value={trailingSLValue} onChange={handleTrailingSLValueChange} ></input>
                                  <select id="trailingSL-type" value={trailingSLType} onChange={handleTrailingSLTypeChange}>
                                      <option value="%">%</option>
                                      <option value="POINTS">.</option>
                                  </select>
                                  </div>
                                  </div>
                                  </div>
                            
                                  <div className="input-field-buy-at-low">
                                
                                <div>
                                  <span className="info-icon" title="Select the type of product you want to trade:
                                                      - Intraday (MIS): Short-term trades within a single day.
                                                      - Longterm (CNC): Trades with no intraday restrictions.">
                                        <FaInfoCircle />
                                      </span>
                                  </div>
                                  <div className='col'>
                                  <label htmlFor="buyAtLowValue">Buy at Low :</label>
                                  <div className="input-field-11">
                                  <input type="number" id="buyAtLowValue" value={buyAtLowValue} onChange={handleBuyAtLowValueChange} />
                                  <select id="buyAtLowType" value={buyAtLowType} onChange={handleBuyAtLowTypeChange}>
                                      <option value="%">%</option>
                                      <option value="POINTS">.</option>
                                  </select>
                                  </div>
                                  </div>
                                  </div>
                            
                                  <div className="input-field-protect-profit">
                                 
                                 <div>
                                  <span className="info-icon" title="Select the type of product you want to trade:
                                                      - Intraday (MIS): Short-term trades within a single day.
                                                      - Longterm (CNC): Trades with no intraday restrictions.">
                                        <FaInfoCircle />
                                      </span>
                                  
                                 </div>
                                 <div className='col'>
                                  <label htmlFor="protectProfitValue">Protect Profit :</label>
                                  <div className="input-field-14">
                                  <input type="number" id="protectProfitValue" value={protectProfitValue} onChange={handleProtectProfitValueChange} />
                                  <select id="protectProfitType" value={protectProfitType} onChange={handleProtectProfitTypeChange}>
                                      <option value="%">%</option>
                                      <option value="POINTS">.</option>
                                  </select>
                                  </div>
                                  </div>
                                  </div>


                                  <div className="input-field-incremental-buy">
                                 
                                 <div>
                                  <span className="info-icon" title="Select the type of product you want to trade:
                                                      - Intraday (MIS): Short-term trades within a single day.
                                                      - Longterm (CNC): Trades with no intraday restrictions.">
                                        <FaInfoCircle />
                                      </span>
                                  
                                 </div>
                                 <div className='col'>
                                  <label htmlFor="incremental-value">Incremental Buy/Sell :</label>
                                  <div className="input-field-14">
                                  <input disabled='true' type="number" id="protectProfitValue" value={incrementalBuy} onChange={handleIncrementalBuy} />
                                  <select disabled='true' id="protectProfitType" value={protectProfitType} onChange={handleProtectProfitTypeChange}>
                                      <option value="%">%</option>
                                      <option value="POINTS">.</option>
                                  </select>
                                  </div>
                                  </div>
                                  </div>

                                  <div className="input-field-incremental-buy">
                                 
                                 <div>
                                  <span className="info-icon" title="Select the type of product you want to trade:
                                                      - Intraday (MIS): Short-term trades within a single day.
                                                      - Longterm (CNC): Trades with no intraday restrictions.">
                                        <FaInfoCircle />
                                      </span>
                                  
                                 </div>
                                 <div className='col'>
                                  <label htmlFor="incremental-value">Timer Purchase:</label>
                                  <div className="input-field-14">
                                  <input disabled='true' type="number" id="protectProfitValue" value={incrementalBuy} onChange={handleIncrementalBuy} />
                                  <select disabled='true' id="protectProfitType" value={protectProfitType} onChange={handleProtectProfitTypeChange}>
                                      <option value="%">%</option>
                                      <option value="POINTS">.</option>
                                  </select>
                                  </div>
                                  </div>
                                  </div>



                                  <div className="input-field-incremental-buy">
                                 
                                 <div>
                                  <span className="info-icon" title="Select the type of product you want to trade:
                                                      - Intraday (MIS): Short-term trades within a single day.
                                                      - Longterm (CNC): Trades with no intraday restrictions.">
                                        <FaInfoCircle />
                                      </span>
                                  
                                 </div>
                                 <div className='col'>
                                  <label htmlFor="incremental-value">Breakout/Breakdown buy:</label>
                                  <div className="input-field-14">
                                  <input disabled='true' type="number" id="protectProfitValue" value={incrementalBuy} onChange={handleIncrementalBuy} />
                                  <select disabled='true' id="protectProfitType" value={protectProfitType} onChange={handleProtectProfitTypeChange}>
                                      <option value="%">%</option>
                                      <option value="POINTS">.</option>
                                  </select>
                                  </div>
                                  </div>
                                  </div>
                            
                          
                              <button className='punch' onClick={handlePunch}>Punch</button>
                                 
                                </>
                              ) : (
                                <>
                                  {/* Render the blurred fields or subscribe message for non-subscribers */}
                                  <div className="blurred-field">
                                    <p>Subscribe to activate advance feature</p>
                                    <button onClick={subscribeHandle}>Subscribe Now</button>
                                  </div>
                                  <button className='punch' onClick={handlePunch}>Punch</button>
                                </>
                              )}
                            </div>

                            {/* <div className="Type_Value">

                                    <div className="input-field-trailing-sl">
                                  
                                    <div>
                                    <span className="info-icon" title="Select the type of product you want to trade:
                                                        - Intraday (MIS): Short-term trades within a single day.
                                                        - Longterm (CNC): Trades with no intraday restrictions.">
                                          <FaInfoCircle />
                                        </span>
                                   
                                   </div>
                                   <div className='col'>
                                    <label htmlFor="trailingSL-value">Trailing Stop Loss :</label>
                                    <div className="input-field-8">
                                 
                                    <input type="number"  value={trailingSLValue} onChange={handleTrailingSLValueChange} ></input>
                                    <select id="trailingSL-type" value={trailingSLType} onChange={handleTrailingSLTypeChange}>
                                        <option value="%">%</option>
                                        <option value="POINTS">.</option>
                                    </select>
                                    </div>
                                    </div>
                                    </div>
                              
                                    <div className="input-field-buy-at-low">
                                  
                                  <div>
                                    <span className="info-icon" title="Select the type of product you want to trade:
                                                        - Intraday (MIS): Short-term trades within a single day.
                                                        - Longterm (CNC): Trades with no intraday restrictions.">
                                          <FaInfoCircle />
                                        </span>
                                    </div>
                                    <div className='col'>
                                    <label htmlFor="buyAtLowValue">Buy at Low :</label>
                                    <div className="input-field-11">
                                    <input type="number" id="buyAtLowValue" value={buyAtLowValue} onChange={handleBuyAtLowValueChange} />
                                    <select id="buyAtLowType" value={buyAtLowType} onChange={handleBuyAtLowTypeChange}>
                                        <option value="%">%</option>
                                        <option value="POINTS">.</option>
                                    </select>
                                    </div>
                                    </div>
                                    </div>
                              
                                    <div className="input-field-protect-profit">
                                   
                                   <div>
                                    <span className="info-icon" title="Select the type of product you want to trade:
                                                        - Intraday (MIS): Short-term trades within a single day.
                                                        - Longterm (CNC): Trades with no intraday restrictions.">
                                          <FaInfoCircle />
                                        </span>
                                    
                                   </div>
                                   <div className='col'>
                                    <label htmlFor="protectProfitValue">Protect Profit :</label>
                                    <div className="input-field-14">
                                    <input type="number" id="protectProfitValue" value={protectProfitValue} onChange={handleProtectProfitValueChange} />
                                    <select id="protectProfitType" value={protectProfitType} onChange={handleProtectProfitTypeChange}>
                                        <option value="%">%</option>
                                        <option value="POINTS">.</option>
                                    </select>
                                    </div>
                                    </div>
                                    </div>
                              
                            
                                <button className='punch' onClick={handlePunch}>Punch</button>

                            </div> */}
                            </div>


                    </div>

                    <div className='system-trading-position'>      
                             <table className='position-table'>
                                <thead>
                                  <tr>
                                   <th>Status</th>
                                    <th># Trade</th>
                                    <th>Sym</th>
                                    <th>Opt Price</th>
                                    <th>Opt SL</th>
                                    <th>Opt Profit</th>
                                    <th>Trade Amount</th>
                                    <th>Trade Qty</th>
                                    <th>Cap Exposed(%)</th>
                                    <th>Cap Risk(%)</th>
                                    <th>To Win</th>
                                    <th>To Lose</th>
                                    <th>PNL</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {systemTrades && systemTrades.map((trade, index) => (
                                    <tr key={index}>
                                       <td style={{ color: trade.status === 'Completed' ? 'green' : 'orange' }}>{trade.status}</td>
                                      <td>{index+1}</td>
                                      <td>{trade.symbol}</td>
                                      <td>{trade.optionPrice}</td>
                                      <td>{trade.optionSl}</td>
                                      <td>{trade.optionProfit}</td>
                                      <td>{trade.tradeAmount}</td>
                                      <td>{trade.quantity}</td>
                                      <td>{trade.capitalExposed}</td>
                                      <td>{trade.capitalRisk}</td>
                                      <td>{trade.toWin}</td>
                                      <td>{trade.toLoss}</td>
                                      <td style={{ color: trade.pnl >= 0 ? 'green' : 'red' }}>{trade.pnl ? trade.pnl.toFixed(2) : '0'}</td>
                                      {trade.status !== 'Completed' && (
                                          <button onClick={() => handleExit(index)}>Exit</button>
                                        )}
                                                                            
                                      {/* Add other trade details here */}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>


                               
                    </div>

                    <div className='total-pnl-section'>

                                 
                            <h2>Total PNL</h2>
                          
                            <h5 style={{ color: totalPnl >= 0 ? 'green' : 'red' }}>{totalPnl}</h5>
                            <h5 style={{ color: totalPnl >= 0 ? 'green' : 'red' }}>({pnlPercentage})%</h5>
                
                          
                        </div>




            </div>

           

            ) : (

              <div className="login-container" style={{width:'100%' , alignItems:'center'}}>
              {/* Render login button or image */}
              <button onClick={handleLogin}><img src='/kite.png'></img><span>Login To Kite</span></button>
            </div>
          )}
    </div>




  )
}

export default SystemTrading