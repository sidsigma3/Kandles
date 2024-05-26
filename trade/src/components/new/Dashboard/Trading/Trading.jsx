import React from 'react'
import { useState ,useEffect} from 'react';
import { Modal, Button, Form ,FormLabel, FormControl, FormGroup, FormCheck, FormSelect } from 'react-bootstrap';
import { IoIosAdd } from "react-icons/io";
import RealTimeClock from '../overview/RealTimeClock';
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import StrategyBuilder from '../overview/StrategyBuilder';
import Strategy from '../overview/Strategy';
import stockList from '../overview/StockList';
import { ProgressBar } from 'react-loader-spinner'
import optionList from '../overview/optionList';


const Trading = ({strategyList,setStrategyList ,editingStrategyIndex, setEditingStrategyIndex ,isEditing,setIsEditing}) => {
    const [accountType, setAccountType] = useState('live')
    const [legList,setLegList] = useState([])
    const [currentLeg,setCurrentleg]= useState()
    const [showInputs, setShowInputs] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);
    const [view, setView] = useState('time');
    
    const [strategy,setStrategy] =useState()
    const [entryTime,setEntryTime] =  useState()
    const [exitTime,setExitTime] = useState()
    const [instrument,setInstrument] = useState('Nifty')

    const [showInputsSl, setShowInputsSl] = useState(false);
    const [showInputsTarget, setShowInputsTarget] = useState(false);
    const [showInputsTrailing,setShowInputsTrailing]=useState(false)
    const [showInputsWait,setShowInputsWait] = useState(false)
    const [showInputsPyramid,setShowInputsPyramid]=useState(false)
    const [showInputsRe,setShowInputsRe] = useState(false)
    const [showInputsTimer,setShowInputsTimer] = useState(false)
    const [showInputsTrailProfit,setShowInputsTrailingProfit]=useState(false)
    const [showInputsLockAndTrail,setShowInputsLockAndTrail] = useState(false)
    const [showInputsProtect,setShowInputsProtect] = useState(false)

    const [advancedFeat,setAdvanceFeat] = useState()
    const[strikeCriteriaInput,setStrikeCriteriaInput] = useState()

    const [showMore,setShowMore] = useState(false)
    const [showMore1,setShowMore1] = useState(false)
    const [trailing,setTrailing] = useState(0)

    const [overallSl,setOverallSl]=useState()
    const [overallSlType,setOverallSlType] =useState()
    const [overallTarget,setOverallTarget] = useState()
    const [overallTargetType,setOverallTargetType] =useState()

    const [entryType,setEntryType] = useState('buy')
    const [pyTarget,setPyTarget]= useState()
    const [pyStoploss,setPyStoploss]= useState()
    const [backtest,setBacktest] = useState()
    const [backSymbol,setBackSymbol] =useState()
    const [startDate,setStratDate] = useState()
    const [endDate,setEndDate] = useState()
    const [imageSrc,setImageSrc] = useState()
    const [backCapital,setBackCapital] =useState()
    const [backQuantity,setBackQuantity] =useState()

    const [indicatorDetails, setIndicatorDetails] = useState({
      indicatorOne: { value: '', offset: '', period: '', isNew: true ,indiInputs:{}},
      comparator: '',
      indicatorTwo: { value: '', offset: '', period: '', isNew: true ,indiInputs:{}},
    });

    const [indicatorDetailsExit, setIndicatorDetailsExit] = useState({
      indicatorOne: { value: '', offset: '', period: '', isNew: true ,indiInputs:{}},
      comparator: '',
      indicatorTwo: { value: '', offset: '', period: '', isNew: true ,indiInputs:{}},
    });

    const [graphType,setGraphType] = useState()
    const [monthlyData,setMonthlyData] = useState()
    const [trailingType,setTrailingType] = useState()
    const [loading, setLoading] = useState(false);
    const [positionSizeType,setPositionSizeType] = useState('')
    const [maxQuantity,setMaxQuantity] = useState()
    const [sizeAmount,setSizeAmount] = useState()
    const [strategyDetails, setStrategyDetails] = useState({
      conditions: [],
      logicalOperators: []
    });

    const [strategyDetailsExit, setStrategyDetailsExit] = useState({
      conditions: [],
      logicalOperators: []
    });



    const [summary, setSummary] = useState({
      totalSignals: 0,
      profitFactor: 0,
      totalWins: 0,
      totalLosses: 0,
      maxDrawdown: 0
    });
  
  const [filteredTrades,setFilterdTrades] = useState()


  const [targetPct,setTargetPct] = useState()
  const [slPct,setSlPct] = useState()
  const [trailPct,setTrailPct] = useState()

  const [moveSl,setMoveSl] = useState()
  const [moveInstrument,setMoveInstrument] = useState()

  const [moveSlPct,setMoveSlPct] = useState()
  const [moveInstrumentPct,setMoveInstrumentPct] = useState()

  const [ instrumentType,setInstrumentType] = useState('equity')

  const [timePeriod,setTimePeriod] = useState('day')

  const [selectedSymbol,setSelectedSymbol] = useState()

  const toggleRow = (index) => {
      setExpandedRow(expandedRow === index ? null : index);
      setSelectedSymbol(backtest[index].symbol)
  };

    // const formatDate = (date) => {
    //     const newDate = new Date(date);
    //     return newDate.toLocaleDateString();
    // };

    const [strikeCriteria,setStrikeCriteria] = useState('ATM')
    const [segment, setSegment] = useState('OPT');
    const [position, setPosition] = useState('BUY');
    const [optionType, setOptionType] = useState('CE');
    const [lotSize,setLotSize] = useState ()

    const [selectedOption, setSelectedOption] = useState('');

    const [selectedDays, setSelectedDays] = useState({
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
      });

      const animatedComponents = makeAnimated()
      
      const handleSave = () => {
        const newStrategy = {
          strategyName: strategy,
          legList: legList,
          days: selectedDays,
          entryTime: entryTime,
          exitTime: exitTime,
          advancedFeat: advancedFeat,
          overallSl: overallSl,
          overallTarget: overallTarget,
          overallTargetType: overallTargetType,
          overallSlType: overallSlType,
        };
      
        if (isEditing) {
          // If editing, replace the strategy at the specified index
          const updatedStrategies = strategyList.map((item, index) =>
            index === editingStrategyIndex ? newStrategy : item
          );
          setStrategyList(updatedStrategies);
        } else {
          // If adding a new strategy, append it to the strategyList
          setStrategyList([...strategyList, newStrategy]);
        }
      
        // Reset editing state
        setIsEditing(false);
        setEditingStrategyIndex(null);
        toast.success('Strategy Saved', {autoClose:3000})
      };
      

      const toggleDay = (day) => {
        setSelectedDays((prevDays) => ({
          ...prevDays,
          [day]: !prevDays[day],
        }));
      };

    const addLeg = () =>{
        const newLeg = {
            
            targetVisible: false,
            stoplossVisible: false,
            segment:segment,
            position:position,
            optionType:optionType,
            strikeCriteria:strikeCriteria,
            lot:lotSize,
            trailing:false,
            wait:false,
            reEntry:false,
            pyramid:false,
            instrument:instrument,    
            strikeCriteriaInput:strikeCriteriaInput,
            targetType:null,
            slType: null,
            trailingType:null,
            waitType:null,
            reEntryType:null,
            pyramidType:null,
            targetValue:null,
            slValue:null,
            trailingValue:null,
            waitValue:null,
            reEntryValue:null,


        }

        setLegList([...legList,newLeg])
    }

    const deleteLeg = (itemId) => {
        setLegList(legList.filter((item,index) => index !== itemId));
      };


      const handleCheckboxChange = (index, field) => {
        // if (field==='trailing'){
        //     setShowInputsTrailing(!showInputsTrailing)
        // }
         if (field==='protect'){
            setShowInputsProtect(!showInputsProtect)
        }

        else if (field==='trailProfit'){
            setShowInputsTrailingProfit(!showInputsTrailProfit)
        }

        // else if (field==='pyramid'){
        //     setShowInputsPyramid(!showInputsPyramid)
        // }

        else if (field==='lockAndTrail'){
            setShowInputsLockAndTrail(!showInputsLockAndTrail)
        }

        else if (field==='timer'){
            setShowInputsTimer(!showInputsTimer)
        }

        else{
        setLegList(prevLegList =>
          prevLegList.map((leg, i) =>
            i === index ? { ...leg, [field]: !leg[field] } : leg
          )
        );
        }
      };

      const handleStrikeCriterias = (index, value) => {
        setLegList(legList.map((leg, idx) => idx === index ? { ...leg, strikeCriteria: value } : leg));
      };
      


      const handleStrikeCriteria = (e) =>{
       setStrikeCriteria(e.target.value)
            
      }

      const handleLot = (e) =>{
        setLotSize(e.target.value)
      }


      const handleSquareOff = (event) => {
        setSelectedOption(event.target.value);
      };


    

      const handleAdvancedFeat = (e)=>{
            setAdvanceFeat(e.target.value)    
            
      }


      const handleStrikeCriteriaInputs = (index, value) => {
        setLegList(legList.map((leg, idx) => idx === index ? { ...leg, strikeCriteriaInput: value } : leg));
      };

      const handleInstrumentChange = (index,value) =>{
        setLegList(legList.map((leg,idx)=> idx===index ? {...leg ,instrument:value} :leg ))
      }


      const handleTargetType = (index,value) =>{
        setLegList(legList.map((leg,idx)=> idx===index ? {...leg , targetType:value} :leg))
      }

      const handleSlType = (index,value) =>{
        setLegList(legList.map((leg,idx)=> idx===index ? {...leg , slType:value} :leg))
      }

      const handleTrailingType = (index,value) =>{
        setLegList(legList.map((leg,idx)=> idx===index ? {...leg , trailingType:value} :leg))
      }

      const handleWaitType = (index,value) =>{
        setLegList(legList.map((leg,idx)=> idx===index ? {...leg , waitType:value} :leg))
      }

      const handleReEntryType = (index,value) =>{
        setLegList(legList.map((leg,idx)=> idx===index ? {...leg , reEntryType:value} :leg))
      }


      const handlePyramidType = (index,value) =>{
        setLegList(legList.map((leg,idx)=> idx===index ? {...leg , pyramidType:value} :leg))
      }


      const handleLotSize = (index,value) =>{
        setLegList(legList.map((leg,idx) => idx===index ? {...leg, lot:value} :leg))
      }


      const handleTargetValue = (index,value) =>{
        setLegList(legList.map((leg,idx)=> idx===index ? {...leg, targetValue:value}: leg))
      }

      const handleSlValue = (index,value) =>{
        setLegList(legList.map((leg,idx)=> idx===index ? {...leg, slValue:value}:leg))
      }

      const handleTrailingValue = (index,value) =>{
        setLegList(legList.map((leg,idx)=> idx===index ? {...leg, trailingValue:value}:leg))
      }

      const handleWaitValue = (index,value) =>{
        setLegList(legList.map((leg,idx)=> idx===index ? {...leg, waitValue:value}:leg))
      }

      const handleReEntryValue = (index,value) =>{
        setLegList(legList.map((leg,idx)=> idx===index ? {...leg, reEntryValue:value}:leg))
      }


      const handlePositionChange = (index, newPosition) => {
        const updatedLegs = [...legList];
        updatedLegs[index] = { ...updatedLegs[index], position: newPosition };
        setLegList(updatedLegs);
      };
      
      const handleOptionTypeChange = (index, newOptionType) => {
        const updatedLegs = [...legList];
        updatedLegs[index] = { ...updatedLegs[index], optionType: newOptionType };
        setLegList(updatedLegs);
      };

      
      const handleStrategy = async (e) => {
        e.preventDefault();

        setLoading(true)    
        axios.post(`http://localhost:5000/backtest`,{slPct,targetPct,backSymbol,startDate,endDate,backCapital,backQuantity,strategyDetails,entryType,graphType,trailPct,sizeAmount,maxQuantity,strategyDetailsExit,positionSizeType,moveSlPct,moveInstrumentPct,timePeriod})
              .then((response)=>{
               
                const responseData = JSON.parse(response.data); // Manually parse the JSON string
                setBacktest(responseData)
                const parsedData = responseData.map(item => {
                  return {
                      ...item,
                      monthly_pnl: typeof item.monthly_pnl === 'string' ? JSON.parse(item.monthly_pnl) : item.monthly_pnl
                  };
                 });
              
                setMonthlyData(parsedData)
                console.log(parsedData)
                setLoading(false)
                console.log(responseData)
              })
              .catch((err)=>{
                console.log(err)
              })

              

        // try {
        //   const response = await fetch('/backtest', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({pyStoploss,pyTarget}),
        //   });
        //   const data = await response.json();
        //   console.log(data); // Process and display the results as needed
        // } catch (error) {
        //   console.error('Error:', error);
        // }
      };


      useEffect(() => {
        if (backtest && backtest.graph) { // Check if backtest and backtest.graph are defined
          const base64Image = backtest.graph;
          setImageSrc(`data:image/png;base64,${base64Image}`);
        }
      }, [backtest]);

      useEffect(() => {
        if (editingStrategyIndex !== null) {
          const strategyToEdit = strategyList[editingStrategyIndex];
        
          setStrategy(strategyToEdit.strategyName);
          setEntryTime(strategyToEdit.entryTime);
          setExitTime(strategyToEdit.exitTime);
          // Continue with other simple fields...
          
          // Handle `days` object
          setSelectedDays(strategyToEdit.days);
      
          // Handle legList
          setLegList(strategyToEdit.legList.map(leg => ({
            ...leg,
            // You might need to adjust fields as necessary
          })));
          setOverallSl(strategyToEdit.overallSl)
          setOverallSlType(strategyToEdit.overallSlType)
          setOverallTarget(strategyToEdit.overallTarget)
          setOverallTargetType(strategyToEdit.overallTargetType)
      
          // If there's any advanced feature or other fields, set them similarly
          setAdvanceFeat(strategyToEdit.advancedFeat);
          // Continue for other fields as necessary...
        }
      }, [editingStrategyIndex, strategyList]);



      
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
      
      
    

        const [modalIsOpen, setModalIsOpen] = useState(false);
        const [period, setPeriod] = useState('');
        const [offset, setOffset] = useState('');
        const [finalSelections, setFinalSelections] = useState([]);
        const [selectedOptions, setSelectedOptions] = useState([]);
        const [selectedIndicator, setSelectedIndicator] = useState({});
        
        const handleIndicatorChange = (options) => {
          setSelectedOptions(options); // Update state with currently selected options
          const latestOption = options[options.length - 1]; // Assuming the latest selected option is at the end
          const category = groupedOptions.find(group => group.options.some(option => option.value === latestOption.value));
          if (category && category.label === 'Indicators') {
            setSelectedIndicator(latestOption);
            setModalIsOpen(true);
          } else {
            // For non-indicators, add directly to final selections
            setFinalSelections([...finalSelections, latestOption]);
          }
        };
      
        const handleModalSubmit = () => {
          const newSelection = {
            label: `Period: ${period}, Offset: ${offset}`,
            period,
            offset,
          };
          setFinalSelections([...finalSelections, newSelection]);
          setModalIsOpen(false); // Close the modal
          setPeriod(''); // Reset period input
          setOffset(''); // Reset offset input
        };

        const groupedOptions = [
          {
            label: 'Indicators',
            options: [
              { value: 'rsi', label: 'RSI' },
              { value: 'macd', label: 'MACD' },
              // add more indicators here
            ],
          },
          {
            label: 'Math Functions',
            options: [
              { value: 'add', label: 'Add' },
              { value: 'subtract', label: 'Subtract' },
              // add more math functions here
            ],
          },
          {
            label: 'Operators',
            options: [
              { value: 'greaterThan', label: 'Greater Than' },
              { value: 'lessThan', label: 'Less Than' },
              // add more operators here
            ],
          },
        ];

        const formatGroupLabel = (group) => (
          <div style={{ fontWeight: 'bold' }}>
            {group.label}
          </div>
        );


        useEffect(() => {
          if (Array.isArray(backtest) && backtest.length > 0) {   
            const calculatedSummary = backtest.reduce((acc, curr) => {
              acc.totalSignals += curr.result["Total Signals"];
              acc.totalPnL += curr.result["Total PnL"];
              acc.totalWins += curr.result["Number of Wins"];
              acc.totalLosses += curr.result["Number of Losses"];
              acc.maxDrawdown += curr.result["Max Drawdown"];
              acc.winStreakSum += curr.result["Winning Streak"];  // Sum of all win streaks
              acc.loseStreakSum += curr.result["Losing Streak"]; // Sum of all lose streaks
              acc.profitFactor += curr.result["Profit Factor"]; 
              return acc;
            }, {
              totalSignals: 0,
              totalPnL: 0,
              totalWins: 0,
              totalLosses: 0,
              maxDrawdown: 0,
              winStreakSum: 0,
              loseStreakSum: 0,
              profitFactor:0
            });
        
            setSummary({
              totalSignals: calculatedSummary.totalSignals,
              totalPnL: calculatedSummary.totalPnL.toFixed(2),
              totalWins: calculatedSummary.totalWins,
              totalLosses: calculatedSummary.totalLosses,
              maxDrawdown: calculatedSummary.maxDrawdown.toFixed(2),
              avgWinStreak: (calculatedSummary.winStreakSum / backtest.length).toFixed(1),  // Average win streak
              avgLoseStreak: (calculatedSummary.loseStreakSum / backtest.length).toFixed(1), // Average lose streak
              profitFactor:(calculatedSummary.profitFactor/backtest.length).toFixed(1)
            });
          }
        
        // if (backtest){ 
      
        // }
        }, [backtest]);


        useEffect(()=>{
          setTargetPct(pyTarget/100) 
          
        },[pyTarget])

        useEffect(()=>{
          setSlPct(pyStoploss/100) 
          
        },[pyStoploss])


        useEffect(()=>{
          setTrailPct(trailing/100) 
          
        },[trailing])


        useEffect(()=>{
          setMoveSlPct(moveSl/100)
        },[moveSl])


        useEffect(()=>{
          setMoveInstrumentPct(moveInstrument/100)
        },[moveInstrument])
      
        const [selectedSentiment, setSelectedSentiment] = useState('All'); // State variable for selected sentiment

        // Function to handle sentiment change
        const handleSentimentChange = (event) => {
          setSelectedSentiment(event.target.value);
        };

      //   useEffect(() => {
      //     if (backtest && Array.isArray(backtest)) {
      //         const filteredTrade = backtest
      //             .map(result => result.result.trades)
      //             .flat()
      //             .filter(trade => selectedSentiment === 'All' || trade.day_type === selectedSentiment);
      //         setFilterdTrades(filteredTrade);
      //     }

    

      // }, [backtest, selectedSentiment]);

      useEffect(() => {
        if (backtest && Array.isArray(backtest)) {
          const filteredTrade = backtest
            .filter(result => result.symbol === selectedSymbol) 
            .map(result => result.result.trades)
            .flat()
            .filter(trade => selectedSentiment === 'All' || trade.day_type === selectedSentiment);
          setFilterdTrades(filteredTrade);
        }
      }, [backtest, selectedSymbol, selectedSentiment]);
  

    //  useEffect(()=>{
    //   const trailPercentage = (moveSl/moveInstrument) * 100
    //   setTrailing(trailPercentage)

    //  },[moveSl,moveInstrument])


  return (
    <div className='trade p-2 mx-2'>
       <ToastContainer></ToastContainer>
        <div className='head d-flex justify-content-between my-1'>
          

            <div>
                <RealTimeClock></RealTimeClock>
            </div>

            <div>
            <button onClick={() => setView('time')}>Options-Based</button>
            <button onClick={() => setView('indicator')}>Equity-Based</button>
            </div>

            <div>
            <div className='acc-change'>
                                        <select value={accountType} onChange={(e) => setAccountType(e.currentTarget.value)} className="form-select">
                                            <option value="demo">Demo Account</option>
                                            <option value="personal">Live Account (Personal Funds)</option>
                                            <option value="funded">Live Account (Funded Fund)</option>
                                        </select>
                                    </div>
            </div>

        </div>

        {view === 'time' ? (
        
      <div>

        <div>
    <Form className='d-flex justify-content-between'>

            <Form.Group className='w-25'>
            <FormLabel>Strategy Name</FormLabel>
            <FormControl onChange={(e)=> setStrategy(e.target.value)} placeholder='Eg:Stradle' value={strategy}></FormControl>
            </Form.Group>

            <FormGroup className='d-flex w-25 justify-content-between bg-light'>

            <FormGroup className='w-25 m-1 '>
            <FormGroup>
            <FormLabel>Entry Time</FormLabel>
            <FormControl type='time' onChange={(e)=>setEntryTime(e.target.value)} value={entryTime}></FormControl>
            </FormGroup>

            <FormGroup className='d-flex justify-content-center'>
            <FormCheck type='switch'></FormCheck>
            <FormLabel className='m-0'>Immediate</FormLabel>
            </FormGroup>
            </FormGroup>

            <FormGroup className='w-25 m-1'>
            <FormLabel>Exit Time</FormLabel>
            <FormControl className='w-300' type='time' onChange={(e)=>setExitTime(e.target.value)} value={exitTime}></FormControl>
            </FormGroup>



            </FormGroup>

        </Form>
    </div>

    <div className='bg-light p-3 mt-3 mb-3'>
                        <Form className='d-flex justify-content-between'>
                          <FormGroup>
                            <FormLabel>Instrument</FormLabel>
                           <FormSelect className='w-100' onChange={(e)=>setInstrument(e.target.value)}>
                           <option>Nifty</option>
                            <option>Banknifty</option>
                            <option>Finnifty</option>
                            <option>Midcapnifty</option>
                           </FormSelect>
                          </FormGroup>


                          <FormGroup>
                                <FormLabel>Segment</FormLabel>
                                <div className="btn-group" role="group">
                                <input type="radio" className="btn-check" name="segment" id="btnsegment1" checked={segment === 'OPT'} onChange={() => setSegment('OPT')} />
                                <label className="btn btn-outline-primary" htmlFor="btnsegment1">OPT</label>

                                <input type="radio" className="btn-check" name="segment" id="btnsegment2" checked={segment === 'FUT'} onChange={() => setSegment('FUT')} />
                                <label className="btn btn-outline-primary" htmlFor="btnsegment2">FUT</label>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Position</FormLabel>
                                <div className="btn-group" role="group">
                                <input type="radio" className="btn-check" name="position" id="btnposition1" checked={position === 'BUY'} onChange={() => setPosition('BUY')} />
                                <label className="btn btn-outline-primary" htmlFor="btnposition1">BUY</label>

                                <input type="radio" className="btn-check" name="position" id="btnposition2" checked={position === 'SELL'} onChange={() => setPosition('SELL')} />
                                <label className="btn btn-outline-primary" htmlFor="btnposition2">SELL</label>
                                </div>
                            </FormGroup>


                           {segment === 'OPT' && (

                              <>
                               <FormGroup>
                               <FormLabel>Option Type</FormLabel>
                               <div className="btn-group" role="group">
                               <input type="radio" className="btn-check" name="optionType" id="btnoptionType1" checked={optionType === 'CE'} onChange={() => setOptionType('CE')} />
                               <label className="btn btn-outline-primary" htmlFor="btnoptionType1">CE</label>

                               <input type="radio" className="btn-check" name="optionType" id="btnoptionType2" checked={optionType === 'PE'} onChange={() => setOptionType('PE')} />
                               <label className="btn btn-outline-primary" htmlFor="btnoptionType2">PE</label>
                               </div>
                              </FormGroup>

                              <FormGroup style={{width:'150px'}}>
                            <FormLabel>Strike Criteria</FormLabel>
                           <FormSelect  onChange={handleStrikeCriteria}>
                           <option value='ATM'>ATM</option>
                            <option value='Closest Premium'>Closest Premium</option>
                            <option value='strike'>Sttrike Price</option>

                           </FormSelect>
                          </FormGroup>


                          {strikeCriteria==='ATM' && (
                             <FormGroup style={{width:'150px'}}>
                             <FormLabel>Strike Type</FormLabel>
                            <FormSelect onChange={(e)=>setStrikeCriteriaInput(e.target.value)}>
                            <option value="ATM-2000">ATM-2000(OTM-20)</option><option value="ATM-1900">ATM-1900(OTM-19)</option><option value="ATM-1800">ATM-1800(OTM-18)</option><option value="ATM-1700">ATM-1700(OTM-17)</option><option value="ATM-1600">ATM-1600(OTM-16)</option><option value="ATM-1500">ATM-1500(OTM-15)</option><option value="ATM-1400">ATM-1400(OTM-14)</option><option value="ATM-1300">ATM-1300(OTM-13)</option><option value="ATM-1200">ATM-1200(OTM-12)</option><option value="ATM-1100">ATM-1100(OTM-11)</option><option value="ATM-1000">ATM-1000(OTM-10)</option><option value="ATM-900">ATM-900(OTM-9)</option><option value="ATM-800">ATM-800(OTM-8)</option><option value="ATM-700">ATM-700(OTM-7)</option><option value="ATM-600">ATM-600(OTM-6)</option><option value="ATM-500">ATM-500(OTM-5)</option><option value="ATM-400">ATM-400(OTM-4)</option><option value="ATM-300">ATM-300(OTM-3)</option><option value="ATM-200">ATM-200(OTM-2)</option><option value="ATM-100">ATM-100(OTM-1)</option><option value="ATM">ATM</option><option value="ATM+100">ATM+100(ITM1)</option><option value="ATM+200">ATM+200(ITM2)</option><option value="ATM+300">ATM+300(ITM3)</option><option value="ATM+400">ATM+400(ITM4)</option><option value="ATM+500">ATM+500(ITM5)</option><option value="ATM+600">ATM+600(ITM6)</option><option value="ATM+700">ATM+700(ITM7)</option><option value="ATM+800">ATM+800(ITM8)</option><option value="ATM+900">ATM+900(ITM9)</option><option value="ATM+1000">ATM+1000(ITM10)</option><option value="ATM+1100">ATM+1100(ITM11)</option><option value="ATM+1200">ATM+1200(ITM12)</option><option value="ATM+1300">ATM+1300(ITM13)</option><option value="ATM+1400">ATM+1400(ITM14)</option><option value="ATM+1500">ATM+1500(ITM15)</option><option value="ATM+1600">ATM+1600(ITM16)</option><option value="ATM+1700">ATM+1700(ITM17)</option><option value="ATM+1800">ATM+1800(ITM18)</option><option value="ATM+1900">ATM+1900(ITM19)</option><option value="ATM+2000">ATM+2000(ITM20)</option>
                             
                            </FormSelect>
                           </FormGroup>
                          )}

                          {strikeCriteria==='Closest Premium' &&(
                            <FormGroup style={{width:'150px'}}>
                                <FormLabel>Closest Premium</FormLabel>
                                <FormControl  type='number' onChange={(e)=>setStrikeCriteriaInput(e.target.value)}></FormControl>
                            </FormGroup>
                          )}

                          {strikeCriteria==='strike' &&(
                            <FormGroup style={{width:'150px'}}>
                                <FormLabel>Strike price</FormLabel>
                                <FormControl type='number' onChange={(e)=>setStrikeCriteriaInput(e.target.value)}></FormControl>
                            </FormGroup>
                          )}



                              </>

                           )}


                           {/* {segment === 'FUT' && (

                            <>
                             <FormGroup>
                                <FormLabel>Option Type</FormLabel>
                                <div className="btn-group" role="group">
                                <input type="radio" className="btn-check" name="optionType" id="btnoptionType1" checked={optionType === 'CE'} onChange={() => setOptionType('CE')} />
                                <label className="btn btn-outline-primary" htmlFor="btnoptionType1">CE</label>

                                <input type="radio" className="btn-check" name="optionType" id="btnoptionType2" checked={optionType === 'PE'} onChange={() => setOptionType('PE')} />
                                <label className="btn btn-outline-primary" htmlFor="btnoptionType2">PE</label>
                                </div>
                            </FormGroup>

                                        
                            
                            </>

                            
                           )} */}
                            

                            {/* <FormGroup>
                                <FormLabel>Option Type</FormLabel>
                                <div className="btn-group" role="group">
                                <input type="radio" className="btn-check" name="optionType" id="btnoptionType1" checked={optionType === 'CE'} onChange={() => setOptionType('CE')} />
                                <label className="btn btn-outline-primary" htmlFor="btnoptionType1">CE</label>

                                <input type="radio" className="btn-check" name="optionType" id="btnoptionType2" checked={optionType === 'PE'} onChange={() => setOptionType('PE')} />
                                <label className="btn btn-outline-primary" htmlFor="btnoptionType2">PE</label>
                                </div>
                            </FormGroup>

                            <FormGroup style={{width:'150px'}}>
                            <FormLabel>Strike Criteria</FormLabel>
                           <FormSelect  onChange={handleStrikeCriteria}>
                           <option value='ATM'>ATM</option>
                            <option value='Closest Premium'>Closest Premium</option>
                            <option value='strike'>Sttrike Price</option>

                           </FormSelect>
                          </FormGroup> */}

                          {/* <FormGroup>
                            <FormLabel>Strike Type</FormLabel>
                           <FormSelect className='w-50 h-50'>
                           <option value="ATM-2000">ATM-2000(OTM-20)</option><option value="ATM-1900">ATM-1900(OTM-19)</option><option value="ATM-1800">ATM-1800(OTM-18)</option><option value="ATM-1700">ATM-1700(OTM-17)</option><option value="ATM-1600">ATM-1600(OTM-16)</option><option value="ATM-1500">ATM-1500(OTM-15)</option><option value="ATM-1400">ATM-1400(OTM-14)</option><option value="ATM-1300">ATM-1300(OTM-13)</option><option value="ATM-1200">ATM-1200(OTM-12)</option><option value="ATM-1100">ATM-1100(OTM-11)</option><option value="ATM-1000">ATM-1000(OTM-10)</option><option value="ATM-900">ATM-900(OTM-9)</option><option value="ATM-800">ATM-800(OTM-8)</option><option value="ATM-700">ATM-700(OTM-7)</option><option value="ATM-600">ATM-600(OTM-6)</option><option value="ATM-500">ATM-500(OTM-5)</option><option value="ATM-400">ATM-400(OTM-4)</option><option value="ATM-300">ATM-300(OTM-3)</option><option value="ATM-200">ATM-200(OTM-2)</option><option value="ATM-100">ATM-100(OTM-1)</option><option value="ATM">ATM</option><option value="ATM+100">ATM+100(ITM1)</option><option value="ATM+200">ATM+200(ITM2)</option><option value="ATM+300">ATM+300(ITM3)</option><option value="ATM+400">ATM+400(ITM4)</option><option value="ATM+500">ATM+500(ITM5)</option><option value="ATM+600">ATM+600(ITM6)</option><option value="ATM+700">ATM+700(ITM7)</option><option value="ATM+800">ATM+800(ITM8)</option><option value="ATM+900">ATM+900(ITM9)</option><option value="ATM+1000">ATM+1000(ITM10)</option><option value="ATM+1100">ATM+1100(ITM11)</option><option value="ATM+1200">ATM+1200(ITM12)</option><option value="ATM+1300">ATM+1300(ITM13)</option><option value="ATM+1400">ATM+1400(ITM14)</option><option value="ATM+1500">ATM+1500(ITM15)</option><option value="ATM+1600">ATM+1600(ITM16)</option><option value="ATM+1700">ATM+1700(ITM17)</option><option value="ATM+1800">ATM+1800(ITM18)</option><option value="ATM+1900">ATM+1900(ITM19)</option><option value="ATM+2000">ATM+2000(ITM20)</option>
                            
                           </FormSelect>
                          </FormGroup> */}

                          {/* {strikeCriteria==='ATM' && (
                             <FormGroup style={{width:'150px'}}>
                             <FormLabel>Strike Type</FormLabel>
                            <FormSelect onChange={(e)=>setStrikeCriteriaInput(e.target.value)}>
                            <option value="ATM-2000">ATM-2000(OTM-20)</option><option value="ATM-1900">ATM-1900(OTM-19)</option><option value="ATM-1800">ATM-1800(OTM-18)</option><option value="ATM-1700">ATM-1700(OTM-17)</option><option value="ATM-1600">ATM-1600(OTM-16)</option><option value="ATM-1500">ATM-1500(OTM-15)</option><option value="ATM-1400">ATM-1400(OTM-14)</option><option value="ATM-1300">ATM-1300(OTM-13)</option><option value="ATM-1200">ATM-1200(OTM-12)</option><option value="ATM-1100">ATM-1100(OTM-11)</option><option value="ATM-1000">ATM-1000(OTM-10)</option><option value="ATM-900">ATM-900(OTM-9)</option><option value="ATM-800">ATM-800(OTM-8)</option><option value="ATM-700">ATM-700(OTM-7)</option><option value="ATM-600">ATM-600(OTM-6)</option><option value="ATM-500">ATM-500(OTM-5)</option><option value="ATM-400">ATM-400(OTM-4)</option><option value="ATM-300">ATM-300(OTM-3)</option><option value="ATM-200">ATM-200(OTM-2)</option><option value="ATM-100">ATM-100(OTM-1)</option><option value="ATM">ATM</option><option value="ATM+100">ATM+100(ITM1)</option><option value="ATM+200">ATM+200(ITM2)</option><option value="ATM+300">ATM+300(ITM3)</option><option value="ATM+400">ATM+400(ITM4)</option><option value="ATM+500">ATM+500(ITM5)</option><option value="ATM+600">ATM+600(ITM6)</option><option value="ATM+700">ATM+700(ITM7)</option><option value="ATM+800">ATM+800(ITM8)</option><option value="ATM+900">ATM+900(ITM9)</option><option value="ATM+1000">ATM+1000(ITM10)</option><option value="ATM+1100">ATM+1100(ITM11)</option><option value="ATM+1200">ATM+1200(ITM12)</option><option value="ATM+1300">ATM+1300(ITM13)</option><option value="ATM+1400">ATM+1400(ITM14)</option><option value="ATM+1500">ATM+1500(ITM15)</option><option value="ATM+1600">ATM+1600(ITM16)</option><option value="ATM+1700">ATM+1700(ITM17)</option><option value="ATM+1800">ATM+1800(ITM18)</option><option value="ATM+1900">ATM+1900(ITM19)</option><option value="ATM+2000">ATM+2000(ITM20)</option>
                             
                            </FormSelect>
                           </FormGroup>
                          )}

                          {strikeCriteria==='Closest Premium' &&(
                            <FormGroup style={{width:'150px'}}>
                                <FormLabel>Closest Premium</FormLabel>
                                <FormControl  type='number' onChange={(e)=>setStrikeCriteriaInput(e.target.value)}></FormControl>
                            </FormGroup>
                          )}

                          {strikeCriteria==='strike' &&(
                            <FormGroup style={{width:'150px'}}>
                                <FormLabel>Strike price</FormLabel>
                                <FormControl type='number' onChange={(e)=>setStrikeCriteriaInput(e.target.value)}></FormControl>
                            </FormGroup>
                          )} */}


                        <div>
                        <FormGroup>
                            <FormLabel>Total Lot</FormLabel>
                            <FormControl type='number' className='w-50 mb-3' onChange={handleLot}></FormControl>
                          
                          </FormGroup>

                          <FormGroup>
                           
                           <FormSelect className='w-50'>
                               <option>Position Sizing</option>
                               <option>None</option>
                               <option>10% of Capital</option>
                               <option>20% of Capital</option>
                               <option>50% of Capital</option>
                               <option>100% of Capital</option>
                           </FormSelect>
                       </FormGroup>
                       </div>

                          {/* <FormGroup>
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
                          </FormGroup> */}

                          <div onClick={addLeg}>
                          <IoIosAdd   size={50}/>
                          <p>Add Leg</p>
                          </div>


                        </Form>
                        </div>

                          {legList.length>1 &&(
                                  <div className='d-flex px-5 w-100 justify-content-center'>
                                  <FormGroup className='me-5'>
                                  <FormCheck onChange={handleSquareOff} type='radio' value='square' checked={selectedOption==='square'}></FormCheck>
                                  <FormLabel>square Off All Legs</FormLabel>
                                  </FormGroup>
        
                                  <FormGroup>
                                    <FormCheck onChange={handleSquareOff} type='radio' value='moveSl' checked={selectedOption==='moveSl'}></FormCheck>
                                    <FormLabel>Move SL To Cost</FormLabel>
        
                                  </FormGroup>
        
                                </div>
                          )}

                            

                        {legList.map((leg, index) => (
                          
          <div key={index} className="mb-3 bg-light d-flex justify-content-between pt-1" style={{height:'100px'}}>
           
                  

                <div className='d-flex justify-content-between me-5 pe-5 '>

                    <div>
                        <FormGroup>
                          <FormSelect  className='w-100 h-25 mb-3' onChange={(e)=>handleInstrumentChange(index,e.target.value)} value={leg.instrument}>
                           <option >Nifty</option>
                            <option>Banknifty</option>
                            <option>Finnifty</option>
                            <option>Midcapnifty</option>
                           </FormSelect>

                           <FormGroup className='d-flex justify-content-between mb-3'>
                            <button
                              className={`btn btn-sm ${leg.position === 'BUY' ? 'btn-success' : 'btn-danger'} mx-1`}
                              onClick={() => handlePositionChange(index, leg.position === 'BUY' ? 'SELL' : 'BUY')}
                            >
                              {leg.position}
                            </button>
                            <button
                              className={`btn btn-sm ${leg.optionType === 'CE' ? 'btn-warning' : 'btn-info'} mx-1`}
                              onClick={() => handleOptionTypeChange(index, leg.optionType === 'CE' ? 'PE' : 'CE')}
                            >
                              {leg.optionType}
                            </button>
                          </FormGroup>

                        </FormGroup>
                    </div>   

                     <div className='w-25 px-2'>
                    <FormGroup className='mb-3'>
                          
                           <FormSelect size='sm' value={leg.strikeCriteria} onChange={(e)=>handleStrikeCriterias(index,e.target.value)}>
                           <option value='ATM' >ATM</option>
                            <option value='Closest Premium'>Closest Premium</option>
                            <option value='strike'>Strike Price</option>

                           </FormSelect>
                          </FormGroup>

                          <FormGroup className='mb-3'>
                            { leg.strikeCriteria==='Closest Premium' &&(
                                <FormControl size='sm' value={leg.strikeCriteriaInput} type='number' onChange={(e)=>handleStrikeCriteriaInputs(index,e.target.value)}></FormControl>

                            )}

                            {leg.strikeCriteria==='ATM' && (
                                 <FormSelect size='sm' value={leg.strikeCriteriaInput} onChange={(e)=>handleStrikeCriteriaInputs(index,e.target.value)}>
                                 <option value="ATM-2000">ATM-2000(OTM-20)</option><option value="ATM-1900">ATM-1900(OTM-19)</option><option value="ATM-1800">ATM-1800(OTM-18)</option><option value="ATM-1700">ATM-1700(OTM-17)</option><option value="ATM-1600">ATM-1600(OTM-16)</option><option value="ATM-1500">ATM-1500(OTM-15)</option><option value="ATM-1400">ATM-1400(OTM-14)</option><option value="ATM-1300">ATM-1300(OTM-13)</option><option value="ATM-1200">ATM-1200(OTM-12)</option><option value="ATM-1100">ATM-1100(OTM-11)</option><option value="ATM-1000">ATM-1000(OTM-10)</option><option value="ATM-900">ATM-900(OTM-9)</option><option value="ATM-800">ATM-800(OTM-8)</option><option value="ATM-700">ATM-700(OTM-7)</option><option value="ATM-600">ATM-600(OTM-6)</option><option value="ATM-500">ATM-500(OTM-5)</option><option value="ATM-400">ATM-400(OTM-4)</option><option value="ATM-300">ATM-300(OTM-3)</option><option value="ATM-200">ATM-200(OTM-2)</option><option value="ATM-100">ATM-100(OTM-1)</option><option value="ATM">ATM</option><option value="ATM+100">ATM+100(ITM1)</option><option value="ATM+200">ATM+200(ITM2)</option><option value="ATM+300">ATM+300(ITM3)</option><option value="ATM+400">ATM+400(ITM4)</option><option value="ATM+500">ATM+500(ITM5)</option><option value="ATM+600">ATM+600(ITM6)</option><option value="ATM+700">ATM+700(ITM7)</option><option value="ATM+800">ATM+800(ITM8)</option><option value="ATM+900">ATM+900(ITM9)</option><option value="ATM+1000">ATM+1000(ITM10)</option><option value="ATM+1100">ATM+1100(ITM11)</option><option value="ATM+1200">ATM+1200(ITM12)</option><option value="ATM+1300">ATM+1300(ITM13)</option><option value="ATM+1400">ATM+1400(ITM14)</option><option value="ATM+1500">ATM+1500(ITM15)</option><option value="ATM+1600">ATM+1600(ITM16)</option><option value="ATM+1700">ATM+1700(ITM17)</option><option value="ATM+1800">ATM+1800(ITM18)</option><option value="ATM+1900">ATM+1900(ITM19)</option><option value="ATM+2000">ATM+2000(ITM20)</option>
                                  
                                 </FormSelect>

                            )}


                            {leg.strikeCriteria==='strike' &&(
                              <FormControl type='number' size='sm' value={leg.strikeCriteriaInput} onChange={(e)=>handleStrikeCriteriaInputs(index,e.target.value)}></FormControl>
                            )}
                            
                           
                           </FormGroup>
                    </div>     

                    <div className='w-25 px-2'>
                        <FormGroup className='mb-3'>
                           
                            <FormControl size='sm' type='number' value={leg.lot} onChange={(e)=> handleLotSize(index,e.target.value)}></FormControl>
                          </FormGroup>

                        <FormGroup className='mb-3'>
                           
                            <FormSelect size='sm'>
                                <option>Position Sizing</option>
                                <option>None</option>
                                <option>10% of Capital</option>
                                <option>20% of Capital</option>
                                <option>50% of Capital</option>
                                <option>100% of Capital</option>
                            </FormSelect>
                        </FormGroup>
                    </div>



                   
                </div>



                    <div className='d-flex  w-75 ps-3 ms-5' >
                   

                

                    
                <div className='d-flex w-25 ms-3 px-2'>
                    <FormGroup className='mt-4'>
                        <FormCheck onChange={()=>handleCheckboxChange(index, 'targetVisible')} checked={leg.targetVisible}></FormCheck>
                        <FormLabel>Traget</FormLabel>
                    </FormGroup>
                    
                    {leg.targetVisible && (
        <div> 
          <FormGroup className="mb-3 px-2">
         
            <FormSelect size='sm' onChange={(e)=> handleTargetType(index,e.target.value)} value={leg.targetType}>
              <option>TP %</option>
              <option>TP Pts</option>
              <option>TP Spot %</option>
              <option>TP Spot Pts</option>
            </FormSelect>
          </FormGroup>

          <FormGroup className="mb-3  px-2">    
            <FormControl size='sm' type="number" onChange={(e)=>handleTargetValue(index,e.target.value)} value={leg.targetValue}/>
          </FormGroup>
        </div>
      )}

                </div>

                <div className='d-flex w-25 px-2'>
                    <FormGroup className='mt-4'>
                        <FormCheck onChange={()=>handleCheckboxChange(index, 'stoplossVisible')} checked={leg.stoplossVisible}></FormCheck>
                        <FormLabel>Stop Loss</FormLabel>
                    </FormGroup>
                    
                    {leg.stoplossVisible && (
        <div> 
          <FormGroup className="mb-3  px-2">
           
            <FormSelect size='sm' onChange={(e)=> handleSlType(index,e.target.value)} value={leg.slType}>
              <option>SL %</option>
              <option>SL Pts</option>
              <option>SL Spot %</option>
              <option>SL Spot Pts</option>
            </FormSelect>
          </FormGroup>

          <FormGroup className="mb-3 px-2">
        
            <FormControl size='sm' type="number" onChange={(e)=>handleSlValue(index,e.target.value)} value={leg.slValue}/>
          </FormGroup>
        </div>
      )}

                </div>


              


                <div className='d-flex w-25  px-2'>
                    <FormGroup className=' mt-4'>
                        <FormCheck onChange={()=>handleCheckboxChange(index,'trailing')} checked={leg.trailing}></FormCheck>
                        <FormLabel>Trailing SL</FormLabel>
                    </FormGroup>
                    
                    {leg.trailing && (
                        <div > 
                        <FormGroup className="mb-3  px-2">
                          
                            <FormSelect size='sm' onChange={(e)=> handleTrailingType(index,e.target.value)} value={leg.trailingType}>
                            <option>TP %</option>
                            <option>TP Pts</option>
                            <option>TP Spot %</option>
                            <option>TP Spot Pts</option>
                            </FormSelect>
                        </FormGroup>

                        <FormGroup className="mb-3  px-2">
                           
                            <FormControl size='sm' type="number" onChange={(e)=>handleTrailingValue(index,e.target.value)} value={leg.trailingValue}/>
                        </FormGroup>
                        </div>
                    )}

            </div>

            <div className='d-flex w-25 px-2'>
                    <FormGroup className=' mt-4'>
                        <FormCheck onChange={()=>handleCheckboxChange(index,'wait')} checked={leg.wait}></FormCheck>
                        <FormLabel>Wait and Trade</FormLabel>
                    </FormGroup>
                    
                    {leg.wait && (
        <div > 
          <FormGroup className="mb-3  px-2">
          
            <FormSelect size='sm' onChange={(e)=> handleWaitType(index,e.target.value)} value={leg.waitType} >
            <option value="i_per_a">% ↑</option><option value="i_per_b">% ↓</option><option value="i_pts_a">Pts ↑</option><option value="i_pts_b">Pts ↓</option><option value="u_per_a">Spot % ↑</option><option value="u_per_b">Spot % ↓</option><option value="u_pts_a">Spot  Pts ↑</option><option value="u_pts_b">Spot  Pts ↓</option>
            </FormSelect>
          </FormGroup>

          <FormGroup className="mb-3  px-2">
          
            <FormControl size='sm' type="number" onChange={(e)=>handleWaitValue(index,e.target.value)} value={leg.waitValue}/>
          </FormGroup>
        </div>
      )}

                </div>



            <div className='d-flex w-25 px-2'>
                    <FormGroup className=' mt-4'>
                        <FormCheck onChange={()=>handleCheckboxChange(index,'reEntry')} checked={leg.reEntry}></FormCheck>
                        <FormLabel>Re-entry</FormLabel>
                    </FormGroup>
                    
                    {leg.reEntry && (
        <div > 
          <FormGroup className="mb-3  px-2">
           
            <FormSelect size='sm' onChange={(e)=> handleReEntryType(index,e.target.value)} value={leg.reEntryType}>
              <option>TP %</option>
              <option>TP Pts</option>
              <option>TP Spot %</option>
              <option>TP Spot Pts</option>
            </FormSelect>
          </FormGroup>

          <FormGroup className="mb-3  px-2">
           
            <FormControl size='sm' type="number" onChange={(e)=>handleReEntryValue(index,e.target.value)} value={leg.reEntryValue}/>
          </FormGroup>
        </div>
      )}

                </div>


                <div className='d-flex px-2 w-25'>
                    <FormGroup className='mt-4'>
                        <FormCheck onChange={()=>handleCheckboxChange(index,'pyramid')} checked={leg.pyramid}></FormCheck>
                        <FormLabel>Pyramid</FormLabel>
                    </FormGroup>
                    
                    {leg.pyramid && (
        <div > 
          <FormGroup className="mb-3 px-2">
            
          <FormControl type='number' size='sm'></FormControl>
          </FormGroup>

          <FormGroup className="mb-3  px-2">
            
            <FormControl size='sm' type="number" />
          </FormGroup>
        </div>
      )}

                </div>

                        </div>
                            
                            <div>
                            <MdDeleteOutline onClick={()=>deleteLeg(index)} size={30}/>
                            </div>
          </div>
        ))}

        <div className='d-flex justify-content-between'>

            <div className='w-50'>
            <div className='d-flex justify-content-between w-100'>

                <div className='w-100 mt-3 m-1'>
                <h4>Overall MTM</h4>
                <div className='w-100 justify-content-between mr-5 bg-light p-2 h-100'>
                <div className='mb-5'>
                <FormGroup className='d-flex justify-content-between mb-2'>
                    <FormLabel>Stop Loss</FormLabel>
                    <FormSelect style={{width:'110px'}} className='h-50' onChange={(e)=>setOverallSlType(e.target.value)} value={overallSlType}>
                    <option>None</option>
                    <option>MTM</option>
                    <option>Premium %</option>
                    </FormSelect>

                    <FormControl className='w-25' type='number' onChange={(e)=>setOverallSl(e.target.value)} value={overallSl}></FormControl>
                </FormGroup>

                <FormGroup className='d-flex  align-items-center'>
                    <FormCheck></FormCheck>
                    <FormLabel className='m-0'>SL Re-entry</FormLabel>
                </FormGroup>
                
                </div>

                <div >
                <FormGroup className='d-flex w-100 justify-content-between' >
                    <FormLabel>Overall Target</FormLabel>
                    <FormSelect style={{width:'110px'}} className='h-50' onChange={(e)=>setOverallTargetType(e.target.value)} value={overallTargetType}>
                    <option>None</option>
                    <option>MTM</option>
                    <option>Premium %</option>
                    </FormSelect>
                    <FormControl className='w-25' type='number' onChange={(e)=>setOverallTarget(e.target.value)} value={overallTarget}></FormControl>
                </FormGroup>

                <FormGroup className='d-flex align-items-center'>
                    <FormCheck></FormCheck>
                    <FormLabel className='m-0'>Target Re-entry</FormLabel>
                </FormGroup>
                
                </div>
                </div>
                </div>

                {/* <div className='w-25'>
                <h4>Profit Management</h4>
                    <FormGroup className='d-flex'>
                    <FormCheck></FormCheck>
                    <FormSelect className='w-50 h-50'>
                        <option>Lock Profit</option>
                        <option>Lock and trail</option>
                        <option>Trail Profit</option>
                    </FormSelect>
                    </FormGroup>
                    </div> */}



                </div>



            </div>
            <div className='w-100 mt-3 mx-2'>
                    <h4>Advanced Features</h4>
                    <div className='bg-light'>


                      <div className='mb-3'>
                        <FormGroup>
                          <FormSelect onChange={handleAdvancedFeat} className='w-50'>
                            <option value='LockProfit' >Lock Profit</option>
                            <option value='LockAndTrail'>Lock And Trail</option>
                            <option value='TrailProfit'>Trail Profit</option>
                          </FormSelect>
                        </FormGroup>
                      </div>

                      {advancedFeat==='LockProfit' && (
                           <div className='d-flex justify-content-between'> 
                           <FormGroup className="mb-3 w-50 px-2">
                               <FormLabel>If Profit Reaches</FormLabel>
                               {/* <FormSelect>
                               <option>TP %</option>
                               <option>TP Pts</option>
                               <option>TP Spot %</option>
                               <option>TP Spot Pts</option>
                               </FormSelect> */}
                               <FormControl type='number'></FormControl>
                           </FormGroup>
   
                           <FormGroup className="mb-3 w-50 px-2">
                               <FormLabel>Lock Profit At</FormLabel>
                               <FormControl type="number" />
                           </FormGroup>
                           </div>

                      )}


                      {advancedFeat==='LockAndTrail' && (
                          <div className='d-flex justify-content-between'> 
                          <FormGroup className="mb-3 w-50 px-2">
                            <FormLabel>If Profit reaches</FormLabel>
                           <FormControl type='number'></FormControl>
                          </FormGroup>
                
                          <FormGroup className="mb-3 w-50 px-2">
                            <FormLabel>Lock Profit At</FormLabel>
                            <FormControl type="number" />
                          </FormGroup>
                
                          <FormGroup className="mb-3 w-50 px-2">
                            <FormLabel>For every increase in profit by</FormLabel>
                            <FormControl type="number" />
                          </FormGroup>
                
                          <FormGroup className="mb-3 w-50 px-2">
                            <FormLabel>Trail minimum profit by</FormLabel>
                            <FormControl type="number" />
                          </FormGroup>
                        </div>

                      )}


                        {advancedFeat==='TrailProfit' &&(
                            <div className='d-flex justify-content-between'> 
                            <FormGroup className="mb-3 w-50 px-2">
                                <FormLabel>For every increase in profit by</FormLabel>
                              
                                <FormControl type='number'></FormControl>
                            </FormGroup>
    
                            <FormGroup className="mb-3 w-50 px-2">
                                <FormLabel>Trail minimum profit by</FormLabel>
                                <FormControl type="number" />
                            </FormGroup>
                            </div>
                        )}

                <div className='d-flex justify-content-between mb-3' style={{height:'80px'}}>
            {/* <div className='d-flex w-50 justify-content-between px-2'>
                    <FormGroup className='w-25'>
                        <FormCheck onChange={()=>handleCheckboxChange(1,'trailing')} ></FormCheck>
                        <FormLabel>Trailing SL</FormLabel>
                    </FormGroup>
                    
                    {showInputsTrailing && (
                        <div className='d-flex justify-content-between' > 
                        <FormGroup className="mb-3 w-50 px-2">
                            <FormLabel>Select Option</FormLabel>
                            <FormSelect>
                            <option>TP %</option>
                            <option>TP Pts</option>
                            <option>TP Spot %</option>
                            <option>TP Spot Pts</option>
                            </FormSelect>
                        </FormGroup>

                        <FormGroup className="mb-3 w-50 px-2">
                            <FormLabel>Number Input</FormLabel>
                            <FormControl type="number" />
                        </FormGroup>
                        </div>
                    )}

            </div> */}

                {/* <div className='d-flex  w-50 justify-content-between px-2'>
                    <FormGroup className='w-25'>
                        <FormCheck onChange={()=>handleCheckboxChange(1,'protect')} ></FormCheck>
                        <FormLabel>Protect Profit</FormLabel>
                    </FormGroup>
                    
                                    {showInputsProtect && (
                        <div className='d-flex justify-content-between'> 
                        <FormGroup className="mb-3 w-50 px-2">
                            <FormLabel>If Profit Reaches</FormLabel>
                           
                            <FormControl type='number'></FormControl>
                        </FormGroup>

                        <FormGroup className="mb-3 w-50 px-2">
                            <FormLabel>Lock Profit At</FormLabel>
                            <FormControl type="number" />
                        </FormGroup>
                        </div>
                    )}

                </div> */}


                {/* <div className='d-flex  w-50 justify-content-between px-2'>
                    <FormGroup className='w-25'>
                        <FormCheck onChange={()=>handleCheckboxChange(1,'trailProfit')} ></FormCheck>
                        <FormLabel>Trail Profit</FormLabel>
                    </FormGroup>
                    
                                    {showInputsTrailProfit && (
                        <div className='d-flex justify-content-between'> 
                        <FormGroup className="mb-3 w-50 px-2">
                            <FormLabel>For every increase in profit by</FormLabel>
                          
                            <FormControl type='number'></FormControl>
                        </FormGroup>

                        <FormGroup className="mb-3 w-50 px-2">
                            <FormLabel>Trail minimum profit by</FormLabel>
                            <FormControl type="number" />
                        </FormGroup>
                        </div>
                    )}

                </div> */}
                
                


                </div>



                {/* <div className='d-flex justify-content-between mb-3' style={{height:'80px'}}>
            <div className='d-flex w-50 px-2'>
                    <FormGroup className='w-25'>
                        <FormCheck onChange={()=>handleCheckboxChange(1,'wait')} ></FormCheck>
                        <FormLabel>Wait and Trade</FormLabel>
                    </FormGroup>
                    
                    {showInputsWait && (
        <div className='d-flex justify-content-between'> 
          <FormGroup className="mb-3 w-50 px-2">
            <FormLabel>Select Option</FormLabel>
            <FormSelect>
              <option>TP %</option>
              <option>TP Pts</option>
              <option>TP Spot %</option>
              <option>TP Spot Pts</option>
            </FormSelect>
          </FormGroup>

          <FormGroup className="mb-3 w-50 px-2">
            <FormLabel>Number Input</FormLabel>
            <FormControl type="number" />
          </FormGroup>
        </div>
      )}

                </div>

                <div className='d-flex w-50 px-2'>
                    <FormGroup className='w-25'>
                        <FormCheck onChange={()=>handleCheckboxChange(1,'re-entry')} ></FormCheck>
                        <FormLabel>Re-entry</FormLabel>
                    </FormGroup>
                    
                    {showInputsRe && (
        <div className='d-flex justify-content-between'> 
          <FormGroup className="mb-3 w-50 px-2">
            <FormLabel>Select Option</FormLabel>
            <FormSelect>
              <option>TP %</option>
              <option>TP Pts</option>
              <option>TP Spot %</option>
              <option>TP Spot Pts</option>
            </FormSelect>
          </FormGroup>

          <FormGroup className="mb-3 w-50 px-2">
            <FormLabel>Number Input</FormLabel>
            <FormControl type="number" />
          </FormGroup>
        </div>
      )}

                </div>
                </div> */}

                {/* <div className='d-flex justify-content-between mb-3' style={{height:'80px'}}>
                <div className='d-flex  px-2'>
                    <FormGroup >
                        <FormCheck onChange={()=>handleCheckboxChange(1,'lockAndTrail')} ></FormCheck>
                        <FormLabel>Lock and Trail</FormLabel>
                    </FormGroup>
                    
                    {showInputsLockAndTrail && (
        <div className='d-flex justify-content-between'> 
          <FormGroup className="mb-3 w-50 px-2">
            <FormLabel>If Profit reaches</FormLabel>
           <FormControl type='number'></FormControl>
          </FormGroup>

          <FormGroup className="mb-3 w-50 px-2">
            <FormLabel>Lock Profit At</FormLabel>
            <FormControl type="number" />
          </FormGroup>

          <FormGroup className="mb-3 w-50 px-2">
            <FormLabel>For every increase in profit by</FormLabel>
            <FormControl type="number" />
          </FormGroup>

          <FormGroup className="mb-3 w-50 px-2">
            <FormLabel>Trail minimum profit by</FormLabel>
            <FormControl type="number" />
          </FormGroup>
        </div>
      )}

                </div>

                </div> */}


                <div className='d-flex justify-content-between mb-3' style={{height:'80px'}}>
            {/* <div className='d-flex w-50 px-2'>
                    <FormGroup className='w-25'>
                        <FormCheck onChange={()=>handleCheckboxChange(1,'timer')} ></FormCheck>
                        <FormLabel>Timer</FormLabel>
                    </FormGroup>
                    
                    {showInputsTimer && (
        <div className='d-flex'> 
          <FormGroup className="mb-3 w-50 px-2">
            <FormLabel>Select Option</FormLabel>
            <FormSelect>
              <option>TP %</option>
              <option>TP Pts</option>
              <option>TP Spot %</option>
              <option>TP Spot Pts</option>
            </FormSelect>
          </FormGroup>

          <FormGroup className="mb-3 w-50 px-2">
            <FormLabel>Number Input</FormLabel>
            <FormControl type="number" />
          </FormGroup>
        </div>
      )}

                </div> */}

               
                </div>

                </div>

            </div>



            <div className='w-50 mt-3'>
                        
                <h4>Execution Days</h4>

            <div className=" bg-light">
      {Object.keys(selectedDays).map((day) => (
        <Button       
          key={day}
          variant={selectedDays[day] ? 'primary' : 'outline-primary'}
          className="m-1"
          onClick={() => toggleDay(day)}
        >
          {day}
        </Button>
      ))}

        <div className='mt-3'>
      <button className='btn btn-outline-danger'>Exclude RBI Days </button>
     
      </div>
    </div>



            </div>

           
        </div>


        <div className='d-flex justify-content-center mt-3 bg-light mb-3'>
            <button className='btn btn-secondary' onClick={handleSave}>save</button>
        </div>

        </div>

) : (

      <div>
        <div  className='mt-3 bg-light p-2'>
          <h4>Positions</h4>

          <FormGroup>
              {/* <FormSelect onChange={(e)=>setBackSymbol(e.target.value)}>

                {stockList.map(stock => {
                      return <option value={stock}>{stock}</option>;
                    })}
              </FormSelect> */}

              <div className="btn-group mb-3 mt-2" role="group">
                <input type="radio" className="btn-check" name="entryType" id="btnEntryType1" checked={entryType === 'buy'} onChange={() => setEntryType('buy')} />
                <label className="btn btn-outline-primary" htmlFor="btnEntryType1">BUY</label>

                <input type="radio" className="btn-check" name="entryType" id="btnEntryType2" checked={entryType === 'sell'} onChange={() => setEntryType('sell')} />
                <label className="btn btn-outline-primary" htmlFor="btnEntryType2">SELL</label>
              </div>    


              <div className='d-flex justify-content-between'>

                <FormGroup className='w-25'>
                  <FormLabel>Type of Instruments</FormLabel>
                  <FormSelect onChange={(e)=>setInstrumentType(e.target.value)}>
                    <option value='equity'>Equity</option>
                    <option value='indices'>Indices</option>
                  </FormSelect>

                </FormGroup>

              

                
              <FormGroup className='w-75'>
              <FormLabel>Instruments</FormLabel>
              <Select
                isMulti
                onChange={(selectedOptions) => setBackSymbol(selectedOptions.map(option => option.value))}
                options={ instrumentType === 'equity'? stockList.map(stock => ({ value: stock, label: stock })): optionList.map(stock => ({ value: stock, label: stock }))}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select Symbols"
            />
              </FormGroup>

            </div>

            </FormGroup>

            <FormGroup>
              <FormLabel>Quantity</FormLabel>
              <FormControl type='number' onChange={(e)=>setBackQuantity(Number(e.target.value))} readOnly={positionSizeType?true:false}></FormControl>
            </FormGroup>


            <div className='d-flex mt-3 align-item-center justify-content-between'>
              <FormLabel>Graph</FormLabel>

              <FormSelect onChange={(e)=>setGraphType(e.target.value)} className='w-25'>
                <option value='candle'>Candle Stick</option>
                <option value='heikin-ashi'>Heikin-Ashi</option>
              </FormSelect>

              <FormSelect onChange={(e)=>setTimePeriod(e.target.value)} className='w-25'>
                <option value='minute'>1 Min</option>
                {/* <option value=''>3 Min</option> */}
                <option value='5minute'>5 Min</option>
                <option value='10min'>10 Min</option>
                <option value='15min'>15 Min</option>
                <option value='30min'>30 Min</option>
                <option value='hourly'>1 Hour</option>
                <option value='daily'>1 Day</option>
              </FormSelect>

              <FormSelect className='w-25'>
                <option>MIS</option>
                <option>CNC/NRML</option>
              </FormSelect>


            
            </div>

            {showMore1 && (
                     <div className='d-flex justify-content-between'>
   
                      <FormGroup>
                        <FormLabel>{positionSizeType === 'capital'? 'Max Allocation' : 'Max Sl per trade' }</FormLabel>
                        <FormControl onChange={(e)=>setSizeAmount(Number(e.target.value))}></FormControl>
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Max Quantity</FormLabel>
                        <FormControl onChange={(e)=>setMaxQuantity(Number(e.target.value))}></FormControl>
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Position size type</FormLabel>
                        <FormSelect onChange={(e)=>setPositionSizeType(e.target.value)}>
                          <option value={''}>-</option>
                          <option value='capital'>Capital based</option>
                          <option value='risk'>Risk based</option>
                        </FormSelect>
                      </FormGroup>
                      
   
   
                     </div>
                     
                 ) 
   
                 }

            <a  className='mt-3 mb-3' href='#' onClick={()=> showMore1 ? setShowMore1(false) : setShowMore1(true)}>{showMore1 ? 'Hide Option' : 'Show Option'}</a>
                 
                 

        
        </div>




         <div className='mt-3 bg-light p-2'>

          <h4>Entry Condition</h4>
            <Strategy 
            indicatorDetails={indicatorDetails} 
            setIndicatorDetails={setIndicatorDetails}
            strategy  = {strategyDetails}
            setStrategy = {setStrategyDetails}
          />
          </div>



          <div  className='mt-3 bg-light p-2'>
            <h4>Exit Condition</h4>

            <FormGroup>
              <FormLabel>Stoploss</FormLabel>
              <FormControl onChange={(e)=>setPyStoploss(Number(e.target.value))}></FormControl>
            </FormGroup>

            <FormGroup>
              <FormLabel>Target</FormLabel>
              <FormControl onChange={(e)=>setPyTarget(Number(e.target.value))}></FormControl>
              
            </FormGroup>

            {showMore && (
              

                  <div>

                  <FormGroup className='d-flex justify-content-between'>
                    <div>
                    <FormLabel>If instrument move by</FormLabel>
                    <FormControl onChange={(e)=>setMoveInstrument(Number(e.target.value))}></FormControl>
                    </div>

                  

                    <div>
                    <FormLabel>Move SL By</FormLabel>
                    <FormControl onChange={(e)=> setMoveSl(Number(e.target.value))}></FormControl>
                    </div>

                    <div>
                    <FormLabel>TPSL Type</FormLabel>
                    <FormSelect onChange={(e)=>setTrailingType(e.target.value)}>
                      <option value='%'>Percentage(%)</option>
                      <option value='abs'>Absolute(abs)</option>
                      <option value='pts'>Points(pts)</option>    
                    </FormSelect>
                    </div>

                    {/* <div>
                      <FormControl onChange={(e)=>setTrailing(e.target.value)}></FormControl>
                    </div> */}

                   

                  </FormGroup>

                  <div>
                 
                <Strategy 
                indicatorDetails={indicatorDetailsExit} 
                setIndicatorDetails={setIndicatorDetailsExit}
                strategy  = {strategyDetailsExit}
                setStrategy = {setStrategyDetailsExit}
              />
         

                    </div>


                  </div>
                  
              ) 

              }

            
              <a  className='my-3' href='#' onClick={()=> showMore ? setShowMore(false) : setShowMore(true)}>{showMore ? 'Hide Option' : 'Show Option'}</a>
                 
              
              
            

            </div>


            <div  className='mt-3 bg-light p-2'>
              <h4>Backtest Parameter</h4>

              <FormGroup>
              <FormLabel>Date</FormLabel>
              <FormGroup className='d-flex'>
              <FormControl type='date' onChange={(e)=>setStartDates(e.target.value)}></FormControl>
              <FormControl type='date' onChange={(e)=>setEndDates(e.target.value)}></FormControl>
              </FormGroup>
            </FormGroup>

           
            <FormGroup>
              <FormLabel>Initial Capital</FormLabel>
              <FormControl type='number' onChange={(e)=>setBackCapital(Number(e.target.value))}></FormControl>
            </FormGroup>


              </div>

        {/* <StrategyBuilder></StrategyBuilder>


        <div>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={groupedOptions}
        onChange={handleIndicatorChange}
        isMulti
      />
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Indicator Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input 
            type="text" 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)} 
            placeholder="Period" 
          />
          <input 
            type="text" 
            value={offset} 
            onChange={(e) => setOffset(e.target.value)} 
            placeholder="Offset" 
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Close</Button>
          <Button variant="primary" onClick={handleModalSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
     
    </div> */}


        {/* <div>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={groupedOptions}
        isMulti
        formatGroupLabel={formatGroupLabel} // Optional for custom group headings
      />
    </div> */}


        <div className='mt-1 mb-3'>

            <button onClick={handleStrategy} className='mt-4'>Start BackTest</button>

        </div>
        
                
         
   
        
        {/* {backtest && (
        <>
            <h3>Strategy Metrics</h3>
          <ul>
            <li className='border rounded mb-2 w-50 p-2'>Total Signals: {backtest.result_2["Total Signals"]}</li>
            <li className='border rounded mb-2 w-50 p-2'>Number of Wins: {backtest.result_2["Number of Wins"]}</li>
            <li className='border rounded mb-2 w-50 p-2'>Number of Losses: {backtest.result_2["Number of Losses"]}</li>
            <li className='border rounded mb-2 w-50 p-2'>Winning Streak: {backtest.result_2["Winning Streak"]}</li>
            <li className='border rounded mb-2 w-50 p-2'>Losing Streak: {backtest.result_2["Losing Streak"]}</li>
            <li className='border rounded mb-2 w-50 p-2'>Max Gains: {backtest.result_2["Max Gains"].toFixed(2)}</li>
            <li className='border rounded mb-2 w-50 p-2'>Max Loss: {backtest.result_2["Max Loss"].toFixed(2)}</li>
            <li className='border rounded mb-2 w-50 p-2'>Avg Gain per Winning Trade: {backtest.result_2["Avg Gain per Winning Trade"].toFixed(2)}</li> 
            <li className='border rounded mb-2 w-50 p-2'>Avg Loss per Losing Trade: {backtest.result_2["Avg Loss per Losing Trade"].toFixed(2)}</li>
            <li className='border rounded mb-2 w-50 p-2'>Max Drawdown: {backtest.result_2["Max Drawdown"]}</li>
            <li className='border rounded mb-2 w-50 p-2'>Max Drawdown Days: {backtest.result_2['Max Drawdown Days']}</li>
            <li className='border rounded mb-2 w-50 p-2'>Win Rate (%): {backtest.result_2["Win Rate (%)"].toFixed(2)}</li>
            <li className='border rounded mb-2 w-50 p-2'>Loss Rate (%): {backtest.result_2["Loss Rate (%)"].toFixed(2)}</li>
            <li className='border rounded mb-2 w-50 p-2'>Profit Factor: {backtest.result_2["Profit Factor"].toFixed(2)}</li>
            <li className='border rounded mb-2 w-50 p-2'>Total PnL: {backtest.result_2["Total PnL"].toFixed(2)}</li>
            <li className='border rounded mb-2 w-50 p-2'>Total Brokerage: {backtest.result_2['Total Brokerage']}</li>
            <li className='border rounded mb-2 w-50 p-2'>Net Pnl After Brokerage: {backtest.result_2['Net PnL After Brokerage'].toFixed(2)}</li>
            <li className='border rounded mb-2 w-50 p-2'>Final Funds: {backtest.result_2["Remaining Funds"]}</li>
            <li className='border rounded mb-2 w-50 p-2'>Expectency: {backtest.result_2['Expectancy'].toFixed(2)}</li>
          </ul>

          
          <div>
      <h3>Trade Details</h3>
      <table className='w-100'>
        <thead>
          <tr>
            <th>Time</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>PnL</th>
            <th>Action</th>
            <th>Qunatity</th>
            <th>Trigger</th>
           
            
          </tr>
        </thead>
        <tbody>
          {backtest.result_2.trades.map((trade, index) => (
            <tr key={index}>
              <td>{formatDate(trade.date)}</td>
              <td>{trade.symbol}</td>
              <td>{trade.price.toFixed(2)}</td>
              <td>{trade.pnl ? `₹${trade.pnl.toFixed(2)}` : '-'}</td>
              <td>{trade.action}</td>
              <td>{trade.quantity}</td>
              <td>{trade.trigger}</td>             
             
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        
          <img src={imageSrc} alt="Strategy Performance Graph" />
        </>
      )}   */}

      {loading ? (
                <div className='d-flex justify-content-center'><ProgressBar
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                /></div>  // Display this when data is being fetched
            ) : backtest ? (
    
        <>

        <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Instrument</th>
                        <th>Profit Factor</th>
                        <th>P&amp;L</th>
                        <th>W | L</th>
                        <th>Trades</th>
                        <th>WS</th>
                        <th>LS</th>
                        <th>Max DD</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                          <td>Summary</td>
                          <td>{summary.profitFactor}</td>
                          <td>₹{summary.totalPnL}</td>
                          <td>{summary.totalWins} | {summary.totalLosses}</td>
                          <td>{summary.totalSignals}</td>
                          <td>{summary.avgWinStreak}</td>
                          <td>{summary.avgLoseStreak}</td>
                          <td>-{summary.maxDrawdown}</td>
                        </tr>
                    {backtest.map((result, index) => (
                        <React.Fragment key={index}>
                            <tr onClick={() => toggleRow(index)} style={{ cursor: 'pointer' }}>
                                <td>{result.symbol}</td>
                                <td>{result.result['Profit Factor'].toFixed(2)}</td>
                                <td style={{ color: result.result["Total PnL"] >= 0 ? 'green' : 'red' }}>
                                  ₹{result.result["Total PnL"].toFixed(2)}
                                </td>
                                <td>{result.result["Number of Wins"]} | {result.result["Number of Losses"]}</td>
                                <td>{result.result["Total Signals"]}</td>
                                <td>{result.result["Winning Streak"]}</td>
                                <td>{result.result["Losing Streak"]}</td>
                                <td>-{result.result["Max Drawdown"].toFixed(2)}</td>
                            </tr>
                            {expandedRow === index && result.result && result.result.trades && (
                                <tr>
                                    <td colSpan="8">
                                         <div>

                                          <div>
                                            <img src={`data:image/png;base64,${result.funds_graph}`} alt={`${result.symbol} Strategy Graph 1`} />

                                          

                                          <div>
                                              <ul className='d-flex flex-wrap' style={{ listStyleType: 'none', padding: 0 }}>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Total Signals:</b> {result.result["Total Signals"]}
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Number of Wins:</b> {result.result["Number of Wins"]}
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Number of Losses:</b> {result.result["Number of Losses"]}
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Avg Gain per Winning Trade:</b> ₹ {result.result["Avg Gain per Winning Trade"].toFixed(2)}
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Avg Loss per Losing Trade:</b> ₹ -{result.result["Avg Loss per Losing Trade"].toFixed(2)}
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Win Rate (%):</b> {result.result["Win Rate (%)"].toFixed(2)}%
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Loss Rate (%):</b> {result.result["Loss Rate (%)"].toFixed(2)}%
                                                </li>
                                                {/* <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Profit Factor:</b> {result.result["Profit Factor"].toFixed(2)}
                                                </li> */}
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Total PnL:</b> ₹{result.result["Total PnL"].toFixed(2)}
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Total Brokerage:</b> ₹{result.result["Total Brokerage"].toFixed(2)}
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Net PnL After Brokerage:</b> ₹{result.result["Net PnL After Brokerage"].toFixed(2)}
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Total Invested Fund:</b> ₹{(result.result["investedFund"]/result.result["Total Signals"]).toFixed(2)}
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Expectancy:</b> {result.result["Expectancy"].toFixed(2)}
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Max Gains:</b> ₹{result.result["Max Gains"].toFixed(2)}
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Max Loss:</b> ₹{result.result["Max Loss"].toFixed(2)}
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Max Drawdown:</b> {result.result["Max Drawdown"].toFixed(2)}
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Max Drawdown Days:</b> {result.result["Max Drawdown Days"]}
                                                </li>

                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Target Reached:</b> {result.result["targetCount"]}
                                                </li>

                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Stoploss Hit:</b> {result.result["slCount"]}
                                                </li>

                                                 <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>TSL Hit:</b> {result.result["tslCount"]}
                                                </li>

                                                {strategyDetailsExit.conditions.length > 0 && (
                                                   <li className='border rounded mb-2 w-25 p-2'>
                                                   <b>Sell Signal:</b> {result.result["sellSignalCount"]}
                                                 </li>
                                                )}                              

                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>ROI:</b> {((result.result['Total PnL']/(result.result["investedFund"]/result.result["Total Signals"]))*100).toFixed(2)}
                                                </li>

                                              </ul>
                                            </div>


                                            <div>

                               

                                            `{monthlyData.map((data, outerIndex) => {
                                                if (outerIndex === index) {
                                                    return (
                                                        <div key={outerIndex}>
                                                            <h2>{data.symbol}</h2>
                                                            <table className='w-100'>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Year</th>
                                                                        {data.monthly_pnl.columns.map((month, idx) => (
                                                                            <th key={idx}>{month}</th>
                                                                        ))}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {data.monthly_pnl.index.map((year, yearIndex) => (
                                                                        <tr
                                                                            key={yearIndex}
                                                                            style={{
                                                                                backgroundColor: yearIndex === data.monthly_pnl.index.length - 1 ? 'lightgrey' : 'transparent',
                                                                                fontWeight: yearIndex === data.monthly_pnl.index.length - 1 ? 'bold' : 'normal',
                                                                            }}
                                                                        >
                                                                            <td>{year}</td>
                                                                            {data.monthly_pnl.data[yearIndex].map((pnlValue, valueIndex) => (
                                                                                <td
                                                                                    style={{
                                                                                        color: pnlValue > 0 ? 'green' : pnlValue < 0 ? 'red' : 'black'
                                                                                    }}
                                                                                    key={valueIndex}
                                                                                >
                                                                                    {pnlValue}
                                                                                </td>
                                                                            ))}
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    );
                                                }
                                                return null; // Render nothing for other indices
                                            })}`


                                                
                                            </div>

                                          </div> 
                                           
                                            <img src={`data:image/png;base64,${result.trade_graph}`} alt={`${result.symbol} Strategy Graph 2`} />
                                        </div>
                                        <select value={selectedSentiment} onChange={handleSentimentChange}>
                                                <option value="All">All</option>
                                                <option value="bullish">Bullish</option>
                                                <option value="bearish">Bearish</option>
                                                <option value="sideways">Sideways</option>
                                        </select>

                                        <table className='w-100'>
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Sentiment</th>
                                                    <th>Symbol</th>
                                                    <th>Price</th>
                                                    <th>Stoploss</th>
                                                    <th>Trailing Sl</th>
                                                    <th>Target</th>
                                                    <th>PnL</th>
                                                    <th>Action</th>
                                                    <th>Quantity</th>
                                                    <th>Trigger</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredTrades.map((trade, idx) => (
                                                    <tr key={idx}>
                                                        <td>{formatDate(trade.date)}</td>
                                                        <td>{trade.day_type}</td>
                                                        <td>{trade.symbol}</td>
                                                        <td>{trade.price.toFixed(2)}</td>
                                                        <td>{trade.stopLossprice!= undefined ? trade.stopLossprice.toFixed(2):0}</td>
                                                        <td>{trade.trailingSl!= undefined ? trade.trailingSl.toFixed(2):0}</td>
                                                        <td>{trade.targetPrice.toFixed(2)}</td>
                                                        <td style={{ color: trade.pnl >= 0 ? 'green' : 'red' }}>
                                                         {trade.pnl ? trade.pnl.toFixed(2) : ''} ₹
                                                        </td>
                                                        <td style={{ color: trade.action === 'Buy' ? '#6495ED' : '#E74C3C ' }}>
                                                        {trade.action}
                                                      </td>
                                                        <td>{trade.quantity}</td>
                                                        <td>{trade.trigger}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

        </>
      )  
      : (
        <div>No data available</div>
    )}                       


    </div>
     )}
    </div>
  )
}

export default Trading