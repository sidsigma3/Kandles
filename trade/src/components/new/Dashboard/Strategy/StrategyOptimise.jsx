import React , {useState , useEffect} from 'react'
import './StrategyOptimise.css'
import axios from 'axios'
import PropagateLoader from "react-spinners/PropagateLoader";

const initialStocks = [
    { name: "Stock A", winPercentage: 70, winLosingStreak: 5, maxDrawDown: 10, pnl: 5000, profitFactor: 1.5, expectancy: 2.5, averageLoss: 200, averageProfit: 300 },
    { name: "Stock B", winPercentage: 65, winLosingStreak: 4, maxDrawDown: 15, pnl: 4000, profitFactor: 1.4, expectancy: 2.2, averageLoss: 250, averageProfit: 280 },
    // ... more stocks
  ];
  

  const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage`, error);
    }
  };
  
  
  // Retrieve state from localStorage
  const retrieveFromLocalStorage = (key, defaultValue) => {
    try {
      const savedValue = localStorage.getItem(key);
      return savedValue ? JSON.parse(savedValue) : defaultValue;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage`, error);
      return defaultValue;
    }
  };
  
const StrategyOptimise = ({backtestResult,strategyListIndi,setStrategyListIndi,optimiseStrategy,currentStrategy}) => {
  const [winPercentChecked, setWinPercentChecked] = useState(() => retrieveFromLocalStorage('winPercentChecked', false));
  const [winPercentWeight, setWinPercentWeight] = useState(() => retrieveFromLocalStorage('winPercentWeight', ''));
  const [winPercentBetter, setWinPercentBetter] = useState(() => retrieveFromLocalStorage('winPercentBetter', 'Higher the better'));

  const [streakChecked, setStreakChecked] = useState(() => retrieveFromLocalStorage('streakChecked', false));
  const [streakWeight, setStreakWeight] = useState(() => retrieveFromLocalStorage('streakWeight', ''));
  const [streakBetter, setStreakBetter] = useState(() => retrieveFromLocalStorage('streakBetter', 'Higher the better'));

  const [drawDownChecked, setDrawDownChecked] = useState(() => retrieveFromLocalStorage('drawDownChecked', false));
  const [drawDownWeight, setDrawDownWeight] = useState(() => retrieveFromLocalStorage('drawDownWeight', ''));
  const [drawDownBetter, setDrawDownBetter] = useState(() => retrieveFromLocalStorage('drawDownBetter', 'Higher the better'));

  const [pnlChecked, setPnlChecked] = useState(() => retrieveFromLocalStorage('pnlChecked', false));
  const [pnlWeight, setPnlWeight] = useState(() => retrieveFromLocalStorage('pnlWeight', ''));
  const [pnlBetter, setPnlBetter] = useState(() => retrieveFromLocalStorage('pnlBetter', 'Higher the better'));

  const [profitFactorChecked, setProfitFactorChecked] = useState(() => retrieveFromLocalStorage('profitFactorChecked', false));
  const [profitFactorWeight, setProfitFactorWeight] = useState(() => retrieveFromLocalStorage('profitFactorWeight', ''));
  const [profitFactorBetter, setProfitFactorBetter] = useState(() => retrieveFromLocalStorage('profitFactorBetter', 'Higher the better'));

  const [expectancyChecked, setExpectancyChecked] = useState(() => retrieveFromLocalStorage('expectancyChecked', false));
  const [expectancyWeight, setExpectancyWeight] = useState(() => retrieveFromLocalStorage('expectancyWeight', ''));
  const [expectancyBetter, setExpectancyBetter] = useState(() => retrieveFromLocalStorage('expectancyBetter', 'Higher the better'));

  const [avgLossChecked, setAvgLossChecked] = useState(() => retrieveFromLocalStorage('avgLossChecked', false));
  const [avgLossWeight, setAvgLossWeight] = useState(() => retrieveFromLocalStorage('avgLossWeight', ''));
  const [avgLossBetter, setAvgLossBetter] = useState(() => retrieveFromLocalStorage('avgLossBetter', 'Higher the better'));

  const [avgProfitChecked, setAvgProfitChecked] = useState(() => retrieveFromLocalStorage('avgProfitChecked', false));
  const [avgProfitWeight, setAvgProfitWeight] = useState(() => retrieveFromLocalStorage('avgProfitWeight', ''));
  const [avgProfitBetter, setAvgProfitBetter] = useState(() => retrieveFromLocalStorage('avgProfitBetter', 'Higher the better'));
  const [rankedStocks, setRankedStocks] = useState(() => retrieveFromLocalStorage('rankedStocks', []));
 
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);



  const [variableInputs, setVariableInputs] = useState(() => retrieveFromLocalStorage('variableInputs', []));
  const [goal, setGoal] = useState(() => retrieveFromLocalStorage('goal', { optimize: 'Maximize', parameter: '' }));
  const [constraints, setConstraints] = useState(() => retrieveFromLocalStorage('constraints', {
    'Win Rate (%)': { enabled: false, weight: '', direction: 'Maximum' },
    'Winning Streak': { enabled: false, weight: '', direction: 'Maximum' },
    'Max Drawdown': { enabled: false, weight: '', direction: 'Minimum' },
    'Total PnL': { enabled: false, weight: '', direction: 'Maximum' },
    'Profit Factor': { enabled: false, weight: '', direction: 'Maximum' },
    'Expectancy': { enabled: false, weight: '', direction: 'Maximum' },
    'Avg Loss per Losing Trade': { enabled: false, weight: '', direction: 'Minimum' },
    'Avg Gain per Winning Trade': { enabled: false, weight: '', direction: 'Maximum' },
  }));

  const [indicatorDetails, setIndicatorDetails] = useState(() => retrieveFromLocalStorage('indicatorDetails', []));

  

  useEffect(() => {
    saveToLocalStorage('winPercentChecked', winPercentChecked);
    saveToLocalStorage('winPercentWeight', winPercentWeight);
    saveToLocalStorage('winPercentBetter', winPercentBetter);

    saveToLocalStorage('streakChecked', streakChecked);
    saveToLocalStorage('streakWeight', streakWeight);
    saveToLocalStorage('streakBetter', streakBetter);

    saveToLocalStorage('drawDownChecked', drawDownChecked);
    saveToLocalStorage('drawDownWeight', drawDownWeight);
    saveToLocalStorage('drawDownBetter', drawDownBetter);

    saveToLocalStorage('pnlChecked', pnlChecked);
    saveToLocalStorage('pnlWeight', pnlWeight);
    saveToLocalStorage('pnlBetter', pnlBetter);

    saveToLocalStorage('profitFactorChecked', profitFactorChecked);
    saveToLocalStorage('profitFactorWeight', profitFactorWeight);
    saveToLocalStorage('profitFactorBetter', profitFactorBetter);

    saveToLocalStorage('expectancyChecked', expectancyChecked);
    saveToLocalStorage('expectancyWeight', expectancyWeight);
    saveToLocalStorage('expectancyBetter', expectancyBetter);

    saveToLocalStorage('avgLossChecked', avgLossChecked);
    saveToLocalStorage('avgLossWeight', avgLossWeight);
    saveToLocalStorage('avgLossBetter', avgLossBetter);

    saveToLocalStorage('avgProfitChecked', avgProfitChecked);
    saveToLocalStorage('avgProfitWeight', avgProfitWeight);
    saveToLocalStorage('avgProfitBetter', avgProfitBetter);


    saveToLocalStorage('variableInputs', variableInputs);
    saveToLocalStorage('goal', goal);
    saveToLocalStorage('constraints', constraints);
    saveToLocalStorage('indicatorDetails', indicatorDetails);

    saveToLocalStorage('rankedStocks',rankedStocks)
  }, [
    winPercentChecked, winPercentWeight, winPercentBetter,
    streakChecked, streakWeight, streakBetter,
    drawDownChecked, drawDownWeight, drawDownBetter,
    pnlChecked, pnlWeight, pnlBetter,
    profitFactorChecked, profitFactorWeight, profitFactorBetter,
    expectancyChecked, expectancyWeight, expectancyBetter,
    avgLossChecked, avgLossWeight, avgLossBetter,
    avgProfitChecked, avgProfitWeight, avgProfitBetter,
    variableInputs, goal, constraints, indicatorDetails,rankedStocks
  ]);


  useEffect(() => {
    
  }, [

  ]);




  const userInputs = [
    { metric: 'Win Rate (%)', checked: winPercentChecked, weightage: parseFloat(winPercentWeight), better: winPercentBetter },
    { metric: 'Winning Streak', checked: streakChecked, weightage: parseFloat(streakWeight), better: streakBetter },
    { metric: 'Max Drawdown', checked: drawDownChecked, weightage: parseFloat(drawDownWeight), better: drawDownBetter },
    { metric: 'Total PnL', checked: pnlChecked, weightage: parseFloat(pnlWeight), better: pnlBetter },
    { metric: 'Profit Factor', checked: profitFactorChecked, weightage: parseFloat(profitFactorWeight), better: profitFactorBetter },
    { metric: 'Expectancy', checked: expectancyChecked, weightage: parseFloat(expectancyWeight), better: expectancyBetter },
    { metric: 'Avg Gain per Winning Trade', checked: avgLossChecked, weightage: parseFloat(avgLossWeight), better: avgLossBetter },
    { metric: 'Avg Loss per Losing Trade', checked: avgProfitChecked, weightage: parseFloat(avgProfitWeight), better: avgProfitBetter },
  ];

  

    const [selectedStrategyIndex, setSelectedStrategyIndex] = useState(0);
   
    useEffect(() => {
      if (strategyListIndi.length > 0) {
        const details = currentStrategy?.strategyDetails?.conditions || [];
        const indicators = details.map(condition => ({
          indicatorOne: condition.indicatorOne,
          indicatorTwo: condition.indicatorTwo,
        }));
        setIndicatorDetails(indicators);
        setVariableInputs(indicators.map(() => ({
          indicatorOne: { indiInputs: {} },
          indicatorTwo: { indiInputs: {} }
        })));
      }
    }, [strategyListIndi]);
    
    console.log(strategyListIndi[strategyListIndi.length - 1])
    console.log(currentStrategy)
    console.log(indicatorDetails)
    console.log(backtestResult)
    console.log(strategyListIndi)
    
    const handleParameterChange = (indicatorIndex, key, value) => {
    const updatedIndicators = [...indicatorDetails];
    if (updatedIndicators[indicatorIndex]) {
      updatedIndicators[indicatorIndex].indicatorOne.indiInputs[key] = value;
      updatedIndicators[indicatorIndex].indicatorTwo.indiInputs[key] = value; // If applicable to both
      setIndicatorDetails(updatedIndicators);
    }
  };

  
  const setNestedProperty = (obj, path, value) => {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
};

const handleVariableChange = (index, key, value) => {
  const [mainKey, subKey, rangeKey, rangeName] = key.split('.');
  console.log(mainKey, subKey, rangeKey, rangeName);
  
  setVariableInputs(prevInputs => {
    const updatedInputs = [...prevInputs];
    
    if (!updatedInputs[index][mainKey]) {
      updatedInputs[index][mainKey] = { indiInputs: {} };
    }
    
    if (!updatedInputs[index][mainKey].indiInputs[rangeKey]) {
      updatedInputs[index][mainKey].indiInputs[rangeKey] = { from: '', to: '' };
    }
    
    updatedInputs[index][mainKey].indiInputs[rangeKey][rangeName] = value;
    
    return updatedInputs;
  });
};
console.log(variableInputs)

const handleCheckboxChangeConstraint = (constraintType) => (e) => {
    setConstraints(prevConstraints => ({
        ...prevConstraints,
        [constraintType]: {
            ...prevConstraints[constraintType],
            enabled: e.target.checked
        }
    }));
};

const handleSelectChange = (constraintType) => (e) => {
  console.log(e.target.value)
    setConstraints(prevConstraints => ({
        ...prevConstraints,
        [constraintType]: {
            ...prevConstraints[constraintType],
            direction: e.target.value
        }
    }));
};

const handleWeightChangeConstraint = (constraintType) => (e) => {
    setConstraints(prevConstraints => ({
        ...prevConstraints,
        [constraintType]: {
            ...prevConstraints[constraintType],
            weight: e.target.value
        }
    }));
};

  
    // const handleCheckboxChange = (index) => {
    //   const updatedParameters = [...parameters];
    //   updatedParameters[index].enabled = !updatedParameters[index].enabled;
    //   setParameters(updatedParameters);
    // };
  
    // const handleSelectChange = (index, event) => {
    //   const updatedParameters = [...parameters];
    //   updatedParameters[index].preference = event.target.value;
    //   setParameters(updatedParameters);
    // };
  
    // const handleInputChange = (index, event) => {
    //   const updatedParameters = [...parameters];
    //   updatedParameters[index].weight = Number(event.target.value);
    //   setParameters(updatedParameters);
    // };

    const handleCheckboxChange = (setter) => (event) => {
        setter(event.target.checked);
        
      };
    
      const handleWeightChange = (setter) => (event) => {
        setter(event.target.value);
      };
    
      const handleBetterChange = (setter) => (event) => {
        setter(event.target.value);
      };


     const rankStocks = (backtestResults, userInputs) => {
  // Initialize an object to store the ranks for each stock
  const stockRanks = backtestResult.map(stock => ({
    ...stock,
    ranks: {},
    compositeRank: 0,
  }));

  // Loop through each user input (parameter) to rank the stocks
  userInputs.forEach(input => {
    if (input.checked) {
      const { metric, weightage, better } = input;
      const higherIsBetter = better === 'Higher the better';

      // Sort stocks based on the current parameter
      stockRanks.sort((a, b) => {
        const aValue = a.result[metric];
        const bValue = b.result[metric];
        if (higherIsBetter) {
          return bValue - aValue; // Higher values come first
        } else {
          return aValue - bValue; // Lower values come first
        }
      });

      // Assign ranks based on sorted order
      stockRanks.forEach((stock, index) => {
        stock.ranks[metric] = index + 1;
      });
    }
  });

  // Calculate the composite rank for each stock
  stockRanks.forEach(stock => {
    let compositeRank = 0;
    userInputs.forEach(input => {
      if (input.checked) {
        const { metric, weightage } = input;
        compositeRank += stock.ranks[metric] * weightage;
      }
    });
    stock.compositeRank = compositeRank;
  });

  // Sort stocks based on composite rank
  stockRanks.sort((a, b) => a.compositeRank - b.compositeRank);

  return stockRanks;
};



    const computeScore = (stock, parameters,min,max) => {
        let score = 0;
        let totalWeight = 0;
    
        parameters.forEach(param => {
          if (param.enabled) {
            let value = stock[param.name];
            let normalizedValue;
    
            if (param.preference === "higher") {
              normalizedValue = (value - min[param.name]) / (max[param.name] - min[param.name]);
            } else {
              normalizedValue = (max[param.name] - value) / (max[param.name] - min[param.name]);
            }
    
            score += normalizedValue * param.weight;
            totalWeight += param.weight;
          }
        });
    
        return score / totalWeight;
      };
    

   



    //   const handleRun = () => {
    //     const { min, max } = calculateMinMax();
    //     const rankedStocks = stocks.map(stock => ({
    //       ...stock,
    //       score: computeScore(stock, parameters, min, max)
    //     })).sort((a, b) => b.score - a.score);
    
    //     setStocks(rankedStocks);
    //   };


      const handleRun = () =>{
        const rankedStock = rankStocks(backtestResult, userInputs);
        console.log(rankedStock)
        setRankedStocks(rankedStock)

      }


  
const [selectedInterval, setSelectedInterval] = useState('1M');

const handleIntervalClick = (interval) => {
    
    setSelectedInterval(interval);
    // setTimePeriod(intervals[interval])
};


const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setGoal((prevGoal) => ({ ...prevGoal, [name]: value }));
};




const handleOptimise = async () => {
    const constraintsData = Object.keys(constraints).reduce((acc, key) => {
        const { enabled, weight, direction } = constraints[key];
        if (enabled) {
            acc[key] = { weight, direction };
        }
        return acc;
    }, {});

   

    setLoading(true);  // Start loading

    try {
        const response = await axios.post('http://localhost:5000/optimize', {
            constraints: constraintsData,
            variableInputs: variableInputs,
            goal:goal,
            strategy:optimiseStrategy
        });
        console.log('Optimization result:', response.data);
        setResults(response.data);

        const updatedStrategyListIndi = strategyListIndi.map(strategy =>
          strategy.strategyName === optimiseStrategy.strategyName
              ? {
                  ...strategy,
                  optimiseResult: {
                      results: response.data,
                      constraints: constraints,
                      variableInputs: variableInputs,
                      goal: goal
                  }
              }
              : strategy
      );

      setStrategyListIndi(updatedStrategyListIndi);
                  
    } catch (error) {
        console.error('Error:', error);
    } finally {
      setLoading(false);  // End loading
  }
};

const calculateSummary = (results) => {
  let summary = {
      totalSignals: 0,
      totalPnL: 0,
      winRate: 0,
      profitFactor: 0,
      winningStreak: 0,
      losingStreak: 0,
      maxDrawdown: 0,
      avgGain: 0,
      avgLoss: 0,
      roi: 0,
      expectancy: 0,
      count: results.length
  };

  results.forEach(result => {
      summary.totalSignals += result['Total Signals'] || 0;
      summary.totalPnL += result['Total PnL'] || 0;
      summary.winRate += result['Win Rate (%)'] || 0;
      summary.profitFactor += result['Profit Factor Total'] || 0;
      summary.winningStreak += result['Winning Streak'] || 0;
      summary.losingStreak += result['Losing Streak'] || 0;
      summary.maxDrawdown += result['Max Drawdown'] || 0;
      summary.avgGain += result['Avg Gain per Winning Trade'] || 0;
      summary.avgLoss += result['Avg Loss per Losing Trade'] || 0;
      summary.roi += (result['Avg Gain per Winning Trade'] && result['Avg Loss per Losing Trade'])
          ? (result['Avg Gain per Winning Trade'] / result['Avg Loss per Losing Trade']) || 0 : 0;
  });
                    
  summary.winRate /= summary.count;
  summary.profitFactor /= summary.count;
  summary.maxDrawdown /= summary.count;
  summary.avgGain /= summary.count;
  summary.avgLoss /= summary.count;
  summary.roi /= summary.count;

  // Calculate expectancy
  summary.expectancy = (summary.avgGain / summary.avgLoss) * (summary.winRate / 100) - ((100 - summary.winRate) / 100);

  return summary;
};

const combinedResults = [];
if (backtestResult && results) {
  backtestResult.forEach((backtestResult, index) => {
      combinedResults.push({ ...backtestResult.result, status: 'Before' });
      combinedResults.push({ ...results.results[index], status: 'After' });
  });
}

const beforeSummary = calculateSummary(combinedResults.filter(result => result.status === 'Before'));
const afterSummary = calculateSummary(combinedResults.filter(result => result.status === 'After'));



const calculateDrawdown = (backtestResult, results) => {
  let combinedResults = [];

  if (backtestResult && results) {
    backtestResult.forEach((backtestResult, index) => {
      combinedResults.push({ ...backtestResult.result, status: 'Before' });
      combinedResults.push({ ...results.results[index], status: 'After' });
    });
  }

  let cumulativePnL = 0;
  let peakFundsTotal = 0;
  let maxDrawdownTotal = 0;
  let maxDrawdownDaysTotal = 0;
  let drawdownStartTotal = null;
  let initialInvested = combinedResults[0]?.invested || 0;

  const combinedResultsWithCumulativePnL = combinedResults.map((result) => {
    if (result.pnl !== undefined && result.pnl !== null) {
      cumulativePnL += result.pnl;
    }
    let fundsTotal = initialInvested + cumulativePnL;

    if (fundsTotal > peakFundsTotal) {
      peakFundsTotal = fundsTotal;
      drawdownStartTotal = null;
    } else {
      if (drawdownStartTotal === null) {
        drawdownStartTotal = result.date;
      }
      let currentDrawdownTotal = (peakFundsTotal - fundsTotal) / peakFundsTotal;
      let currentDrawdownPercentageTotal = currentDrawdownTotal * 100;

      maxDrawdownTotal = Math.max(maxDrawdownTotal, currentDrawdownPercentageTotal);

      if (drawdownStartTotal !== null) {
        let drawdownDaysTotal =
          (new Date(result.date) - new Date(drawdownStartTotal)) / (1000 * 3600 * 24);
        maxDrawdownDaysTotal = Math.max(maxDrawdownDaysTotal, drawdownDaysTotal);
      }
    }

    return { ...result, cumulativePnL };
  });

  return {
    combinedResultsWithCumulativePnL,
    maxDrawdownTotal,
    maxDrawdownDaysTotal,
  };
};


useEffect(() => {
  // Destructure the relevant properties from currentStrategy
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
  } = currentStrategy;

  console.log(currentStrategy)

 
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

  // If a matching strategy is found, set the optimization result and restore related state
  if (matchingStrategy) {
      console.log('Matching strategy found:', matchingStrategy);

      // Set the optimization result
      if (matchingStrategy.optimiseResult) {
          setResults(matchingStrategy.optimiseResult.results || null);
          setVariableInputs(matchingStrategy.optimiseResult.variableInputs || []);
          setGoal(matchingStrategy.optimiseResult.goal || { optimize: 'Maximize', parameter: '' });
          setConstraints(matchingStrategy.optimiseResult.constraints || {
              'Win Rate (%)': { enabled: false, weight: '', direction: 'Maximum' },
              'Winning Streak': { enabled: false, weight: '', direction: 'Maximum' },
              'Max Drawdown': { enabled: false, weight: '', direction: 'Minimum' },
              'Total PnL': { enabled: false, weight: '', direction: 'Maximum' },
              'Profit Factor': { enabled: false, weight: '', direction: 'Maximum' },
              'Expectancy': { enabled: false, weight: '', direction: 'Maximum' },
              'Avg Loss per Losing Trade': { enabled: false, weight: '', direction: 'Minimum' },
              'Avg Gain per Winning Trade': { enabled: false, weight: '', direction: 'Maximum' },
          });
      }
  } 
}, [
  currentStrategy, strategyListIndi // Dependencies for useEffect
]);






  return (
    <div className='strategy-optimise'>
        <div className='heading'>
            <h4>Rank Parameters</h4>

        </div>


        <div className='constraint'>

        {/* {parameters.map((param, index) => (
        <div className='parameters-container' key={param.name}>
          <div>
            <input
              type='checkbox'
              checked={param.enabled}
              onChange={() => handleCheckboxChange(index)}
            />
            <label>{param.label}</label>
          </div>
          <div>
            <select
              value={param.preference}
              onChange={(event) => handleSelectChange(index, event)}
            >
              <option value='higher'>Higher the better</option>
              <option value='lower'>Lower the better</option>
            </select>
            <input
              placeholder='Weightage'
              type='number'
              value={param.weight}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
        </div>
      ))}

      <div className='run-btn'>
        <button onClick={handleRun}>RUN</button>
      </div> */}

      {/* <div className='results'>
        <h4>Ranked Stocks</h4>
        <ul>
          {stocks.map(stock => (
            <li key={stock.name}>{stock.name}: {stock.score}</li>
          ))}
        </ul>
      </div> */}
           

        <div className='parameters-container'>
       
          <div>
            <div>
              <input
                type='checkbox'
                checked={winPercentChecked}
                onChange={handleCheckboxChange(setWinPercentChecked)}
              />
              <label>Win %</label>
            </div>
            <div>
              <select value={winPercentBetter} onChange={handleBetterChange(setWinPercentBetter)}>
                <option>Higher the better</option>
                <option>Lower the better</option>
              </select>
              <input
                placeholder='Weightage'
                type='number'
                value={winPercentWeight}
                onChange={handleWeightChange(setWinPercentWeight)}
              />
            </div>
          </div>

          <div>
            <div>
              <input
                type='checkbox'
                checked={streakChecked}
                onChange={handleCheckboxChange(setStreakChecked)}
              />
              <label>Win/Losing Streak</label>
            </div>
            <div>
              <select value={streakBetter} onChange={handleBetterChange(setStreakBetter)}>
                <option>Higher the better</option>
                <option>Lower the better</option>
              </select>
              <input
                placeholder='Weightage'
                type='number'
                value={streakWeight}
                onChange={handleWeightChange(setStreakWeight)}
              />
            </div>
          </div>
        </div>

        <div className='parameters-container'>
          <div>
            <div>
              <input
                type='checkbox'
                checked={drawDownChecked}
                onChange={handleCheckboxChange(setDrawDownChecked)}
              />
              <label>Max Draw Down</label>
            </div>
            <div>
              <select value={drawDownBetter} onChange={handleBetterChange(setDrawDownBetter)}>
                <option>Higher the better</option>
                <option>Lower the better</option>
              </select>
              <input
                placeholder='Weightage'
                type='number'
                value={drawDownWeight}
                onChange={handleWeightChange(setDrawDownWeight)}
              />
            </div>
          </div>

          <div>
            <div>
              <input
                type='checkbox'
                checked={pnlChecked}
                onChange={handleCheckboxChange(setPnlChecked)}
              />
              <label>PNL</label>
            </div>
            <div>
              <select value={pnlBetter} onChange={handleBetterChange(setPnlBetter)}>
                <option>Higher the better</option>
                <option>Lower the better</option>
              </select>
              <input
                placeholder='Weightage'
                type='number'
                value={pnlWeight}
                onChange={handleWeightChange(setPnlWeight)}
              />
            </div>
          </div>
        </div>

        <div className='parameters-container'>
          <div>
            <div>
              <input
                type='checkbox'
                checked={profitFactorChecked}
                onChange={handleCheckboxChange(setProfitFactorChecked)}
              />
              <label>Profit Factor</label>
            </div>
            <div>
              <select value={profitFactorBetter} onChange={handleBetterChange(setProfitFactorBetter)}>
                <option>Higher the better</option>
                <option>Lower the better</option>
              </select>
              <input
                placeholder='Weightage'
                type='number'
                value={profitFactorWeight}
                onChange={handleWeightChange(setProfitFactorWeight)}
              />
            </div>
          </div>

          <div>
            <div>
              <input
                type='checkbox'
                checked={expectancyChecked}
                onChange={handleCheckboxChange(setExpectancyChecked)}
              />
              <label>Expectancy</label>
            </div>
            <div>
              <select value={expectancyBetter} onChange={handleBetterChange(setExpectancyBetter)}>
                <option>Higher the better</option>
                <option>Lower the better</option>
              </select>
              <input
                placeholder='Weightage'
                type='number'
                value={expectancyWeight}
                onChange={handleWeightChange(setExpectancyWeight)}
              />
            </div>
          </div>
        </div>

        <div className='parameters-container'>
          <div>
            <div>
              <input
                type='checkbox'
                checked={avgLossChecked}
                onChange={handleCheckboxChange(setAvgLossChecked)}
              />
              <label>Average Loss</label>
            </div>
            <div>
              <select value={avgLossBetter} onChange={handleBetterChange(setAvgLossBetter)}>
                <option>Higher the better</option>
                <option>Lower the better</option>
              </select>
              <input
                placeholder='Weightage'
                type='number'
                value={avgLossWeight}
                onChange={handleWeightChange(setAvgLossWeight)}
              />
            </div>
          </div>

          <div>
            <div>
              <input
                type='checkbox'
                checked={avgProfitChecked}
                onChange={handleCheckboxChange(setAvgProfitChecked)}
              />
              <label>Average Profit</label>
            </div>
            <div>
              <select value={avgProfitBetter} onChange={handleBetterChange(setAvgProfitBetter)}>
                <option>Higher the better</option>
                <option>Lower the better</option>
              </select>
              <input
                placeholder='Weightage'
                type='number'
                value={avgProfitWeight}
                onChange={handleWeightChange(setAvgProfitWeight)}
              />
            </div>
          </div>
        </div>


            <div className='run-btn'>
                <button onClick={handleRun}>RUN</button>
            </div>

        </div>

      <div className='rank-result'>
        <div className='heading'>
                <h4>Ranking Results</h4>
        </div>

        <div className='rank-tanle-container'>
          <table className='rank-table'>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Win %</th>
                <th>Expectancy</th>
                <th>Max Drawdown</th>
                <th>Profit Factor</th>
                <th>Winning Streak</th>
                <th>Losing Streak</th>
                <th>Average Profit</th>
                <th>Average Loss</th>
                <th>PNL</th>
                <th>Rank</th>
              
              </tr>
            </thead>
            <tbody>
              {rankedStocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.symbol}</td>
                  <td>{stock.result['Win Rate (%)'].toFixed(2)}</td>
                  <td>{stock.result.Expectancy.toFixed(2)}</td>
                  <td>{stock.result['Max Drawdown'].toFixed(2)}</td>
                  <td>{stock.result['Profit Factor'].toFixed(2)}</td>
                  <td>{stock.result['Winning Streak']}</td>
                  <td>{stock.result['Losing Streak']}</td>
                  <td>{stock.result['Avg Gain per Winning Trade'].toFixed(2)}</td>
                  <td>{stock.result['Avg Loss per Losing Trade'].toFixed(2)}</td>
                  <td>{stock.result['Total PnL'].toFixed(2)}</td>
                  <td>{index+1}</td>
    
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>


        <div className='heading'>
            <h4>Optimize</h4>

        </div>


        <div className='goal'>

                <h4>Goal</h4>

                <div>
                    <select name="optimize" value={goal.optimize} onChange={handleGoalChange}>
                        <option>Maximize</option>
                        <option>Minimize</option>
                    </select>

                    <select name="parameter" value={goal.parameter} onChange={handleGoalChange}>
                        <option>Select Parameters </option>
                        <option value='Win Rate (%)'>Win %</option>
                        <option value='Winning Streak'>Win Streak</option>
                        <option value='Max Drawdown'>Max DD</option>
                        <option value='Total PnL'>Pnl</option>
                        <option value='Profit Factor Total'>Profit Factor</option>
                        <option value='Expectancy total'>Expentency</option>
                        <option value='Avg Loss per Losing Trade'>Average Loss</option>
                        <option value='Avg Gain per Winning Trade'>Average Profit</option>
                    </select>
                </div>

        </div>


        <div className='constraint'>
            <h4>Constraint</h4>

            <div className='parameters-container'>
                <div>
                    <div>
                        <input
                            type='checkbox'
                            checked={constraints['Win Rate (%)'].enabled}
                            onChange={handleCheckboxChangeConstraint('Win Rate (%)')}
                        />
                        <label>Win %</label>
                    </div>
                    <div>
                        <select
                            value={constraints['Win Rate (%)'].direction}
                            onChange={handleSelectChange('Win Rate (%)')}
                        >
                            <option value='Maximum'>Maximum</option>
                            <option value='Minimum'>Minimum</option>
                        </select>
                        <input
                            placeholder='Weightage'
                            type='number'
                            value={constraints['Win Rate (%)'].weight}
                            onChange={handleWeightChangeConstraint('Win Rate (%)')}
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <input
                            type='checkbox'
                            checked={constraints['Winning Streak'].enabled}
                            onChange={handleCheckboxChangeConstraint('Winning Streak')}
                        />
                        <label>Win/Losing Streak</label>
                    </div>
                    <div>
                        <select
                            value={constraints['Winning Streak'].direction}
                            onChange={handleSelectChange('Winning Streak')}
                        >
                            <option value='Maximum'>Maximum</option>
                            <option value='Minimum'>Minimum</option>
                        </select>
                        <input
                            placeholder='Weightage'
                            type='number'
                            value={constraints['Winning Streak'].weight}
                            onChange={handleWeightChangeConstraint('Winning Streak')}
                        />
                    </div>
                </div>
            </div>

            <div className='parameters-container'>
                <div>
                    <div>
                        <input
                            type='checkbox'
                            checked={constraints['Max Drawdown'].enabled}
                            onChange={handleCheckboxChangeConstraint('Max Drawdown')}
                        />
                        <label>Max Draw Down</label>
                    </div>
                    <div>
                        <select
                            value={constraints['Max Drawdown'].direction}
                            onChange={handleSelectChange('Max Drawdown')}
                        >
                            <option value='Maximum'>Maximum</option>
                            <option value='Minimum'>Minimum</option>
                        </select>
                        <input
                            placeholder='Weightage'
                            type='number'
                            value={constraints['Max Drawdown'].weight}
                            onChange={handleWeightChangeConstraint('Max Drawdown')}
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <input
                            type='checkbox'
                            checked={constraints['Total PnL'].enabled}
                            onChange={handleCheckboxChangeConstraint('Total PnL')}
                        />
                        <label>PNL</label>
                    </div>
                    <div>
                        <select
                            value={constraints['Total PnL'].direction}
                            onChange={handleSelectChange('Total PnL')}
                        >
                            <option value='Maximum'>Maximum</option>
                            <option value='Minimum'>Minimum</option>
                        </select>
                        <input
                            placeholder='Weightage'
                            type='number'
                            value={constraints['Total PnL'].weight}
                            onChange={handleWeightChangeConstraint('Total PnL')}
                        />
                    </div>
                </div>
            </div>

            <div className='parameters-container'>
                <div>
                    <div>
                        <input
                            type='checkbox'
                            checked={constraints['Profit Factor'].enabled}
                            onChange={handleCheckboxChangeConstraint('Profit Factor')}
                        />
                        <label>Profit Factor</label>
                    </div>
                    <div>
                        <select
                            value={constraints['Profit Factor'].direction}
                            onChange={handleSelectChange('Profit Factor')}
                        >
                            <option value='Maximum'>Maximum</option>
                            <option value='Minimum'>Minimum</option>
                        </select>
                        <input
                            placeholder='Weightage'
                            type='number'
                            value={constraints['Profit Factor'].weight}
                            onChange={handleWeightChangeConstraint('Profit Factor')}
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <input
                            type='checkbox'
                            checked={constraints['Expectancy'].enabled}
                            onChange={handleCheckboxChangeConstraint('Expectancy')}
                        />
                        <label>Expectancy</label>
                    </div>
                    <div>
                        <select
                            value={constraints['Expectancy'].direction}
                            onChange={handleSelectChange('Expectancy')}
                        >
                            <option value='Maximum'>Maximum</option>
                            <option value='Minimum'>Minimum</option>
                        </select>
                        <input
                            placeholder='Weightage'
                            type='number'
                            value={constraints['Expectancy'].weight}
                            onChange={handleWeightChangeConstraint('Expectancy')}
                        />
                    </div>
                </div>
            </div>

            <div className='parameters-container'>
                <div>
                    <div>
                        <input
                            type='checkbox'
                            checked={constraints['Avg Loss per Losing Trade'].enabled}
                            onChange={handleCheckboxChangeConstraint('Avg Loss per Losing Trade')}
                        />
                        <label>Average Loss</label>
                    </div>
                    <div>
                        <select
                            value={constraints['Avg Loss per Losing Trade'].direction}
                            onChange={handleSelectChange('Avg Loss per Losing Trade')}
                        >
                            <option value='Maximum'>Maximum</option>
                            <option value='Minimum'>Minimum</option>
                        </select>
                        <input
                            placeholder='Weightage'
                            type='number'
                            value={constraints['Avg Loss per Losing Trade'].weight}
                            onChange={handleWeightChangeConstraint('Avg Loss per Losing Trade')}
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <input
                            type='checkbox'
                            checked={constraints['Avg Gain per Winning Trade'].enabled}
                            onChange={handleCheckboxChangeConstraint('Avg Gain per Winning Trade')}
                        />
                        <label>Average Profit</label>
                    </div>
                    <div>
                        <select
                            value={constraints['Avg Gain per Winning Trade'].direction}
                            onChange={handleSelectChange('Avg Gain per Winning Trade')}
                        >
                            <option value='Maximum'>Maximum</option>
                            <option value='Minimum'>Minimum</option>
                        </select>
                        <input
                            placeholder='Weightage'
                            type='number'
                            value={constraints['Avg Gain per Winning Trade'].weight}
                            onChange={handleWeightChangeConstraint('Avg Gain per Winning Trade')}
                        />
                    </div>
                </div>
            </div>
        
        </div>


        <div className='variable'>
            <h4>
            Variable
            </h4>
              <div className='left-right'>
                <h4>Left Indicators</h4>
                <h4>Right Indicators</h4>
              </div>

          <div>
             
              
            <div className='variable-inputs'>
           {indicatorDetails.map((indicator, index) => (
        <div key={index}>
          <div>
           
          <div className='range-left'>
           
            {indicator.indicatorOne && indicator.indicatorOne.indiInputs && Object.keys(indicator.indicatorOne.indiInputs).map((key) => (
              <div key={key}>
                <label>{indicator.indicatorOne.displayValue} {key}:</label>
                <div>
                  <input
                    type='number'
                    placeholder='From'
                    value={variableInputs[index]?.indicatorOne?.indiInputs?.[key]?.from || ''}
                    onChange={(e) => handleVariableChange(index, `indicatorOne.indiInputs.${key}.from`, e.target.value)}
                  />
                  <label>to</label>
                  <input
                    type='number'
                    placeholder='To'
                    value={variableInputs[index]?.indicatorOne?.indiInputs?.[key]?.to || ''}
                    onChange={(e) => handleVariableChange(index, `indicatorOne.indiInputs.${key}.to`, e.target.value)}
                  />
                </div>
              </div>
            ))}

                      
                    </div>
                    </div>

                    <div>
                   
                    <div className='range-right'>
                   
                    {indicator.indicatorTwo && indicator.indicatorTwo.indiInputs && Object.keys(indicator.indicatorTwo.indiInputs).map((key) => (
              <div key={key}>
                <label>{indicator.indicatorTwo.displayValue} {key}:</label>
                <div>
                  <input
                    type='number'
                    placeholder='From'
                    value={variableInputs[index]?.indicatorTwo?.indiInputs?.[key]?.from || ''}
                    onChange={(e) => handleVariableChange(index, `indicatorTwo.indiInputs.${key}.from`, e.target.value)}
                  />
                  <label>to</label>
                  <input
                    type='number'
                    placeholder='To'
                    value={variableInputs[index]?.indicatorTwo?.indiInputs?.[key]?.to || ''}
                    onChange={(e) => handleVariableChange(index, `indicatorTwo.indiInputs.${key}.to`, e.target.value)}
                  />
                </div>
              </div>
            ))}
                    </div>
                    </div>
                    {/* <div className='step'>
                        <label>Step Size:</label>
                        <select
                            value={variableInputs[index]?.stepSize || ''}
                            onChange={(e) => handleVariableChange(index, 'stepSize', e.target.value)}
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={5}>5</option>
                        </select>
                    </div> */}
                </div>
            ))}
            {/* <div>
                <div className='range'>
                    <label>RSI Period : </label>
                    <div>
                        <input type='number'></input>
                        <label>to</label>
                        <input type='number'></input>
                    </div>
                </div>

                <div className='step'>
                    <label>Step Size :</label>
                    <select></select>

                </div>

            </div>


            <div>
                <div className='range'>
                    <label>RSI Buy Threshold : </label>
                    <div>
                        <input type='number'></input>
                        <label>to</label>
                        <input type='number'></input>
                    </div>
                </div>

                <div className='step'>
                    <label>Step Size :</label>
                    <select></select>

                </div>

            </div> */}

        </div>

        {/* <div className='time-inputs'>
            <label>Time Frame :</label>
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
        </div> */}

        </div>

       



        </div>

        <div className='optimise-btn-container'>
        <button onClick={handleOptimise}>Optimise</button>
        </div>
       
        {loading ? (
              <div className="loading-container d-flex justify-content-center mt-2 mb-5">
                <PropagateLoader color="#5A55D2" />
              </div>
          ) : (
                results && (
               <div className='optimization-result-container'>
               <div className='heading'>
                   <h4>Optimization Results</h4>
               </div>
   
               <h4 className='best-parameter'>Best Parameters</h4>

               <div className='optimise-table-container'>
                
                   <table className='optimise-result-table'>
       <thead>
        <tr>
            <th>Status</th>
            <th>Symbol</th>
            {/* <th>Time Frame</th> */}
            {indicatorDetails.map((detail, strategyIndex) => (
                <React.Fragment key={`header-${strategyIndex}`}>
                    {detail.indicatorOne &&
                        Object.keys(detail.indicatorOne.indiInputs).map((key) => (
                            <th key={`indicatorOne-${strategyIndex}-${key}`} style={{ textTransform: 'capitalize' }}>
                                {`1st ${key}`}
                            </th>
                        ))}
                    {detail.indicatorTwo &&
                        Object.keys(detail.indicatorTwo.indiInputs).map((key) => (
                            <th key={`indicatorTwo-${strategyIndex}-${key}`} style={{ textTransform: 'capitalize' }}>
                                {`2nd ${key}`}
                            </th>
                        ))}
                </React.Fragment>
            ))}
        </tr>
    </thead>
    <tbody>
        {results && results.results.map((result, index) => (
            <React.Fragment key={index}>
                <tr key={`before-${index}`}>
                    <td style={{color : '#E34141'}}>Before</td>
                    <td>{optimiseStrategy.backSymbol[index]}</td>
                    {/* <td>Time Frame Here</td> */}
                    {indicatorDetails.map((detail, strategyIndex) => (
                  <React.Fragment key={`before-${index}-${strategyIndex}`}>
                    {detail.indicatorOne &&
                      Object.keys(detail.indicatorOne.indiInputs).map((key, i) => (
                        <td key={`before-indicatorOne-${index}-${strategyIndex}-${key}-${i}`}>
                          {detail.indicatorOne.indiInputs[key]}
                        </td>
                      ))}
                    {detail.indicatorTwo &&
                      Object.keys(detail.indicatorTwo.indiInputs).map((key, i) => (
                        <td key={`before-indicatorTwo-${index}-${strategyIndex}-${key}-${i}`}>
                          {detail.indicatorTwo.indiInputs[key]}
                        </td>
                      ))}
                  </React.Fragment>
                ))}
                </tr>
                <tr key={`after-${index}`}>
                    <td style={{color : '#3CAA82'}}>After</td>
                    <td>{optimiseStrategy.backSymbol[index]}</td>
                    {/* <td>Time Frame Here</td> */}
                    {indicatorDetails.map((detail, strategyIndex) => (
                        <React.Fragment key={`after-${index}-${strategyIndex}`}>
                            {detail.indicatorOne &&
                                Object.keys(detail.indicatorOne.indiInputs).map((key, i) => {
                                    const paramIndex = indicatorDetails.slice(0, strategyIndex).reduce((acc, cur) => (
                                        acc + Object.keys(cur.indicatorOne?.indiInputs || {}).length + Object.keys(cur.indicatorTwo?.indiInputs || {}).length
                                    ), 0) + i;
                                    return (
                                        <td key={`after-indicatorOne-${index}-${strategyIndex}-${key}-${i}`}>
                                            {results.best_parameters[paramIndex] !== undefined
                                                ? results.best_parameters[paramIndex].toFixed(2)
                                                : 'N/A'}
                                        </td>
                                    );
                                })}
                            {detail.indicatorTwo &&
                                Object.keys(detail.indicatorTwo.indiInputs).map((key, i) => {
                                    const paramIndex = indicatorDetails.slice(0, strategyIndex).reduce((acc, cur) => (
                                        acc + Object.keys(cur.indicatorOne?.indiInputs || {}).length + Object.keys(cur.indicatorTwo?.indiInputs || {}).length
                                    ), 0) + Object.keys(detail.indicatorOne.indiInputs).length + i;
                                    return (
                                        <td key={`after-indicatorTwo-${index}-${strategyIndex}-${key}-${i}`}>
                                            {results.best_parameters[paramIndex] !== undefined
                                                ? results.best_parameters[paramIndex].toFixed(2)
                                                : 'N/A'}
                                        </td>
                                    );
                                })}
                        </React.Fragment>
                    ))}
                </tr>
            </React.Fragment>
        ))}
    </tbody>
</table>

   
   
               </div>
   
               <div className='optimise-table-container'>
                   <h4>Optimized Results</h4>
                   <table className='optimise-result-table'>
            <thead>
                <tr>  
                    <th>Status</th>
                    <th>Symbol</th>
                    <th>Trades</th>
                    <th>P&L</th>
                    <th>Win %</th>
                    <th>Profit Factor</th>
                    <th>WS</th>
                    <th>LS</th>
                    <th>Max DD</th>
                    <th>Avg Profit</th>
                    <th>Avg Loss</th>
                    <th>Expectency</th>
                    <th>ROI %</th>
                </tr>
            </thead>                                    
            <tbody>
            <tr style={{fontWeight:'bold' ,backgroundColor:'lightgray'}}>
                    <td colSpan="1" style={{color : '#E34141'}}><strong>Before</strong></td>
                    <td>{'Summary'}</td>
                    <td>{beforeSummary.totalSignals}</td>
                    <td style={{color : afterSummary.totalPnL > 0 ? '#3CAA82': '#E34141'}}>{beforeSummary.totalPnL.toFixed(2)}</td>
                    <td>{beforeSummary.winRate.toFixed(2)}</td>
                    <td>{beforeSummary.profitFactor.toFixed(2)}</td>
                    <td>{beforeSummary.winningStreak}</td>
                    <td>{beforeSummary.losingStreak}</td>
                    <td>{beforeSummary.maxDrawdown.toFixed(2)}</td>
                    <td style={{color:'#3CAA82'}}>{beforeSummary.avgGain.toFixed(2)}</td>
                    <td  style={{color:'#E34141'}}>{beforeSummary.avgLoss.toFixed(2)}</td>
                    <td>{beforeSummary.expectancy.toFixed(2)}</td>
                    <td>{beforeSummary.roi.toFixed(2)}</td>
                </tr>
                <tr style={{fontWeight:'bold' ,backgroundColor:'lightgray'}}>
                    <td colSpan="1" style={{color : '#3CAA82'}}><strong>After </strong></td>
                    <td>{'Summary'}</td>
                    <td>{afterSummary.totalSignals}</td>
                    <td style={{color : afterSummary.totalPnL > 0 ? '#3CAA82': '#E34141'}}>{afterSummary.totalPnL.toFixed(2)}</td>
                    <td>{afterSummary.winRate.toFixed(2)}</td>
                    <td>{afterSummary.profitFactor.toFixed(2)}</td>
                    <td>{afterSummary.winningStreak}</td>
                    <td>{afterSummary.losingStreak}</td>
                    <td>{afterSummary.maxDrawdown.toFixed(2)}</td>
                    <td style={{color:'#3CAA82'}}>{afterSummary.avgGain.toFixed(2)}</td>
                    <td style={{color:'#E34141'}}> {afterSummary.avgLoss.toFixed(2)}</td>
                    <td>{afterSummary.expectancy.toFixed(2)}</td>
                    <td>{afterSummary.roi.toFixed(2)}</td>
                </tr>
                {combinedResults.map((result, index) => (
                    <tr key={index}>
                        <td style={{color : result.status==='Before'? '#E34141' : '#3CAA82'}}>{result.status}</td>
                        <td>{result.trades[0]?.symbol || 'N/A'}</td>
                        <td>{result['Total Signals'] || 'N/A'}</td>
                        <td style={{color : result['Total PnL'] > 0 ? '#3CAA82': '#E34141'}}>{result['Total PnL'] ? result['Total PnL'].toFixed(2) : 'N/A'}</td>
                        <td>{result['Win Rate (%)'] ? result['Win Rate (%)'].toFixed(2) : 'N/A'}</td>
                        <td>{result['Profit Factor Total'] ? result['Profit Factor Total'].toFixed(2) : 'N/A'}</td>
                        <td>{result['Winning Streak']}</td>
                        <td>{result['Losing Streak']}</td>
                        <td>{result['Max Drawdown'] ? result['Max Drawdown'].toFixed(2) : 'N/A'}</td>
                        <td style={{color:'#3CAA82'}}>{result['Avg Gain per Winning Trade'] ? result['Avg Gain per Winning Trade'].toFixed(2) : 'N/A'}</td>
                        <td style={{color:'#E34141'}}>{result['Avg Loss per Losing Trade'] ? result['Avg Loss per Losing Trade'].toFixed(2) : 'N/A'}</td>
                        <td>{result['Expectancy'] ? result['Expectancy'].toFixed(2):'N/A'}</td>
                        <td>{result['Avg Gain per Winning Trade'] && result['Avg Loss per Losing Trade'] 
                            ? (result['Avg Gain per Winning Trade'] / result['Avg Loss per Losing Trade']).toFixed(2) 
                            : 'N/A'}</td>
                    </tr>
                ))}
             
            </tbody>
        </table>
   
   
               </div>
   
           </div>
        )
   
      )}


    </div>
  )
}

export default StrategyOptimise