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
import BootstrapPagination from '../overview/BootstrapPagination';
import { CSVLink } from 'react-csv';
import { getYear, getMonth, format , getDate } from 'date-fns';
import { Table } from 'react-bootstrap';
import CummulativePnlGraph from '../Graph/CummulativePnlGraph';
import DailyPnlGraph from '../Graph/DailyPnlGraph';
import DrawdownGraph from '../Graph/DrawdownGraph';
import TradeGraph from '../Graph/TradeGraph';

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

    const [csvData,setCsvData] = useState()

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
    const [backtest,setBacktest] = useState([])
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

    const [strategyDetails2, setStrategyDetails2] = useState({
      conditions: [],
      logicalOperators: []
    });

    const [strategyDetailsExit, setStrategyDetailsExit] = useState({
      conditions: [],
      logicalOperators: []
    });

    const [strategyDetailsExit2, setStrategyDetailsExit2] = useState({
      conditions: [],
      logicalOperators: []
    });

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [listOrder,setListOrder] = useState(true)

    const [instrumentOrder,setInstrumentOrder] = useState()

    const [profitOrder,setProfitOrder] = useState()

    const [plOrder,setPlOrder] = useState()

    const [tradesOrder,setTradesOrder] = useState()



    const [tradeTypeFilter,setTradeTypeFilter] = useState('All')

    const [summary, setSummary] = useState({
      totalSignals: 0,
      profitFactor: 0,
      totalWins: 0,
      totalLosses: 0,
      maxDrawdown: 0
    });
  
  
  const [filteredTrades,setFilterdTrades] = useState()
  const [currentTrades,setCurrentTrades] = useState()

  const [maxLong,setMaxLong] = useState(1)
  const [maxShort,setMaxShort] = useState(1)

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

  const [selectedTrigger, setSelectedTrigger] = useState('All')

  const [selectVix ,setSelectVix] = useState('All')

  const [listPerPage,setListPerPage] = useState(20)

  const [selectedIndex,setSelectedIndex] = useState()

  const toggleRow = (index) => {
      setExpandedRow(expandedRow === index ? null : index);
      setSelectedSymbol(sortedBacktest[index].symbol)
      setSelectedIndex(index)
      setTradeTypeFilter('All')
      setSelectedGraph('trade')
      setSelectedSentiment('All')
      setSelectedTrigger('All')

  };

  const [tradingChargeShow,setTradingChargeShow] = useState(false)
  
  const handleTriggerChange = (event) => {
    setSelectedTrigger(event.target.value);
  };

  const handleVixChange = (e) =>{
    setSelectVix(e.target.value)
  }

  const [fromVix, setFromVix] = useState('1');
  const [toVix, setToVix] = useState('99');
  const [vixRange, setVixRange] = useState({ from: '1', to: '99' });

  const handleVixRange = (e) =>{
    e.preventDefault(); // Prevent the default form submission behavior
    setVixRange({ from: fromVix, to: toVix });
  }

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


      const [selectedDaysForIndi, setSelectedDaysForIndi] = useState({
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
      });  


      const [selectedDaysForFilter, setSelectedDaysForFilter] = useState({
        Mon: true,
        Tue: true,
        Wed: true,
        Thu: true,
        Fri: true,
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

      const toggleDayForIndi = (day) => {
        setSelectedDaysForIndi((prevDays) => ({
          ...prevDays,
          [day]: !prevDays[day],
        }));
      };

      const toggleDayForFilter = (day) => {
        setSelectedDaysForFilter((prevDays) => ({
          ...prevDays,
          [day]: !prevDays[day],
        }));
      };


      const toggleAllDays = (selectAll) => {
        const newSelectedDays = {};
        Object.keys(selectedDays).forEach((day) => {
          newSelectedDays[day] = selectAll;
        });
        setSelectedDaysForIndi(newSelectedDays);
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
        axios.post(`http://localhost:5000/backtest`,{slPct,targetPct,backSymbol,startDate,endDate,backCapital,backQuantity,strategyDetails,entryType,graphType,trailPct,sizeAmount,maxQuantity,strategyDetailsExit,positionSizeType,moveSlPct,moveInstrumentPct,timePeriod,marketType,strategyDetails2,strategyDetailsExit2,maxLong,maxShort,selectedDaysForIndi})
              .then((response)=>{
               
                const responseData = JSON.parse(response.data); // Manually parse the JSON string
                setBacktest(responseData)
              
                const parsedData = responseData.map(item => {
                  return {
                      ...item,
                      monthly_pnl: typeof item.monthly_pnl === 'string' ? JSON.parse(item.monthly_pnl) : item.monthly_pnl,
                      monthly_pnl_short: typeof item.monthly_pnl === 'string' ? JSON.parse(item.monthly_pnl_short) : item.monthly_pnl_short,
                      monthly_pnl_total: typeof item.monthly_pnl === 'string' ? JSON.parse(item.monthly_pnl_total) : item.monthly_pnl_total,
                      closePrices: typeof item.closePrices === 'string' ? JSON.parse(item.closePrices) : item.closePrices,
                  };

                 });
               
                setMonthlyData(parsedData)
                console.log(parsedData)
                setLoading(false)
                 
                setExpandedRow(null)
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


      const nifty50Companies = [
        "GRASIM", "HEROMOTOCO", "CIPLA", "POWERGRID", "NESTLEIND", "NTPC", "HDFCLIFE",
        "TATASTEEL", "AXISBANK", "APOLLOHOSP", "DIVISLAB", "TATAMOTORS", "ASIANPAINT",
        "SHRIRAMFIN", "DRREDDY", "BPCL", "EICHERMOT", "ADANIPORTS", "LT", "SBILIFE",
        "BRITANNIA", "SUNPHARMA", "JSWSTEEL", "RELIANCE", "BAJAJ-AUTO", "SBIN",
        "ICICIBANK", "ADANIENT", "BHARTIARTL", "COALINDIA", "ONGC", "INDUSINDBK",
        "BAJAJFINSV", "HINDUNILVR", "TATACONSUM", "HINDALCO", "MARUTI", "ITC",
        "KOTAKBANK", "TITAN", "HDFCBANK", "TCS", "HCLTECH", "M&M", "BAJFINANCE",
        "LTIM", "WIPRO", "INFY", "TECHM"
      ];


      const bankNiftySymbol =  [
        "BANKBARODA",
        "KOTAKBANK",
        "HDFCBANK",
        "PNB",
        "SBIN",
        "BANDHANBNK",
        "INDUSINDBK",
        "AXISBANK",
        "AUBANK",
        "ICICIBANK",
        "IDFCFIRSTB",
        "FEDERALBNK"
    ]


    const finNiftySymbol = [ 
        "HDFCAMC",
        "SHRIRAMFIN",
        "HDFCLIFE",
        "BAJFINANCE",
        "SBIN",
        "LICHSGFIN",
        "BAJAJFINSV",
        "AXISBANK",
        "IDFC",
        "HDFCBANK",
        "ICICIPRULI",
        "RECLTD",
        "ICICIBANK",
        "SBILIFE",
        "PFC",
        "SBICARD",
        "MUTHOOTFIN",
        "KOTAKBANK",
        "ICICIGI",
        "CHOLAFIN"
    ]

    const [maxDrawdown, setMaxDrawdown] = useState(0);
    const [maxDrawdownDays, setMaxDrawdownDays] = useState(0);
      
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
      

        const [marketType,setMarketType] = useState('mis')
    

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
              acc.profitFactor += curr.result["Profit Factor Total"]; 
              acc.totalSignalsShort += curr.result["Total Signals Short"];
              acc.totalPnLShort += curr.result["Total PnL Short"];
              acc.totalWinsShort += curr.result["Number of Wins Short"];
              acc.totalLossesShort += curr.result["Number of Losses Short"];
              acc.maxDrawdownShort += curr.result["Max Drawdown"];
              acc.winStreakSumShort += curr.result["Winning Streak Short"];  // Sum of all win streaks
              acc.loseStreakSumShort += curr.result["Losing Streak Short"]; // Sum of all lose streaks
              acc.netPnLAfterBrokerage += curr.result['Net PnL After Brokerage'] + curr.result['Net PnL After Brokerage Short']
              
              return acc;
            }, {
              totalSignals: 0,
              totalPnL: 0,
              totalWins: 0,
              totalLosses: 0,
              maxDrawdown: 0,
              winStreakSum: 0,
              loseStreakSum: 0,
              profitFactor:0,
              totalSignalsShort: 0,
              totalPnLShort: 0,
              totalWinsShort: 0,
              totalLossesShort: 0,
              maxDrawdownShort: 0,
              winStreakSumShort: 0,
              loseStreakSumShort: 0,
              profitFactorShort:0,
              netPnLAfterBrokerage:0
            });
        
            setSummary({
              totalSignals: calculatedSummary.totalSignals + calculatedSummary.totalSignalsShort,
              totalPnL: (calculatedSummary.totalPnL+calculatedSummary.totalPnLShort).toFixed(2),
              totalWins: calculatedSummary.totalWins + calculatedSummary.totalWinsShort,
              totalLosses: calculatedSummary.totalLosses + calculatedSummary.totalLossesShort,
              maxDrawdown: calculatedSummary.maxDrawdown.toFixed(2),
              avgWinStreak: ((calculatedSummary.winStreakSum + calculatedSummary.winStreakSumShort) /(backtest.length )).toFixed(1),  // Average win streak
              avgLoseStreak: ((calculatedSummary.loseStreakSum + calculatedSummary.loseStreakSumShort)/ (backtest.length )).toFixed(1), // Average lose streak
              profitFactor:((calculatedSummary.profitFactor)/backtest.length).toFixed(1),
              netPnLAfterBrokerage:calculatedSummary.netPnLAfterBrokerage
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
      //             .map(result => result.result.tradesShort)
      //             .flat()
      //             .filter(trade => selectedSentiment === 'All' || trade.day_type === selectedSentiment);
      //         setFilterdTrades(filteredTrade);
      //     }

      

      // }, [backtest, selectedSentiment]);

      

      // useEffect(() => {
      //   if (backtest && Array.isArray(backtest)) {
      //     const filteredTrade = backtest
      //       .filter(result => result.symbol === selectedSymbol)
      //       .map(result => [...result.result.trades, ...result.result.tradesShort]) 
      //       .flat()
      //       .filter(trade =>
      //         (selectedSentiment === 'All' || trade.day_type === selectedSentiment) &&
      //         (selectedTrigger === 'All' || trade.trigger === selectedTrigger)
      //       )
      //       .sort((a, b) => new Date(a.date) - new Date(b.date)); 
    
      //       setFilterdTrades(filteredTrade);
      //   }
      // }, [backtest, selectedSymbol, selectedSentiment, selectedTrigger]);


      const handleSelectChange = (selectedOptions) => {
        if (instrumentType === 'indices') {
          // Extract all selected symbol arrays into a single flat array
          const allSymbols = selectedOptions.map(option => option.value).flat();
          // Create a Set to remove duplicates and convert back to an array
          const uniqueSymbols = [...new Set(allSymbols)];
          setBackSymbol(uniqueSymbols);
        } else {
          const selectedValues = selectedOptions.map(option => option.value);
          // Convert to Set and then back to array to remove duplicates
          const uniqueSymbols = [...new Set(selectedValues)];
          setBackSymbol(uniqueSymbols);
        }
      };
      
      
      useEffect(() => {
        if (backtest && Array.isArray(backtest)) {
          const pairTrades = (trades) => {
            const pairedTrades = [];
            let currentPair = [];
            
            trades.forEach(trade => {
              if (currentPair.length === 0) {
                currentPair.push(trade);
              } else {
                const [firstTrade] = currentPair;
                if (
                  (firstTrade.action === 'Buy' && trade.action === 'Sell') ||
                  (firstTrade.action === 'Sell' && trade.action === 'Buy')
                ) {
                  currentPair.push(trade);
                  pairedTrades.push([...currentPair]);
                  currentPair = [];
                } else {
                  pairedTrades.push([...currentPair]);
                  currentPair = [trade];
                }
              }
            });
            
            if (currentPair.length > 0) {
              pairedTrades.push(currentPair);
            }
            
            return pairedTrades;
          };
      
          const isVixInRange = (vix, range) => {
            return vix[1] >= range.from && vix[0] <= range.to;
          };
      
          const filterAndPairTrades = (trades) => {
            const filteredTrades = [];
            const tradePairs = {};
      
            trades.forEach(trade => {
              if (!tradePairs[trade.tradeNumber]) {
                tradePairs[trade.tradeNumber] = [];
              }
              tradePairs[trade.tradeNumber].push(trade);
            });
      
            Object.values(tradePairs).forEach(pair => {
              const entryTrade = pair.find(trade => trade.trigger === 'Entry Signal');
              const exitTrade = pair.find(trade => trade.trigger !== 'Entry Signal');
      
              if (entryTrade &&
                (selectedSentiment === 'All' || entryTrade.day_type === selectedSentiment) &&
                isVixInRange(entryTrade.vix, vixRange) &&
                selectedDaysForFilter[entryTrade.day]) {
      
                if (selectedTrigger === 'All' || (exitTrade && exitTrade.trigger === selectedTrigger)) {
                  filteredTrades.push(entryTrade);
                  if (exitTrade) {
                    filteredTrades.push(exitTrade);
                  }
                }
              }
            });
      
            return filteredTrades;
          };
      
          const longTrades = tradeTypeFilter === 'All' || tradeTypeFilter === 'long'
            ? backtest
              .filter(result => result.symbol === selectedSymbol)
              .map(result => result.result.trades)
              .flat()
            : [];
      
          const filteredLongTrades = filterAndPairTrades(longTrades);
          const pairedLongTrades = pairTrades(filteredLongTrades);
      
          const shortTrades = tradeTypeFilter === 'All' || tradeTypeFilter === 'short'
            ? backtest
              .filter(result => result.symbol === selectedSymbol)
              .map(result => result.result.tradesShort)
              .flat()
            : [];
      
          const filteredShortTrades = filterAndPairTrades(shortTrades);
          const pairedShortTrades = pairTrades(filteredShortTrades);
      
          const combinedTrades = [...pairedLongTrades.flat(), ...pairedShortTrades.flat()];
          combinedTrades.sort((a, b) => (a.tradeNumber) - (b.tradeNumber));
      
          let cumulativePnL = 0;
          let peakFundsTotal = 0;
          let maxDrawdownTotal = 0;
          let maxDrawdownDaysTotal = 0;
          let drawdownStartTotal = null;
          let initialInvested = combinedTrades[1]?.invested 

      const combinedTradesWithCumulativePnL = combinedTrades.map(trade => {
        if (trade.pnl !== undefined && trade.pnl !== null) {
          cumulativePnL += trade.pnl;
        }
        let fundsTotal = initialInvested + cumulativePnL;

        if (fundsTotal > peakFundsTotal) {
          peakFundsTotal = fundsTotal;
          drawdownStartTotal = null;
        } else {
          if (drawdownStartTotal === null) {
            drawdownStartTotal = trade.date;
          }
          let currentDrawdownTotal = (peakFundsTotal - fundsTotal) / peakFundsTotal;
          let currentDrawdownPercentageTotal = currentDrawdownTotal * 100;

          maxDrawdownTotal = Math.max(maxDrawdownTotal, currentDrawdownPercentageTotal);

          if (drawdownStartTotal !== null) {
            let drawdownDaysTotal = (new Date(trade.date) - new Date(drawdownStartTotal)) / (1000 * 3600 * 24);
            maxDrawdownDaysTotal = Math.max(maxDrawdownDaysTotal, drawdownDaysTotal);
          }
        }

        return { ...trade, cumulativePnL };
      });

      setFilterdTrades(combinedTradesWithCumulativePnL);
      setCurrentPage(1);
      setMaxDrawdown(maxDrawdownTotal);
      setMaxDrawdownDays(maxDrawdownDaysTotal);
    }
      }, [backtest, selectedSymbol, selectedSentiment, selectedTrigger, vixRange, tradeTypeFilter, selectedDaysForFilter]);
      


    const [currentPage, setCurrentPage] = useState(1);
    


    useEffect(()=>{
      if (filteredTrades){
         
          const indexOfLastTrade = currentPage * listPerPage;
          const indexOfFirstTrade = indexOfLastTrade - listPerPage;
          const currentTrade = filteredTrades.slice(indexOfFirstTrade, indexOfLastTrade);
       
          setCurrentTrades(currentTrade)
      }

    },[filteredTrades,currentPage,listPerPage])

    
    const handleSort = () => {
      setFilterdTrades([...filteredTrades].reverse());
      setListOrder(!listOrder)
    };



    const handleSortColumn = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };

    const getValueByColumn = (result, column) => {
      switch (column) {
        case 'symbol':
          return result.symbol;
        case 'profitFactor':
          return result.result['Profit Factor Total'];
        case 'pnl':
          return result.result["Total PnL"] + result.result["Total PnL Short"];
        case 'winsLosses':
          return result.result["Number of Wins"] + result.result["Number of Wins Short"];
        case 'trades':
          return result.result["Total Signals"] + result.result["Total Signals Short"];
        case 'winningStreak':
          return result.result["Winning Streak"] + result.result["Winning Streak Short"];
        case 'losingStreak':
          return result.result["Losing Streak"] + result.result["Losing Streak Short"];
        case 'maxDrawdown':
          return result.result["Max Drawdown"];
        default:
          return null;
      }
    };


    const sortedBacktest = React.useMemo(() => {
      let sortableItems = [...backtest];
      if (sortConfig.key !== null) {
        sortableItems.sort((a, b) => {
          const aValue = getValueByColumn(a, sortConfig.key);
          const bValue = getValueByColumn(b, sortConfig.key);
    
          if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }

      const parsedData = sortableItems.map(item => {
        return {
            ...item,
            monthly_pnl: typeof item.monthly_pnl === 'string' ? JSON.parse(item.monthly_pnl) : item.monthly_pnl,
            monthly_pnl_short: typeof item.monthly_pnl === 'string' ? JSON.parse(item.monthly_pnl_short) : item.monthly_pnl_short,
            monthly_pnl_total: typeof item.monthly_pnl === 'string' ? JSON.parse(item.monthly_pnl_total) : item.monthly_pnl_total,
            closePrices: typeof item.closePrices === 'string' ? JSON.parse(item.closePrices) : item.closePrices,
        };

       });
     
      
      return parsedData;

      
    }, [backtest, sortConfig]);

    
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
  
     useEffect(()=>{
      const trailPercentage = (moveSl/moveInstrument) * 100
      setTrailing(trailPercentage)

     },[moveSl,moveInstrument])


     const headers = [
    { label: "Trade", key: "tradeNumber" },
    { label: "Date", key: "date" },
    { label: "Sentiment", key: "day_type" },
    { label: "Signal Type", key: "signalType" },
    { label: "Symbol", key: "symbol" },
    { label: "Price", key: "price" },
    { label: "Stoploss", key: "stopLossprice" },
    { label: "Trailing Sl", key: "trailingSl" },
    { label: "Target", key: "targetPrice" },
    { label: "PnL", key: "pnl" },
    { label: "Cumulative Pnl", key: "cumulativePnL" },
    { label: "Action", key: "action" },
    { label: "Quantity", key: "quantity" },
    { label: "Trigger", key: "trigger" }
  ];


  
  useEffect(()=>{
    if (filteredTrades) {
      const csv = filteredTrades.map(trade => ({
        tradeNumber: trade.tradeNumber,
        date: trade.date,
        day_type: trade.day_type,
        signalType: trade.signalType,
        symbol: trade.symbol,
        price: trade.price.toFixed(2),
        stopLossprice: trade.stopLossprice !== undefined ? trade.stopLossprice.toFixed(2) : '0',
        trailingSl: trade.trailingSl !== undefined ? trade.trailingSl.toFixed(2) : '0',
        targetPrice: trade.targetPrice.toFixed(2),
        pnl: trade.pnl ? `₹ ${trade.pnl.toFixed(2)}` : '',
        cumulativePnL: trade.cumulativePnL !== undefined ? `₹ ${trade.cumulativePnL.toFixed(2)}` : '',
        action: trade.action,
        quantity: trade.quantity,
        trigger: trade.trigger
      }));

      setCsvData(csv)


    }

  },[filteredTrades])


  const [stats, setStats] = useState({
    totalSignals: 0,
    numberOfWins: 0,
    numberOfLosses: 0,
    avgGainPerWinningTrade: 0,
    avgLossPerLosingTrade: 0,
    winRate: 0,
    lossRate: 0,
    totalPnL: 0,
    totalBrokerage: 0,
    netPnLAfterBrokerage: 0,
    totalInvestedFund: 0,
    expectancy: 0,
    maxGains: 0,
    maxLoss: 0,
    maxDrawdown: 0,
    maxDrawdownDays: 0,
    targetReached: 0,
    stoplossHit: 0,
    tslHit: 0,
    roi: 0
  });

  useEffect(() => {
    if (filteredTrades) {
      const calculateStats = (trades) => {
        const wins = trades.filter(trade => trade.pnl > 0);
        const losses = trades.filter(trade => trade.pnl <= 0);
        const totalSignals = wins.length+losses.length;
        const numberOfWins = wins.length;
        const numberOfLosses = losses.length;
        const totalPnL = trades.reduce((acc, trade) => trade.pnl ? acc + trade.pnl : acc + 0, 0);
        const totalBrokerage = trades.reduce((acc, trade) => acc + (trade.brokerage || 0), 0);
        const netPnLAfterBrokerage = totalPnL - totalBrokerage;
        const totalInvestedFund = filteredTrades.length > 0 ? trades.reduce((acc, trade) => trade.invested ? acc + trade.invested : acc + 0 , 0) : 0;
        const avgGainPerWinningTrade = numberOfWins > 0 ? wins.reduce((acc, trade) => acc + trade.pnl, 0) / numberOfWins : 0;
        const avgLossPerLosingTrade = numberOfLosses > 0 ? losses.reduce((acc, trade) => acc + trade.pnl, 0) / numberOfLosses : 0;
        const winRate = filteredTrades.length > 0 ? (numberOfWins / totalSignals) * 100 : 0;
        const lossRate = filteredTrades.length > 0 ? (numberOfLosses / totalSignals) * 100 : 0;
        const expectancy = totalSignals > 0 ? ((avgGainPerWinningTrade/avgLossPerLosingTrade)* (winRate/100)) - (lossRate/100) : 0;
        const maxGains = Math.max(...trades.map(trade => trade.pnl ? trade.pnl : Number.MIN_VALUE));
        const maxLoss = Math.min(...trades.map(trade => trade.pnl ? trade.pnl : Number.MAX_VALUE));
        const roi = totalInvestedFund > 0 ? (totalPnL / (totalInvestedFund/totalSignals)) * 100 : 0;
      
        // Assuming you have a way to calculate these values
        // const maxDrawdown = calculateMaxDrawdown(trades);
        // const maxDrawdownDays = calculateMaxDrawdownDays(trades);
        const targetReached = trades.filter(trade => trade.trigger === 'target').length;
        const stoplossHit = trades.filter(trade => trade.trigger === 'stoploss').length;
        const tslHit = trades.filter(trade => trade.trigger === 'tsl').length;
        const marketClose = trades.filter(trade => trade.trigger === 'Market Close').length


        return {
          totalSignals,
          numberOfWins,
          numberOfLosses,
          avgGainPerWinningTrade,
          avgLossPerLosingTrade,
          winRate,
          lossRate,
          totalPnL,
          totalBrokerage,
          netPnLAfterBrokerage,
          totalInvestedFund,
          expectancy,
          maxGains,
          maxLoss,
          // maxDrawdown,
          // maxDrawdownDays,
          targetReached,
          stoplossHit,
          tslHit,
          marketClose,
          roi
        };
      };
  
      const stats = calculateStats(filteredTrades);
      console.log(stats)
      setStats(stats);
    }
  }, [filteredTrades]);



  const getWeek = date => {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const pastDays = (date - firstDay) / 86400000;
    return Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
  };
  
  // const getYearWeek = date => {
  //   const year = getYear(date);
  //   const week = getWeek(date);
  //   return `${year}-W${week}`;
  // };

  const getYearWeek = date => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDays = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
  };
  
  const [monthlyPnL, setMonthlyPnL] = useState({});
  const [weeklyPnL, setWeeklyPnL] = useState({});
  const [yearlyStats, setYearlyStats] = useState({});
  const [dailyPnL, setDailyPnL] = useState({});

  useEffect(() => {
    if (filteredTrades) {
      const monthlyData = {};
      const weeklyData = {};
      const dailyData = {};
      const yearlyData = {};

      filteredTrades.forEach(trade => {
        const tradeDate = new Date(trade.date);
        const year = getYear(tradeDate);
        const month = getMonth(tradeDate);
        const dayOfWeek = tradeDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        const pnl = trade.pnl || 0; // Default pnl to 0 if it's undefined or null

        // Initialize monthly data
        if (!monthlyData[year]) {
          monthlyData[year] = Array(12).fill(0);
        }
        if (monthlyData[year][month] === undefined) {
          monthlyData[year][month] = 0;
        }
        monthlyData[year][month] += pnl;

        // Initialize weekly data
        // const yearWeek = getYearWeek(tradeDate); // Assuming you have getYearWeek function implemented
        // if (!weeklyData[yearWeek]) {
        //   weeklyData[yearWeek] = 0;
        // }
        // weeklyData[yearWeek] += pnl;

        // Initialize daily data for weekdays (Monday to Friday)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
          if (!dailyData[year]) {
            dailyData[year] = {
              Monday: 0,
              Tuesday: 0,
              Wednesday: 0,
              Thursday: 0,
              Friday: 0,
              ROI: 0,
              WinPercentage: 0
            };
          }
          dailyData[year][weekday] += pnl;
        }     

        // Initialize yearly data
        if (!yearlyData[year]) {
          yearlyData[year] = { pnl: 0, wins: 0, losses: 0, totalTrades: 0 };
        }
        yearlyData[year].pnl += pnl;
        yearlyData[year].totalTrades += 1;
        if (pnl > 0) {
          yearlyData[year].wins += 1;
        } else {
          yearlyData[year].losses += 1;
        }
      });

      setMonthlyPnL(monthlyData);
      setWeeklyPnL(weeklyData);
      setDailyPnL(dailyData);

      // Calculate yearly ROI% and Win%
      const updatedYearlyStats = {};
      for (const year in yearlyData) {
        const yearData = yearlyData[year];
        const roi = ((yearData.pnl / (stats.totalInvestedFund/stats.totalSignals)) * 100).toFixed(2);
        const winRate = ((yearData.wins / stats.totalSignals) * 100).toFixed(2);
        updatedYearlyStats[year] = { ...yearData, roi, winRate };
      }

      setYearlyStats(updatedYearlyStats);
    }
  }, [filteredTrades, backCapital,stats]);


  const [selectedGraph, setSelectedGraph] = useState('cumulative'); // Default to showing cumulative PnL graph

  const handleGraphChange = (graphName) => {
    setSelectedGraph(graphName);
  };




  const calculateAverage = (stat) => {
    const values = Object.values(yearlyStats).map(year => year[stat] || 0);
    const total = values.reduce((sum, value) => sum + Number(value), 0);
  
    return (total / values.length).toFixed(2);
  };


  return (
    <div className='trade p-2 mx-2'>
       <ToastContainer></ToastContainer>

            <div className='d-flex justify-content-center'>
              <div class="btn-group w-25 " role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio-time" autocomplete="off"  onClick={() => setView('time')}></input>
                <label class="btn btn-outline-warning" for="btnradio-time">Timer Based</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio-indi" autocomplete="off"></input>
                <label class="btn btn-outline-info" for="btnradio-indi" onClick={() => setView('indicator')}>Indicator Based</label>

              </div>

              </div>
        <div className='head d-flex justify-content-between my-1'>
          

            <div>
                <RealTimeClock></RealTimeClock>
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

              {/* <div className="btn-group mb-3 mt-2" role="group">
                <input type="radio" className="btn-check" name="entryType" id="btnEntryType1" checked={entryType === 'buy'} onChange={() => setEntryType('buy')} />
                <label className="btn btn-outline-primary" htmlFor="btnEntryType1">BUY</label>

                <input type="radio" className="btn-check" name="entryType" id="btnEntryType2" checked={entryType === 'sell'} onChange={() => setEntryType('sell')} />
                <label className="btn btn-outline-primary" htmlFor="btnEntryType2">SELL</label>
              </div>     */}


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
                onChange={handleSelectChange}
                // onChange={(selectedOptions) => setBackSymbol(selectedOptions.map(option => option.value))}
                options={ instrumentType === 'equity'? stockList.map(stock => ({ value: stock, label: stock })): Object.entries(optionList).map(([key, value]) => ({
                  value: value,
                  label: key,
                }))}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select Symbols"
            />
              </FormGroup>

            </div>

            </FormGroup>

                <div className='d-flex justify-content-between my-3'>
            <FormGroup>
              <FormLabel>Quantity</FormLabel>
              <FormControl type='number' onChange={(e)=>setBackQuantity(Number(e.target.value))} readOnly={positionSizeType?true:false}></FormControl>
            </FormGroup>


               

          </div>


            <div className='d-flex mt-3 align-item-center justify-content-between'>
              <FormLabel>Graph</FormLabel>

              <FormSelect onChange={(e)=>setGraphType(e.target.value)} className='w-25'>
                <option value='candle'>Candle Stick</option>
                <option value='heikin-ashi'>Heikin-Ashi</option>
              </FormSelect>

              <FormSelect onChange={(e)=>setTimePeriod(e.target.value)} className='w-25'>
                <option value='min'>1 Min</option>
                {/* <option value=''>3 Min</option> */}
                <option value='5min'>5 Min</option>
                <option value='10min'>10 Min</option>
                <option value='15min'>15 Min</option>
                <option value='30min'>30 Min</option>
                <option value='hourly'>1 Hour</option>
                <option value='daily'>1 Day</option>
              </FormSelect>

              <FormSelect onChange={(e)=>setMarketType(e.target.value)} className='w-25'>
                <option value='mis'>MIS</option>
                <option value='cnc'>CNC/NRML</option>
              </FormSelect>


            
            </div>

            {showMore1 && (
                     <div className='d-flex justify-content-between'>
   
                      <FormGroup>
                        <FormLabel>{positionSizeType === 'capital'? 'Max Allocation (amount)' : 'Max Sl per trade (%)' }</FormLabel>
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
            strategy2={strategyDetails2}
            setStrategy2={setStrategyDetails2}
            type = {'Entry'}
          />
            
            <div className='d-flex justify-content-between mt-3'>
            <FormGroup>
              <FormLabel>Max No. of Long Entry in a Day</FormLabel>
              <FormControl type='number' value={maxLong} onChange={(e)=>setMaxLong(Number(e.target.value))}></FormControl>
            </FormGroup>

            <FormGroup>
              <FormLabel>Max No. of Short Entry in a Day</FormLabel>
              <FormControl type='number' value={maxShort} onChange={(e)=>setMaxShort(Number(e.target.value))}></FormControl>
            </FormGroup>
            </div>

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
                strategy2={strategyDetailsExit2}
                setStrategy2={setStrategyDetailsExit2}
                type = {'Exit'}
              />
         

                    </div>


                  </div>
                  
              ) 

              }

            
              <a  className='my-3' href='#' onClick={()=> showMore ? setShowMore(false) : setShowMore(true)}>{showMore ? 'Hide Option' : 'Show Option'}</a>
                 
              
              
            

            </div>


            <div  className='mt-3 bg-light p-2'>
              <h4>Backtest Parameter</h4>

             <div className='d-flex justify-content-between '> 
              <FormGroup className='w-50 border-end border-3 pe-3'>
              <FormLabel>Date</FormLabel>
              <FormGroup className='d-flex'>
              <FormControl type='date' onChange={(e)=>setStartDates(e.target.value)}></FormControl>
              <FormControl type='date' onChange={(e)=>setEndDates(e.target.value)}></FormControl>
              </FormGroup>
            </FormGroup>

            <FormGroup className='w-50 ps-3'>
              <FormLabel>Time</FormLabel>
              <FormGroup className='d-flex'>
              <FormControl type='time' onChange={(e)=>setStartDates(e.target.value)}></FormControl>
              <FormControl type='time' onChange={(e)=>setEndDates(e.target.value)}></FormControl>
              </FormGroup>
            </FormGroup>

            </div>

           
            <FormGroup>
              <FormLabel>Initial Capital</FormLabel>
              <FormControl type='number' onChange={(e)=>setBackCapital(Number(e.target.value))}></FormControl>
            </FormGroup>

            <div>
                <label>Entry Days</label>

                {Object.keys(selectedDays).map((day) => (
                    <Button       
                      key={day}
                      variant={selectedDaysForIndi[day] ? 'primary' : 'outline-primary'}
                      className="m-1"
                      onClick={() => toggleDayForIndi(day)}
                    >
                      {day}
                    </Button>
                  ))}
                  <Button
                    variant="success"
                    className="m-1"
                    onClick={() => toggleAllDays(true)}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={() => toggleAllDays(false)}
                  >
                    Cancel All
                  </Button>
          </div>


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

            <button onClick={handleStrategy} className='mt-4 btn btn-warning'>Start BackTest</button>

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

        <div>
          
        <FormGroup className='d-flex justify-content-end'>
            <FormCheck type='switch' onChange={()=>setTradingChargeShow(!tradingChargeShow)}  checked={tradingChargeShow}></FormCheck>
            <FormLabel className='m-0'><h5>Trading Charges</h5></FormLabel>
            </FormGroup>
        </div>

        <table className="table table-bordered">
                <thead>
                    <tr>
                        {/* <th>Instrument <button style={{border:0 , background:'white'}} onClick={handleSort}>{instrumentOrder ===false? '🔼' : '🔽'}</button></th> */}
                        <th>
                        Instrument 
                        <button style={{ border: 0, background: 'white' }} onClick={() => handleSortColumn('symbol')}>
                          {sortConfig.key === 'symbol' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : '🔽'}
                        </button>
                      </th>
                        {/* <th>Profit Factor <button style={{border:0 , background:'white'}} onClick={handleSortInstrument}>{profitOrder ===false? '🔼' : '🔽'}</button></th> */}
                        <th>
                          Profit Factor 
                          <button style={{ border: 0, background: 'white' }} onClick={() => handleSortColumn('profitFactor')}>
                            {sortConfig.key === 'profitFactor' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : '🔽'}
                          </button>
                        </th>
                        {/* <th>P&amp;L <button style={{border:0 , background:'white'}} onClick={handleSort}>{plOrder ===false? '🔼' : '🔽'}</button></th> */}
                        <th>
                          P&amp;L 
                          <button style={{ border: 0, background: 'white' }} onClick={() => handleSortColumn('pnl')}>
                            {sortConfig.key === 'pnl' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : '🔽'}
                          </button>
                        </th>
                     
                     
                        <th>W | L</th>
                        {/* <th>Trades <button style={{border:0 , background:'white'}} onClick={handleSort}>{tradesOrder ===false? '🔼' : '🔽'}</button></th> */}
                        <th>
                          Trades 
                          <button style={{ border: 0, background: 'white' }} onClick={() => handleSortColumn('trades')}>
                            {sortConfig.key === 'trades' ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : '🔽'}
                          </button>
                        </th>
                       
                        <th>WS</th>
                        <th>LS</th>
                        <th>Max DD</th>
                    </tr>
                </thead>
                <tbody>
                        <tr style={{backgroundColor : '#F5F5F5'}}>
                          <td>Summary</td>
                          <td>{summary.profitFactor}</td>
                          <td>₹
                            {tradingChargeShow ? summary.netPnLAfterBrokerage.toFixed(2) :summary.totalPnL}
                           </td>
                          <td>{summary.totalWins} | {summary.totalLosses}</td>
                          <td>{summary.totalSignals}</td>
                          <td>{summary.avgWinStreak}</td>
                          <td>{summary.avgLoseStreak}</td>
                          <td>-{summary.maxDrawdown}</td>
                        </tr>
                    {sortedBacktest.map((result, index) => (
                        <React.Fragment key={index}>
                            <tr onClick={() => toggleRow(index)} style={{ cursor: 'pointer' }}>
                                <td>{result.symbol}</td>
                                <td>{(result.result['Profit Factor Total']).toFixed(2)}</td>
                                <td style={{ color: (result.result["Total PnL"] + result.result["Total PnL Short"]) >= 0 || (result.result["Net PnL After Brokerage"] + result.result["Net PnL After Brokerage Short"]) >= 0 ? 'green' : 'red' }}>
                                    ₹{tradingChargeShow === false
                                        ? (result.result["Total PnL"] + result.result["Total PnL Short"]).toFixed(2)
                                        : (result.result["Net PnL After Brokerage"] + result.result["Net PnL After Brokerage Short"]).toFixed(2)}
                                </td>
                                <td>{result.result["Number of Wins"]+result.result["Number of Wins Short"]} | {result.result["Number of Losses"] + result.result["Number of Losses Short"]}</td>
                                <td>{result.result["Total Signals"] + result.result["Total Signals Short"]}</td>
                                <td>{(result.result["Winning Streak"] + result.result["Winning Streak Short"])}</td>
                                <td>{(result.result["Losing Streak"] + result.result["Losing Streak"])}</td>
                                <td>-{result.result["Max Drawdown"].toFixed(2)}</td>
                            </tr>
                            {expandedRow === index && result.result && result.result.trades && (
                                <tr>
                                    <td colSpan="8">
                                         <div>

                                          <div>
                                            {/* <img src={`data:image/png;base64,${result.funds_graph}`} alt={`${result.symbol} Strategy Graph 1`} /> */}

                                            

                                          <div className='d-flex justify-content-between mt-3 p-3'>
                                           


                                            <form onSubmit={handleVixRange} className='w-25'>
                                            <label className='form-label' >VIX Range</label>

                                            <div className='row'>
                                                <input class="form-control col me-2 py-2" type='number' value={fromVix} onChange={(e)=>setFromVix(e.target.value)}></input>
                                                <input class="form-control col me-2" type='number' value={toVix} onChange={(e)=>setToVix(e.target.value)}></input>
                                                <button className='btn btn-primary btn-sm col-2' type='submit' >Submit</button>
                                            </div>
                                     
                                      
                                        </form>

                                        <div>
                                          <label>Day Type</label>
                                              {Object.keys(selectedDays).map((day) => (
                                                <Button       
                                                  key={day}
                                                  variant={selectedDaysForFilter[day] ? 'primary' : 'outline-primary'}
                                                  className="m-1"
                                                  onClick={() => toggleDayForFilter(day)}
                                                >
                                                  {day}
                                                </Button>
                                              ))}
                                        </div>


                                        <FormGroup>
                                              <FormLabel >Trade Type</FormLabel>
                                              <FormSelect onChange={(e)=>setTradeTypeFilter(e.target.value)} >
                                                <option value='All'>All</option>
                                                <option value='long'>Long</option>
                                                <option value='short'>Short</option>
                                              </FormSelect>
                                            </FormGroup>


                                        <form>
                                            <label>Daily Sentiment</label>
                                          <select value={selectedSentiment} onChange={handleSentimentChange} class="form-select">
                                                <option value="All">All</option>
                                                <option value="bullish">Bullish</option>
                                                <option value="bearish">Bearish</option>
                                                <option value="sideways">Sideways</option>
                                        </select>
                                        </form>                                     

                                          <form>
                                            <label>Exit Trigger</label>
                                        <select value={selectedTrigger} onChange={handleTriggerChange} class="form-select">
                                          <option value="All">All</option>                                      
                                          <option value="stoploss">Stop Loss</option>
                                          <option value="target">Target</option>
                                          <option value="tsl">TSL</option>
                                          <option value="Market Close">Market Close</option>
                                        </select>
                                        </form>




                                          </div>

                                          {/* <div>
                                              <ul className='d-flex flex-wrap' style={{ listStyleType: 'none', padding: 0 }}>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Total Signals:</b>
                                                   {tradeTypeFilter==='All'? result.result["Total Signals"] + result.result["Total Signals Short"]: tradeTypeFilter==='long'? result.result["Total Signals"] : result.result["Total Signals Short"] }
                                                  
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Number of Wins:</b> 
                                                  {tradeTypeFilter==='All'? result.result["Number of Wins"] + result.result["Number of Wins Short"]: tradeTypeFilter==='long'? result.result["Number of Wins"] : result.result["Number of Wins Short"] }
                                                
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Number of Losses:</b>
                                                  {tradeTypeFilter==='All'? result.result["Number of Losses"] + result.result["Number of Losses Short"]: tradeTypeFilter==='long'? result.result["Number of Losses"] : result.result["Number of Losses Short"] }
                                                   
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Avg Gain per Winning Trade:</b>
                                                   ₹{tradeTypeFilter==='All'?(((result.result["gains"]).reduce((accumulator, currentValue) => accumulator + currentValue, 0) + (result.result["gainsShort"].reduce((accumulator, currentValue) => accumulator + currentValue, 0)))/(result.result["gains"].length+result.result["gainsShort"].length)).toFixed(2): tradeTypeFilter==='long'? result.result["Avg Gain per Winning Trade"].toFixed(2) : result.result["Avg Gain per Winning Trade Short"].toFixed(2) }
 
                                                  
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Avg Loss per Losing Trade:</b> 
                                                  ₹ -{tradeTypeFilter==='All'? ((((result.result["losses"].reduce((accumulator, currentValue) => accumulator + currentValue, 0)) + (result.result["lossesShort"].reduce((accumulator, currentValue) => accumulator + currentValue, 0)))/(result.result["losses"].length+result.result["lossesShort"].length))).toFixed(2): tradeTypeFilter==='long'? result.result["Avg Loss per Losing Trade"].toFixed(2) : result.result["Avg Loss per Losing Trade Short"].toFixed(2)}
                                                
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Win Rate (%):</b> 
                                                  {tradeTypeFilter==='All'? (((result.result['Number of Wins'] + result.result['Number of Wins Short'])/(result.result['Total Signals']+result.result['Total Signals Short']))*100).toFixed(2): tradeTypeFilter==='long'? result.result["Win Rate (%)"].toFixed(2) : result.result["Win Rate Short(%)"].toFixed(2) }             

                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Loss Rate (%):</b>
                                                  {tradeTypeFilter==='All'? (((result.result['Number of Losses'] + result.result['Number of Losses Short'])/(result.result['Total Signals']+result.result['Total Signals Short']))*100).toFixed(2): tradeTypeFilter==='long'? result.result["Loss Rate (%)"].toFixed(2)  : result.result["Loss Rate Short(%)"].toFixed(2)  }
                                                   
                                                </li>
                                               
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Total PnL:</b>
                                                   ₹{tradeTypeFilter==='All'? (result.result["Total PnL"] + result.result["Total PnL Short"]).toFixed(2) : tradeTypeFilter==='long'? result.result["Total PnL"].toFixed(2)  : result.result["Total PnL Short"].toFixed(2)  }
                                                  
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Total Brokerage:</b>
                                                   ₹{tradeTypeFilter==='All'? (result.result["Total Brokerage"] + result.result["Total Brokerage Short"]).toFixed(2) : tradeTypeFilter==='long'? result.result["Total Brokerage"].toFixed(2)  : result.result["Total Brokerage Short"].toFixed(2)  }
                                                   
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Net PnL After Brokerage:</b> 
                                                  ₹{tradeTypeFilter==='All'? (result.result["Net PnL After Brokerage"] + result.result["Net PnL After Brokerage Short"]).toFixed(2) : tradeTypeFilter==='long'? result.result["Net PnL After Brokerage"].toFixed(2)  : result.result["Net PnL After Brokerage Short"].toFixed(2)  }
                                                  
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Total Invested Fund:</b> 
                                                  ₹{tradeTypeFilter==='All'? result.result["investedTotal"].toFixed(2) : tradeTypeFilter==='long'? result.result["investedFund"].toFixed(2)  : result.result["investedFundShort"].toFixed(2)  }
                                                
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Expectancy:</b> 
                                                  {tradeTypeFilter==='All'? result.result["Expectancy total"].toFixed(2): tradeTypeFilter==='long'? result.result["Expectancy"].toFixed(2) : result.result["Expectancy Short"].toFixed(2) }
                                                 
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Max Gains:</b> 
                                                  ₹ {tradeTypeFilter==='All'? Math.max(result.result["Max Gains"],result.result["Max Gains Short"]).toFixed(2) : tradeTypeFilter==='long'? result.result["Max Gains"].toFixed(2)  : result.result["Max Gains Short"].toFixed(2)  }
                                                 
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Max Loss:</b> 
                                                  ₹{tradeTypeFilter==='All'?  Math.max(result.result["Max Loss"],result.result["Max Loss Short"]).toFixed(2) : tradeTypeFilter==='long'? result.result["Max Loss"].toFixed(2)  : result.result["Max Loss Short"].toFixed(2)  }
                                                 
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Max Drawdown:</b>
                                                  {tradeTypeFilter==='All'? result.result["Max Drawdown Total"].toFixed(2) : tradeTypeFilter==='long'? result.result["Max Drawdown"].toFixed(2)  : result.result["Max Drawdown Short"].toFixed(2)  }
                                                  
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Max Drawdown Days:</b> 
                                                  {tradeTypeFilter==='All'? result.result["Max Drawdown Days Total"].toFixed(2) : tradeTypeFilter==='long'? result.result["Max Drawdown Days"].toFixed(2)  : result.result["Max Drawdown Days Short"].toFixed(2)  }

                                                </li>

                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Target Reached:</b>
                                                  {tradeTypeFilter==='All'? result.result["targetCount"] + result.result["targetCountShort"]: tradeTypeFilter==='long'? result.result["targetCount"] : result.result["targetCountShort"] }
                                                  
                                                </li>

                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Stoploss Hit:</b>
                                                  {tradeTypeFilter==='All'? result.result["slCount"] + result.result["slCountShort"]: tradeTypeFilter==='long'? result.result["slCount"] : result.result["slCountShort"] }
                                                 
                                                </li>

                                                 <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>TSL Hit:</b> 
                                                  {tradeTypeFilter==='All'? result.result["tslCount"] + result.result["tslCountShort"]: tradeTypeFilter==='long'? result.result["tslCount"] : result.result["tslCountShort"] }

                                                 
                                                </li>

                                                {strategyDetailsExit.conditions.length > 0 && (
                                                   <li className='border rounded mb-2 w-25 p-2'>
                                                   <b>Sell Signal:</b> 
                                                   {tradeTypeFilter==='All'? result.result["sellSignalCount"] + result.result["sellSignalCountShort"]: tradeTypeFilter==='long'? result.result["sellSignalCount"] : result.result["sellSignalCountShort"] }

                                                 
                                                 </li>
                                                )} 

                                                {marketType === 'mis' && (
                                                   <li className='border rounded mb-2 w-25 p-2'>
                                                   <b>Market Close:</b> 
                                                   {tradeTypeFilter==='All'? result.result["marketCloseCount"] + result.result["marketCloseCountShort"]: tradeTypeFilter==='long'? result.result["marketCloseCount"] : result.result["marketCloseCountShort"] }
                                                  
                                                 </li>
                                                )}                              

                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>ROI:</b> 
                                                  {tradeTypeFilter==='All'? (((result.result['Total PnL'] + result.result['Total PnL Short']) / (result.result['investedTotal']))*100).toFixed(2): tradeTypeFilter==='long'? ((result.result['Total PnL']/result.result["investedFund"])*100).toFixed(2) : ((result.result['Total PnL Short']/result.result["investedFundShort"])*100).toFixed(2) }
                                               
                                                </li>

                                              </ul>
                                            </div> */}


                                            <div>
                                              <ul className='d-flex flex-wrap' style={{ listStyleType: 'none', padding: 0 }}>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Total Signals:</b>
                                                   {stats.totalSignals}            
                                               </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Number of Wins:</b> 
                                                  {stats.numberOfWins}
                                                
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Number of Losses:</b>
                                                  {stats.numberOfLosses}
                                                   
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Avg Gain per Winning Trade:</b>
                                                   ₹{stats.avgGainPerWinningTrade .toFixed(2)}
 
                                                  
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Avg Loss per Losing Trade:</b> 
                                                  ₹ {stats.avgLossPerLosingTrade.toFixed(2)}
                                                
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Win Rate (%):</b> 
                                                  {stats.winRate .toFixed(2)}             

                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Loss Rate (%):</b>
                                                  {stats.lossRate.toFixed(2)}
                                                   
                                                </li>
                                                {/* <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Profit Factor:</b> {result.result["Profit Factor"].toFixed(2)}
                                                </li> */}
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Total PnL:</b>
                                                   ₹{stats.totalPnL.toFixed(2)}
                                                  
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Total Brokerage:</b>
                                                   ₹{stats.totalBrokerage.toFixed(2)}
                                                   
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Net PnL After Brokerage:</b> 
                                                  ₹{stats.netPnLAfterBrokerage.toFixed(2)}
                                                  
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Total Invested Fund:</b> 
                                                  ₹{(stats.totalInvestedFund/stats.totalSignals).toFixed(2)}
                                                
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Expectancy:</b> 
                                                  {stats.expectancy.toFixed(2)}
                                                 
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Max Gains:</b> 
                                                  ₹ {stats.maxGains.toFixed(2)}
                                                 
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Max Loss:</b> 
                                                  ₹{stats.maxLoss.toFixed(2)}
                                                 
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Max Drawdown:</b>
                                                  {maxDrawdown.toFixed(2)}
                                                  
                                                </li>
                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Max Drawdown Days:</b> 
                                                  {maxDrawdownDays.toFixed(2)}

                                                </li>

                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Target Reached:</b>
                                                  {stats.targetReached}
                                                  
                                                </li>

                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>Stoploss Hit:</b>
                                                  {stats.stoplossHit }
                                                 
                                                </li>

                                                 <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>TSL Hit:</b> 
                                                  {stats.tslHit}

                                                 
                                                </li>

                                                {/* {strategyDetailsExit.conditions.length > 0 && (
                                                   <li className='border rounded mb-2 w-25 p-2'>
                                                   <b>Sell Signal:</b> 
                                                   {tradeTypeFilter==='All'? result.result["sellSignalCount"] + result.result["sellSignalCountShort"]: tradeTypeFilter==='long'? result.result["sellSignalCount"] : result.result["sellSignalCountShort"] }

                                                 
                                                 </li>
                                                )}  */}

                                                {marketType === 'mis' && (
                                                   <li className='border rounded mb-2 w-25 p-2'>
                                                   <b>Market Close:</b> 
                                                   {stats.marketClose}
                                                  
                                                 </li>
                                                )}                              

                                                <li className='border rounded mb-2 w-25 p-2'>
                                                  <b>ROI:</b> 
                                                  {stats.roi.toFixed(2)}
                                               
                                                </li>

                                              </ul>
                                            </div>

                                           

                                            <div>
                                            {/* Monthly PnL Table */}
                                            <h3>Monthly PnL</h3>
                                            <Table bordered hover>
                                              <thead>
                                                <tr>
                                                  <th>Year</th>
                                                  {[...Array(12).keys()].map(month => (
                                                    <th key={month}>{format(new Date(0, month), 'MMM')}</th>
                                                  ))}
                                                  <th>Total Yearly PnL</th>
                                                  <th>Yearly ROI%</th>
                                                  <th>Win%</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {Object.keys(monthlyPnL).map(year => (
                                                  <tr key={year} >
                                                    <td style={{backgroundColor : '#FFFFFF '}}>{year}</td>
                                                    {monthlyPnL[year].map((pnl, index) => (
                                                      <td style={{color: pnl > 0 ? 'green' : 'red' }} key={index}>{(pnl || 0).toFixed(0)}</td>
                                                    ))}
                                                    <td style={{color: monthlyPnL[year].reduce((sum, pnl) => sum + pnl, 0) > 0 ? 'green' : 'red' }}>
                                                      {monthlyPnL[year]
                                                        .reduce((sum, pnl) => sum + pnl, 0)
                                                        .toFixed(0)}
                                                    </td>
                                                    <td style={{color : yearlyStats[year]?.roi > 0 ? 'green' : 'red' }}>{yearlyStats[year]?.roi || '0.0'}</td>
                                                    <td style={{color : yearlyStats[year]?.winRate > 0 ? 'green' : 'red'}}>{yearlyStats[year]?.winRate || '0.0'}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                              <tfoot>
                                                <tr style={{backgroundColor : '#F5F5F5'}}>
                                                  <th>Total</th>
                                                  {[...Array(12).keys()].map(month => (
                                                    <th key={month} 
                                                    style={{
                                                      color : Object.keys(monthlyPnL)
                                                      .reduce((sum, year) => sum + (monthlyPnL[year][month] || 0), 0)
                                                      .toFixed(2) > 0 ? 'green' : 'red'

                                                    }}
                                                    
                                                    >
                                                      {Object.keys(monthlyPnL)
                                                        .reduce((sum, year) => sum + (monthlyPnL[year][month] || 0), 0)
                                                        .toFixed(0)}
                                                    </th>
                                                  ))}
                                                  <th
                                                    style={{
                                                      color : Object.keys(monthlyPnL)
                                                      .reduce((sum, year) => sum + monthlyPnL[year].reduce((total, pnl) => total + pnl, 0), 0)
                                                      .toFixed(2) > 0 ? 'green' : 'red'


                                                    }}  
                                                  
                                                  >
                                                    {Object.keys(monthlyPnL)
                                                      .reduce((sum, year) => sum + monthlyPnL[year].reduce((total, pnl) => total + pnl, 0), 0)
                                                      .toFixed(0)}
                                                  </th>
                                                  <th style={{color :calculateAverage('roi') > 0 ? 'green' : 'red' }}>{calculateAverage('roi')}</th>
                                                  <th style={{color : calculateAverage('winRate') > 0 ?  'green' : 'red'}}>{calculateAverage('winRate')}</th>
                                                </tr>
                                              </tfoot>
                                            </Table>

                                            {/* Weekly PnL Table */}
                                          

                                            {/* Daily PnL Table */}
                                            <h3>Daily PnL</h3>
                                            <Table bordered hover>
                                              <thead>
                                                <tr>
                                                  <th>Year</th>
                                                  <th>Monday</th>
                                                  <th>Tuesday</th>
                                                  <th>Wednesday</th>
                                                  <th>Thursday</th>
                                                  <th>Friday</th>
                                                  <th>Total Yearly PnL</th>
                                                  <th>Yearly ROI%</th>
                                                  <th>Win%</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {Object.keys(dailyPnL).map(year => (
                                                  <tr key={year}>
                                                    <td>{year}</td>
                                                    <td style={{color : dailyPnL[year]?.Monday > 0 ? 'green' : 'red' }}>{(dailyPnL[year]?.Monday || 0).toFixed(0)}</td>
                                                    <td style={{color : dailyPnL[year]?.Tuesday > 0 ? 'green' : 'red' }}>{(dailyPnL[year]?.Tuesday || 0).toFixed(0)}</td>
                                                    <td style={{color : dailyPnL[year]?.Wednesday > 0 ? 'green' : 'red' }}>{(dailyPnL[year]?.Wednesday || 0).toFixed(0)}</td>
                                                    <td style={{color : dailyPnL[year]?.Thursday > 0 ? 'green' : 'red' }}>{(dailyPnL[year]?.Thursday || 0).toFixed(0)}</td>
                                                    <td style={{color : dailyPnL[year]?.Friday > 0 ? 'green' : 'red' }}>{(dailyPnL[year]?.Friday || 0).toFixed(0)}</td>
                                                    <td 
                                                      style={{
                                                        color : Object.values(dailyPnL[year] || {})
                                                        .reduce((sum, pnl) => sum + pnl, 0)
                                                        .toFixed(2) > 0 ? 'green' : 'red'

                                                      }}
                                                    >
                                                      {Object.values(dailyPnL[year] || {})
                                                        .reduce((sum, pnl) => sum + pnl, 0)
                                                        .toFixed(0)}
                                                    </td>
                                                    <td style={{color : yearlyStats[year]?.roi > 0 ? 'green' : 'red'}}>{yearlyStats[year]?.roi || '0.00'}</td>
                                                    <td style={{color : yearlyStats[year]?.winRate > 0 ? 'green' : 'red'}}>{yearlyStats[year]?.winRate || '0.00'}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                              <tfoot>
                                                <tr style={{backgroundColor : '#F5F5F5'}}>
                                                  <th>Total</th>
                                                  <th style={{color: Object.values(dailyPnL).reduce((sum, dailyData) => sum + (dailyData.Monday || 0), 0).toFixed(0) > 0 ? 'green' : 'red'}}>
                                                    {Object.values(dailyPnL)
                                                      .reduce((sum, dailyData) => sum + (dailyData.Monday || 0), 0)
                                                      .toFixed(0)}
                                                  </th>
                                                  <th style={{color: Object.values(dailyPnL).reduce((sum, dailyData) => sum + (dailyData.Tuesday || 0), 0).toFixed(0) > 0 ? 'green' : 'red'}}>
                                                    {Object.values(dailyPnL)
                                                      .reduce((sum, dailyData) => sum + (dailyData.Tuesday || 0), 0)
                                                      .toFixed(0)}
                                                  </th>
                                                  <th style={{color: Object.values(dailyPnL).reduce((sum, dailyData) => sum + (dailyData.Wednesday || 0), 0).toFixed(0) > 0 ? 'green' : 'red'}}>
                                                    {Object.values(dailyPnL)
                                                      .reduce((sum, dailyData) => sum + (dailyData.Wednesday || 0), 0)
                                                      .toFixed(0)}
                                                  </th>
                                                  <th style={{color: Object.values(dailyPnL).reduce((sum, dailyData) => sum + (dailyData.Thursday || 0), 0).toFixed(0) > 0 ? 'green' : 'red'}}>
                                                    {Object.values(dailyPnL)
                                                      .reduce((sum,dailyData) => sum + (dailyData.Thursday || 0), 0)
                                                      .toFixed(0)}
                                                      </th>
                                                      <th style={{color: Object.values(dailyPnL).reduce((sum, dailyData) => sum + (dailyData.Friday || 0), 0).toFixed(0) > 0 ? 'green' : 'red'}}>
                                                      {Object.values(dailyPnL)
                                                      .reduce((sum, dailyData) => sum + (dailyData.Friday || 0), 0)
                                                      .toFixed(0)}
                                                      </th>
                                                      <th style={{color: Object.values(dailyPnL)
                                                      .reduce((sum, dailyData) =>
                                                      sum + Object.values(dailyData).reduce((total, pnl) => total + pnl, 0), 0)
                                                      .toFixed(0) > 0 ? 'green' : 'red'}}>
                                                      {Object.values(dailyPnL)
                                                      .reduce((sum, dailyData) =>
                                                      sum + Object.values(dailyData).reduce((total, pnl) => total + pnl, 0), 0)
                                                      .toFixed(0)}
                                                      </th>
                                                      <th style={{color : calculateAverage('roi') > 0 ? 'green' : 'red' }}>{calculateAverage('roi')}</th>
                                                      <th style={{color : calculateAverage('winRate') > 0 ? 'green' : 'red' }}>{calculateAverage('winRate')}</th>
                                                      </tr>
                                                      </tfoot>
                                                      </Table>
                                                      </div>

                                             </div> 

                                                          <div >
                                                        <div className="row mt-4 mb-3">
                                                          <div className="btn-group" role="group" aria-label="Graphs">
                                                          <button
                                                              type="button"
                                                              className={`btn btn-outline-primary ${
                                                                selectedGraph === 'trade' ? 'active' : ''
                                                              }`}
                                                              onClick={() => handleGraphChange('trade')}
                                                            >
                                                              Trade Graph
                                                            </button>
                                                            <button
                                                              type="button"
                                                              className={`btn btn-outline-primary ${
                                                                selectedGraph === 'daily' ? 'active' : ''
                                                              }`}
                                                              onClick={() => handleGraphChange('daily')}
                                                            >
                                                              Daily PnL Graph
                                                            </button>
                                                            <button
                                                              type="button"
                                                              className={`btn btn-outline-primary ${
                                                                selectedGraph === 'cumulative' ? 'active' : ''
                                                              }`}
                                                              onClick={() => handleGraphChange('cumulative')}
                                                            >
                                                              Cumulative PnL Graph
                                                            </button>
                                                           
                                                            <button
                                                              type="button"
                                                              className={`btn btn-outline-primary ${
                                                                selectedGraph === 'drawdown' ? 'active' : ''
                                                              }`}
                                                              onClick={() => handleGraphChange('drawdown')}
                                                            >
                                                              Drawdown Graph
                                                            </button>
                                                           
                                                          </div>
                                                        </div>

                                                    
                                                          <div className="w-100 h-100 bg-light">
                                                            {selectedGraph === 'cumulative' && (
                                                              <CummulativePnlGraph tradeData={filteredTrades} />
                                                            )}
                                                            {selectedGraph === 'daily' && <DailyPnlGraph tradeData={filteredTrades} avgWin={stats.avgGainPerWinningTrade}  avgLoss={stats.avgLossPerLosingTrade}  />}
                                                            {selectedGraph === 'drawdown' && (
                                                              <DrawdownGraph filteredTrades={filteredTrades} initialCapital={backCapital} maxdd={maxDrawdown}/>
                                                            )}

                                                          
                                                            {selectedGraph === 'trade' && <TradeGraph filteredTrades={filteredTrades}  closePrices={sortedBacktest[selectedIndex].closePrices} winPercentage={stats.winRate .toFixed(2)} lossPercentage={stats.lossRate.toFixed(2)}/>}
                                                          
                                                           
                                                          </div>
                                                        </div>
                                                     
                                        
                                            {/* <img src={`data:image/png;base64,${result.trade_graph}`} alt={`${result.symbol} Strategy Graph 2`} /> */}
                                        </div>

                                        

                                        
               
                                       
                                        
                                         <h3 className='mt-3'>Trade Log</h3>
                                          <div className='d-flex justify-content-between w-100  bg-light p-3'> 
                                          
                                         

                                    <div className='d-flex justify-content-between w-25 '>
                                        
                                       
                                        </div>






                                          <div className='d-flex justify-content-between'>

                                          <FormGroup>
                                            <FormLabel>No. Of List Per Page</FormLabel>
                                            <FormSelect onChange={(e)=>setListPerPage(e.target.value)} value={listPerPage}>
                                             
                                              <option value={20}>20</option>
                                              <option value={50}>50</option>
                                              <option value={70}>70</option>
                                              <option value={100}>100</option>
                                            </FormSelect>
                                            {/* <FormControl type='number' value={listPerPage} onChange={(e)=>setListPerPage(Number(e.target.value))}></FormControl> */}
                                          </FormGroup>

                                          <button className='btn btn-primary btn-sm mt-4 ms-3' >
                                            <CSVLink data={csvData} headers={headers} filename="trades.csv" className='text-white'>
                                              Export Log
                                            </CSVLink>
                                          </button>
                                          </div>

                                          </div>
                                       

                                        <div>
                                          <table className='table table-striped'>
                                            <thead>
                                              <tr>
                                                <th>Trade<button style={{border:0 , background:'white'}} onClick={handleSort}>{listOrder===false? '🔼' : '🔽'}</button></th>
                                                <th>Date</th>
                                                <th>Day</th>
                                                <th>Sentiment</th>
                                                <th>VIX</th>
                                                <th>Signal Type</th>
                                                <th>Symbol</th>
                                                <th>Price</th>
                                                <th>Stoploss</th>
                                                <th>Trailing Sl</th>
                                                <th>Target</th>
                                                <th>PnL</th>
                                                <th>Cumulative Pnl</th>
                                                <th>Action</th>
                                                <th>Quantity</th>
                                                <th>Trigger</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {currentTrades.map((trade, idx) => (
                                                <tr key={idx}>
                                                  <td>{trade.tradeNumber}</td>
                                                  <td>{formatDate(trade.date)}</td>
                                                  <td>{trade.day}</td>
                                                  <td>{trade.day_type}</td>
                                                  <td>{trade.vix[0]} - {trade.vix[1]}</td>
                                                  <td>{trade.signalType}</td>
                                                  <td>{trade.symbol}</td>
                                                  <td>{trade.price.toFixed(2)}</td>
                                                  <td>{trade.stopLossprice !== undefined ? trade.stopLossprice.toFixed(2) : '0'}</td>
                                                  <td>{trade.trailingSl !== undefined ? trade.trailingSl.toFixed(2) : '0'}</td>
                                                  <td>{trade.targetPrice.toFixed(2)}</td>
                                                  <td style={{ color: trade.pnl >= 0 ? 'green' : 'red' }}>
                                                    {trade.pnl ? '₹ ' + trade.pnl.toFixed(2) : ''}
                                                  </td>
                                                  <td style={{color:trade.cumulativePnL >= 0 ? 'green' : 'red'}}>
                                                    {trade.pnl !== undefined && trade.pnl !== null ? '₹ ' + trade.cumulativePnL.toFixed(2) : ''}
                                                  </td>
                                                  <td style={{ color: trade.action === 'Buy' ? '#6495ED' : '#E74C3C' }}>
                                                    {trade.action}
                                                  </td>
                                                  <td>{trade.quantity}</td>
                                                  <td>{trade.trigger}</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>


                                          <div className='w-100 d-flex justify-content-between'>
                                          {filteredTrades && (

                                            <div style={{maxWidth:'85%' , width:'100%' ,  overflowX:'auto', display:'flex' }}>
                                            <BootstrapPagination
                                            totalTrades={filteredTrades.length}
                                            tradesPerPage={listPerPage}
                                            currentPage={currentPage}
                                            paginate={paginate}
                                            />
                                            </div>
                                          )}

                                          <FormGroup>
                                            <FormLabel>No. Of List Per Page</FormLabel>
                                            <FormSelect onChange={(e)=>setListPerPage(e.target.value)} value={listPerPage}>
                                             
                                              <option value={20}>20</option>
                                              <option value={50}>50</option>
                                              <option value={70}>70</option>
                                              <option value={100}>100</option>
                                            </FormSelect>
                                          </FormGroup>

                                          </div>
                                          
                                        </div>

                                     
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