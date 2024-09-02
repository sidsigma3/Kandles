import React ,{useState,useEffect}from 'react'
import { Modal, Button, Form ,FormLabel, FormControl, FormGroup, FormCheck, FormSelect } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { getYear, getMonth, format , getDate } from 'date-fns';
import { ProgressBar } from 'react-loader-spinner'
import { Table } from 'react-bootstrap';
import CummulativePnlGraph from '../Graph/CummulativePnlGraph';
import DailyPnlGraph from '../Graph/DailyPnlGraph';
import DrawdownGraph from '../Graph/DrawdownGraph';
import TradeGraph from '../Graph/TradeGraph';
import BootstrapPagination from '../overview/BootstrapPagination';

const StrategyResult = ({backtest,loading ,backCapital,marketType}) => {


    // const [loading, setLoading] = useState(false);

    const [tradingChargeShow,setTradingChargeShow] = useState(false)

    const [listPerPage,setListPerPage] = useState(20)

    const [filteredTrades,setFilterdTrades] = useState()
    const [currentTrades,setCurrentTrades] = useState()

    const [tradeTypeFilter,setTradeTypeFilter] = useState('All')

    const [selectedSymbol,setSelectedSymbol] = useState()
    const [selectedSentiment, setSelectedSentiment] = useState('All')
    const [selectedTrigger, setSelectedTrigger] = useState('All')

    const [maxDrawdown, setMaxDrawdown] = useState(0);
    const [maxDrawdownDays, setMaxDrawdownDays] = useState(0);

    const [csvData,setCsvData] = useState()

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [listOrder,setListOrder] = useState(true)

    const [summary, setSummary] = useState({
      totalSignals: 0,
      profitFactor: 0,
      totalWins: 0,
      totalLosses: 0,
      maxDrawdown: 0
    });

    const [selectedDays, setSelectedDays] = useState({
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
  


    const [fromVix, setFromVix] = useState('1');
    const [toVix, setToVix] = useState('99');
    const [vixRange, setVixRange] = useState({ from: '1', to: '99' });

    const handleVixRange = (e) =>{
        e.preventDefault(); // Prevent the default form submission behavior
        setVixRange({ from: fromVix, to: toVix });
    }

    const [selectedIndex,setSelectedIndex] = useState()
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
        setSelectedSymbol(sortedBacktest[index].symbol)
        setSelectedIndex(index)
        setTradeTypeFilter('All')
        setSelectedGraph('trade')
        setSelectedSentiment('All')
        setSelectedTrigger('All')

    };

    const toggleDayForFilter = (day) => {
        setSelectedDaysForFilter((prevDays) => ({
          ...prevDays,
          [day]: !prevDays[day],
        }));
      };


      const handleSentimentChange = (event) => {
        setSelectedSentiment(event.target.value);
      };

      const handleTriggerChange = (event) => {
        setSelectedTrigger(event.target.value);
      };
    
      function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleDateString('en-GB', options);
    }

      
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

    <div>


    <div>


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
                                          <table >
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
    </div>
  )
}

export default StrategyResult