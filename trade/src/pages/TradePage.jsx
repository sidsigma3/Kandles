import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import './TradePage.css';
import StockPage from './StockPage';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';




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
  const [trailingSLValue, setTrailingSLValue] = useState(0);
  const [buyAtLow, setBuyAtLow] = useState(false);
  const [buyAtLowType, setBuyAtLowType] = useState('%');
  const [buyAtLowValue, setBuyAtLowValue] = useState(0);
  const [protectProfit, setProtectProfit] = useState(false);
  const [protectProfitType, setProtectProfitType] = useState('%');
  const [protectProfitValue, setProtectProfitValue] = useState(0);
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
    // setPnlArray(localStorage.getItem('pnl'))

  }, []);


//   function retrievePageStateFromStorage() { 
  
//     const storedState = sessionStorage.getItem('pageState');
  
//     const deserializedState = JSON.parse(storedState);
  
//     return deserializedState;
//   }

// useEffect(() => {
//   const socket = io('http://localhost:5000'); // Connect to the backend server

//   // Listen for 'update' event and update the data state
//   socket.on('holdings', (data) => {
    
//     if(data && Object.keys(data).length > 0){

//       const updatedPnlArray = [...pnlArray];
//       updatedPnlArray[roll] = response.data;
//       setPnlArray(updatedPnlArray);
    
//       console.log(updatedPnlArray)


//       setPnl(data)
//       }  
 
    
//   });

//   return () => {
//     socket.disconnect(); // Disconnect the socket when component unmounts
//   };
// }, []);



    useEffect(()=>{
        setTradingInfo( {
            pro:product,
            order:orderType,
            triggerPrice:triggerPrice,
            type:type,
            symbol:index
        })

    

    },[product,orderType,index,type])   



    useEffect(()=>{
        
        axios.post(`http://localhost:5000/user-info`)
            .then((response) => {
                setCapital(response.data.capital)
                localStorage.setItem('capital',response.data.capital)
            })
            .catch((error) => {
            console.log(error)
            });
          

        },[])

        useEffect(()=>{
            const riskCapital= (capitalRiskPerDay/100)*capital
            setQuantity(riskCapital/(strike-(strike*(1-stopLoss))))
            console.log(riskCapital,strike,stopLoss)
            console.log(quantity)

        },[capitalRiskPerDay,capital,stopLoss,strike])

    

        useEffect(()=>{
            axios.post(`http://localhost:5000/trade-info`,{index})
                .then((response) => {
                    setStrike(response.data.strike)
                    
                })
                .catch((error) => {
                console.log(error)
                });
              
            },[index])    


        useEffect(()=>{

               setTriggerPrice(strike)

        },[orderType]) 
        
        
        useEffect(()=>{
            if(orderType==='MARKET' || orderType==='LIMIT'){

            }


        },[orderType])


        const handleIndex = (roll) => {
          console.log(roll)
          const trade = {
            pro:product,
            order:orderType,
            triggerPrice:triggerPrice,
            type:type,
            quantity:Math.floor(quantity),
            symbol:index
        
        }

        axios.post(`http://localhost:5000/punch`,trade)
        .then((response) => {
            console.log(response)
            toast.success('order placed', {autoClose:3000})
            // setPnl(response.data)
            // localStorage.setItem('pnl',response.data)
        
        })
        .catch((error) => {
        console.log(error)
        });
        
        
        const socket = io('http://localhost:5000'); // Connect to the backend server

        // Listen for 'update' event and update the data state
        socket.on('holdings', (data) => {
          
          if(data && Object.keys(data).length > 0){
      
            const updatedPnlArray = pnlArray;
            updatedPnlArray[roll] = data;
            setPnlArray(updatedPnlArray);
            
            console.log(updatedPnlArray)
      
      
            setPnl(data)
            localStorage.setItem('pnl',data)
            }  
       
          
        });
      
        return () => {
          socket.disconnect(); // Disconnect the socket when component unmounts
        };
        
        }      

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
  

//   const handleTrailingSLChange = (e) => {
//     setTrailingSL(e.target.checked);
//   };

//   const handleTrailingSLTypeChange = (e) => {
//     setTrailingSLType(e.target.value);
//   };

//   const handleTrailingSLValueChange = (e) => {
//     setTrailingSLValue(Number(e.target.value));
//   };

//   const handleBuyAtLowChange = (e) => {
//     setBuyAtLow(e.target.checked);
//   };

//   const handleBuyAtLowTypeChange = (e) => {
//     setBuyAtLowType(e.target.value);
//   };

//   const handleBuyAtLowValueChange = (e) => {
//     setBuyAtLowValue(Number(e.target.value));
//   };

//   const handleProtectProfitChange = (e) => {
//     setProtectProfit(e.target.checked);
//   };

//   const handleProtectProfitTypeChange = (e) => {
//     setProtectProfitType(e.target.value);
//   };

//   const handleProtectProfitValueChange = (e) => {
//     setProtectProfitValue(Number(e.target.value));
//   };

//   const handleTakeProfitChange = (e) => {
//     setTakeProfit(e.target.checked);
//   };

//   const handleTakeProfitTypeChange = (e) => {
//     setTakeProfitType(e.target.value);
//   };

//   const handleTakeProfitValueChange = (e) => {
//     setTakeProfit(Number(e.target.value));
//   };

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

  const handleCapitalRiskPerDayChange = (e) => {
    setCapitalRiskPerDay(e.target.value);
    localStorage.setItem('capitalRiskPerDay',e.target.value); 
  };

  const handleTriggerPriceChange = (e) => {
    setTriggerPrice(e.target.value);
    localStorage.setItem('triggerPrice', e.target.value); 
  };



  const [resetCount, setResetCount] = useState(0);




  const handleReset = () => {

    localStorage.clear()

    
    setNumTrades(0);
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
    setStopLoss();
    setResetCount(resetCount + 1);
    setOrderType()
    setCapitalRiskPerDay(null)
    setRewardToRisk(null)
    setProduct(null)
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

  return (
    <div className="trade-page">
      <div className="container">
        <div className="centered-row">
          <div className="Capital_Value">
            <div className="input-field-1">
              <label htmlFor="capital">Capital:</label>
              <input  id="capital" value={Math.round(capital)} onChange={handleCapitalChange} /> 
                  
              <div class='row'>      
             
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
                 </div>
                 </div>
              {/* <p>Capital Risk per day:</p> */}
              <form onSubmit={handleSubmit}>
              <label htmlFor="rewardToRisk">Capital risk per day:</label>
                <input
                  type="number"
                  id="rewardToRisk"
                  value={capitalRiskPerDay}
                onChange={handleCapitalRiskPerDayChange}
                />
               
               
               
                <label htmlFor="rewardToRisk">Reward to Risk:</label>
                <input
                  type="number"
                  id="rewardToRisk"
                  value={rewardToRisk}
                  onChange={handleRewardToRiskChange}

                />
                <div>
                    <label>stop loss</label>
                    <input type='number' value={stopLoss} onChange={handleStopLossChange} ></input>
                </div>

                


              </form>
              <div className="buy-at-low-form">
                <label>
                  Number of Trades:
                  <input type="number" value={numTrade} onChange={handleNumTradesChange} />
                </label>
              </div>

            
              
            </div>
          </div>
          <div className="Trade_Value">

            <div className="input-field-3">
              <label htmlFor="index">Instrument:</label>
              <select id="index" value={index} onChange={handleIndexChange} defaultValue="default">
                <option value="default">--select--</option>
                <option value="NIFTY">NIFTY</option>
                <option value="BANKNIFTY">BANKNIFTY</option>
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
              </select>
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

          <div className='row'>
            <div class="form-check col">
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
                    </div>
                   

            </div>
            <div>
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
            </div>

    
            


            {/* <div className="input-field-6">
              <input type="checkbox" id="trailingSL" checked={trailingSL} onChange={handleTrailingSLChange} />
              <label htmlFor="trailingSL">Trailing Stop Loss</label>
            </div> */}
            {/* {trailingSL && (
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
                  <input type="number" id="trailingSL-value" value={trailingSLValue} onChange={handleTrailingSLValueChange} />
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
            )} */}
            {/* <div className="input-field-12">
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
            )} */}
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
    <div className={`low ${index === activePage ? 'highlighted' : ''}`} key={index} style={{ display: 'inline-grid' }}>
      <StockPage props={strike} props1={stopLoss} props2={capital} props3={capitalRiskPerDay} props4={rewardToRisk} pnl={pnlArray[index]} props5={quantity} props6={tradingInfo} props7={numTrade}  handlep={()=>handleIndex(index)}/>
    </div>
    
  ))}
</div>
      {/* <div className="reset-box">
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
            <div className='low' key={index} style={{ display: 'inline-grid' }}>
            <StockPage props={strike} props1={stopLoss} props2={capital} props3={capitalRiskPerDay} props4={rewardToRisk} props5={quantity} props6={tradingInfo} props7={numTrade}/>
          </div>
        ))}
      </div> */}


      {<div>



      </div>}
    </div>
  );
};
export default TradePage;