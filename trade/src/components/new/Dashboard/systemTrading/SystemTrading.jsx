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
import ToggleButton from 'react-bootstrap/ToggleButton'
import useRazorpay from "react-razorpay";
import Form from 'react-bootstrap/Form';
// import Modal from 'react-modal';
import { Modal, Button, FormLabel, FormControl, FormGroup, FormCheck, FormSelect } from 'react-bootstrap';
import { ToggleButtonGroup } from 'react-bootstrap';


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
  const [buyAtLowValue, setBuyAtLowValue] = useState();
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
  const [timerType,setTimerType] = useState('sec')
  const [convertedTimerValue, setConvertedTimerValue] = useState(0);

  const [breakoutBuyValue,setBreakoutBuyValue] = useState()
  const [breakoutType,setBreakoutBuyType]=useState()
  // const [trades, setTrades] = useState([]);
  const [systemTrades,setSystemTrades] = useState([])
  const [lotSize,setLotSize] = useState()
  const [isSubscriber, setIsSubscriber] = useState(true)
  const [incrementalBuy,setIncrementalBuy] = useState()
  const [incrementalBuyType,handleincrementalBuyType] =useState()
  const [incrementalBuyPercentage,setIncrementalBuyPercentage] = useState()
  const [blurred, setBlurred] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isConnectComplete, setConnectComplete] = useState(true);
  const [requestToken,setrequestToken] = useState(null)
  const hasExecuted = useRef(false);

  const rollRef = useRef(null);
  const socketRef = useRef(null);
  const systemTradesRef = useRef();

  const navigate = useNavigate();


  const [incrementalLoop,setIncrementaLoop] = useState(true)
  const [isIncrementalBuyEnabled,setisIncrementalBuyEnabled] = useState(false)
  const [istimerEnabled, setIstimerEnabled] = useState(false);


  const [isBuyAtLowEnabled,setIsBuyAtLowEnabled] = useState(false)
  const [rewardToRiskEnabled, setRewardToRiskEnabled] = useState(false);
  const [stopLossEnabled, setStopLossEnabled] = useState(false);


  const [isBreakoutBuyEnabled,setIsbreakoutEnabled] = useState(false)



  const [accountType, setAccountType] = useState('live')


  const [riskMode, setRiskMode] = useState(false)


  const handleToggle = () => {
    setIstimerEnabled((prev) => !prev); // Toggle the state
  };

  const handleIncrementalBuyToggle = () => {
    setisIncrementalBuyEnabled((prev)=> !prev)
    
  }


  const handleBuyAtLowToggle = () => {
    setIsBuyAtLowEnabled((prev)=> !prev)
  }

  const handleRewardToRiskToggle = () => {
    setRewardToRiskEnabled((prev) => !prev);
    
  };

  const handleStopLossToggle = () => {
    setStopLossEnabled((prev) => !prev);
  };

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


  const handleIncrementalPercentage = (e) =>{
    setIncrementalBuyPercentage(e.target.value)
  }

  const handleTimerType = (e) =>{
    setTimerType(e.target.value)
    console.log(e.target.value)
  }

  const  handleTimerValue = (e) =>{
    setTimerValue(Number(e.target.value))
  }


  const handleBreakoutbuy = (e) =>{
      setBreakoutBuyValue(Number(e.target.value))
  }




  const handleBreakoutTypeChange = (e)=>{
    setBreakoutBuyType(e.target.value)
  }


  const handleBreakout = () =>{
    setIsbreakoutEnabled((prev)=> !prev)
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

  const handleCapitalRiskPerDayChange = (e) => {
    setCapitalRiskPerDay(e.target.value);
    localStorage.setItem('capitalRiskPerDay',e.target.value); 
  };

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

// const handleTimerValue = (e) =>{
//       setTimerValue(Number(e.target.value))
//       setRemainingTime(Number(e.target.value));
//       localStorage.setItem('timer', e.target.value)
// }

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
    localStorage.setItem('lotSize', lotsize);
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

  const strikeRef = useRef(strike);

  const getStrike = () => {
    console.log(strikeRef.current, 'yeahh');
    return strikeRef.current;
  };

 

  useEffect(() => {
    strikeRef.current = strike;
  }, [strike]);

  let tradeTimer

  const handleExit = (roll) => {
    clearTimeout(tradeTimer);
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

    



    let quant

  
    if (isIncrementalBuyEnabled){
      setIncrementaLoop(false)
    }

      console.log(systemTrades)
     if (systemTrades[roll]) {
      // Access trade details
      const { pro, order, triggerPrice, type, quantity, remainingQuantity,symbol, stopLoss, squareOff ,optionPrice,exchange,tradeNum,gtt} =   systemTrades[roll];
      const currentTime =  new Date().toLocaleString()
      // Create trade object for exit

      const LeftQuantity = remainingQuantity - exitQuantity;

      if (exitQuantity){
        quant = exitQuantity   
      }

      else{
        quant = quantity
      }
    

      const exitTrade = {
        pro: pro,
        order: order,
        triggerPrice:triggerPrice,
        type: type === 'BUY' ? 'SELL' : 'BUY', // Toggle BUY/SELL
        quantity: Math.floor(quant),
        symbol: symbol,
        stopLoss: stopLoss,
        squareOff: squareOff,
        exchange:exchange,
        gttId:gtt,
        left:LeftQuantity
      }

    

    console.log(type) 
    console.log(exitTrade)

     axios.post(`http://localhost:5000/exit`,{exitTrade,roll})
     .then((response) => {
         console.log(response)
         toast.success('order Exit', {autoClose:3000})

          const avgPrice = response.data.avgPrice
          const finalPnl=(avgPrice-optionPrice) *quant
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
            quantity:Math.floor(quant),
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
          const updatedTrades = [...(prevTrades || []), tempTrade];

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
        // if (updatedTrades[roll]) {
        //     updatedTrades[roll].status = 'Completed';
        //     updatedTrades[roll].pnl = finalPnl  
        //     updatedTrades[roll].remainingQuantity = LeftQuantity
        //     if (remainingQuantity <= 0) {
        //       updatedTrades[roll].status = 'completed';
        //     }  
        //     localStorage.setItem('systemTrades', JSON.stringify(updatedTrades));
        // }  
        
        if (updatedTrades[roll] && LeftQuantity===0){
          updatedTrades[roll].status = 'Completed';

          const totaPnl = finalPnl+updatedTrades[roll].exitedPnl

          updatedTrades[roll].pnl = totaPnl
          updatedTrades[roll].remainingQuantity = LeftQuantity
          updatedTrades[roll].tradeAmount = 0
          updatedTrades[roll].capitalExposed=0
          localStorage.setItem('systemTrades', JSON.stringify(updatedTrades));
        }

        else if(updatedTrades[roll] && LeftQuantity>0){
          const tradeAmount = LeftQuantity * updatedTrades[roll].optionPrice  
          updatedTrades[roll].tradeAmount = tradeAmount  
          updatedTrades[roll].remainingQuantity=LeftQuantity

          updatedTrades[roll].capitalExposed = ((tradeAmount/capital)*100).toFixed(2)

          const buyprice=updatedTrades[roll].optionPrice
          const leftPnl=(avgPrice-buyprice)*quant
          updatedTrades[roll].exitedPnl+=leftPnl

          localStorage.setItem('systemTrades', JSON.stringify(updatedTrades));
        }

       

      
        // else if(){
          
        // }
        
        else {
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


   const watchPriceDecrease = async (price, targetPercentage) => {
    const initialPrice = price;
    let currentPrice = initialPrice;
  
    while (((currentPrice - initialPrice) / initialPrice) * 100 > (-targetPercentage)) {
      console.log('Checking price decrease...', currentPrice);
        
      console.log(((currentPrice - initialPrice) / initialPrice) * 100)
      // Fetch the latest price
      // You might need to replace this with the actual method to get the current price
      // const updatedResponse = await axios.get(`http://localhost:5000/getLatestPrice/${response.data.tradeId}`);
      // currentPrice = updatedResponse.data.avgPrice;
      currentPrice = getStrike()
      // Use a delay to avoid excessive checks
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  
    console.log('Price decrease target reached. Proceeding with the next action.');
    // Add logic for the next action after the price decrease target is reached
  };



  const watchPriceBreakout = async (initialPrice, breakoutPercentage) => {
    let currentPrice =  getStrike();
    const targetPrice = initialPrice * (1 + breakoutPercentage / 100);
    
    console.log(`Watching for breakout above ${targetPrice} (current price: ${currentPrice})`);
      
    while (currentPrice < targetPrice) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for a bit before checking the price again
      currentPrice = getStrike();
      console.log(`Current price: ${currentPrice}`);
    }
  
    console.log(`Breakout detected at price ${currentPrice}, placing buy order.`);
    
  };
  

  

   
   const calculateProfitPercentage = (averageBuyPrice,currPrice) => {
    if (averageBuyPrice === 0) {
      // Handle division by zero or undefined averageBuyPrice
      return 0;
    }
    
    console.log(averageBuyPrice,currPrice,'achha')
    const profit = currPrice - averageBuyPrice;
    const profitPercentage = (profit / averageBuyPrice) * 100;
    
    console.log(profit,profitPercentage,'profitt')
  
    return profitPercentage;
  };

  
  const watchProfit = async (response) => {
    let previousStrike = getStrike(); // Get the initial strike value
    console.log('first',previousStrike)

    while (calculateProfitPercentage(response.data.avgPrice, previousStrike) < incrementalBuyPercentage) {
      console.log('Checking profit....', previousStrike);
      
      // Check if the strike has changed
      const currentStrike = getStrike();
      if (currentStrike !== previousStrike) {
        console.log('Strike has changed. Proceeding to the next iteration.',currentStrike);
        previousStrike = currentStrike;
      }
      
      // Add any additional logic here
  
      // Use a delay to avoid excessive checks
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  
    // Add logic for the next iteration or any other actions
    console.log('Profit threshold reached. Proceeding to the next iteration.');
  };
  

  const handlePunch = async() => {


    if (isIncrementalBuyEnabled ){
      

      const isOption = (symbol) => {
        return symbol.includes('CE') || symbol.includes('PE');
      };
      
      const exchange = isOption(index) ? 'NFO' : 'NSE';

      for (let i=1; i<=incrementalBuy ; i++) {
        const stepSize = Math.floor(quantity / incrementalBuy);
        
        const trade = {
          pro:product,
          order:orderType,
          triggerPrice:triggerPrice,
          type:type,
          stopLoss:Number(stopLossPrice),
          squareOff:Number(squareOffPrice),
          quantity: stepSize,
          symbol:index,
         exchange:exchange,

      }
      
      
      console.log(trade)
      try{
      const response = await axios.post(`http://localhost:5000/punch`,{trade})
      
      console.log(response,'respo')
      
      const calculatedOptionProfit = rewardToRisk;
      const calculatedTradeQuantity = Math.floor(quantity);
      const calculatedTradeAmount = Math.floor(calculatedTradeQuantity * response.data.avgPrice);
      const calculatedCapitalExposed=(calculatedTradeAmount/capital)*100
      const calculatedWin=calculatedTradeAmount*(calculatedOptionProfit/100)
      const calculatedLoss = calculatedTradeAmount*(stopLoss/100)
      const currentTime = new Date().toLocaleString()

        
      let currentProfit = calculateProfitPercentage(response.data.avgPrice ,strike);

      const tempTrade = {
        symbol:index,
        tradeNum:response.data.tradeId,
        optionProfit:calculatedOptionProfit,
        remainingQuantity:stepSize,
        quantity:stepSize,
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
        quantity:stepSize,
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
        const updatedTrades = [...(prevTrades || []), tempTrade1];
    
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

      if (i===incrementalBuy){
        break;
      }

      await watchProfit(response);
      
      // while (currentProfit < incrementalBuyPercentage && incrementalLoop) {
      //   // Adjust the delay as needed
      //   console.log(currentProfit, 'profit');
      //   console.log('pro');
        
      //   currentProfit = calculateProfitPercentage(response.data.avgPrice, strike);
      //   await new Promise(resolve => setTimeout(resolve, 1000)); // Add a delay, e.g., 1000ms (adjust as needed)
      // }
  
  

      // if (istimerEnabled){
    
      //   console.log('lets goooooooooo')
      //   tradeTimer = setTimeout(() => {
      //     // Call a function to exit the trade
      //     console.log(systemTrades,'kyaa')
      //       handleExit(systemTrades.length);

      //   }, convertedTimerValue);
        
      // }

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



  }
  catch(error) {
  console.log(error)
  };

                 
      }

    }
  

else{



    
    if(isBuyAtLowEnabled){


      const tempTradeWaiting = {
        symbol: index,
        status: 'Pending',
        optionPrice:strike,
        pnl:0,
        // Add other necessary fields
      };
    
      setSystemTrades((prevTrades) => {
        const updatedTrades = [...prevTrades, tempTradeWaiting];
        localStorage.setItem('systemTrades', JSON.stringify(updatedTrades));
        return updatedTrades;
      });


      await watchPriceDecrease(strike, buyAtLowValue);


      setSystemTrades((prevTrades) => {
        const updatedTrades = prevTrades.filter((trade) => trade !== tempTradeWaiting);
        localStorage.setItem('systemTrades', JSON.stringify(updatedTrades));
        return updatedTrades;
      });

    }

    if(isBreakoutBuyEnabled) {
      // Add a temp trade to indicate waiting for the breakout
      const tempTradeBreakoutWaiting = {
        symbol: index,
        status: 'Waiting for Breakout',
        optionPrice: strike,
        pnl: 0, // other necessary fields...
      };
      
    

      setSystemTrades((prevTrades) => {
        const updatedTrades = [...prevTrades, tempTradeBreakoutWaiting];
        localStorage.setItem('systemTrades', JSON.stringify(updatedTrades));
        return updatedTrades;
      });

      
      // Wait for the breakout condition to be met
      await watchPriceBreakout(strike, breakoutBuyValue);
      
      // Proceed with your buy order logic here
      // Then, remove the waiting trade or update it to reflect the placed order
      setSystemTrades((prevTrades) => {
        const updatedTrades = prevTrades.filter((trade) => trade !== tempTradeBreakoutWaiting);
        localStorage.setItem('systemTrades', JSON.stringify(updatedTrades));
        return updatedTrades;
      });
    }



    

    



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
      exchange:exchange,
      timer:convertedTimerValue
  }
  // rollRef.current = roll;
  console.log(trade)


  const last  = [...tradedArray]
  // last[roll] = true
  setTradedArray(last)


  

  axios.post(`http://localhost:5000/punch`,{trade})
  .then((response) => {
      console.log(response)

      const calculatedOptionProfit =  rewardToRisk;
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
        remainingQuantity:calculatedTradeQuantity,
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
        exchange:exchange,
        gtt:response.data.gttId,
        partialPnl:0,
        exitedPnl:0
        
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
        const updatedTrades = [...(prevTrades || []), tempTrade1];

        localStorage.setItem('Trades', JSON.stringify(updatedTrades));
        return updatedTrades; // This is important to ensure the state is updated
      });

      // setSystemTrades((prevTrades) => {
      //   const updatedTrades = [...prevTrades, tempTrade];
      //   localStorage.setItem('systemTrades', JSON.stringify(updatedTrades));        
      //   return updatedTrades; // This is important to ensure the state is updated
      // });
      
      // console.log(trades)

      // toast.success('order placed', {autoClose:3000})

      // if (istimerEnabled){
    
      //   console.log('lets goooooooooo')
      //   tradeTimer = setTimeout(() => {
      //     // Call a function to exit the trade
      //     console.log(systemTrades,'kyaa')
      //       handleExit(systemTrades.length-1);

      //   }, convertedTimerValue);
        
      // }


      setSystemTrades((prevTrades) => {
        const updatedTrades = [...prevTrades, tempTrade];
        localStorage.setItem('systemTrades', JSON.stringify(updatedTrades));
      
        // Use the callback function to execute code after the state is updated
        return updatedTrades;
      }, () => {
        console.log('State has been updated');
        console.log(systemTrades)
        toast.success('order placed', { autoClose: 3000 });
      
        // Update the ref with the latest state
       
      
      });

      
      
      if (istimerEnabled) {
        console.log('lets goooooooooo');
        setTimeout(() => {
          // Call a function to exit the trade using the ref
          console.log(systemTrades, 'kyaaa');
          handleExit(systemTrades - 1);
        }, convertedTimerValue);
      }
      

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
  

}



 

  const socket = io('http://localhost:5000')

 ; // Connect to the backend server

  // Listen for 'update' event and update the data state
  socket.on('holdings', (data) => {

    

    setSystemTrades((prevTrades) => {
      const updatedTrades = prevTrades.map((trade) => {
        if (trade.tradeNum === data.tradeId && trade.status==='Ongoing') {
          // Assuming data.pnl is the PNL value from the socket emit

          const totalPnl = data.finalPnl.pnl;

         
          const remainingQuantity = trade.remainingQuantity;
          const exitedPnl=trade.exitedPnl
          
          // const remainingPnl = (totalPnl / trade.quantity) * remainingQuantity;

          const remainingPnl = totalPnl * (remainingQuantity / trade.quantity);

          const final = remainingPnl + exitedPnl

          return { ...trade, pnl: final };   
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
      if (riskMode) {
        // Risk mode is on, calculate quantity based on the formula
        const riskCapital = (capitalRiskPerDay / 100) * capital;
        const rawQuantity = (riskCapital / ((stopLoss / 100) * strike)).toFixed(1);
        const adjustedQuantity = Math.floor(rawQuantity / lotSize) * lotSize;
        setQuantity(adjustedQuantity);
      } 
    };

    calculateQuantity();
  }, [riskMode, capitalRiskPerDay, capital, stopLoss, strike, lotSize]);


useEffect(()=>{

  setTriggerPrice(strike)
 
},[orderType]) 



// useEffect(()=>{
//   console.log(minCapitalRisk,maxCapitalRisk)

//   const tempRisk=(minCapitalRisk+maxCapitalRisk)/2 

//   setCapitalRiskPerDay(tempRisk);


//   const mid = maxCapitalRisk-minCapitalRisk 
//   const calculatedStep= mid/numTrade
//   // setStep(Number(calculatedStep.toFixed(2)))
//   localStorage.setItem('capitalRiskPerDay',minCapitalRisk); 
  
//    // Initialize to 0 or any default value
//   // initialCapitalRiskArray[0] = minCapitalRisk; // Set the initial value for the first trade
//   console.log(numTrade)
//   setCapitalRiskPerDayArray((prevArray) => {
//     // Create a new array based on the previous state
//     const updatedArray = Array(numTrade).fill(minCapitalRisk);
//     // Update the local storage with the new array
//     localStorage.setItem('capitalRiskPerDayArray', JSON.stringify(updatedArray));
//     // Return the updated array to set it as the new state
//     return updatedArray;
//   });


//  },[minCapitalRisk,maxCapitalRisk,numTrade]) 


useEffect(() => {

  if (accountType==='demo'){
    setCapital(100000)
  }
  // Send account type to the backend to get corresponding capital
  axios.post(`http://localhost:5000/user-info`, { accountType })
      .then((response) => {
          setCapital(response.data.capital);
          localStorage.setItem('capital', response.data.capital);
      })
      .catch((error) => {
          console.log(error);
      });
}, [accountType, trades]); // Include accountType in the dependency array




  // useEffect(()=>{   
  //   axios.post(`http://localhost:5000/user-info`)
  //       .then((response) => {
  //           setCapital(response.data.capital)
  //           // console.log(response.data)
  //           // const fetchedInstruments = response.data.instruments
  //           // const flattenedInstruments = [].concat(...fetchedInstruments);
  //           // // setInstruments(flattenedInstruments);

  //           // const instrumentNames = fetchedInstruments.map((instrument,index) => ({
  //           //   name: instrument.name,
  //           //   tradingsymbol: instrument.tradingsymbol,
  //           //   id:index,
  //           //   exchange:instrument.exchange,
  //           //   lotsize:instrument.lot_size

  //           // }));

            
  //           // console.log(instrumentNames)

  //           // setInstruments(instrumentNames)
  //           // console.log(flattenedInstruments)
  //           // console.log(instruments)
  //           localStorage.setItem('capital',response.data.capital)
  //           // localStorage.setItem('instruments',instrumentNames)
  

  //       })
  //       .catch((error) => {
  //       console.log(error)
  //       });

      
  //   },[trades])

    useEffect(()=>{
      console.log(instruments)
      
    },[instruments])

  

    useEffect(()=>{

      const cachedInstruments = localStorage.getItem('instruments');

      if (cachedInstruments) {

        setInstruments(JSON.parse(cachedInstruments)); 

      } 

      else {

      
      axios.post('http://localhost:5000/kiteInstrumentList')
      .then((response)=>{
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

        setInstruments(instrumentNames)
        
        console.log(flattenedInstruments)
        console.log(instrumentNames,'lets see')
        const temp = JSON.stringify(instrumentNames)
        console.log(temp)
        localStorage.setItem('instrument', temp);
        


      })}
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
              
                setLotSize(localStorage.getItem('lotSize'))
                // setPnlArray(localStorage.getItem('pnl'))
                // setTrades(localStorage.getItem('trades')|| [])
                const storedTrades = localStorage.getItem('systemTrades');

// Parse the storedTrades string into an array or use an empty array if null or undefined
                const tradesArray = storedTrades ? JSON.parse(storedTrades) : [];

                // Set the trades state with the parsed array
                setSystemTrades(tradesArray);

                const storedIndex = localStorage.getItem('index');

                if (storedIndex) {
                  // Use the stored index if available              
                  // Update suggestions state with the stored index
              
                  setValue(storedIndex)

                }


              }, []);
              


              useEffect(()=>{

                const calculatedTotalPnl = systemTrades.reduce((total, trade) => total + trade.pnl, 0);
                setTotalPnl(calculatedTotalPnl.toFixed(2));
                setPnlPercentage(((calculatedTotalPnl/capital)*100).toFixed(2))



              },[systemTrades])


              useEffect(()=>{
              
                // const rewardRatio = (rewardToRisk*stopLoss )/ 100;
                const riskRatio = stopLoss / 100;
              
                const stopLossAmount = strike * riskRatio;
                let calculatedStopLossPrice;
                
      
                if (type === "BUY") {
                  calculatedStopLossPrice = strike - stopLossAmount;
                } else if (type === "SELL") {
                  calculatedStopLossPrice = strike + stopLossAmount;
                }
      
                const squareOffAmount = strike * rewardToRisk/100;
                let calculatedSquareOffPrice;
                
        
                if (type === "BUY") {
                  calculatedSquareOffPrice = strike + squareOffAmount;
                } else if (type === "SELL") {
                  calculatedSquareOffPrice = strike - squareOffAmount;
                }
               
               
                if (!isNaN(calculatedStopLossPrice)) {
                  setStopLossPrice(calculatedStopLossPrice.toFixed(2));
                }
              
                if (!isNaN(calculatedSquareOffPrice)) {
                  setSquareOffPrice(calculatedSquareOffPrice.toFixed(2));
                }
                      
      
              },[rewardToRisk,stopLoss,strike,type])


              const convertToMilliseconds = (value, type) => {
                switch (type) {
                  case 'sec':
                    return value * 1000; // 1 second = 1000 milliseconds
                  case 'min':
                    return value * 60 * 1000; // 1 minute = 60 seconds = 60,000 milliseconds
                  case 'hour':
                    return value * 60 * 60 * 1000; // 1 hour = 60 minutes = 3,600,000 milliseconds
                  default:
                    return 0;
                }
              };
            
              // Update the converted timer value whenever timerValue or timerType changes
              useEffect(() => {
                const convertedValue = convertToMilliseconds(timerValue, timerType);
                setConvertedTimerValue(convertedValue);
                console.log(convertedValue,'hoga')
                
              }, [timerValue, timerType]);
             
              

              const [isExitModalOpen, setIsExitModalOpen] = useState(false);
              const [selectedTradeIndex, setSelectedTradeIndex] = useState(null);
              const [exitQuantity, setExitQuantity] = useState(0);
              const [exitPrice, setExitPrice] = useState('');
              const [selectedOption, setSelectedOption] = useState('')

              const openExitDialog = (index) => {
                setSelectedTradeIndex(index);
                setIsExitModalOpen(true);
              };
            
              const closeExitModal = () => {
                setSelectedTradeIndex(null);
                setIsExitModalOpen(false);
                setExitQuantity(0);
              };
            
              const handleExitConfirm = () => {
                // Handle exit with the selected quantity
                handleExit(selectedTradeIndex);
                // Close the dialog
                closeExitModal();
              };
            

              const handleExitType = (e) => {
                setSelectedOption(e.target.value);
              };
            
              const [expandedIndexes, setExpandedIndexes] = useState([]);

              const toggleExpand = (index) => {
                setExpandedIndexes((prevIndexes) =>
                  prevIndexes.includes(index)
                    ? prevIndexes.filter((i) => i !== index)
                    : [...prevIndexes, index]
                );
              };
            
              // Group trades by their index name
            const groupedTrades = systemTrades.reduce((acc, trade, originalIndex) => {
              if (!acc[trade.symbol]) {
                acc[trade.symbol] = [];
              }
              // Store both the trade and its original index
              acc[trade.symbol].push({ trade, originalIndex });
              return acc;
            }, {});
              


  return (

    <div className={`system-trading-container ${blurred ? 'blurred' : ''}`}>
      <ToastContainer></ToastContainer>
      {loggedIn ? (
            <div className='system-trading-left'>
                    {/* <button onClick={() => setRiskMode(!riskMode)}>
                      {riskMode ? 'Risk On' : 'Risk Off'}
                    </button> */}

                  
                    <div className='top'>

                    <Form >
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                         
                          onChange={() => setRiskMode(!riskMode)}
                        />
                       
                    </Form>

                    <div className='acc-change'>
                                        <select value={accountType} onChange={(e) => setAccountType(e.currentTarget.value)} className="form-select">
                                            <option value="demo">Demo Account</option>
                                            <option value="personal">Live Account (Personal Funds)</option>
                                            <option value="funded">Live Account (Funded Fund)</option>
                                        </select>
                                    </div>

                                    </div>



                      <div className='w-100 m-1  mt-3'>
                        <Form className='d-flex justify-content-between'>

                          <Form.Group className='w-25'>
                            <FormLabel>Strategy Name</FormLabel>
                            <FormControl placeholder='Eg:Stradle'></FormControl>
                          </Form.Group>
                       
                        <FormGroup className='d-flex w-50 justify-content-between bg-light'>

                        <FormGroup className='w-50 m-1 '>
                        <FormGroup>
                          <FormLabel>Entry Time</FormLabel>
                          <FormControl type='time'></FormControl>
                        </FormGroup>

                        <FormGroup className='d-flex justify-content-center'>
                          <FormCheck type='switch'></FormCheck>
                          <FormLabel className='m-0'>Immediate</FormLabel>
                        </FormGroup>
                        </FormGroup>

                        <FormGroup className='w-50 m-1'>
                          <FormLabel>Exit Time</FormLabel>
                          <FormControl className='w-300' type='time'></FormControl>
                        </FormGroup>



                        </FormGroup>

                        </Form>
                      </div>


                      <div>
                      <h3>Add Leg</h3>

                      <div className='bg-light p-3'>
                        <Form className='d-flex justify-content-between'>
                          <FormGroup>
                            <FormLabel>Instrument</FormLabel>
                           <FormSelect className='w-100 h-50'>
                           <option>Nifty</option>
                            <option>Banknifty</option>
                            <option>Finnifty</option>
                            <option>Midcapnifty</option>
                           </FormSelect>
                          </FormGroup>


                          <FormGroup>
                            <FormLabel>Segment</FormLabel>
                            
                            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                  <input type="radio" class="btn-check" name="btnradio" id="btnradio1"  checked></input>
                                  <label class="btn btn-outline-primary" for="btnradio1">OPT</label>

                                  <input type="radio" class="btn-check" name="btnradio" id="btnradio2" ></input>
                                  <label class="btn btn-outline-primary" for="btnradio2">FUT</label>

                
                                </div>

                          </FormGroup>


                          <FormGroup>
                            <FormLabel>Position</FormLabel>
                            
                            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                  <input type="radio" class="btn-check" name="btnradio1" id="btnradio11"  checked></input>
                                  <label class="btn btn-outline-primary" for="btnradio11">BUY</label>

                                  <input type="radio" class="btn-check" name="btnradio1" id="btnradio22" ></input>
                                  <label class="btn btn-outline-primary" for="btnradio22">SELL</label>

                
                                </div>

                          </FormGroup>

                          <FormGroup>
                            <FormLabel>Strike Criteria</FormLabel>
                           <FormSelect className='w-100 h-50'>
                           <option>ATM</option>
                            <option>CLosest Premium</option>
                      
                           </FormSelect>
                          </FormGroup>


                          <FormGroup>
                            <FormLabel>Total Lot</FormLabel>
                            <FormControl type='number'></FormControl>
                          </FormGroup>

                        </Form>
                        </div>


                        </div>





                        <div className='d-flex justify-content-between'>

                          <div className='mt-3 w-50'>
                            <h4>Overall MTM</h4>
                            <div className='d-flex w-100 justify-content-between mr-5'>
                            <div className='w-25 m-2'>
                            <FormGroup className='d-flex justify-content-between'>
                              <FormLabel>Stop Loss</FormLabel>
                              <FormSelect className='w-50 h-50'>
                                <option>None</option>
                                <option>MTM</option>
                                <option>Premium %</option>
                              </FormSelect>
                            </FormGroup>

                            <FormGroup className='d-flex'>
                              <FormCheck></FormCheck>
                              <FormLabel>SL Re-entry</FormLabel>
                            </FormGroup>
                            
                            </div>

                            <div>
                            <FormGroup className='d-flex w-100 justify-content-between' >
                              <FormLabel>Overall Target</FormLabel>
                              <FormSelect className='w-50 h-50'>
                                <option>None</option>
                                <option>MTM</option>
                                <option>Premium %</option>
                              </FormSelect>
                            </FormGroup>

                            <FormGroup className='d-flex'>
                              <FormCheck></FormCheck>
                              <FormLabel>Target Re-entry</FormLabel>
                            </FormGroup>
                            
                            </div>
                            </div>
                            </div>

                            <div className='w-25'>
                            <h4>Profit Management</h4>
                              <FormGroup className='d-flex'>
                                <FormCheck></FormCheck>
                                <FormSelect className='w-50 h-50'>
                                  <option>Lock Profit</option>
                                  <option>Lock and trail</option>
                                  <option>Trail Profit</option>
                                </FormSelect>
                              </FormGroup>
                              </div>
                          </div>



                    <div className='system-trading-input'>
                                        <div className="centered-row">
                            <div className="Capital_Value">
                                <div className="input-field-1">
                                <div className="input-capital">
                                <label htmlFor="capital">Capital:</label>
                                     {/* <ToggleButtonGroup type="radio" name="accountType" defaultValue={'demo'}>
                                          <ToggleButton id="tbg-radio-1" variant="outline-secondary" value={'demo'} checked={accountType === 'demo'} onChange={(e) => setAccountType(e.currentTarget.value)}>
                                            Demo Account
                                          </ToggleButton>
                                          <ToggleButton id="tbg-radio-2" variant="outline-secondary" value={'live'} checked={accountType === 'live'} onChange={(e) => setAccountType(e.currentTarget.value)}>
                                            Live Account
                                          </ToggleButton>
                                          <ToggleButton id="tbg-radio-3" variant="outline-secondary" value={'live'} checked={accountType === 'live'} onChange={(e) => setAccountType(e.currentTarget.value)}>
                                           Fund account
                                          </ToggleButton>
                                     </ToggleButtonGroup> */}
                                    
                                <input  type='number' id="capital" value={Math.round(capital)} readOnly /> 
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
                              
                                <input
                                    type="number"
                                    id="minCapitalRisk"
                                    min={0}
                                    value={capitalRiskPerDay}
                                    onChange={handleCapitalRiskPerDayChange}
                                    disabled={!riskMode}
                                />
                                  
                              
                                </div>
                                
                                
                                <div className='risk-input'>
                                    <div className='reward-risk-input'>

                                      <div>
                                    <span className="info-icon" title=" Enter the desired ratio of potential profit to potential loss for
                                                                        your trades.">
                                    <FaInfoCircle />
                                  </span>
                                    <label htmlFor="rewardToRisk">Profit Percentage:</label>
                                    </div>
                                   <div>
                                    { riskMode===false && 
                                
                                   <input type="checkbox" id="enableFeature" checked={rewardToRiskEnabled} onChange={handleRewardToRiskToggle} />
                                        }
                                        
                                    <input
                                    min={0}
                                    
                                    type="number"
                                    id="rewardToRisk"
                                    value={rewardToRisk}
                                    onChange={handleRewardToRiskChange}
                                    disabled={!riskMode && !rewardToRiskEnabled}
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
                                        { riskMode===false && 
                                
                                <input type="checkbox" id="enableFeature" checked={stopLossEnabled} onChange={handleStopLossToggle} />
                                     }

                                        <input min={0} type='number' value={stopLoss} onChange={handleStopLossChange}  disabled={!riskMode && !stopLossEnabled}></input>
                                     
                                   </div>
                                    </div>

                                
                              

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

                                <input type="number" id="strike" value={strike} readOnly/>
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
                                  {riskMode ? (
                                      <input value={Math.round(quantity)} readOnly />
                                    ) : (
                                      <input type="number" value={quantity} onChange={handleQuantityChange} />
                                    )}
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
                                  {/* <span className="info-icon" title="Select the type of product you want to trade:
                                                      - Intraday (MIS): Short-term trades within a single day.
                                                      - Longterm (CNC): Trades with no intraday restrictions.">
                                        <FaInfoCircle />
                                      </span> */}
                                 <input type='checkbox'/>
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
                                  {/* <span className="info-icon" title="Select the type of product you want to trade:
                                                      - Intraday (MIS): Short-term trades within a single day.
                                                      - Longterm (CNC): Trades with no intraday restrictions.">
                                        <FaInfoCircle />
                                      </span> */}
                                        <input type="checkbox" id="enableFeature" checked={isBuyAtLowEnabled} onChange={handleBuyAtLowToggle} />
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
                                 <input type='checkbox'/>
                                  {/* <span className="info-icon" title="Select the type of product you want to trade:
                                                      - Intraday (MIS): Short-term trades within a single day.
                                                      - Longterm (CNC): Trades with no intraday restrictions.">
                                        <FaInfoCircle />
                                      </span> */}
                                  
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
                                  {/* <span className="info-icon" title="Select the type of product you want to trade:
                                                      - Intraday (MIS): Short-term trades within a single day.
                                                      - Longterm (CNC): Trades with no intraday restrictions.">
                                        <FaInfoCircle />
                                      </span> */}
                                       <input type="checkbox" id="enableFeature" checked={isIncrementalBuyEnabled} onChange={handleIncrementalBuyToggle} />
                                
                                 </div>
                                 <div className='col'>
                                  <label htmlFor="incremental-value">Incremental Buy :</label>
                                 
                                  <div className="input-field-14">
                                  <input  type="number" id="protectProfitValue" value={incrementalBuy} onChange={handleIncrementalBuy} />
                                  <input  type="number"  value={incrementalBuyPercentage} onChange={handleIncrementalPercentage} />
                                  <select  id="protectProfitType" value={incrementalBuyType} onChange={handleincrementalBuyType}>
                                      <option value="%">%</option>
                                      <option value="POINTS">.</option>
                                  </select>
                                  </div>
                                  </div>
                                  </div>



                                  


                                  <div className="input-field-incremental-buy">
                                 
                                 <div>
                                  {/* <span className="info-icon" title="Select the type of product you want to trade:
                                                      - Intraday (MIS): Short-term trades within a single day.
                                                      - Longterm (CNC): Trades with no intraday restrictions.">
                                        <FaInfoCircle />
                                      </span> */}
                                       <input type="checkbox" id="enableFeature" checked={istimerEnabled} onChange={handleToggle} />

                                 </div>
                                 <div className='col'>
                                  <label htmlFor="incremental-value">Timer Trade:</label>
                          
                                   
                                   
                                 
                                  <div className="input-field-14">
                                  <input type="number" id="protectProfitValue"  onChange={handleTimerValue} />
                                  <select id="protectProfitType" value={timerType} onChange={handleTimerType}>
                                      <option value="sec">Sec</option>
                                      <option value="min">Min</option>
                                      <option value="hour">Hour</option>
                                  </select>
                                  </div>
                                  </div>
                                  </div>



                                  <div className="input-field-incremental-buy">
                                 
                                 <div>
                                  {/* <span className="info-icon" title="Select the type of product you want to trade:
                                                      - Intraday (MIS): Short-term trades within a single day.
                                                      - Longterm (CNC): Trades with no intraday restrictions.">
                                        <FaInfoCircle />
                                      </span> */}
                                       <input  type='checkbox' checked={isBreakoutBuyEnabled} onChange={handleBreakout}/>
                                  
                                 </div>
                                 <div className='col'>
                                  <label htmlFor="incremental-value">Breakout buy:</label>
                                  <div className="input-field-14">
                                 
                                  <input type="number" id="protectProfitValue"  onChange={handleBreakoutbuy} />
                                  <select id="protectProfitType" value={breakoutType} onChange={handleBreakoutTypeChange}>
                                      <option value="%">%</option>
                                      <option value="POINTS">.</option>
                                  </select>
                                  </div>
                                  </div>
                                  </div>


                                      
                            
                          
                              {/* <button className='punch' onClick={handlePunch}>Punch</button> */}
                                 
                                </>
                              ) : (
                                <>
                                  {/* Render the blurred fields or subscribe message for non-subscribers */}
                                  <div className="blurred-field">
                                    <p>Subscribe to activate advance feature</p>
                                    <button onClick={subscribeHandle}>Subscribe Now</button>
                                  </div>
                                  {/* <button className='punch' onClick={handlePunch}>Punch</button> */}
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

                            <div className='system-trading-middle'>

                            <div className='punch-container'>
                                 <button className='punch' onClick={handlePunch}>Punch</button>
                               
                            </div>

                            
                    <div className='total-pnl-section'>

                                 
                        <h2>Total PNL</h2>

                        <h5 style={{ color: totalPnl >= 0 ? 'green' : 'red' }}>{totalPnl}</h5>
                        <h5 style={{ color: totalPnl >= 0 ? 'green' : 'red' }}>({pnlPercentage})%</h5>


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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedTrades).map(([symbol, tradesGroup], groupIndex) => {
            const totalQuantity = tradesGroup.reduce((total, {trade}) => total + trade.quantity, 0);
            const remainingQuantity = tradesGroup.reduce((total, {trade}) => total + trade.remainingQuantity, 0);
            
          
            // const avgOptionPrice = tradesGroup.reduce((sum, {trade}) => sum + trade.optionPrice, 0) / tradesGroup.length;
            // const avgOptionSl = tradesGroup.reduce((sum, {trade}) => sum + Number(trade.optionSl), 0) / tradesGroup.length;
            // const avgOptionProfit = tradesGroup.reduce((sum, {trade}) => sum + Number(trade.optionProfit), 0) / tradesGroup.length;
            
            // const avgCapitalExposed = (tradesGroup.reduce((sum, {trade}) => sum + trade.capitalExposed, 0) / tradesGroup.length).toFixed(2);
          
              const ongoingTrades = tradesGroup.filter(({ trade }) => trade.status === 'Ongoing');
              const avgOptionPrice = ongoingTrades.length > 0
                ? ongoingTrades.reduce((sum, { trade }) => sum + trade.optionPrice, 0) / ongoingTrades.length
                : 0; // Return 0 (or any other default value) if there are no ongoing trades
              
            
              const avgCapitalExposed = ongoingTrades.length > 0
                ? ongoingTrades.reduce((sum, { trade }) => sum + trade.capitalExposed, 0) / ongoingTrades.length
                : 0; // Return 0 (or any other default value) if there are no ongoing trades

                const avgOptionSl = ongoingTrades.length > 0
                ? ongoingTrades.reduce((sum, { trade }) => sum + Number(trade.optionSl), 0) / ongoingTrades.length
                : 0; // Return 0 (or any other default value) if there are no ongoing trades
          
          
                const avgOptionProfit = ongoingTrades.length > 0
                ? ongoingTrades.reduce((sum, { trade }) => sum + Number(trade.optionProfit), 0) / ongoingTrades.length
                : 0; // Return 0 (or any other default value) if there are no ongoing trades

                const avgCapitalRisk = ongoingTrades.length > 0
                ? ongoingTrades.reduce((sum, { trade }) => sum + Number(trade.capitalRisk), 0) / ongoingTrades.length
                : 0; // Return 0 (or any other default value) if there are no ongoing trades


                
            // const avgCapitalExposed = (
            //   tradesGroup
            //     .filter(({ trade }) => trade.status === 'Ongoing') 
            //     .reduce((sum, { trade }) => sum + trade.capitalExposed, 0) /
            //   tradesGroup.filter(({ trade }) => trade.status === 'Ongoing').length
            // ).toFixed(2);
           

          //   const avgOptionPrice = (
          //     tradesGroup
          //     .filter(({ trade }) => trade.status === 'Ongoing') 
          //     .reduce((sum, { trade }) => sum + trade.optionPrice, 0) /
          //   tradesGroup.filter(({ trade }) => trade.status === 'Ongoing').length
          // );


          //   const avgOptionSl = (
          //     tradesGroup
          //     .filter(({ trade }) => trade.status === 'Ongoing') 
          //     .reduce((sum, { trade }) => sum + trade.optionSl, 0) /
          //   tradesGroup.filter(({ trade }) => trade.status === 'Ongoing').length
          // );


          //     const avgOptionProfit =(
          //       tradesGroup
          //     .filter(({ trade }) => trade.status === 'Ongoing') 
          //     .reduce((sum, { trade }) => sum + trade.optionProfit, 0) /
          //   tradesGroup.filter(({ trade }) => trade.status === 'Ongoing').length
          // );


            // const avgCapitalRisk = tradesGroup.reduce((sum, {trade}) => sum + Number(trade.capitalRisk), 0) / tradesGroup.length;

            // Calculate sum
            const sumTradeAmount = ongoingTrades.reduce((sum, {trade}) => sum + trade.tradeAmount, 0);
            const sumToWin = ongoingTrades.reduce((sum, {trade}) => sum + trade.toWin, 0);
            const sumToLose = ongoingTrades.reduce((sum, {trade}) => sum + trade.toLoss, 0); 
            const sumPnl   = tradesGroup.reduce((sum, {trade}) => sum + trade.pnl, 0).toFixed(2);

            return (
              <React.Fragment key={groupIndex}>
                <tr onClick={() => toggleExpand(groupIndex)}
                    style={{
                      background:  '#C0C0C0', // Set alternating background colors
                      fontWeight: 'bold', // Make the summary row bold for better visibility
                    }}
                >
                 
                 <td style={{ color: tradesGroup.every(({trade}) => trade.status === 'Completed') ? 'green' : 'orange' }}>
                    {tradesGroup.every(({trade}) => trade.status === 'Completed') ? 'Completed' : 'Ongoing'}
                  </td>
                  <td>{}</td>
                  <td>{symbol}</td>
                  <td>{avgOptionPrice.toFixed(2)}</td>
                  <td>{avgOptionSl.toFixed(2)}</td>
                  <td>{avgOptionProfit}</td>
                  <td>{sumTradeAmount}</td>
                  <td>{`${remainingQuantity}/${totalQuantity}`}</td>
                  <td>{avgCapitalExposed}</td>
                  <td>{avgCapitalRisk.toFixed(2)}</td>
                  <td>{sumToWin}</td>
                  <td>{sumToLose}</td>
                  <td style={{ color: sumPnl >= 0 ? 'green' : 'red' }}
                  >{sumPnl}</td>
                
                </tr>
                {expandedIndexes.includes(groupIndex) && (
                  // Display individual trades in the expanded row
                  tradesGroup.map(({trade, originalIndex}, index) => (
                    <tr key={index}>
                      <td style={{ color: trade.status === 'Completed' ? 'green' : 'orange' }}>{trade.status}</td>
                      <td>{index + 1}</td>
                      <td>{trade.symbol}</td>
                      <td>{trade.optionPrice}</td>
                      <td>{trade.optionSl}</td>
                      <td>{trade.optionProfit}</td>
                      <td>{trade.tradeAmount}</td>
                      <td>{`${trade.remainingQuantity}/${trade.quantity}`}</td>
                      <td>{trade.capitalExposed}</td>
                      <td>{trade.capitalRisk}</td>
                      <td>{trade.toWin}</td>
                      <td>{trade.toLoss}</td>
                      <td style={{ color: trade.pnl >= 0 ? 'green' : 'red' }}>
                        {trade.pnl ? trade.pnl.toFixed(2) : '0'}
                      </td>
                      <td>
                        {trade.status !== 'Completed' && (
                          <button onClick={() => openExitDialog(originalIndex)}>Exit</button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>


      <Modal show={isExitModalOpen} onHide={closeExitModal}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Exit Confirmation</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <p>Specify quantity to exit:</p>
                                  <Form.Control
                                    type="number"
                                    value={exitQuantity}
                                    onChange={(e) => setExitQuantity(e.target.value)}
                                  />

                                  <Form.Check
                                  inline
                                  label='Market'                   
                                  type='radio'
                                  name='tradetype'
                                  onChange={handleExitType}
                                  />

                                  <Form.Check
                                  inline
                                  label='Limit'
                                  type='radio'
                                  name='tradetype'
                                  onChange={handleExitType}
                                  />
                                    
                                  <Form.Group>
                                    <Form.Label>Specify price:</Form.Label>
                                    <Form.Control
                                      type="number"
                                      value={exitPrice}
                                      onChange={(e) => setExitPrice(e.target.value)}
                                    />
                                  </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button variant="primary" onClick={handleExitConfirm}>
                                    Exit
                                  </Button>
                                  <Button variant="secondary" onClick={closeExitModal}>
                                    Cancel
                                  </Button>
                                </Modal.Footer>
                              </Modal>
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