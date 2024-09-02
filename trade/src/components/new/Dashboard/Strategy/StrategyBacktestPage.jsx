import React , {useState,useEffect}from 'react'
import './StrategyBacktestPage.css'
import axios from 'axios'
import StrategyResult from './StrategyResult';
import StrategyResultPage from './StrategyResultPage';

const StrategyBacktestPage = ({strategyListIndi,setStrategyListIndi,setBacktestResult,setActivePage,setOptimiseStrategy ,currentStrategy}) => {

    // const {strategyDetails,strategyDetails2,strategyDetailsExit,strategyDetailsExit2,graphType,marketType,maxQuantity,moveInstrument,moveSl,positionSizeType,backQuantity,sizeAmount,pyStoploss,backSymbol,pyTarget,timePeriod,trailingType,maxLong,maxShort} = strategyListIndi[strategyListIndi.length-1]

    const lastStrategy =
    strategyListIndi && strategyListIndi.length > 0
      ? strategyListIndi[strategyListIndi.length - 1]
      : {
          strategyDetails: null,
          strategyDetails2: null,
          strategyDetailsExit: null,
          strategyDetailsExit2: null,
          graphType: null,
          marketType: null,
          maxQuantity: null,
          moveInstrument: null,
          moveSl: null,
          positionSizeType: null,
          backQuantity: null,
          sizeAmount: null,
          pyStoploss: null,
          backSymbol: null,
          pyTarget: null,
          timePeriod: null,
          trailingType: null,
          maxLong: null,
          maxShort: null,
        };

        const {
            strategyDetails,
            strategyDetails2,
            strategyDetailsExit,
            strategyDetailsExit2,
            graphType,
            marketType,
            maxQuantity,
            moveInstrument,
            moveSl,
            positionSizeType,
            backQuantity,
            sizeAmount,
            pyStoploss,
            backSymbol,
            pyTarget,
            timePeriod,
            trailingType,
            maxLong,
            maxShort,
            strategyName,
        } = currentStrategy;

    const [startDate,setStratDate] = useState()
    const [endDate,setEndDate] = useState()
    const [backCapital,setBackCapital] =useState()
    const [loading, setLoading] = useState(false);
    const [backtest,setBacktest] = useState([])

    const [targetPct,setTargetPct] = useState()
    const [slPct,setSlPct] = useState()
    const [trailPct,setTrailPct] = useState()

    const [moveSlPct,setMoveSlPct] = useState()
    const [moveInstrumentPct,setMoveInstrumentPct] = useState()



    const [selectedDaysForIndi, setSelectedDaysForIndi] = useState({
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
      });


      useEffect(() => {
        // Find the exact strategy in the strategyListIndi
        const matchingStrategy = strategyListIndi.find(strategy =>
          strategy.strategyDetails === strategyDetails &&
          strategy.strategyDetails2 === strategyDetails2 &&
          strategy.strategyDetailsExit === strategyDetailsExit &&
          strategy.strategyDetailsExit2 === strategyDetailsExit2 &&
          strategy.graphType === graphType &&
          strategy.marketType === marketType &&
          strategy.maxQuantity === maxQuantity &&
          strategy.moveInstrument === moveInstrument &&
          strategy.moveSl === moveSl &&
          strategy.positionSizeType === positionSizeType &&
          strategy.backQuantity === backQuantity &&
          strategy.sizeAmount === sizeAmount &&
          strategy.pyStoploss === pyStoploss &&
          strategy.backSymbol === backSymbol &&
          strategy.pyTarget === pyTarget &&
          strategy.timePeriod === timePeriod &&
          strategy.trailingType === trailingType &&
          strategy.maxLong === maxLong &&
          strategy.maxShort === maxShort
        );
    
        // If a matching strategy is found, set the backtest result
        if (matchingStrategy) {
            console.log(matchingStrategy)
          // Set the backtest result
          if (matchingStrategy.backtestResult) {
            setBacktestResult(matchingStrategy.backtestResult);
            setBacktest(matchingStrategy.backtestResult);
          }
    
          // Restore the other state values
          setStratDate(matchingStrategy.startDate || '');
          setEndDate(matchingStrategy.endDate || '');
          setBackCapital(matchingStrategy.backCapital || '');
          setTargetPct(matchingStrategy.targetPct || '');
          setSlPct(matchingStrategy.slPct || '');
          setTrailPct(matchingStrategy.trailPct || '');
          setMoveSlPct(matchingStrategy.moveSlPct || '');
          setMoveInstrumentPct(matchingStrategy.moveInstrumentPct || '');
          setSelectedDaysForIndi(matchingStrategy.selectedDaysForIndi || {
            Mon: false,
            Tue: false,
            Wed: false,
            Thu: false,
            Fri: false,
          });
        } else {
          // Optionally reset the state if no matching strategy is found
          setBacktestResult([]);
          setBacktest([]);
          setStratDate('');
          setEndDate('');
          setBackCapital('');
          setTargetPct('');
          setSlPct('');
          setTrailPct('');
          setMoveSlPct('');
          setMoveInstrumentPct('');
          setSelectedDaysForIndi({
            Mon: false,
            Tue: false,
            Wed: false,
            Thu: false,
            Fri: false,
          });
        }
      }, [
        strategyDetails, strategyDetails2, strategyDetailsExit, strategyDetailsExit2, graphType,
        marketType, maxQuantity, moveInstrument, moveSl, positionSizeType, backQuantity,
        sizeAmount, pyStoploss, backSymbol, pyTarget, timePeriod, trailingType, maxLong, maxShort
      ]);

      const handleIntervalClick = (interval) => {
        setSelectedDaysForIndi((prevSelected) => ({
          ...prevSelected,
          [interval]: !prevSelected[interval],
        }));
      };
    
  
    const intervals = {
        '1M': 'min',
        '5M': '5min',
        '10M': '10min',
        '15M': '15min',
        '30M': '30min',
        '1H': 'hourly',
        '1D': 'daily',
      };


      const setStartDates = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        console.log(formattedDate);
        setStratDate(formattedDate) // Use this value as needed
        // Update state or perform other actions with formattedDate
      };
    
      const setEndDates = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        console.log(formattedDate);
        setEndDate(formattedDate) // Use this value as needed
        // Update state or perform other actions with formattedDate
      };

      function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleDateString('en-GB', options);
    }

    useEffect(()=>{
      setTargetPct(pyTarget/100) 
      
    },[pyTarget])

    useEffect(()=>{
      setSlPct(pyStoploss/100) 
      
    },[pyStoploss])



    
    useEffect(()=>{
        setMoveSlPct(moveSl/100)
      },[moveSl])
  
  
      useEffect(()=>{
        setMoveInstrumentPct(moveInstrument/100)
      },[moveInstrument])
      
      const handleStrategy = async (e) => {
          e.preventDefault();
  
          setLoading(true)    
          axios.post(`http://localhost:5000/backtest`,{slPct,targetPct,backSymbol,startDate,endDate,backCapital,backQuantity,strategyDetails,graphType,trailPct,sizeAmount,maxQuantity,strategyDetailsExit,positionSizeType,moveSlPct,moveInstrumentPct,timePeriod,marketType,strategyDetails2,strategyDetailsExit2,maxLong,maxShort,selectedDaysForIndi})
                .then((response)=>{
  
                  const responseData = JSON.parse(response.data); // Manually parse the JSON string
                  setBacktest(responseData)
                  setBacktestResult(responseData)
                  const parsedData = responseData.map(item => {
                    return {
                        ...item,
                        monthly_pnl: typeof item.monthly_pnl === 'string' ? JSON.parse(item.monthly_pnl) : item.monthly_pnl,
                        monthly_pnl_short: typeof item.monthly_pnl === 'string' ? JSON.parse(item.monthly_pnl_short) : item.monthly_pnl_short,
                        monthly_pnl_total: typeof item.monthly_pnl === 'string' ? JSON.parse(item.monthly_pnl_total) : item.monthly_pnl_total,
                        closePrices: typeof item.closePrices === 'string' ? JSON.parse(item.closePrices) : item.closePrices,
                    };
  
                   });

                   const updatedStrategyListIndi = strategyListIndi.map((strategy) =>
                    strategy.strategyName === currentStrategy.strategyName
                      ? {
                          ...strategy,
                          backtestResult: parsedData,
                          startDate,
                          endDate,
                          backCapital,
                          slPct,
                          targetPct,
                          trailPct,
                          moveSlPct,
                          moveInstrumentPct,
                          selectedDaysForIndi,
                        }
                      : strategy
                  );
            
                  setStrategyListIndi(updatedStrategyListIndi);
                 
                  // setMonthlyData(parsedData)
                  console.log(parsedData)
                  setLoading(false)
                   
                  // setExpandedRow(null)
                })
                .catch((err)=>{
                  console.log(err)
                })
  
            };  

            useEffect(() => {
              setOptimiseStrategy({
                  slPct,
                  targetPct,
                  backSymbol,
                  startDate,
                  endDate,
                  backCapital,
                  backQuantity,
                  strategyDetails,
                  graphType,
                  trailPct,
                  sizeAmount,
                  maxQuantity,
                  strategyDetailsExit,
                  positionSizeType,
                  moveSlPct,
                  moveInstrumentPct,
                  timePeriod,
                  marketType,
                  strategyDetails2,
                  strategyDetailsExit2,
                  maxLong,
                  maxShort,
                  selectedDaysForIndi,
                  strategyName,
              });
          }, [
            slPct, targetPct, backSymbol, startDate, endDate, backCapital, backQuantity, strategyDetails, graphType, trailPct, 
            sizeAmount, maxQuantity, strategyDetailsExit, positionSizeType, moveSlPct, moveInstrumentPct, timePeriod, marketType, 
            strategyDetails2, strategyDetailsExit2, maxLong, maxShort, selectedDaysForIndi,strategyListIndi,strategyName
          ])


          const convertToInputDateFormat = (formattedDate) => {
            const [day, month, year] = formattedDate.split('-');
            return `${year}-${month}-${day}`;
          };


  return (
    <div>
         <div className='Backtest-Parameters'>
                      <div className='heading'>
                          <h3>Back-test Parameters</h3>
                      </div>

                      <div className='btn-container'>
                        <div>
                            <label>Initial Capital</label>
                            <input type='number' value={backCapital} onChange={(e)=>setBackCapital(Number(e.target.value))}></input>
                        </div>

                        <div>
                            <label>Entry Start Time</label>
                            <input type='time'></input>
                        </div>

                        <div>
                            <label>Entry End Time</label>
                            <input type='time'></input>
                        </div>



                      </div>

                <div className='btn-container'>

                    <div>
                        <label>Select Days</label>
                        <div className='days-btn'>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((interval, index) => (
                                <button
                                key={index}
                                className={selectedDaysForIndi[interval] ? 'selected' : ''}
                                onClick={() => handleIntervalClick(interval)}
                                style={{
                                    borderRadius: index === 0 ? '10px 0 0 10px' : index === 4 ? '0 10px 10px 0' : '0',
                                }}
                                >
                                {interval}
                                </button>
                            ))}
                         </div>
                    </div>

                    <div>
                        <label>Backtest Start Date</label>
                        <input type='date'   value={startDate ? convertToInputDateFormat(startDate) : ''}  onChange={(e)=>setStartDates(e.target.value)}></input>
                    </div>


                    <div>
                        <label>Backtest End Date</label>
                        <input type='date'  value={endDate ? convertToInputDateFormat(endDate) : ''} onChange={(e)=>setEndDates(e.target.value)}></input>
                    </div>

                </div>

                    <div className='run-btn'>
                        <button onClick={handleStrategy}>Run</button>
                    </div>

                    <div className='backtest-result'>
                        <div className='heading'>
                            <h3>
                            Backtest Results
                            </h3>

                        </div>

                        <div className='top'>
                                

                                <div>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                                <path d="M22.9812 7.64362C23.2078 8.33191 23.3641 9.04952 23.4423 9.78894L22.9451 9.84151C22.9814 10.185 23 10.5335 23 10.8863C23 11.239 22.9814 11.5875 22.9451 11.931L23.4423 11.9836C23.3641 12.723 23.2078 13.4406 22.9812 14.1289L22.5063 13.9725C22.287 14.6388 21.9984 15.2766 21.6482 15.8786L22.0804 16.13C21.7122 16.7629 21.2794 17.3574 20.7905 17.9056L20.4174 17.5727C19.9538 18.0924 19.437 18.5689 18.8748 18.9945L19.1766 19.3931C18.5971 19.8318 17.9718 20.2185 17.3085 20.5458L17.0872 20.0974C16.4654 20.4043 15.8085 20.6567 15.1236 20.8479L15.258 21.3295C14.5631 21.5234 13.8409 21.6569 13.0981 21.7235L13.0535 21.2255C12.7069 21.2566 12.3555 21.2725 12 21.2725C11.6445 21.2725 11.2931 21.2566 10.9465 21.2255L10.9019 21.7235C10.1591 21.6569 9.43686 21.5234 8.74202 21.3295L8.87644 20.8479C8.19152 20.6567 7.53461 20.4043 6.91275 20.0974L6.69149 20.5458C6.02825 20.2185 5.40293 19.8318 4.82343 19.3931L5.1252 18.9945C4.56295 18.5689 4.04618 18.0924 3.58263 17.5727L3.2095 17.9056C2.72055 17.3574 2.28778 16.7629 1.91959 16.13L2.35178 15.8786C2.00162 15.2766 1.71303 14.6388 1.49372 13.9725L1.01879 14.1289C0.792222 13.4406 0.635879 12.723 0.557696 11.9836L1.05492 11.931C1.01861 11.5875 1 11.239 1 10.8863C1 10.5335 1.01861 10.185 1.05492 9.84151L0.557696 9.78894C0.635879 9.04953 0.792222 8.33191 1.01879 7.64362L1.49372 7.79996C1.71303 7.13372 2.00162 6.49587 2.35178 5.89394L1.91959 5.64252C2.28778 5.00961 2.72055 4.41509 3.2095 3.86694L3.58263 4.19977C4.04618 3.68009 4.56295 3.20365 5.1252 2.77805L4.82342 2.37939C5.40293 1.94072 6.02825 1.55401 6.69149 1.22672L6.91275 1.67509C7.53461 1.36822 8.19152 1.1158 8.87644 0.924628L8.74202 0.443036C9.43686 0.249092 10.1591 0.115599 10.9019 0.048988L10.9465 0.54699C11.2931 0.515908 11.6445 0.5 12 0.5C12.3555 0.5 12.7069 0.515908 13.0535 0.54699L13.0981 0.048988C13.8409 0.115599 14.5631 0.249092 15.258 0.443036L15.1236 0.924628C15.8085 1.1158 16.4654 1.36822 17.0872 1.67509L17.3085 1.22672C17.9718 1.55401 18.5971 1.94072 19.1766 2.37939L18.8748 2.77805C19.437 3.20365 19.9538 3.68009 20.4174 4.19977L20.7905 3.86694C21.2794 4.41509 21.7122 5.0096 22.0804 5.64252L21.6482 5.89394C21.9984 6.49587 22.287 7.13372 22.5063 7.79995L22.9812 7.64362Z" fill="#5A55D2" stroke="white" stroke-dasharray="2 2"/>
                                <line x1="12" y1="6" x2="12" y2="13" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                <line x1="7.5" y1="16.5" x2="16.5" y2="16.5" stroke="white" stroke-linecap="round"/>
                                <path d="M15 11H9L12 14L15 11Z" fill="white" stroke="white" stroke-linejoin="round"/>
                                </svg> */}
                                </div>

                            </div>

                         <div className='result-container'>
                        
                            {/* <StrategyResult backtest={backtest} loading={loading} backCapital={backCapital} marketType={marketType}></StrategyResult> */}
                            <StrategyResultPage backtest={backtest} loading={loading} backCapital={backCapital} marketType={marketType} setActivePage={setActivePage} ></StrategyResultPage>

                          

                        </div>


                    </div>



        </div>


    </div>
  )
}

export default StrategyBacktestPage