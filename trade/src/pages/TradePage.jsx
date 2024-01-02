import React, { useState ,useEffect,useRef} from 'react';
import axios from 'axios';
// import './TradePage.css';
import StockPage from './StockPage';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import Autosuggest from 'react-autosuggest';
import { List } from 'react-virtualized';


const TradePage = () => {
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




  const rollRef = useRef(null);
  const socketRef = useRef(null);
 

  let tradeTimeout;


  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    return instruments
      .filter((instrument) =>
        instrument && instrument.tradingsymbol &&
        instrument.tradingsymbol.toLowerCase().includes(inputValueLowerCase)
      )
      .map((instrument) => instrument.tradingsymbol);
  };

  // Callback when user changes input
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Callback when user clears input
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Autosuggest input props
 
  const handleSuggestionSelected = (_, { suggestion }) => {
    const { tradingsymbol, exchange } = instruments.find(
      (instrument) => instrument.tradingsymbol === suggestion
    );
    console.log(tradingsymbol,exchange)
    setExchange(exchange);
    setSelectedValue(suggestion); // Set the selected value in the state
    setSuggestions([]);
    setIndex(suggestion)
    setValue(suggestion)
    socketRef.current.disconnect()
  };
  // Render a suggestion item
  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  // Render a virtualized list of suggestions
  const renderSuggestionsContainer = ({ containerProps, children }) => {
    return (
      <div
      {...containerProps}
      style={{
        position: 'absolute', // Position the suggestions container
        zIndex: 1, // Place it above other content
        width: '20%', // Full width
        maxHeight: '200px', // Set a max height for scrollability
       // Enable vertical scrolling if needed
      }}
    >
      <List
        width={300}
        height={200}
        rowCount={suggestions.length}
        rowHeight={30}
        rowRenderer={({ index, key, style }) => (
          <div
            key={key}
            style={{ ...style, cursor: 'pointer' }}
            onClick={() => handleSuggestionSelected(null, { suggestion: suggestions[index] })}
          >
            {renderSuggestion(suggestions[index])}
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
    value,
    onChange: (_, { newValue }) => {
      setValue(newValue);
    
    },
  };



// useEffect(() => {
//     const pageState = { capitalRiskPerDay, strike,capital,numTrade,numTrades,index ,strike,type,stopLoss,product,orderType,triggerPrice,rewardToRisk,quantity,tradingInfo}; 
//     storePageStateInStorage(pageState);
//   }, [capitalRiskPerDay, strike,capital,numTrade,numTrades,index ,strike,type,stopLoss,product,orderType,triggerPrice,rewardToRisk,quantity,tradingInfo]); 

 
  function storePageStateInStorage(pageState) {
    const serializedState = JSON.stringify(pageState);
    localStorage.setItem('pageState', serializedState); 
    sessionStorage.setItem('pageState', serializedState);
  }

  useEffect(() => {
    setTradeCompletionStatus(Array(numTrade).fill(false));
    setCapitalRiskPerDayArray(Array(numTrade).fill(capitalRiskPerDay));
    // setcapitalArray(Array(numTrade).fill(capital));
    setStrikeArray(Array(numTrade).fill(strike));
    setTradedArray(Array(numTrade).fill(false))

  }, [numTrade]);



  useEffect(() => {
    
   
  
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
    // setPnlArray(localStorage.getItem('pnl'))

  }, []);






    useEffect(()=>{
        setTradingInfo( {
            pro:product,
            order:orderType,
            triggerPrice:triggerPrice,
            type:type,
            symbol:index,
            strike:strike,

        })

    

    },[product,orderType,index,type,strike])   



    useEffect(()=>{   
        axios.post(`http://localhost:5000/user-info`)
            .then((response) => {
                setCapital(response.data.capital)
                const fetchedInstruments = response.data.instruments
                const flattenedInstruments = [].concat(...fetchedInstruments);
                // setInstruments(flattenedInstruments);

                const instrumentNames = fetchedInstruments.map((instrument,index) => ({
                  name: instrument.name,
                  tradingsymbol: instrument.tradingsymbol,
                  id:index,
                  exchange:instrument.exchange
                }));

                setInstruments(instrumentNames)
                console.log(flattenedInstruments)
                console.log(instruments)
                localStorage.setItem('capital',response.data.capital)
                
            

            })
            .catch((error) => {
            console.log(error)
            });
          

        },[])



        useEffect(()=>{
            const riskCapital= (capitalRiskPerDay/100)*capital
            setQuantity((riskCapital/((stopLoss/100)*strike)).toFixed(1))

          
        },[capitalRiskPerDay,capital,stopLoss,strike])



        
        useEffect(()=>{

          const rewardRatio = (rewardToRisk*stopLoss )/ 100;
          const riskRatio = stopLoss / 100;

          const stopLossAmount = strike * riskRatio;
          let calculatedStopLossPrice;


          if (type === "BUY") {
            calculatedStopLossPrice = strike - stopLossAmount;
          } else if (type === "SELL") {
            calculatedStopLossPrice = strike + stopLossAmount;
          }

          const squareOffAmount = strike * rewardRatio;
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

                      
                    },[index])    



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

               setTriggerPrice(strike)
               console.log(instruments)

        },[orderType]) 
        
        
        useEffect(()=>{
            if(orderType==='MARKET' || orderType==='LIMIT'){

            }


        },[orderType])

        // useEffect(() => {
        //   const socket = io('http://localhost:5000'); // Connect to the backend server
      
        //   // Listen for 'update' event and update the data state
        //   socket.on('holdings', (data) => {
        //     console.log(data);
            
        //     const roll = rollRef.current;

        //     if (data && Object.keys(data).length > 0) {
        //       const updatedPnlArray = [...pnlArray]; // Create a new copy of pnlArray
        //       updatedPnlArray[roll] = data[roll];
        //       setPnlArray(updatedPnlArray);
      
        //       console.log(updatedPnlArray);
      
        //       setPnl(data);
        //       localStorage.setItem('pnl', data);
        //     }
        //   });
      
        //   return () => {
        //     socket.disconnect(); // Disconnect the socket when component unmounts
        //   };
        // }, []);

        const handleExit = (roll) => {

         console.log(type) 
         let trade={}

        if (type==='BUY'){
           trade = {
            pro:product,
            order:orderType,
            triggerPrice:triggerPrice,
            type:'SELL',
            quantity:Math.floor(quantity),
            symbol:index,
            stopLoss:stopLossPrice,
            squareOff:squareOffPrice,
            
        }
 
        }

        else{

           trade = {
            pro:product,
            order:orderType,
            triggerPrice:triggerPrice,
            type:'BUY',
            quantity:Math.floor(quantity),
            symbol:index,
            stopLoss:stopLossPrice,
            squareOff:squareOffPrice,
            
        }

        }

        console.log(trade)


          axios.post(`http://localhost:5000/exit`,{trade,roll})
          .then((response) => {
              console.log(response)
              toast.success('order Exit', {autoClose:3000})
              // setPnl(response.data)
              // localStorage.setItem('pnl',response.data)
              setCurrentTrade(response.data)
              console.log(response.data)
          })
          .catch((error) => {
          console.log(error)
          });


        }



        const handleIndex = (roll) => {

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
            protectProfit:protectProfitValue
        }
        rollRef.current = roll;
        console.log(trade)

        

       
        const last  = [...tradedArray]
        last[roll] = true
        setTradedArray(last)


        

        axios.post(`http://localhost:5000/punch`,{trade,roll})
        .then((response) => {
            console.log(response)
            toast.success('order placed', {autoClose:3000})

            const notificationSound = document.getElementById('notificationSound');
            if (notificationSound) {
              notificationSound.play();
            }

            // setPnl(response.data)
            // localStorage.setItem('pnl',response.data)
            setCurrentTrade(response.data.tradeId)
            console.log(response.data)

            const recent = [...strikeArray]
            recent[roll] = response.data.avgPrice
            setStrikeArray(recent)
           
            
            console.log('okkokok')
            console.log(recent)
    


        })
        .catch((error) => {
        console.log(error)
        });
        
        const socket = io('http://localhost:5000')

       ; // Connect to the backend server

        // Listen for 'update' event and update the data state
        socket.on('holdings', (data) => {
       

          if(data && Object.keys(data).length > 0){
      
            const updatedPnlArray = [...pnlArray]; // Create a new copy of pnlArray
            updatedPnlArray[roll] = data[roll];
            setPnlArray(updatedPnlArray);
            
            setPnl(data)
            localStorage.setItem('pnl',data)
            }  

  
        });
      
        return () => {
          socket.disconnect(); // Disconnect the socket when component unmounts
        };
        
        }  
        
        
        useEffect(()=>{
          const socket = io('http://localhost:5000'); // Connect to the backend server

        // Listen for 'update' event and update the data state
        socket.on('holdings', (data) => {
       
             




          // if(data && Object.keys(data).length > 0){
      
            const updatedPnlArray = [...pnlArray]; // Create a new copy of pnlArray
            updatedPnlArray[0] = data[0];
            setPnlArray(updatedPnlArray);
            
           
      
      
          //   setPnl(data)
          //   localStorage.setItem('pnl',data)
          //   }  

  
        });
      
        return () => {
          socket.disconnect(); // Disconnect the socket when component unmounts
        };
        

        },[])


        useEffect(() => {
          // Calculate the total pnl whenever pnlArray changes
          const calculateTotalPnl = () => {
            let sum = 0;
            for (const entry of pnlArray) {
              if (entry && entry[index] && entry[index].pnl) {
                const pnl = entry[index].pnl;
                sum += pnl;
              }
            }
            setTotalPnl(Number(sum.toFixed(2)));
            setPnlPercentage(((totalPnl/capital)*100).toFixed(2))
          };
      
          calculateTotalPnl(); // Calculate initial total pnl
        }, [pnlArray]);


       useEffect(()=>{
        console.log(minCapitalRisk,maxCapitalRisk)
        setCapitalRiskPerDay(minCapitalRisk);


        const mid = maxCapitalRisk-minCapitalRisk 
        const calculatedStep= mid/numTrade
        setStep(Number(calculatedStep.toFixed(2)))
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
    localStorage.setItem('stopLoss', e.target.value); 
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


  const [resetCount, setResetCount] = useState(0);




  const handleReset = () => {

    localStorage.clear()

    
    setNumTrades(null);
    setIndex('default');
    setStrike(0);
    setType('default');
    setTrailingSL(false);
    setTrailingSLType('%');
    setTrailingSLValue(0);
    setBuyAtLow(false);
    setBuyAtLowType('%');
    setBuyAtLowValue(0);
    setProtectProfit(false);
    setProtectProfitType('%');
    setProtectProfitValue(0);
    setTakeProfit(false);
    setTakeProfitType('%');
    setTakeProfitValue(0);
    setStopLoss(null);
    setResetCount(resetCount + 1);
    setOrderType()
    setCapitalRiskPerDay(null)
    setRewardToRisk(null)
    setProduct(null)
    setMinCapitalRisk(null)
    setMaxCapitalRisk(null)
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    setNumTrades(numTrade)
    localStorage.setItem('numTrades',numTrade)
  
    // axios.post(`http://localhost:5000/position`)
    // .then((response)=>{
    //     console.log(response)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })

  

  };
  const renderResultSection = () => {
    if (numTrades > 0) {
      return (
        <div className="result-section">
          <h2>Result</h2>
        </div>
      );
    }
    return null;
  };


  function handleWarning(msg){
    toast.warning(msg)
  }


  const activePageRef = useRef(activePage)

  useEffect(() => {
    activePageRef.current = activePage
    console.log(activePage);
  }, [activePage]);

  function handleTradeCompletion(tradeId) {
  
    console.log(tradeId,currentTrade)

    console.log(minCapitalRisk,maxCapitalRisk)

    const updatedCapitalRiskPerDay = capitalRiskPerDay + step;
    console.log(step)
    // Update the state
    // setCapitalRiskPerDay(updatedCapitalRiskPerDay);
  
    console.log(capitalRiskPerDay)

    
    console.log(activePage)
    setActivePage(activePageRef.current + 1);

  // if (tradeId===currentTrade){
    // const updatedCompletionStatus = [...tradeCompletionStatus];
    // updatedCompletionStatus[activePage] = true;
    // setTradeCompletionStatus(updatedCompletionStatus);
    // console.log(tradeCompletionStatus)
    // // Move to the next trade if the completed trade is the active trade
    // // if (index === activePage) {
     

  // }
  // const pnl = pnlArray[index];
 

    // // Move to the next trade if the completed trade is the active trade
    // if (index === activePage) {
      // setActivePage(activePage + 1);
    // }
  }
  
  const totalPnlRef = useRef(totalPnl);
  const capitalRiskPerDayArrayRef = useRef(capitalRiskPerDayArray);
  useEffect(() => {
    totalPnlRef.current = totalPnl;
  }, [totalPnl]);

  useEffect(() => {
    capitalRiskPerDayArrayRef.current = capitalRiskPerDayArray;
  }, [capitalRiskPerDayArray]);

useEffect(()=>{
  const socket = io('http://localhost:5000')
 

  const stepSize =  step
  const risk = capitalRiskPerDay
  socket.on('tradeCompleted', (data) => {


    const currentTotalPnl = totalPnlRef.current;
    const currentCapitalRiskPerDayArray = capitalRiskPerDayArrayRef.current;


    if (data.status === 'completed') {
      const indexNum = data.roll
      const tradeId = data.tradeId;
      const hitType = data.hitType;
      console.log(data)
     
      setTradeCompletionStatus((tradeCompletionStatus) => {
        const updatedStatus = [...tradeCompletionStatus];
        updatedStatus[indexNum] = true;
        console.log(updatedStatus)  
        if (hitType === 'target') {
      
          const updatedCapitalRiskPerDay = capitalRiskPerDayArray[indexNum] + stepSize  
          setCapitalRiskPerDayArray((capitalRiskPerDayArray) => {
            const updatedArray = [...capitalRiskPerDayArray];
            
            for (let i = 0; i < updatedArray.length; i++) {
              console.log(stepSize)
              if (updatedStatus[i]===false) {
                // Update only if the trade is not completed
                updatedArray[i] = (parseFloat(updatedArray[i]) + parseFloat(stepSize)).toFixed(2)
              }
            }
        
            console.log(updatedArray);
            return updatedArray;
          });


        }
       else if (hitType === 'stopLoss') {
         

        const updatedCapitalRiskPerDay = capitalRiskPerDayArray[indexNum] - stepSize;
     
        setCapitalRiskPerDayArray((capitalRiskPerDayArray) => {
          const updatedArray = [...capitalRiskPerDayArray];
      
          for (let i = 0; i < updatedArray.length; i++) {
            console.log(stepSize)
            if (updatedStatus[i]===false) {
              // Update only if the trade is not completed
              updatedArray[i] = (parseFloat(updatedArray[i]) - parseFloat(stepSize)).toFixed(2)
            }
          }
      
          console.log(updatedArray);
          return updatedArray;
        });

      
        }
        
    
        return updatedStatus;

      });
  
   
    // setTradeCompletionStatus(updatedCompletionStatus);

      console.log(`Trade with ID ${data.tradeId} completed for ${data.tradeType} on ${data.tradeSymbol}`);
      console.log(data.hitType);
      toast.success('order completed', {autoClose:3000})
     
      const notificationSound = document.getElementById('notificationSound');
      
      // notificationSound.play();
   
  
      

      console.log(capitalRiskPerDayArray)
  
      console.log(minCapitalRisk, maxCapitalRisk);
      console.log(step);
      console.log(capitalRiskPerDay);


      const capitalRisk = currentCapitalRiskPerDayArray[indexNum]*Number(capital)

      console.log(capitalRisk,currentTotalPnl,currentCapitalRiskPerDayArray,capital)


      tradeTimeout = setTimeout(() => {
        // Move to the next trade after the timer expires
        // You can implement your logic for moving to the next trade here
        clearTimeout(tradeTimeout); // Clear the timer
        setRemainingTime(null); // Reset remaining time when the timer expires
        handleTradeCompletion(tradeId);
      }, timerValue * 60 * 1000); // 10 minutes in milliseconds

      // Display the timer in the frontend
      setRemainingTime(timerValue * 60)

     
      
      
  
      // ...
  }})
return () => {
  // Clean up the socket listener when the component unmounts
  socket.off('tradeCompleted');
};

},[capitalRiskPerDay,step])





const closeTimer = () => {
  
  
    clearTimeout(tradeTimeout); 
    console.log('ho jaega')// Clear the timer if it exists

  setRemainingTime(null); // Reset remaining time
  // Implement logic to move to the next trade here if needed
};





useEffect(() => {
  if (remainingTime > 0) {
    const timerInterval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval); // Clear the interval when the component unmounts
    };
  }
}, [remainingTime]);








  return (
    <div className="trade-page">
      <ToastContainer/>
      <audio id="notificationSound" src="C:/Users/sidsi/Desktop/intern/trade/public/complete.wav" preload="auto"></audio>
      <div className="container">
        <div className="centered-row">
          <div className="Capital_Value">
            <div className="input-field-1">
            <div className="input-group">
              <label htmlFor="capital">Capital:</label>
              <input  id="capital" value={Math.round(capital)} onChange={handleCapitalChange} /> 
              </div>     
              <div class='row'>      
             
              <div class="form-check col" >
                <input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault1" checked={product==='MIS'} onChange={handleProductChange} value='MIS'/>
                <label class="form-check-label" for="flexRadioDefault1" >
                    Intraday
                </label>
                </div>
                <div class="form-check col">
                <input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" checked={product==='NRML'} onChange={handleProductChange} value='NRML'/>
                <label class="form-check-label" for="flexRadioDefault2">
                    Longterm
                </label>
                 </div>
                 </div>
              {/* <p>Capital Risk per day:</p> */}
              
              {/* <label htmlFor="rewardToRisk">Capital risk per day:</label>
                <input
                  type="number"
                  id="rewardToRisk"
                  value={capitalRiskPerDay}
                onChange={handleCapitalRiskPerDayChange}
                /> */}
              
               <label htmlFor="minCapitalRisk">Capital risk per day:</label>
               <div className='d-flex'>
              <input
                type="number"
                id="minCapitalRisk"
                value={minCapitalRisk}
                onChange={handleMinCapitalRiskChange}
              />

                <label>To</label>
              <input
                type="number"
                id="maxCapitalRisk"
                value={maxCapitalRisk}
                onChange={handleMaxCapitalRiskChange}
              />
              </div>
             
               
               <div>
                <label htmlFor="rewardToRisk">Reward to Risk:</label>
                <input
                  type="number"
                  id="rewardToRisk"
                  value={rewardToRisk}
                  onChange={handleRewardToRiskChange}

                />
                <div>
                    <label>Stop loss(%)</label>
                    <input type='number' value={stopLoss} onChange={handleStopLossChange} ></input>
                </div>

              
              <div>
                <label>
                  Number of Trades: </label>
                  <input type="number" value={numTrade} onChange={handleNumTradesChange} />
               
              </div>

              </div>
              
            </div>
          </div>
          <div className="Trade_Value">

            <div className="input-field-3">
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

                  

              {/* <select id="index" value={index} onChange={handleIndexChange} defaultValue="default">
                <option value="default">--select--</option>
                <option value="NIFTY BANK">BANKNIFTY</option>
                <option value="NIFTY 50">NIFTY 50</option>
                <option value="NIFTY2380320000CE">NIFTY 3rd AUG 20000 CE</option>
                <option value='COMPINFO'>COMPINFO</option>
                <option value='ATLANTA'>ATLANTA</option>
                <option value='HCLTECH'>HCLTECH</option>
                <option value='TCS'>TCS</option>
                <option value='BPCL'>BPCL</option>
                <option value='NTPC'>NTPC</option>
                <option value='COALINDIA'>COALINDIA</option>
                <option value='DLF'>DLF</option>
                <option value='ITC'>ITC</option>
                <option value='WIPRO'>WIPRO</option>
                <option value='MICEL'>MICEL</option>
                <option value='JSWISPL'>JSW ISPL</option>
                <option value='ONGC'>ONGC</option>
                <option value='IDFCFIRSTB'>IDFCFIRSTB</option>
                <option value='SJVN'>SJVN</option>
              </select> */}
            </div>


            <div className="input-field-4 row">
                <div className='col' >
              <label htmlFor="strike">Strike:</label>
              <input type="number" id="strike" value={strike} onChange={handleStrikeChange} />
              </div>
    
            </div>


            <div className='row'>
                <div className='col'>
                <label>Trigger Price</label>
                <input type='number' value={triggerPrice} onChange={handleTriggerPriceChange}></input>
            </div>  
               

            </div>


            <div className='row'>
            <div class="form-check col">
                    <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1" checked={orderType==='MARKET'} onChange={handleOrderTypeChange} value='MARKET'/>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Market
                    </label>
                    </div>
                    <div class="form-check col">
                    <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault2" checked={orderType==='LIMIT'} onChange={handleOrderTypeChange} value='LIMIT' />
                    <label class="form-check-label" for="flexRadioDefault2">
                        Limit
                    </label>
                    </div>



            <div class="form-check col">
                    <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1" checked={orderType==='SL'} onChange={handleOrderTypeChange} value='SL'/>
                    <label class="form-check-label" for="flexRadioDefault1">
                        SL
                    </label>
                    </div>
                    <div class="form-check col">
                    <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault2" checked={orderType==='SL-M'} onChange={handleOrderTypeChange} value='SL-M'/>
                    <label class="form-check-label" for="flexRadioDefault2">
                        SL-M
                    </label>
                    </div>

            </div>


            <div className="input-field-5">
              <label htmlFor="type">Type:</label>
              <select id="type" value={type || ''} onChange={handleTypeChange} defaultValue="default">
                <option value="default">--select--</option>
                <option value="SELL">SELL</option>
                <option value="BUY">BUY</option>
              </select>
            </div>



          </div>

          <div className="Type_Value">

          {/* <div className='row'> */}
            {/* <div class="form-check col">
                    <input class="form-check-input" type="radio" name="flexRadioDefault10" id="flexRadioDefault1" onChange={(e)=>{setValidity(e.target.value)}} value='DAY'/>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Day
                    </label>
                    </div>
                    <div class="form-check col">
                    <input class="form-check-input" type="radio" name="flexRadioDefault10" id="flexRadioDefault2" onChange={(e)=>{setValidity(e.target.value)}} value='IOC' />
                    <label class="form-check-label" for="flexRadioDefault2">
                        immediate
                    </label>
                    </div>



            <div class="form-check col">
                    <input class="form-check-input" type="radio" name="flexRadioDefault10" id="flexRadioDefault1" onChange={(e)=>{setValidity(e.target.value)}} value='SL'/>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Minutes
                    </label>
                    </div> */}
                   

            {/* </div> */}
            {/* <div>
            <select class="form-select" aria-label="Default select example">
                <option selected>Minutes</option>
                <option value="1">1 min</option>
                <option value="2">2 min</option>
                <option value="3">3 min</option>
                <option value="5">5 min</option>
                <option value="10">10 min</option>
                <option value="30">30 min</option>


                </select>
            </div>
            <div>
                <label>Disclosed Quantity</label>
                <input type='number'></input>
            </div> */}

    
            


            <div className="input-field-6">
              <input type="checkbox" id="trailingSL" checked={trailingSL} onChange={handleTrailingSLChange} />
              <label htmlFor="trailingSL">Trailing Stop Loss</label>
            </div>
            {trailingSL && (
              <>
                <div className="input-field-7">
                  <label htmlFor="trailingSL-type">Trailing Stop Loss Type:</label>
                  <select id="trailingSL-type" value={trailingSLType} onChange={handleTrailingSLTypeChange}>
                    <option value="%">%</option>
                    <option value="POINTS">.</option>
                  </select>
                </div>
                <div className="input-field-8">
                  <label htmlFor="trailingSL-value">Trailing Stop Loss Value:</label>
                  <input type="number"  value={trailingSLValue} onChange={handleTrailingSLValueChange} ></input>
                </div>
              </>
            )}
            <div className="input-field-9">
              <input type="checkbox" id="buyAtLow" checked={buyAtLow} onChange={handleBuyAtLowChange} />
              <label htmlFor="buyAtLow">Buy at Low</label>
            </div>
            {buyAtLow && (
              <>
                <div className="input-field-10">
                  <label htmlFor="buyAtLowType">Buy at Low Type:</label>
                  <select id="buyAtLowType" value={buyAtLowType} onChange={handleBuyAtLowTypeChange}>
                    <option value="%">%</option>
                    <option value="POINTS">.</option>
                  </select>
                </div>
                <div className="input-field-11">
                  <label htmlFor="buyAtLowValue">Buy at Low Value:</label>
                  <input type="number" id="buyAtLowValue" value={buyAtLowValue} onChange={handleBuyAtLowValueChange} />
                </div>
              </>
            )}
            <div className="input-field-12">
              <input type="checkbox" id="protectProfit" checked={protectProfit} onChange={handleProtectProfitChange} />
              <label htmlFor="protectProfit">Protect Profit</label>
            </div>
            {protectProfit && (
              <>
                <div className="input-field-13">
                  <label htmlFor="protectProfitType">Protect Profit Type:</label>
                  <select id="protectProfitType" value={protectProfitType} onChange={handleProtectProfitTypeChange}>
                    <option value="%">%</option>
                    <option value="POINTS">.</option>
                  </select>
                </div>
                <div className="input-field-14">
                  <label htmlFor="protectProfitValue">Protect Profit Value:</label>
                  <input type="number" id="protectProfitValue" value={protectProfitValue} onChange={handleProtectProfitValueChange} />
                </div>
              </>
            )}

          <div className="input-field-7">
                  <label htmlFor="timer">Timer option:</label>
                
                  <div className="input-field-14">
                 
                  <input type="number" value={timerValue} onChange={handleTimerValue} ></input>
                </div>
          
            </div>
          
          </div>
        </div>
        <div className="buttons">
          <button type="submit" className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          <button type="reset" className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className="spacer"></div>
      </div>
      <div className="reset-box">


      {remainingTime !== null && remainingTime > 0 && (
        <div>
          <h4 className='time'>
          Time Remaining: {Math.floor(remainingTime / 60)}:{remainingTime % 60}
          <button onClick={closeTimer}>Close Timer</button> {/* Close Timer button */}
          </h4>
        </div>
      )}



  <div className="stock-pages-grid">
    {Array.from({ length: numTrades }).map((_, index) => (
      <button
        key={index}
        className={`stock-page-button ${index === activePage ? 'active' : ''}`}
        onClick={() => handlePageButtonClick(index)}
      >
        {index + 1}
      </button>
    ))}
  </div>  
  {renderResultSection()}
  {Array.from({ length: numTrades }).map((_, index) => (
    <div className={`low ${index === activePage ? 'highlighted' : 'disabled'}`} key={index} style={{ display: 'inline-grid' }}>
      <StockPage props={strikeArray[index]} props1={stopLoss} props2={capital} props3={capitalRiskPerDayArray[index]} props4={rewardToRisk} pnl={pnlArray[index]} props5={quantity} props6={tradingInfo} props7={numTrade}  handlep={()=>handleIndex(index)} handleE={()=>handleExit(index)} 
      handleTradeCompletion={() => handleTradeCompletion(index)}
      isTradeCompleted={tradeCompletionStatus[index]}
      isActiveTrade={index === activePage}
      roll={index}
      warn={handleWarning}
      />
    </div>
    
  ))}
   <div className='pnl-page'>
        <h3>Total PnL</h3>
       <h2> {totalPnl}</h2>
       <h3> {pnlPercentage}%</h3>
      </div>
</div>
      {/* <div className='exit'>
        <button className='btn btn-lg bg-warning'>Exit trade</button>
      </div> */}

     
    </div>
  );
};
export default TradePage;