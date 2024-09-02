import React , { useEffect, useState}from 'react'
import './StrategyBuildPage.css'
import StockList from '../overview/StockList'
import optionList from '../overview/optionList';
import Condition from '../overview/Condition';
import { Modal, Button, Form ,FormLabel, FormControl, FormGroup, FormCheck, FormSelect } from 'react-bootstrap';
import StrategyBacktestPage from './StrategyBacktestPage';
import StrategyOptimise from './StrategyOptimise';
import PnLChart from '../Graph/PnlChart';

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  const retrieveFromLocalStorage = (key, defaultValue) => {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : defaultValue;
  };
  

const StrategyBuildPage = ({setStrategyListIndi ,strategyListIndi}) => {

    const [activePage, setActivePage] = useState(() => retrieveFromLocalStorage('activePage', 'build'));
    const [backtestResult, setBacktestResult] = useState(() => retrieveFromLocalStorage('backtestResult', null));
    const [optimiseStrategy, setOptimiseStrategy] = useState(() => retrieveFromLocalStorage('optimiseStrategy', ''));
    const [instrumentType, setInstrumentType] = useState(() => retrieveFromLocalStorage('instrumentType', 'equity'));
    const [positionSizeType, setPositionSizeType] = useState(() => retrieveFromLocalStorage('positionSizeType', ''));
    const [graphType, setGraphType] = useState(() => retrieveFromLocalStorage('graphType', 'candle'));
    const [marketType, setMarketType] = useState(() => retrieveFromLocalStorage('marketType', 'mis'));
    const [timePeriod, setTimePeriod] = useState(() => retrieveFromLocalStorage('timePeriod', 'min'));
    const [entryType, setEntryType] = useState(() => retrieveFromLocalStorage('entryType', 'buy'));
    const [pyTarget, setPyTarget] = useState(() => retrieveFromLocalStorage('pyTarget', ''));
    const [pyStoploss, setPyStoploss] = useState(() => retrieveFromLocalStorage('pyStoploss', ''));
   
    const [backSymbol, setBackSymbol] = useState(() => retrieveFromLocalStorage('backSymbol', ''));
    const [imageSrc, setImageSrc] = useState(() => retrieveFromLocalStorage('imageSrc', ''));
    const [backQuantity, setBackQuantity] = useState(() => retrieveFromLocalStorage('backQuantity', ''));
    const [showMore, setShowMore] = useState(() => retrieveFromLocalStorage('showMore', false));
    const [showMore1, setShowMore1] = useState(() => retrieveFromLocalStorage('showMore1', false));
    const [trailing, setTrailing] = useState(() => retrieveFromLocalStorage('trailing', 0));
    const [maxQuantity, setMaxQuantity] = useState(() => retrieveFromLocalStorage('maxQuantity', ''));
    const [sizeAmount, setSizeAmount] = useState(() => retrieveFromLocalStorage('sizeAmount', ''));
    const [trailingType, setTrailingType] = useState(() => retrieveFromLocalStorage('trailingType', ''));
    const [moveSl, setMoveSl] = useState(() => retrieveFromLocalStorage('moveSl', ''));
    const [moveInstrument, setMoveInstrument] = useState(() => retrieveFromLocalStorage('moveInstrument', ''));
    const [maxLong, setMaxLong] = useState(() => retrieveFromLocalStorage('maxLong', 1));
    const [maxShort, setMaxShort] = useState(() => retrieveFromLocalStorage('maxShort', 1));
    const [showSizingInputs, setShowSizingInputs] = useState(() => retrieveFromLocalStorage('showSizingInputs', false));
    const [showExitInputs, setShowExitInputs] = useState(() => retrieveFromLocalStorage('showExitInputs', false));
    const [showAddDescription, setShowAddDescription] = useState(() => retrieveFromLocalStorage('showAddDescription', false));
    const [searchTerm, setSearchTerm] = useState(() => retrieveFromLocalStorage('searchTerm', ''));
    const [selectedStocks, setSelectedStocks] = useState(() => retrieveFromLocalStorage('selectedStocks', []));
    const [strategyName, setStrategyName] = useState(() => retrieveFromLocalStorage('strategyName', ''));
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Select Strategies");



    const [isModified,setIsModified] = useState(false)
    const [isNextEnable,setIsNextEnable] = useState(false)
    
    const [selectedStrategy, setSelectedStrategy] = useState(null);

    const [pnlData, setPnlData] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        // You can add additional logic here, like updating state or making an API call
    };
    

    useEffect(() => {
        saveToLocalStorage('activePage', activePage);
        saveToLocalStorage('backtestResult', backtestResult);
        saveToLocalStorage('optimiseStrategy', optimiseStrategy);
        saveToLocalStorage('instrumentType', instrumentType);
        saveToLocalStorage('positionSizeType', positionSizeType);
        saveToLocalStorage('graphType', graphType);
        saveToLocalStorage('marketType', marketType);
        saveToLocalStorage('timePeriod', timePeriod);
        saveToLocalStorage('entryType', entryType);
        saveToLocalStorage('pyTarget', pyTarget);
        saveToLocalStorage('pyStoploss', pyStoploss);
     
        saveToLocalStorage('backSymbol', backSymbol);
        saveToLocalStorage('imageSrc', imageSrc);
        saveToLocalStorage('backQuantity', backQuantity);
        saveToLocalStorage('showMore', showMore);
        saveToLocalStorage('showMore1', showMore1);
        saveToLocalStorage('trailing', trailing);
        saveToLocalStorage('maxQuantity', maxQuantity);
        saveToLocalStorage('sizeAmount', sizeAmount);
        saveToLocalStorage('trailingType', trailingType);
        saveToLocalStorage('moveSl', moveSl);
        saveToLocalStorage('moveInstrument', moveInstrument);
        saveToLocalStorage('maxLong', maxLong);
        saveToLocalStorage('maxShort', maxShort);
        saveToLocalStorage('showSizingInputs', showSizingInputs);
        saveToLocalStorage('showExitInputs', showExitInputs);
        saveToLocalStorage('searchTerm', searchTerm);
        saveToLocalStorage('selectedStocks', selectedStocks);
        saveToLocalStorage('strategyName', strategyName);
    }, [
        activePage, backtestResult, optimiseStrategy, instrumentType, positionSizeType, graphType, marketType, 
        timePeriod, entryType, pyTarget, pyStoploss, backSymbol, imageSrc, backQuantity, showMore, 
        showMore1, trailing, maxQuantity, sizeAmount, trailingType, moveSl, moveInstrument, maxLong, maxShort, 
        showSizingInputs, showExitInputs, searchTerm, selectedStocks, strategyName
    ]);

    useEffect(() => {
       
        
        if (isNextEnable) {
          setIsModified(true);
          setIsNextEnable(false)
        }
        
      }, [
        activePage, backtestResult, optimiseStrategy, instrumentType, positionSizeType,
        graphType, marketType, timePeriod, entryType, pyTarget, pyStoploss,
        backSymbol, imageSrc, backQuantity, showMore, showMore1, trailing,
        maxQuantity, sizeAmount, trailingType, moveSl, moveInstrument,
        maxLong, maxShort, showSizingInputs, showExitInputs, searchTerm, selectedStocks, strategyName
      ]);


    useEffect(()=>{
        setBackSymbol(selectedStocks)
    },[selectedStocks])

    const intervals = {
        '1M': 'min',
        '5M': '5min',
        '10M': '10min',
        '15M': '15min',
        '30M': '30min',
        '1H': 'hourly',
        '1D': 'daily',
      };
    

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };
      
      const handleStockSelect = (stock, type) => {
        if (type === 'index') {
            const allStocks = optionList[stock];
            if (selectedStocks.includes(stock)) {
                // Remove all stocks of the index
                setSelectedStocks(prevSelectedStocks =>
                    prevSelectedStocks.filter(s => !allStocks.includes(s) && s !== stock)
                );
            } else {
                // Add all stocks of the index
                setSelectedStocks(prevSelectedStocks =>
                    [...prevSelectedStocks, ...allStocks, stock]
                );
            }
        } else {
            if (selectedStocks.includes(stock)) {
                setSelectedStocks(prevSelectedStocks =>
                    prevSelectedStocks.filter(s => s !== stock)
                );
            } else {
                setSelectedStocks(prevSelectedStocks =>
                    [...prevSelectedStocks, stock]
                );
            }
        }
    };
      

    const removeStock = (stockToRemove) => {
    setSelectedStocks(selectedStocks.filter(stock => stock !== stockToRemove));
    };
    
    const filteredStocks = StockList.filter((stock) =>
    stock.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleAddDescription = () => {
        setShowAddDescription(!showAddDescription);
      };



  const toggleSizingInputs = () => {
    setShowSizingInputs(!showSizingInputs);
  };

  const toggleExitInputs = () => {
    setShowExitInputs(!showExitInputs);
  };


  
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const dashboardBuildElement = document.querySelector('.dashboard-build');
        if (isModalOpen) {
            dashboardBuildElement.classList.add('open');
        } else {
            dashboardBuildElement.classList.remove('open');
        }
        
    }, [isModalOpen]);


    const [selectedInstrument, setSelectedInstrument] = useState('');

  const handleChange = (event) => {
    setSelectedInstrument(event.target.value);
  };


  const [showStockList,setShowStockList] = useState([])

  const handleDone = () =>{
    setShowStockList(selectedStocks)
    setIsModalOpen(!isModalOpen)
  }


  const removeStockList = (stockToRemove) =>{

    setShowStockList(showStockList.filter(stock => stock !== stockToRemove));
    setSelectedStocks(selectedStocks.filter(stock => stock !== stockToRemove));

  }


  const [selectedInterval, setSelectedInterval] = useState('1M');

  const handleIntervalClick = (interval) => {
   
    setSelectedInterval(interval);
    setTimePeriod(intervals[interval])
  };


  const [selectedOrder,setSelectedOrder] = useState('mis')
  const [selectedChart,setSelectedChart] = useState('candle')

  const handleOrderChange = (e) =>{
        setSelectedOrder(e.target.value)
        setMarketType(e.target.value)
  }

  const handleChartChange = (e) =>{
        setSelectedChart(e.target.value)
        setGraphType(e.target.value)
  }



  const [selectedSide,setSelectedSide] = useState('long')
  const [selectedSideExit,setSelectedSideExit] = useState('long')

  const handleSideChange = (e) =>{
        setSelectedSide(e.target.value)
  }

  const handleSideChangeExit = (e) =>{
    setSelectedSideExit(e.target.value)
}

    
const [strategyDetailsLong, setStrategyDetailsLong] = useState({
    conditions: [],
    logicalOperators: []
  });

  const [strategyDetailsShort, setStrategyDetailsShort] = useState({
    conditions: [],
    logicalOperators: []
  });

  const [strategyDetailsLongExit, setStrategyDetailsLongExit] = useState({
    conditions: [],
    logicalOperators: []
  });

  const [strategyDetailsShortExit2, setStrategyDetailsShortExit2] = useState({
    conditions: [],
    logicalOperators: []
  });




  const [strategyDetails, setStrategyDetails] = useState({
    conditions: [{
        indicatorOne: { value: "", params: {} },
        comparator: "",
        indicatorTwo: { value: "", params: {} }
    }],
    logicalOperators: []
  });

  const [strategyDetails2, setStrategyDetails2] = useState({
    conditions: [{
        indicatorOne: { value: "", params: {} },
        comparator: "",
        indicatorTwo: { value: "", params: {} }
    }],
    logicalOperators: []
  });

  const [strategyDetailsExit, setStrategyDetailsExit] = useState({
    conditions: [{
        indicatorOne: { value: "", params: {} },
        comparator: "",
        indicatorTwo: { value: "", params: {} }
    }],
    logicalOperators: []    
  });

  const [strategyDetailsExit2, setStrategyDetailsExit2] = useState({
    conditions: [{
        indicatorOne: { value: "", params: {} },
        comparator: "",
        indicatorTwo: { value: "", params: {} }
    }],
    logicalOperators: []
  });


  const updateStrategyDetails = () => {
    setStrategyDetailsLong(
      strategyDetails?.conditions?.[0]?.comparator
        ? strategyDetails
        : {
     conditions: [],
    logicalOperators: []
  }
    );
    setStrategyDetailsShort(
      strategyDetails2?.conditions?.[0]?.comparator
        ? strategyDetails2
        : {
     conditions: [],
    logicalOperators: []
  }
    );
    setStrategyDetailsLongExit(
      strategyDetailsExit?.conditions?.[0]?.comparator
        ? strategyDetailsExit
        : {
     conditions: [],
    logicalOperators: []
  }
    );
    setStrategyDetailsShortExit2(
      strategyDetailsExit2?.conditions?.[0]?.comparator
        ? strategyDetailsExit2
        : {
     conditions: [],
    logicalOperators: []
  }
    );
  };

  // Use useEffect to initialize the new state variables based on the initial states
  useEffect(() => {
    updateStrategyDetails();


  }, [strategyDetails, strategyDetails2, strategyDetailsExit, strategyDetailsExit2]);



  const handleSaveStrategy = () =>{

    const characterLimit = 20;

    // Validate the strategy name
    if (!strategyName || strategyName.length > characterLimit) {
        alert(`Strategy name cannot be empty and must be less than ${characterLimit} characters.`);
        return; // Stop the function if validation fails
    }

    const newStrategy = {
        backSymbol : backSymbol,
        backQuantity:backQuantity,
        graphType:graphType,
        timePeriod:timePeriod,
        marketType:marketType,
        strategyName:strategyName,
        strategyDetails:strategyDetailsLong,
        strategyDetails2:strategyDetailsShort,
        strategyDetailsExit:strategyDetailsLongExit,
        strategyDetailsExit2:strategyDetailsShortExit2,
        pyStoploss:pyStoploss,
        pyTarget:pyTarget,
        positionSizeType:positionSizeType,
        maxQuantity:maxQuantity,
        sizeAmount:sizeAmount,
        trailingType:trailingType,
        moveInstrument:moveInstrument,
        moveSl:moveSl,
        maxLong:maxLong,
        maxShort:maxShort,
        trailing:trailing,
        selectedSide:selectedSide,
        selectedSideExit:selectedSideExit,

    }


    let updatedStrategyList;

    // Check if the strategy already exists in the list by strategyName
    const existingStrategyIndex = strategyListIndi.findIndex(
        (strategy) => strategy.strategyName === strategyName
    );

    if (existingStrategyIndex !== -1) {
        // Update the existing strategy
        updatedStrategyList = [...strategyListIndi];
        updatedStrategyList[existingStrategyIndex] = newStrategy;
    } else {
        // Add a new strategy to the list
        updatedStrategyList = [...strategyListIndi, newStrategy];
    }

    // Save to local storage
   
    // Save to local storage

    setSelectedStrategy(newStrategy);
    // Update state
    setStrategyListIndi(updatedStrategyList);
    setActivePage('back');
    

  }

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

  const populateFormWithStrategy = (strategy) => {
    setSelectedStrategy(strategy); 

    // setBackSymbol(strategy.backSymbol || []);
    setBackQuantity(strategy.backQuantity || '');
    setGraphType(strategy.graphType || 'candle');
    setTimePeriod(strategy.timePeriod || 'min');
    setMarketType(strategy.marketType || 'mis');
    setStrategyName(strategy.strategyName || '');
    setPyStoploss(strategy.pyStoploss || '');
    setPyTarget(strategy.pyTarget || '');
    setPositionSizeType(strategy.positionSizeType || '');
    setMaxQuantity(strategy.maxQuantity || '');
    setSizeAmount(strategy.sizeAmount || '');
    setTrailingType(strategy.trailingType || '');
    setMoveInstrument(strategy.moveInstrument || '');
    setMoveSl(strategy.moveSl || '');
    setMaxLong(strategy.maxLong || 1);
    setMaxShort(strategy.maxShort || 1);
    setTrailing(strategy.trailing || 0);
    setSelectedStocks(strategy.backSymbol || [])
    setShowStockList(strategy.backSymbol || [])

    setSelectedSide(strategy.selectedSide)
    setSelectedSideExit(strategy.selectedSideExit)

    
    const setSelectedIntervalByValue = (value) => {
        const intervalKey = Object.keys(intervals).find(key => intervals[key] === value);
        if (intervalKey) {
            setSelectedInterval(intervalKey);
        } else {
            console.error(`Interval for value "${value}" not found.`);
        }
    };

    setSelectedIntervalByValue(strategy.timePeriod)

    setStrategyDetails(strategy.strategyDetails || {
    conditions: [{
        indicatorOne: { value: "", params: {} },
        comparator: "",
        indicatorTwo: { value: "", params: {} }
    }],
    logicalOperators: []
  });
    setStrategyDetails2(strategy.strategyDetails2 || {
    conditions: [{
        indicatorOne: { value: "", params: {} },
        comparator: "",
        indicatorTwo: { value: "", params: {} }
    }],
    logicalOperators: []
  });
    setStrategyDetailsExit(strategy.strategyDetailsExit || {
    conditions: [{
        indicatorOne: { value: "", params: {} },
        comparator: "",
        indicatorTwo: { value: "", params: {} }
    }],
    logicalOperators: []
  });
    setStrategyDetailsExit2(strategy.strategyDetailsExit2 || {
    conditions: [{
        indicatorOne: { value: "", params: {} },
        comparator: "",
        indicatorTwo: { value: "", params: {} }
    }],
    logicalOperators: []
  });
    
    setIsNextEnable(true)
    
    
    setActivePage('build')
};


  const handleStrategyClick = (strategy) => {
    populateFormWithStrategy(strategy);
   
};

const handleNext = () => {
    setActivePage('back')
   
     
     
    
  };


  const handleCreateNewStrategy = () => {
    // Clear all the states related to strategy creation
    setActivePage('build');

    setStrategyDetails({
        conditions: [{
            indicatorOne: { value: "", params: {} },
            comparator: "",
            indicatorTwo: { value: "", params: {} }
        }],
        logicalOperators: []
      });
    setStrategyDetails2({
    conditions: [{
        indicatorOne: { value: "", params: {} },
        comparator: "",
        indicatorTwo: { value: "", params: {} }
    }],
    logicalOperators: []
  });
    setStrategyDetailsExit({
    conditions: [{
        indicatorOne: { value: "", params: {} },
        comparator: "",
        indicatorTwo: { value: "", params: {} }
    }],
    logicalOperators: []
  });
    setStrategyDetailsExit2({
    conditions: [{
        indicatorOne: { value: "", params: {} },
        comparator: "",
        indicatorTwo: { value: "", params: {} }
    }],
    logicalOperators: []
  });
    setGraphType('candle');
    setMarketType('mis');
    setMaxQuantity('');
    setMoveInstrument('');
    setMoveSl('');
    setPositionSizeType('');
    setBackQuantity('');
    setSizeAmount('');
    setPyStoploss('');
    setBackSymbol('');
    setPyTarget('');
    setTimePeriod('min');
    setTrailingType('');
    setMaxLong(1);
    setMaxShort(1);
    setSelectedStrategy(null)
    setStrategyName('')
    setShowStockList([])
    setSelectedStocks([])
    setSearchTerm('')

};


const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Ensure strategyListIndi is not null or undefined
  const strategies = strategyListIndi || [];

  // Reverse the strategies list
  const reversedStrategies = [...strategies].reverse();

  // Calculate the strategies to display on the current page
  const displayedStrategies = reversedStrategies.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(reversedStrategies.length / itemsPerPage);

  // Handlers for page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };


  const handleDelete = (strategy) => {
    if (window.confirm(`Are you sure you want to delete the strategy: ${strategy.strategyName}?`)) {
      const updatedStrategies = strategyListIndi.filter((s) => s !== strategy);
      setStrategyListIndi(updatedStrategies);

      // Reset the current page if necessary
      if (currentPage > 0 && updatedStrategies.length <= currentPage * itemsPerPage) {
        setCurrentPage(currentPage - 1);
      }
    }
  };


  const calculatePnL = (trades) => {
    console.log('calculatePnL called with trades:', trades);
    let cumulativePnL = 0;
    return trades.map((trade, index) => {
      const tradePnL = (trade.action === 'Buy' ? -trade.price : trade.price) * trade.quantity - trade.brokerage;
      cumulativePnL += tradePnL;
      return {
        tradeNumber: index + 1, 
        cumulativePnL,
      };
    });
  };


  const calculateAggregatedSummary = (backtestResults) => {
   
    
    // Initialize accumulators and counts
    let totalPnLLong = 0;
    let totalPnLShort = 0;
    let totalWinRateLong = 0;
    let totalWinRateShort = 0;
    let countLong = 0;
    let countShort = 0;

  
    // Iterate through each backtest result
    backtestResults.forEach((backtest, backtestIndex) => {
      
  
      // Check if 'result' key exists and is an object
      if (backtest.result && typeof backtest.result === 'object') {
        const result = backtest.result;
  
        // Handle long positions
        if (result['Total PnL'] !== undefined) {
          totalPnLLong += result['Total PnL'] || 0;
          totalWinRateLong += result['Win Rate (%)'] || 0;
          countLong++;
        }
  
        // Handle short positions
        if (result['Total PnL Short'] !== undefined) {
          totalPnLShort += result['Total PnL Short'] || 0;
          totalWinRateShort += result['Win Rate Short (%)'] || 0;
          countShort++;
        }
      }
    });
  
    // Calculate averages for long and short trades
   
    const avgWinRateLong = countLong > 0 ? totalWinRateLong / countLong : 0;
    const avgWinRateShort = countShort > 0 ? totalWinRateShort / countShort : 0;
  
    // Combine long and short averages
    const avgTotalPnL = (totalPnLLong + totalPnLShort).toFixed(2);
    const avgWinRateCombined = ((avgWinRateLong + avgWinRateShort) / 2).toFixed(2);
  
  
  
    return {
      avgTotalPnL,
      avgWinRateCombined
    };
  };
  

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date
  };
  
  const calculateDuration = (startDate, endDate) => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
  
    const diffTime = Math.abs(end - start);
  
    // Calculate total days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    // Calculate months and years
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const diffYears = end.getFullYear() - start.getFullYear();
  
    // Determine the best unit to display the duration
    if (diffYears > 0) {
      return `${diffYears} Y${diffYears > 1 ? '' : ''}`;
    } else if (diffMonths > 0) {
      return `${diffMonths} M${diffMonths > 1 ? '' : ''}`;
    } else {
      return `${diffDays} D${diffDays > 1 ? '' : ''}`;
    }
  };
  

  return (
    <div className='dashboard-build'>
        <div className='nav-bar'>
            <div className='logo-container'>
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" fill="none">
                    <path d="M18.375 10.6194C15.7791 10.6194 13.2415 11.3979 11.0831 12.8565C8.92475 14.3151 7.24249 16.3882 6.24909 18.8137C5.25569 21.2393 4.99577 23.9083 5.5022 26.4832C6.00863 29.0581 7.25867 31.4234 9.09423 33.2798C10.9298 35.1362 13.2684 36.4005 15.8144 36.9126C18.3604 37.4248 20.9994 37.162 23.3977 36.1573C25.796 35.1526 27.8459 33.4512 29.288 31.2683C30.7302 29.0853 31.5 26.5189 31.5 23.8935H18.375V10.6194Z" stroke="#5A55D2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M23.625 18.5839H36.75C36.75 15.0633 35.3672 11.687 32.9058 9.1976C30.4444 6.70822 27.106 5.30969 23.625 5.30969V18.5839Z" stroke="#FFC100" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <h3>
                    Stock <span>Angel</span>
                </h3>

            </div>


            <div className='nav-container'>

                <div className='strategies'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                    <path d="M8.51237 16.5V5.49996H5.76237V16.5H8.51237ZM4.8457 18.3333C4.33945 18.3333 3.92904 17.9229 3.92904 17.4166V11.9166H2.0957V10.0833H3.92904V4.58329C3.92904 4.07703 4.33944 3.66663 4.8457 3.66663H9.42904C9.93531 3.66663 10.3457 4.07703 10.3457 4.58329V10.0833H12.179V6.41663C12.179 5.91036 12.5894 5.49996 13.0957 5.49996H17.679C18.1853 5.49996 18.5957 5.91037 18.5957 6.41663V10.0833H20.429V11.9166H18.5957V15.5833C18.5957 16.0896 18.1853 16.5 17.679 16.5H13.0957C12.5894 16.5 12.179 16.0896 12.179 15.5833V11.9166H10.3457V17.4166C10.3457 17.9229 9.93531 18.3333 9.42904 18.3333H4.8457ZM14.0124 14.6666H16.7624V7.33329H14.0124V14.6666Z" fill="#5A55D2"/>
                    </svg>

                    <h3>
                    Strategies
                    </h3>

                </div>

                <div className='strategies'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                    <path d="M20.1611 14.6667V19.25H3.66113V14.6667H5.49447V17.4167H18.3278V14.6667H20.1611ZM3.66113 10.0833H20.1611V11.9167H3.66113V10.0833ZM20.1611 7.33333H18.3278V4.58333H5.49447V7.33333H3.66113V2.75H20.1611V7.33333Z" fill="#707EAE"/>
                    </svg>

                    <h3>
                    Scanner
                    </h3>

                </div>

                <div className='strategies'>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                    <g clip-path="url(#clip0_1_3719)">
                        <path d="M12.6899 1.83337C12.6899 2.2406 12.5129 2.60648 12.2316 2.85825V4.58337H16.8149C18.3338 4.58337 19.5649 5.8146 19.5649 7.33337V16.5C19.5649 18.0189 18.3338 19.25 16.8149 19.25H5.81494C4.29616 19.25 3.06494 18.0189 3.06494 16.5V7.33337C3.06494 5.8146 4.29616 4.58337 5.81494 4.58337H10.3983V2.85825C10.117 2.60648 9.93994 2.2406 9.93994 1.83337C9.93994 1.07398 10.5556 0.458374 11.3149 0.458374C12.0743 0.458374 12.6899 1.07398 12.6899 1.83337ZM5.81494 6.41671C5.30868 6.41671 4.89827 6.82712 4.89827 7.33337V16.5C4.89827 17.0063 5.30868 17.4167 5.81494 17.4167H16.8149C17.3212 17.4167 17.7316 17.0063 17.7316 16.5V7.33337C17.7316 6.82712 17.3212 6.41671 16.8149 6.41671H12.2316H10.3983H5.81494ZM2.14827 9.16671H0.314941V14.6667H2.14827V9.16671ZM20.4816 9.16671H22.3149V14.6667H20.4816V9.16671ZM8.56494 13.2917C9.32434 13.2917 9.93994 12.6761 9.93994 11.9167C9.93994 11.1573 9.32434 10.5417 8.56494 10.5417C7.80555 10.5417 7.18994 11.1573 7.18994 11.9167C7.18994 12.6761 7.80555 13.2917 8.56494 13.2917ZM14.0649 13.2917C14.8243 13.2917 15.4399 12.6761 15.4399 11.9167C15.4399 11.1573 14.8243 10.5417 14.0649 10.5417C13.3056 10.5417 12.6899 11.1573 12.6899 11.9167C12.6899 12.6761 13.3056 13.2917 14.0649 13.2917Z" fill="#707EAE"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1_3719">
                        <rect width="22" height="22" fill="white" transform="translate(0.314941)"/>
                        </clipPath>
                    </defs>
                    </svg>

                    <h3>
                    AI Predictor
                    </h3>

                </div>

                <div className='strategies'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                    <path d="M4.9086 13.3153L8.02677 10.1971L10.6195 12.7899L13.5133 9.89609L11.8698 8.2526H16.4531V12.8359L14.8097 11.1924L10.6195 15.3826L8.02677 12.7899L5.7588 15.0578C7.0726 17.0337 9.31912 18.3359 11.8698 18.3359C15.9199 18.3359 19.2031 15.0527 19.2031 11.0026C19.2031 6.95252 15.9199 3.66927 11.8698 3.66927C7.8197 3.66927 4.53646 6.95252 4.53646 11.0026C4.53646 11.8107 4.66717 12.5882 4.9086 13.3153ZM3.49879 14.7437L3.48951 14.7344L3.49305 14.7309C2.98535 13.5918 2.70312 12.3302 2.70312 11.0026C2.70312 5.93999 6.80719 1.83594 11.8698 1.83594C16.9324 1.83594 21.0365 5.93999 21.0365 11.0026C21.0365 16.0653 16.9324 20.1693 11.8698 20.1693C8.13975 20.1693 4.93006 17.9414 3.49879 14.7437Z" fill="#707EAE"/>
                    </svg>

                    <h3>
                    Brokers
                    </h3>

                </div>

                <div className='strategies'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                        <path d="M10.2293 6.41671H12.0627V15.5834H10.2293V6.41671ZM13.896 10.0834H15.7293V15.5834H13.896V10.0834ZM6.56266 11.9167H8.396V15.5834H6.56266V11.9167ZM13.896 3.66671H4.72933V18.3334H17.5627V7.33337H13.896V3.66671ZM2.896 2.74252C2.896 2.24042 3.3062 1.83337 3.81129 1.83337H14.8127L19.3957 6.41671L19.396 19.2432C19.396 19.7532 18.9882 20.1667 18.4854 20.1667H3.80661C3.30369 20.1667 2.896 19.7493 2.896 19.2576V2.74252Z" fill="#707EAE"/>
                        </svg>

                    <h3>
                    Reports
                    </h3>

                </div>


            </div>

            <div className='info-container'>
                <h3>Deepak Kumar</h3>



            </div>

        </div>

        
        <div className='strategy-info'>
            <div className='info-1'>
                <h4>
                Live Strategy
                </h4>

                <div className='value'>
                    <h5>5</h5>
                </div>


            </div> 

            <div className='info-1'>
                <h4>
                Live Scanner
                </h4>

                <div className='value'>
                    <h5>5</h5>
                </div>


            </div> 

            <div className='info-1'>
                <h4>
                Total PnL
                </h4>

                <div className='value'>
                    <h5>1000</h5>
                </div>


            </div> 

        </div>

        <div className='body-container'>
            <div className='strategy-list-container'>
                <div className="drop-down" onClick={toggleDropdown}>
                    <h3>{selectedOption}</h3>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.39886 8.39898C5.73081 8.06704 6.269 8.06704 6.60094 8.39898L11.9999 13.7979L17.3989 8.39898C17.7308 8.06704 18.269 8.06704 18.6009 8.39898C18.9329 8.73093 18.9329 9.26912 18.6009 9.60107L12.6009 15.6011C12.269 15.933 11.7308 15.933 11.3989 15.6011L5.39886 9.60107C5.06692 9.26912 5.06692 8.73093 5.39886 8.39898Z"
                        fill="#6B7280"
                    />
                    </svg>
                </div>
                {isOpen && (
                    <div className="dropdown-options">
                    <div onClick={() => handleOptionClick("Pre-built Strategy")}>Pre-built Strategies</div>
                    <div onClick={() => handleOptionClick("My Strategy")}>My Strategy</div>
                    <div onClick={() => handleOptionClick("Shared Strategy")}>Shared Strategy</div>
                    </div>
                )}

        
                {selectedOption === 'Pre-built Strategy' && (
                    <div>

                <div className='list-row'>
                    <div className='list-item-container'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="135" height="104" viewBox="0 0 135 104" fill="none">
                        <path d="M25.8019 56.2882C15.263 55.5693 1 66.8368 1 66.8368V103.757H133.167V56.2882C133.167 56.2882 123.01 62.9021 116.081 61.7778C105.02 59.9831 111.276 41.3587 100.538 38.2049C92.7611 35.9205 87.7104 45.0734 80.1457 42.1875C72.534 39.2837 75.1268 29.355 67.9101 25.6111C51.5887 17.144 65.0035 67.1899 46.5253 66.8368C37.4005 66.6625 34.9063 56.9093 25.8019 56.2882Z" fill="url(#paint0_linear_1_3605)"/>
                        <path d="M1 66.8368C1 66.8368 15.263 55.5693 25.8019 56.2882C34.9063 56.9093 37.4005 66.6625 46.5253 66.8368C65.0035 67.1899 51.5887 17.144 67.9101 25.6111C75.1268 29.355 72.534 39.2837 80.1457 42.1875C87.7104 45.0734 92.7611 35.9205 100.538 38.2049C111.276 41.3587 105.02 59.9831 116.081 61.7778C123.01 62.9021 133.167 56.2882 133.167 56.2882" stroke="#5A55D2" stroke-width="2" stroke-linecap="round"/>
                        <g filter="url(#filter0_d_1_3605)">
                            <mask id="path-3-inside-1_1_3605" fill="white">
                            <ellipse cx="66.8077" cy="24.75" rx="4.40923" ry="4.30556"/>
                            </mask>
                            <ellipse cx="66.8077" cy="24.75" rx="4.40923" ry="4.30556" fill="#5A55D2"/>
                            <path d="M63.2169 24.75C63.2169 22.5312 65.0051 21.0556 66.8077 21.0556V37.0556C73.4806 37.0556 79.2169 31.7246 79.2169 24.75H63.2169ZM66.8077 21.0556C68.6103 21.0556 70.3984 22.5312 70.3984 24.75H54.3984C54.3984 31.7246 60.1348 37.0556 66.8077 37.0556V21.0556ZM70.3984 24.75C70.3984 26.9688 68.6103 28.4445 66.8077 28.4445V12.4445C60.1348 12.4445 54.3984 17.7755 54.3984 24.75H70.3984ZM66.8077 28.4445C65.0051 28.4445 63.2169 26.9688 63.2169 24.75H79.2169C79.2169 17.7755 73.4806 12.4445 66.8077 12.4445V28.4445Z" fill="white" mask="url(#path-3-inside-1_1_3605)"/>
                        </g>
                        <defs>
                            <filter id="filter0_d_1_3605" x="37.3984" y="0.444458" width="58.8184" height="58.6111" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="5"/>
                            <feGaussianBlur stdDeviation="12.5"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3605"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3605" result="shape"/>
                            </filter>
                            <linearGradient id="paint0_linear_1_3605" x1="67.0833" y1="24.6461" x2="67.0833" y2="103.757" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#64ABFF" stop-opacity="0.3"/>
                            <stop offset="1" stop-color="#333BF2" stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                        </svg>

                        <h3>RSI Reversal</h3>

                    </div >

                    <div className='list-item-container'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="135" height="104" viewBox="0 0 135 104" fill="none">
                        <path d="M25.8019 56.2882C15.263 55.5693 1 66.8368 1 66.8368V103.757H133.167V56.2882C133.167 56.2882 123.01 62.9021 116.081 61.7778C105.02 59.9831 111.276 41.3587 100.538 38.2049C92.7611 35.9205 87.7104 45.0734 80.1457 42.1875C72.534 39.2837 75.1268 29.355 67.9101 25.6111C51.5887 17.144 65.0035 67.1899 46.5253 66.8368C37.4005 66.6625 34.9063 56.9093 25.8019 56.2882Z" fill="url(#paint0_linear_1_3605)"/>
                        <path d="M1 66.8368C1 66.8368 15.263 55.5693 25.8019 56.2882C34.9063 56.9093 37.4005 66.6625 46.5253 66.8368C65.0035 67.1899 51.5887 17.144 67.9101 25.6111C75.1268 29.355 72.534 39.2837 80.1457 42.1875C87.7104 45.0734 92.7611 35.9205 100.538 38.2049C111.276 41.3587 105.02 59.9831 116.081 61.7778C123.01 62.9021 133.167 56.2882 133.167 56.2882" stroke="#5A55D2" stroke-width="2" stroke-linecap="round"/>
                        <g filter="url(#filter0_d_1_3605)">
                            <mask id="path-3-inside-1_1_3605" fill="white">
                            <ellipse cx="66.8077" cy="24.75" rx="4.40923" ry="4.30556"/>
                            </mask>
                            <ellipse cx="66.8077" cy="24.75" rx="4.40923" ry="4.30556" fill="#5A55D2"/>
                            <path d="M63.2169 24.75C63.2169 22.5312 65.0051 21.0556 66.8077 21.0556V37.0556C73.4806 37.0556 79.2169 31.7246 79.2169 24.75H63.2169ZM66.8077 21.0556C68.6103 21.0556 70.3984 22.5312 70.3984 24.75H54.3984C54.3984 31.7246 60.1348 37.0556 66.8077 37.0556V21.0556ZM70.3984 24.75C70.3984 26.9688 68.6103 28.4445 66.8077 28.4445V12.4445C60.1348 12.4445 54.3984 17.7755 54.3984 24.75H70.3984ZM66.8077 28.4445C65.0051 28.4445 63.2169 26.9688 63.2169 24.75H79.2169C79.2169 17.7755 73.4806 12.4445 66.8077 12.4445V28.4445Z" fill="white" mask="url(#path-3-inside-1_1_3605)"/>
                        </g>
                        <defs>
                            <filter id="filter0_d_1_3605" x="37.3984" y="0.444458" width="58.8184" height="58.6111" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="5"/>
                            <feGaussianBlur stdDeviation="12.5"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3605"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3605" result="shape"/>
                            </filter>
                            <linearGradient id="paint0_linear_1_3605" x1="67.0833" y1="24.6461" x2="67.0833" y2="103.757" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#64ABFF" stop-opacity="0.3"/>
                            <stop offset="1" stop-color="#333BF2" stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                        </svg>

                        <h3>Bollinger buy</h3>

                    </div>
                </div>



                <div className='list-row'>
                    <div className='list-item-container'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="135" height="104" viewBox="0 0 135 104" fill="none">
                        <path d="M25.8019 56.2882C15.263 55.5693 1 66.8368 1 66.8368V103.757H133.167V56.2882C133.167 56.2882 123.01 62.9021 116.081 61.7778C105.02 59.9831 111.276 41.3587 100.538 38.2049C92.7611 35.9205 87.7104 45.0734 80.1457 42.1875C72.534 39.2837 75.1268 29.355 67.9101 25.6111C51.5887 17.144 65.0035 67.1899 46.5253 66.8368C37.4005 66.6625 34.9063 56.9093 25.8019 56.2882Z" fill="url(#paint0_linear_1_3605)"/>
                        <path d="M1 66.8368C1 66.8368 15.263 55.5693 25.8019 56.2882C34.9063 56.9093 37.4005 66.6625 46.5253 66.8368C65.0035 67.1899 51.5887 17.144 67.9101 25.6111C75.1268 29.355 72.534 39.2837 80.1457 42.1875C87.7104 45.0734 92.7611 35.9205 100.538 38.2049C111.276 41.3587 105.02 59.9831 116.081 61.7778C123.01 62.9021 133.167 56.2882 133.167 56.2882" stroke="#5A55D2" stroke-width="2" stroke-linecap="round"/>
                        <g filter="url(#filter0_d_1_3605)">
                            <mask id="path-3-inside-1_1_3605" fill="white">
                            <ellipse cx="66.8077" cy="24.75" rx="4.40923" ry="4.30556"/>
                            </mask>
                            <ellipse cx="66.8077" cy="24.75" rx="4.40923" ry="4.30556" fill="#5A55D2"/>
                            <path d="M63.2169 24.75C63.2169 22.5312 65.0051 21.0556 66.8077 21.0556V37.0556C73.4806 37.0556 79.2169 31.7246 79.2169 24.75H63.2169ZM66.8077 21.0556C68.6103 21.0556 70.3984 22.5312 70.3984 24.75H54.3984C54.3984 31.7246 60.1348 37.0556 66.8077 37.0556V21.0556ZM70.3984 24.75C70.3984 26.9688 68.6103 28.4445 66.8077 28.4445V12.4445C60.1348 12.4445 54.3984 17.7755 54.3984 24.75H70.3984ZM66.8077 28.4445C65.0051 28.4445 63.2169 26.9688 63.2169 24.75H79.2169C79.2169 17.7755 73.4806 12.4445 66.8077 12.4445V28.4445Z" fill="white" mask="url(#path-3-inside-1_1_3605)"/>
                        </g>
                        <defs>
                            <filter id="filter0_d_1_3605" x="37.3984" y="0.444458" width="58.8184" height="58.6111" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="5"/>
                            <feGaussianBlur stdDeviation="12.5"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3605"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3605" result="shape"/>
                            </filter>
                            <linearGradient id="paint0_linear_1_3605" x1="67.0833" y1="24.6461" x2="67.0833" y2="103.757" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#64ABFF" stop-opacity="0.3"/>
                            <stop offset="1" stop-color="#333BF2" stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                        </svg>

                        <h3>CPR</h3>

                    </div>

                    <div className='list-item-container'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="135" height="104" viewBox="0 0 135 104" fill="none">
                        <path d="M25.8019 56.2882C15.263 55.5693 1 66.8368 1 66.8368V103.757H133.167V56.2882C133.167 56.2882 123.01 62.9021 116.081 61.7778C105.02 59.9831 111.276 41.3587 100.538 38.2049C92.7611 35.9205 87.7104 45.0734 80.1457 42.1875C72.534 39.2837 75.1268 29.355 67.9101 25.6111C51.5887 17.144 65.0035 67.1899 46.5253 66.8368C37.4005 66.6625 34.9063 56.9093 25.8019 56.2882Z" fill="url(#paint0_linear_1_3605)"/>
                        <path d="M1 66.8368C1 66.8368 15.263 55.5693 25.8019 56.2882C34.9063 56.9093 37.4005 66.6625 46.5253 66.8368C65.0035 67.1899 51.5887 17.144 67.9101 25.6111C75.1268 29.355 72.534 39.2837 80.1457 42.1875C87.7104 45.0734 92.7611 35.9205 100.538 38.2049C111.276 41.3587 105.02 59.9831 116.081 61.7778C123.01 62.9021 133.167 56.2882 133.167 56.2882" stroke="#5A55D2" stroke-width="2" stroke-linecap="round"/>
                        <g filter="url(#filter0_d_1_3605)">
                            <mask id="path-3-inside-1_1_3605" fill="white">
                            <ellipse cx="66.8077" cy="24.75" rx="4.40923" ry="4.30556"/>
                            </mask>
                            <ellipse cx="66.8077" cy="24.75" rx="4.40923" ry="4.30556" fill="#5A55D2"/>
                            <path d="M63.2169 24.75C63.2169 22.5312 65.0051 21.0556 66.8077 21.0556V37.0556C73.4806 37.0556 79.2169 31.7246 79.2169 24.75H63.2169ZM66.8077 21.0556C68.6103 21.0556 70.3984 22.5312 70.3984 24.75H54.3984C54.3984 31.7246 60.1348 37.0556 66.8077 37.0556V21.0556ZM70.3984 24.75C70.3984 26.9688 68.6103 28.4445 66.8077 28.4445V12.4445C60.1348 12.4445 54.3984 17.7755 54.3984 24.75H70.3984ZM66.8077 28.4445C65.0051 28.4445 63.2169 26.9688 63.2169 24.75H79.2169C79.2169 17.7755 73.4806 12.4445 66.8077 12.4445V28.4445Z" fill="white" mask="url(#path-3-inside-1_1_3605)"/>
                        </g>
                        <defs>
                            <filter id="filter0_d_1_3605" x="37.3984" y="0.444458" width="58.8184" height="58.6111" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="5"/>
                            <feGaussianBlur stdDeviation="12.5"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3605"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3605" result="shape"/>
                            </filter>
                            <linearGradient id="paint0_linear_1_3605" x1="67.0833" y1="24.6461" x2="67.0833" y2="103.757" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#64ABFF" stop-opacity="0.3"/>
                            <stop offset="1" stop-color="#333BF2" stop-opacity="0"/>
                            </linearGradient>
                        </defs>
                        </svg>

                        <h3>VWAP</h3>

                    </div>

                  
                </div>
                
                </div>
                )}



    {selectedOption === 'My Strategy' && (
        <div className='saved-strategy'>
          {/* Show a message if displayedStrategies is empty */}
          {displayedStrategies.length === 0 ? (
            <p>No strategies available. Please create or load strategies to view them here.</p>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }} className='list-row'>
                {displayedStrategies.map((strategy, index) => {
                  // Calculate aggregated summary for the strategy's backtest results
                  const { avgTotalPnL, avgWinRateCombined } = strategy.backtestResult 
                    ? calculateAggregatedSummary(strategy.backtestResult) 
                    : { avgTotalPnL: '0.00', avgWinRateCombined: '0.00' };
                    
                const timeFrame = strategy.timePeriod
                const numberSymbols = strategy.backSymbol.length

                const totalInvestment = Array.isArray(strategy.backtestResult)
                    ? strategy.backtestResult.reduce(
                        (sum, result) => sum + (result?.result?.investedTotal || 0),
                        0
                        )
                    : 0;

            // Calculate ROI
                 const roi = totalInvestment > 0 ? (parseFloat(avgTotalPnL) / totalInvestment) * 100 : 0;

      

                let durationDisplay
                if (strategy.startDate){
                    durationDisplay = calculateDuration(strategy.startDate, strategy.endDate);
                }
                  return (
                    <div
                      key={index}
                      style={{
                        width: '100%',
                        minHeight: '186px',                    
                        border: selectedStrategy === strategy ? '2px solid #5A55D2' : 'none',
                        backgroundColor: selectedStrategy === strategy ? '#e0e0ff' : 'transparent',
                        cursor: 'pointer',
                        border: '1px solid var(--primary-light, #EFEEFB)',
                        position: 'relative',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                      }}
                      className='list-item-container'
                      onClick={() => handleStrategyClick(strategy)}
                    >   
                      <h3> <strong>{strategy.strategyName}</strong></h3>
                    
                      {/* Display the aggregated summary */}    
                      {strategy.backtestResult && (
                        <>  
                          <h3>PnL :<p style={{color : avgTotalPnL > 0 ? '#3CAA82':'#CC4F4F' ,margin:0}}>&nbsp; {avgTotalPnL}</p> </h3>
                          <h3>Win :<p style={{color : avgWinRateCombined > 0 ? '#3CAA82':'#CC4F4F',margin:0}}>&nbsp; {avgWinRateCombined}%</p>  </h3>
                          <h3>ROI : <p style={{color : roi> 0 ? '#3CAA82':'#CC4F4F',margin:0}}>&nbsp; {roi.toFixed(2)}</p> </h3>
                          <h3>Duration: {durationDisplay}</h3>
                           
                          <h3>Stocks : {numberSymbols}</h3>
                          <div style={{background : '#5A55D2' ,borderRadius:'4px',color:'white', textTransform: 'capitalize' ,width:'40%'  ,textAlign:'center', fontSize:12}}>{timeFrame}</div> 
                        </>
                    )}

                      {/* Delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the click from triggering the strategy selection
                          handleDelete(strategy);
                        }}
                        className='strategy-delete-btn'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                          <circle cx="8.07867" cy="8.07874" r="5.71518" transform="rotate(-43.2422 8.07867 8.07874)" fill="#5A55D2"/>
                          <rect x="4.77295" y="10.4031" width="8.00125" height="1.14304" rx="0.571518" transform="rotate(-43.2422 4.77295 10.4031)" fill="white"/>
                          <rect x="5.75439" y="4.77295" width="8.00125" height="1.14304" rx="0.571518" transform="rotate(46.7579 5.75439 4.77295)" fill="white"/>
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} className='next-btn-container'>
                <button onClick={handlePrevPage} disabled={currentPage === 0}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                    <circle cx="12.8471" cy="12.8471" r="12.8471" transform="matrix(-0.728465 -0.685083 -0.685083 0.728465 36.3198 17.6025)" fill="#5A55D2"/>
                    <path d="M20.5845 11.2393L13.8408 17.9829L20.5845 24.7266" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                    <circle cx="18.16" cy="18.1599" r="12.8471" transform="rotate(-43.2422 18.16 18.1599)" fill="#5A55D2"/>
                    <path d="M15.7354 11.2393L22.479 17.9829L15.7354 24.7266" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}






                <div className='strategy-list-btn'>
                    <div>
                    <button>Compare</button>
                    <button>view all</button>

                    </div>

                    <button onClick={handleCreateNewStrategy}>create new strategy</button>
                </div>


            </div>


            <div className='strategy-build'>

                <div className='strategy-navbar'>
                    <div className='nav-item'>
                        <button onClick={()=>setActivePage('build')}
                         className={activePage === 'build' ? 'active' : ''}
                        >Build strategy</button>
                    </div>

                    <div className='nav-item'>
                        <button onClick={()=>setActivePage('back')}
                         className={activePage === 'back' ? 'active' : ''}
                        >Backtest strategy</button>
                    </div>

                    <div className='nav-item'>
                        <button onClick={()=>setActivePage('optimise')}
                         className={activePage === 'optimise' ? 'active' : ''}
                        >Optimize strategy</button>
                    </div>

                    <div className='nav-item'>
                        <button 
                        onClick={()=>setActivePage('deploy')}
                        className={activePage === 'deploy' ? 'active' : ''}
                        >Deploy
                        </button>
                    </div>

                </div>

                {   activePage === 'back' && (
                     <StrategyBacktestPage
                         strategyListIndi={strategyListIndi}
                         setStrategyListIndi = {setStrategyListIndi}
                        setBacktestResult = {setBacktestResult}
                        setActivePage = {setActivePage}
                        setOptimiseStrategy={setOptimiseStrategy}
                        currentStrategy = {selectedStrategy}
                     ></StrategyBacktestPage>

                )
                    
                }


                {  activePage === 'optimise' && (

                    <StrategyOptimise
                    backtestResult={backtestResult}
                    strategyListIndi={strategyListIndi}
                    setStrategyListIndi = {setStrategyListIndi}
                    optimiseStrategy={optimiseStrategy}
                    currentStrategy = {selectedStrategy}
                    >
                        
                    </StrategyOptimise>
                )


                }


                { activePage === 'build' && (
                    <div>

                <div className='strategy-type'>
                    <div className='heading'>
                        <h3>Strategy Type</h3>
                    </div>

                    <div className='type-container'>
                       

                    {/* <div className='slide-button'>

                        <h3>Time Based</h3>
                        <div className='highlight-button'>
                            <h4>Indicator Based</h4>
                        </div>


                    </div> */}


                    <div className='strategy-select-container'>

                    <input type="checkbox" id="toggle" />
                    <label id='tg' for="toggle">Time Based</label>
                    </div>
                   



                    <input className='name-input' type='text' placeholder=' Strategy Name' value={strategyName} onChange={(e)=>setStrategyName(e.target.value)}>
                          
                    </input>

                    </div>


                    <div className='add-description'>
                        <h4>Add Description </h4>

                       


                        {showAddDescription === true ? ( <svg onClick={toggleAddDescription} xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <g clip-path="url(#clip0_40_653)">
                        <circle cx="10" cy="10" r="10" transform="matrix(1 0 0 -1 0.5 20.8893)" fill="#5A55D2"/>
                        <path d="M14.7586 12.7415L10.592 8.57485L6.42529 12.7415" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_40_653">
                        <rect width="20" height="20" fill="white" transform="translate(0.5 0.889282)"/>
                        </clipPath>
                    </defs>
                    </svg>) :(<svg onClick={toggleAddDescription} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <g clip-path="url(#clip0_1_9058)">
                            <circle cx="10" cy="10" r="10" transform="matrix(-1 0 0 1 20.5 0)" fill="#5A55D2"/>
                            <path d="M6.24125 8.14779L10.4079 12.3145L14.5746 8.14779" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_1_9058">
                            <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 -1 20.5 20)"/>
                            </clipPath>
                        </defs>
                        </svg>) }
                    </div>

                    {showAddDescription && (

                        <textarea className='description' rows="4" ></textarea>

                    )}

                    

                </div>

               

                <div className='positions'>
                    <div className='heading'>
                        <h3>Positions</h3>
                    </div>


                    <div className='add-symbol'>
                        
                        {showStockList.length > 0 && (
                            <button id="open-modal" onClick={toggleModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <circle cx="15" cy="15" r="14.5" fill="#5A55D2" stroke="white" stroke-dasharray="2 2"/>
                                <path d="M16.0884 14.9177H22V16.0958H16.0884V22H14.8979V16.0958H9V14.9177H14.8979V9H16.0884V14.9177Z" fill="white"/>
                            </svg>
                            </button>
    
                        )}

                        {showStockList.length===0 && (
                             <button className='modal-open' onClick={toggleModal}>
                             <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                             <path d="M10.1562 3.75V16.25M16.4062 10H3.90625" stroke="#5A55D2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                             </svg>
                             <h3>Add Instrument</h3>
                             </button>
                        )}
                        
                       


                        {/* <button id='modal-open' onClick={toggleModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 3.75V16.25M16.25 10H3.75" stroke="#5A55D2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button> */}
                       
                        <ul className='stock-item-show'>
                            {showStockList.map((stock, index) => (
                            <li key={index}>
                                <div>
                                {stock}

                                </div>
                               
                                
                                <div>   
                                    <svg onClick={() => removeStockList(stock)} cursor='pointer' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.19094 3.19088C3.27297 3.10895 3.38417 3.06293 3.5001 3.06293C3.61604 3.06293 3.72724 3.10895 3.80927 3.19088L7.0001 6.38172L10.1909 3.19088C10.231 3.1479 10.2793 3.11342 10.333 3.08951C10.3866 3.0656 10.4446 3.05274 10.5033 3.0517C10.562 3.05067 10.6204 3.06147 10.6749 3.08348C10.7293 3.10548 10.7788 3.13823 10.8204 3.17978C10.8619 3.22132 10.8947 3.27081 10.9167 3.32528C10.9387 3.37976 10.9495 3.43811 10.9484 3.49685C10.9474 3.5556 10.9346 3.61353 10.9106 3.6672C10.8867 3.72086 10.8523 3.76916 10.8093 3.80922L7.61844 7.00005L10.8093 10.1909C10.8523 10.2309 10.8867 10.2792 10.9106 10.3329C10.9346 10.3866 10.9474 10.4445 10.9484 10.5032C10.9495 10.562 10.9387 10.6203 10.9167 10.6748C10.8947 10.7293 10.8619 10.7788 10.8204 10.8203C10.7788 10.8619 10.7293 10.8946 10.6749 10.9166C10.6204 10.9386 10.562 10.9494 10.5033 10.9484C10.4446 10.9474 10.3866 10.9345 10.333 10.9106C10.2793 10.8867 10.231 10.8522 10.1909 10.8092L7.0001 7.61838L3.80927 10.8092C3.72633 10.8865 3.61664 10.9286 3.5033 10.9266C3.38996 10.9246 3.28181 10.8787 3.20166 10.7985C3.1215 10.7183 3.07558 10.6102 3.07358 10.4969C3.07158 10.3835 3.11366 10.2738 3.19094 10.1909L6.38177 7.00005L3.19094 3.80922C3.10901 3.72718 3.06299 3.61599 3.06299 3.50005C3.06299 3.38411 3.10901 3.27291 3.19094 3.19088Z" fill="#C6CBDF"/>
                                    </svg>
                                </div>

                                
                                </li>
                            ))}
                        </ul>

                       

                        {/* <div className='symbol-item'>
                            <div>
                                <h3>ADANI GROUP</h3>
                                <h4>NSE</h4>

                            </div>

                            <div className='button-select-close'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                                <path d="M3.37402 8.375L9.49647 3.125M3.37402 3.125L9.49647 8.375" stroke="#C6CBDF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.45264 5.41667C1.45264 3.3225 3.25407 1.625 5.47645 1.625C7.69883 1.625 9.50026 3.3225 9.50026 5.41667C9.50026 7.51083 7.69883 9.20833 5.47645 9.20833C3.25407 9.20833 1.45264 7.51083 1.45264 5.41667ZM6.96629 4.71122C6.99105 4.68013 7.00897 4.64469 7.01898 4.60698C7.029 4.56927 7.03092 4.53006 7.02462 4.49164C7.01833 4.45322 7.00395 4.41638 6.98232 4.38327C6.9607 4.35017 6.93227 4.32147 6.89871 4.29886C6.86515 4.27626 6.82713 4.26021 6.78689 4.25164C6.74665 4.24308 6.705 4.24219 6.66439 4.24901C6.62378 4.25584 6.58502 4.27024 6.5504 4.29138C6.51578 4.31252 6.486 4.33997 6.4628 4.37211L5.1273 6.13378L4.45708 5.50222C4.39841 5.4507 4.3208 5.42265 4.24061 5.42399C4.16042 5.42532 4.08392 5.45593 4.02721 5.50937C3.9705 5.56281 3.93801 5.6349 3.9366 5.71046C3.93518 5.78603 3.96495 5.85915 4.01962 5.91444L4.94819 6.78944C4.97997 6.81936 5.01827 6.8424 5.06044 6.85697C5.10261 6.87154 5.14765 6.87729 5.19241 6.87381C5.23718 6.87033 5.2806 6.85771 5.31967 6.83683C5.35875 6.81595 5.39252 6.78731 5.41867 6.75289L6.96629 4.71122Z" fill="#5A55D2"/>
                                </svg>
                            </div>

                        </div>

                        <div className='symbol-item'>
                            <div>
                                <h3>Infosys Ltd</h3>
                                <h4>NSE</h4>

                            </div>

                            <div className='button-select-close'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                                <path d="M3.37402 8.375L9.49647 3.125M3.37402 3.125L9.49647 8.375" stroke="#C6CBDF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.45264 5.41667C1.45264 3.3225 3.25407 1.625 5.47645 1.625C7.69883 1.625 9.50026 3.3225 9.50026 5.41667C9.50026 7.51083 7.69883 9.20833 5.47645 9.20833C3.25407 9.20833 1.45264 7.51083 1.45264 5.41667ZM6.96629 4.71122C6.99105 4.68013 7.00897 4.64469 7.01898 4.60698C7.029 4.56927 7.03092 4.53006 7.02462 4.49164C7.01833 4.45322 7.00395 4.41638 6.98232 4.38327C6.9607 4.35017 6.93227 4.32147 6.89871 4.29886C6.86515 4.27626 6.82713 4.26021 6.78689 4.25164C6.74665 4.24308 6.705 4.24219 6.66439 4.24901C6.62378 4.25584 6.58502 4.27024 6.5504 4.29138C6.51578 4.31252 6.486 4.33997 6.4628 4.37211L5.1273 6.13378L4.45708 5.50222C4.39841 5.4507 4.3208 5.42265 4.24061 5.42399C4.16042 5.42532 4.08392 5.45593 4.02721 5.50937C3.9705 5.56281 3.93801 5.6349 3.9366 5.71046C3.93518 5.78603 3.96495 5.85915 4.01962 5.91444L4.94819 6.78944C4.97997 6.81936 5.01827 6.8424 5.06044 6.85697C5.10261 6.87154 5.14765 6.87729 5.19241 6.87381C5.23718 6.87033 5.2806 6.85771 5.31967 6.83683C5.35875 6.81595 5.39252 6.78731 5.41867 6.75289L6.96629 4.71122Z" fill="#5A55D2"/>
                                </svg>
                            </div>

                        </div> */}



                    </div>

                    {isModalOpen && (
                        <div id="modal">
                        <div className="modal-content">
                            {/* <div className='instrument-select'>

                                <div>
                                    <input type='checkbox'></input>
                                    <label>Options</label>
                                </div>

                                <div>
                                    <input type='checkbox'></input>
                                    <label>Equity</label>
                                </div>

                                <div>
                                    <input type='checkbox'></input>
                                    <label>Index</label>
                                </div>


                            </div> */}


                            <div className='instrument-select'>

                                 <div className='instrumnet-type-select'>
                                    <input type='radio' id='index' name='instrument' value='index' onChange={handleChange} checked={selectedInstrument === 'index'} />
                                    <label htmlFor='index'>Index</label>
                                </div>
                               

                                <div className='instrumnet-type-select'>
                                    <input type='radio' id='equity' name='instrument' value='equity' onChange={handleChange} checked={selectedInstrument === 'equity'} />
                                    <label htmlFor='equity'>Equity</label>
                                </div>

                                <div className='instrumnet-type-select'>
                                    <input type='radio' id='options' name='instrument' value='options' onChange={handleChange} checked={selectedInstrument === 'options'} />
                                    <label htmlFor='options'>Options</label>
                                </div>

                               
                            </div>

                            {selectedInstrument === 'options' &&(
                                <div>
                                <h3>* Only option category allowed for Time-Based strategy type</h3>
                            </div>

                            )}
                            

                            <div className='line'>
                            </div>
                            


                            {selectedInstrument === 'index' && (

                                <div className='instrument-list'>

                        <div className="selected-stocks">

                        <ul className='stock-item'>
                            {selectedStocks.map((stock, index) => (
                            <li key={index}>
                                {stock}
                                <div onClick={() => removeStock(stock)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.19094 3.19088C3.27297 3.10895 3.38417 3.06293 3.5001 3.06293C3.61604 3.06293 3.72724 3.10895 3.80927 3.19088L7.0001 6.38172L10.1909 3.19088C10.231 3.1479 10.2793 3.11342 10.333 3.08951C10.3866 3.0656 10.4446 3.05274 10.5033 3.0517C10.562 3.05067 10.6204 3.06147 10.6749 3.08348C10.7293 3.10548 10.7788 3.13823 10.8204 3.17978C10.8619 3.22132 10.8947 3.27081 10.9167 3.32528C10.9387 3.37976 10.9495 3.43811 10.9484 3.49685C10.9474 3.5556 10.9346 3.61353 10.9106 3.6672C10.8867 3.72086 10.8523 3.76916 10.8093 3.80922L7.61844 7.00005L10.8093 10.1909C10.8523 10.2309 10.8867 10.2792 10.9106 10.3329C10.9346 10.3866 10.9474 10.4445 10.9484 10.5032C10.9495 10.562 10.9387 10.6203 10.9167 10.6748C10.8947 10.7293 10.8619 10.7788 10.8204 10.8203C10.7788 10.8619 10.7293 10.8946 10.6749 10.9166C10.6204 10.9386 10.562 10.9494 10.5033 10.9484C10.4446 10.9474 10.3866 10.9345 10.333 10.9106C10.2793 10.8867 10.231 10.8522 10.1909 10.8092L7.0001 7.61838L3.80927 10.8092C3.72633 10.8865 3.61664 10.9286 3.5033 10.9266C3.38996 10.9246 3.28181 10.8787 3.20166 10.7985C3.1215 10.7183 3.07558 10.6102 3.07358 10.4969C3.07158 10.3835 3.11366 10.2738 3.19094 10.1909L6.38177 7.00005L3.19094 3.80922C3.10901 3.72718 3.06299 3.61599 3.06299 3.50005C3.06299 3.38411 3.10901 3.27291 3.19094 3.19088Z" fill="#C6CBDF"/>
                                    </svg>
                                </div>

                                </li>
                            ))}
                        </ul>
                        </div>
                                

                                {Object.keys(optionList).map(key => (
                        <div key={key} className="instrument-item-equity">
                            <h4>{key}</h4>
                            <input
                                type="checkbox"
                                checked={selectedStocks.includes(key)}
                                onChange={() => handleStockSelect(key, 'index')}
                            />
                        </div>
                    ))}

                    
       


                               
                                 {/* <div className="selected-stocks">
                        
                        <ul className='stock-item'>
                            {selectedStocks.map((stock, index) => (
                            <li key={index}>
                                {stock}
                                <div onClick={() => removeStock(stock)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.19094 3.19088C3.27297 3.10895 3.38417 3.06293 3.5001 3.06293C3.61604 3.06293 3.72724 3.10895 3.80927 3.19088L7.0001 6.38172L10.1909 3.19088C10.231 3.1479 10.2793 3.11342 10.333 3.08951C10.3866 3.0656 10.4446 3.05274 10.5033 3.0517C10.562 3.05067 10.6204 3.06147 10.6749 3.08348C10.7293 3.10548 10.7788 3.13823 10.8204 3.17978C10.8619 3.22132 10.8947 3.27081 10.9167 3.32528C10.9387 3.37976 10.9495 3.43811 10.9484 3.49685C10.9474 3.5556 10.9346 3.61353 10.9106 3.6672C10.8867 3.72086 10.8523 3.76916 10.8093 3.80922L7.61844 7.00005L10.8093 10.1909C10.8523 10.2309 10.8867 10.2792 10.9106 10.3329C10.9346 10.3866 10.9474 10.4445 10.9484 10.5032C10.9495 10.562 10.9387 10.6203 10.9167 10.6748C10.8947 10.7293 10.8619 10.7788 10.8204 10.8203C10.7788 10.8619 10.7293 10.8946 10.6749 10.9166C10.6204 10.9386 10.562 10.9494 10.5033 10.9484C10.4446 10.9474 10.3866 10.9345 10.333 10.9106C10.2793 10.8867 10.231 10.8522 10.1909 10.8092L7.0001 7.61838L3.80927 10.8092C3.72633 10.8865 3.61664 10.9286 3.5033 10.9266C3.38996 10.9246 3.28181 10.8787 3.20166 10.7985C3.1215 10.7183 3.07558 10.6102 3.07358 10.4969C3.07158 10.3835 3.11366 10.2738 3.19094 10.1909L6.38177 7.00005L3.19094 3.80922C3.10901 3.72718 3.06299 3.61599 3.06299 3.50005C3.06299 3.38411 3.10901 3.27291 3.19094 3.19088Z" fill="#C6CBDF"/>
                                    </svg>
                                </div>
                                
                                </li>
                            ))}
                        </ul>
                        </div>
                            <div className="instrument">
                            {optionList.map((stock, index) => (
                                <div key={index} className="instrument-item-equity">
                                <h4>{stock.key}</h4>
                                <input
                                    type="checkbox"
                                    checked={selectedStocks.includes(stock[index])}
                                    onChange={() => handleStockSelect(stock[index])}
                                />
                                </div>
                            ))}
                            </div>
                            */}
                       

                                </div>


                            )}

                            

                            {/* {selectedInstrument === 'equity' &&(
                               StockList.map((stock, index) => (
                                <div key={index} className='instrument-item-equity'>
                                  <h4>{stock}</h4>
                                <input type='checkbox'></input>
                                </div>
                              ))
                              

                            )} */}

                        {selectedInstrument === 'equity' && (
                        <div>
                            <input
                            className='instrument-search'
                            type="text"
                            placeholder="Search and stocks"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            />

                        <div className="selected-stocks">
                        
                        <ul className='stock-item'>
                            {selectedStocks.map((stock, index) => (
                            <li key={index}>
                                {stock}
                                <div onClick={() => removeStock(stock)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.19094 3.19088C3.27297 3.10895 3.38417 3.06293 3.5001 3.06293C3.61604 3.06293 3.72724 3.10895 3.80927 3.19088L7.0001 6.38172L10.1909 3.19088C10.231 3.1479 10.2793 3.11342 10.333 3.08951C10.3866 3.0656 10.4446 3.05274 10.5033 3.0517C10.562 3.05067 10.6204 3.06147 10.6749 3.08348C10.7293 3.10548 10.7788 3.13823 10.8204 3.17978C10.8619 3.22132 10.8947 3.27081 10.9167 3.32528C10.9387 3.37976 10.9495 3.43811 10.9484 3.49685C10.9474 3.5556 10.9346 3.61353 10.9106 3.6672C10.8867 3.72086 10.8523 3.76916 10.8093 3.80922L7.61844 7.00005L10.8093 10.1909C10.8523 10.2309 10.8867 10.2792 10.9106 10.3329C10.9346 10.3866 10.9474 10.4445 10.9484 10.5032C10.9495 10.562 10.9387 10.6203 10.9167 10.6748C10.8947 10.7293 10.8619 10.7788 10.8204 10.8203C10.7788 10.8619 10.7293 10.8946 10.6749 10.9166C10.6204 10.9386 10.562 10.9494 10.5033 10.9484C10.4446 10.9474 10.3866 10.9345 10.333 10.9106C10.2793 10.8867 10.231 10.8522 10.1909 10.8092L7.0001 7.61838L3.80927 10.8092C3.72633 10.8865 3.61664 10.9286 3.5033 10.9266C3.38996 10.9246 3.28181 10.8787 3.20166 10.7985C3.1215 10.7183 3.07558 10.6102 3.07358 10.4969C3.07158 10.3835 3.11366 10.2738 3.19094 10.1909L6.38177 7.00005L3.19094 3.80922C3.10901 3.72718 3.06299 3.61599 3.06299 3.50005C3.06299 3.38411 3.10901 3.27291 3.19094 3.19088Z" fill="#C6CBDF"/>
                                    </svg>
                                </div>
                                
                                </li>
                            ))}
                        </ul>
                        </div>
                            <div className="instrument">
                            {filteredStocks.map((stock, index) => (
                                <div key={index} className="instrument-item-equity">
                                <h4>{stock}</h4>
                                <input
                                    type="checkbox"
                                    checked={selectedStocks.includes(stock)}
                                    onChange={() => handleStockSelect(stock,'stock')}
                                />
                                </div>
                            ))}
                            </div>
                           
                        </div>
                        )}

                              
                          
                        </div>
                        <div className='modal-button-container'> 
                                <button className='modal-close' onClick={toggleModal}>Close </button>
                                <button className='modal-done' onClick={handleDone}>Done</button>
                                </div>
                        </div>
                    )}

                    <div className='quantity'>
                    <h3>
                    Quantity
                    </h3>

                    <input className='quantity-input'  value={backQuantity} type='number' min={0} onChange={(e)=>setBackQuantity(Number(e.target.value))} >
                     
                    </input>


                </div>


                <div className='input-container'>
                    <div>
                        <h3>Order Type</h3>

                        <div className='switch-container'>
                            <input type='radio' value='mis' onChange={handleOrderChange} checked={selectedOrder==='mis'}></input>
                            <label>MIS</label>
                            
                            <input type='radio' value='cnc' onChange={handleOrderChange} checked={selectedOrder==='cnc'}></input>
                            <label>CNC</label>
                        </div>

                    </div>

                    <div>
                        <h3>Chart Type</h3>

                        <div  className='switch-container'>
                        <input type='radio' value='candle' onChange={handleChartChange} checked={selectedChart==='candle'}></input>
                        <label>Candle</label>
                            
                            <input type='radio' value='heikin-ashi' onChange={handleChartChange} checked={selectedChart==='heikin-ashi'}></input>
                            <label>Helkin Ashi</label>
                        </div>

                    </div>

                    <div>
                        <h3>Interval</h3>

                        {/* <FormSelect
                            onChange={(e) => setSelectedInterval(e.target.value)}
                            className='w-25'
                            value={selectedInterval}
                        >
                            {Object.entries(intervals).map(([label, value]) => (
                            <option key={value} value={value}>{label}</option>
                            ))}
                        </FormSelect> */}

                    

                        <div className='interval-btn'>
                            {['1M', '5M', '10M', '15M', '30M', '1H', '1D'].map((interval, index) => (
                            <button
                                key={index}
                                className={selectedInterval === interval ? 'selected' : ''}
                                onClick={() => handleIntervalClick(interval)}
                                style={{
                                borderRadius: index === 0 ? '10px 0 0 10px' : index === 6 ? '0 10px 10px 0' : '0'
                                }}
                            >
                                {interval}
                            </button>
                            ))}
                         </div>

                    </div>

                </div>

                <div className='position-sizing' >
                    <h3>Position Sizing</h3>

                    {showSizingInputs === true ? ( <svg onClick={toggleSizingInputs} xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <g clip-path="url(#clip0_40_653)">
                        <circle cx="10" cy="10" r="10" transform="matrix(1 0 0 -1 0.5 20.8893)" fill="#5A55D2"/>
                        <path d="M14.7586 12.7415L10.592 8.57485L6.42529 12.7415" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_40_653">
                        <rect width="20" height="20" fill="white" transform="translate(0.5 0.889282)"/>
                        </clipPath>
                    </defs>
                    </svg>) :(<svg onClick={toggleSizingInputs} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <g clip-path="url(#clip0_1_9058)">
                            <circle cx="10" cy="10" r="10" transform="matrix(-1 0 0 1 20.5 0)" fill="#5A55D2"/>
                            <path d="M6.24125 8.14779L10.4079 12.3145L14.5746 8.14779" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_1_9058">
                            <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 -1 20.5 20)"/>
                            </clipPath>
                        </defs>
                        </svg>) }
                   


                    
                </div>

                {showSizingInputs && (
                        <div className='sizing-input-container'>
                        <select className='sizing-input' onChange={(e)=>setPositionSizeType(e.target.value)}>
                            <option>Select Position Size</option>
                            <option>Capital Based</option>
                            <option>Risk Based</option>
                        </select>

                        <input className='sizing-input' type='number' placeholder='Max Allocation' onChange={(e)=>setSizeAmount(Number(e.target.value))}/>
                        <input className='sizing-input' type='number' placeholder='Max Quantity' onChange={(e)=>setMaxQuantity(Number(e.target.value))}/>
                        </div>
                    )}

                </div>



                <div className='entry-condition'>
                    <div className='heading'>
                        <h3>Entry Condition</h3>

                    </div>

                    <div className='switch-conatainer'>
                        <input type='radio' value='both' onChange={handleSideChange} checked={selectedSide==='both'}></input>
                        <label>Both Side</label>

                        <input type='radio' value='long' onChange={handleSideChange} checked={selectedSide==='long'}></input>
                        <label>Only Long</label>

                        <input type='radio' value='short' onChange={handleSideChange} checked={selectedSide==='short'}></input>
                        <label>Only Short</label>


                    </div>


                    <div className='condition-container'>

                            
                            <div className='long-container'>
                                
                                                        
                            <Condition
                            strategy  = {strategyDetails}
                            setStrategy = {setStrategyDetails}
                            strategy2={strategyDetails2}
                            setStrategy2={setStrategyDetails2}
                            type = {'Entry'}
                            setMaxLong = {setMaxLong}
                            setMaxShort={setMaxShort}
                            selectedSide = {selectedSide}
                        />

                            

                        </div>


                       

                            


                    </div>




                </div>


                <div className='entry-condition'>
                    <div className='heading'>
                        <h3>Exit Condition</h3>

                    </div>

                  


                    <div className='condition-container'>
                            <div className='long-container'>
                            {/* <div className='sub-heading'>
                                <h3>Long</h3>
                                <div>
                                    <h4>Max Entry</h4>
                                    
                                </div>
                            </div> */}

                            <div className='long-inputs'>
                                <div >
                                    <h5>Stop loss</h5>
                                    <input className='input-item' type='number' placeholder='' value={pyStoploss} onChange={(e)=>setPyStoploss(Number(e.target.value))}>
                                    
                                    </input>
                                </div>

                                <div>
                                    <h5>Target profit </h5>
                                    <input className='input-item' type='number' value={pyTarget} onChange={(e)=>setPyTarget(Number(e.target.value))}>
                                       
                                    </input>
                                </div>

                                <div>
                                    <h5>Type</h5>
                                    <input className='input-item' type='number'>
                                   
                                    </input>
                                </div>

                                
                            </div>

                        </div>


                        <div className='short-container'>
                            {/* <div className='sub-heading'>
                                <h3>Short</h3>
                                <div>
                                    <h4>Max Entry</h4>
                                    
                                </div>
                            </div> */}

                            <div className='short-inputs'>
                                <div>
                                    <h5 className='instrumnet-moves'>If Instrument Moves (X)</h5>
                                    <input className='input-item' type='number' onChange={(e)=>setMoveInstrument(Number(e.target.value))}>
                                        {/* <h6>Select Indicator</h6>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M14.625 6.1875L9 11.8125L3.375 6.1875" stroke="#C6CBDF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>   */}
                                    </input>
                                </div>

                                <div>
                                    <h5 className='stoplos-move' >Then Moves stoploss by (Y)</h5>
                                    <input className='input-item' type='number' onChange={(e)=> setMoveSl(Number(e.target.value))}>
                                    {/* <h6>Select Indicator</h6>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M14.625 6.1875L9 11.8125L3.375 6.1875" stroke="#C6CBDF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg> */}
                                    </input>
                                </div>

                                <div>
                                    <h5>Trailing SL type</h5>

                                    <select  onChange={(e)=>setTrailingType(e.target.value)}>
                                            <option value='%'>Percentage(%)</option>
                                            <option value='abs'>Absolute(abs)</option>
                                            <option value='pts'>Points(pts)</option>    

                                    </select>
                                   
                                </div>

                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <circle cx="15" cy="15" r="14.5" stroke="#5A55D2" stroke-dasharray="3 3"/>
                                <path d="M16.0884 14.9177H22V16.0958H16.0884V22H14.8979V16.0958H9V14.9177H14.8979V9H16.0884V14.9177Z" fill="#5A55D2"/>
                                </svg> */}
                            </div>

                        </div>

                        <div className='position-sizing'>
                            <h3>Exit Signal</h3>
                            
                            {showExitInputs === true ? ( <svg onClick={toggleExitInputs} xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <g clip-path="url(#clip0_40_653)">
                        <circle cx="10" cy="10" r="10" transform="matrix(1 0 0 -1 0.5 20.8893)" fill="#5A55D2"/>
                        <path d="M14.7586 12.7415L10.592 8.57485L6.42529 12.7415" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_40_653">
                        <rect width="20" height="20" fill="white" transform="translate(0.5 0.889282)"/>
                        </clipPath>
                    </defs>
                    </svg>) :(<svg onClick={toggleExitInputs} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <g clip-path="url(#clip0_1_9058)">
                            <circle cx="10" cy="10" r="10" transform="matrix(-1 0 0 1 20.5 0)" fill="#5A55D2"/>
                            <path d="M6.24125 8.14779L10.4079 12.3145L14.5746 8.14779" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_1_9058">
                            <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 -1 20.5 20)"/>
                            </clipPath>
                        </defs>
                        </svg>) }
                             </div>

                             {showExitInputs &&(
                                <div>
                                    <div className='switch-conatainer'>
                                        <input type='radio' value='both' onChange={handleSideChangeExit} checked={selectedSideExit==='both'}></input>
                                        <label>Both Side</label>

                                        <input type='radio' value='long' onChange={handleSideChangeExit} checked={selectedSideExit==='long'}></input>
                                        <label>Only Long</label>

                                        <input type='radio' value='short' onChange={handleSideChangeExit} checked={selectedSideExit==='short'}></input>
                                        <label>Only Short</label>


                                    </div>

                                            <div className='long-container'>
                                                <Condition
                                                    strategy  = {strategyDetailsExit}
                                                    setStrategy = {setStrategyDetailsExit}
                                                    strategy2={strategyDetailsExit2}
                                                    setStrategy2={setStrategyDetailsExit2}
                                                    type = {'Exit'}
                                                    setMaxLong = {setMaxLong}
                                                    setMaxShort={setMaxShort}
                                                    selectedSideExit={selectedSideExit}
                                                />

                                            </div>

                        <div className='short-container'>
                            
                            
                           

                        </div>

                                            </div>
                             ) }
            


                    </div>

                    <div className='btn-backtest-container'>
                   {isNextEnable ? (
                    <button className='btn-backtest' onClick={handleNext}>
                        Next
                    </button>
                    ) : (
                    <button className='btn-backtest' onClick={handleSaveStrategy}>
                        Save Strategy
                    </button>
                    )}

                    </div>

                    



                </div>

                </div>

                )}



               


            </div>


        </div>




    </div>
  )
}

export default StrategyBuildPage