import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { MdDeleteOutline } from "react-icons/md";
import './Condition.css'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const Condition = ({ strategy , setStrategy , strategy2 , setStrategy2 ,type , setMaxLong,setMaxShort ,selectedSide,selectedSideExit}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentEditing, setCurrentEditing] = useState({ index: null, key: null });
    const [offset, setOffset] = useState('');
    const [period, setPeriod] = useState('');
    const [localIndicatorDetails, setLocalIndicatorDetails] = useState({});

  
    const indicatorMapping = {
        "Money Flow Index": "mfi",
        "ADX": "adx",
        "RSI": "rsi",
        "MACD": "macd",
        "MACD-Signal":'macd-s',
        "Stochastic": "stoch",
        "WMA": "wma",
        "EMA": "ema",
        "SMA": "sma",
        "VWAP": "vwap",
        "WMA" : 'wma',
        "Bollinger Bands": "bbands",
        "Parabolic SAR": "psar",
        "ATR": "atr",
        "Ichimoku Cloud": "ichimoku",
        "Stochastic RSI": "stochrsi",
        "CCI": "cci",  // Commodity Channel Index
        "Williams %R": "willr", // Williams %R
        "Keltner Channel": "kc", // Keltner Channel
        "Ultimate Oscillator": "uo", // Ultimate Oscillator
        "OBV": "obv", // On-Balance Volume
        "TRIX": "trix", // Triple Exponential Average
        "APO": "apo", // Absolute Price Oscillator
        "PPO": "ppo", // Percentage Price Oscillator
        "Momentum": "mom", // Momentum
        "DMI": "dmi", // Directional Movement Index
        "BBWidth": "bbwidth", // Bollinger Bands Width
        "Number": 'number',
        "Close": 'close',
        "Open": 'open',
        "High":'high',
        "Low":'low',
        "Volume":"volume",
        "SuperTrend": "supertrend",
        "Pivot Point": "pivotpoints",  
        "RSI MA": "rsima",  
        "Plus DI": "plus_di",  
        "Minus DI": "minus_di" ,
    };

    const indicatorConfigurations = {
        "Money Flow Index": { inputs: ["period"], defaultValues: { period: 14 } },
        "ADX": { inputs: ["period"], defaultValues: { period: 14 } },
        "RSI": { inputs: ["period"], defaultValues: { period: 14 } },
        "MACD": { inputs: ["fastPeriod", "slowPeriod", "signalPeriod"], defaultValues: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 } },
        "MACD-Signal": { inputs: ["fastPeriod", "slowPeriod", "signalPeriod"], defaultValues: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 } },
        "Stochastic": { inputs: ["kPeriod", "dPeriod", "slowing"], defaultValues: { kPeriod: 14, dPeriod: 3, slowing: 3 } },
        "WMA": { inputs: ["period"], defaultValues: { period: 14 } },
        "EMA": { inputs: ["period"], defaultValues: { period: 14 } },
        "SMA": { inputs: ["period"], defaultValues: { period: 14 } },
        "VWAP": { inputs: ["offset"], defaultValues: { offset: 0 } }, // Assuming offset is commonly set to 0
        "Bollinger Bands": { inputs: ["period", "stdDev"], defaultValues: { period: 20, stdDev: 2 } },
        "Parabolic SAR": { inputs: ["step", "max"], defaultValues: { step: 0.02, max: 0.2 } },
        "ATR": { inputs: ["period"], defaultValues: { period: 14 } },
        "Ichimoku Cloud": { inputs: ["conversionLinePeriod", "baseLinePeriod", "laggingSpan2Period", "displacement"], defaultValues: { conversionLinePeriod: 9, baseLinePeriod: 26, laggingSpan2Period: 52, displacement: 26 } },
        "Stochastic RSI": { inputs: ["period"], defaultValues: { period: 14 } },
        "CCI": { inputs: ["period"], defaultValues: { period: 20 } },
        "Williams %R": { inputs: ["period"], defaultValues: { period: 14 } },
        "Keltner Channel": { inputs: ["length", "mult", "offset"], defaultValues: { length: 20, mult: 2, offset: 0 } },
        "Ultimate Oscillator": { inputs: ["short", "medium", "long", "ws", "wm", "wl"], defaultValues: { short: 7, medium: 14, long: 28, ws: 4, wm: 2, wl: 1 } },
        "OBV": { inputs: [], defaultValues: {} },
        "TRIX": { inputs: ["length"], defaultValues: { length: 15 } },
        "APO": { inputs: ["fast", "slow"], defaultValues: { fast: 12, slow: 26 } },
        "PPO": { inputs: ["fast", "slow", "signal"], defaultValues: { fast: 12, slow: 26, signal: 9 } },
        "Momentum": { inputs: ["period"], defaultValues: { period: 14 } },
        "DMI": { inputs: ["period"], defaultValues: { period: 14 } },
        "BBWidth": { inputs: ["period"], defaultValues: { period: 20 } },
        "Number": { inputs: ["number"], defaultValues: { number: 0 } },
        "Close": { inputs: ["offset"], defaultValues: { offset: 0 } },
        "Open": { inputs: ["offset"], defaultValues: { offset: 0 } },
        "High": { inputs: ["offset"], defaultValues: { offset: 0 } },
        "Low": { inputs: ["offset"], defaultValues: { offset: 0 } },
        "Volume": { inputs: ["offset"], defaultValues: { offset: 0 } },
        "SuperTrend": { inputs: ["period", "multiplier"], defaultValues: { period: 10, multiplier: 3 } },
        "Pivot Point": { inputs: ["period"], defaultValues: { period: 1 } }, // Assuming daily pivot points as default
        "RSI MA": { inputs: ["period", "ma_period"], defaultValues: { period: 14, ma_period: 9 } },
        "Plus DI": { inputs: ["period"], defaultValues: { period: 14 } },
        "Minus DI": { inputs: ["period"], defaultValues: { period: 14 } }
    };
    
    
    const openOffsetModalForEditing = (strategyType, index, indicatorKey) => {
        setCurrentEditing({ strategyType, index, key: indicatorKey });
        const currentDetails = (strategyType === 'long' ? strategy : strategy2).conditions[index][indicatorKey];
        setModalIsOpen(true);
        // setLocalIndicatorDetails(currentDetails.indiInputs || {});
        console.log(currentDetails);
    };


    


    const openOffsetModalForEdit = (e,strategyType,index,indicatorKey) => {
        e.preventDefault()
        setCurrentEditing({ strategyType, index, key: indicatorKey });
        const currentDetails = (strategyType === 'long' ? strategy : strategy2).conditions[index][indicatorKey];
        setModalIsOpen(true);
        setLocalIndicatorDetails(currentDetails.indiInputs || {});
        console.log(currentDetails)
    };


   
const handleIndicatorChange = (e, strategyType, index, indicatorKey) => {
    const displayName = e.target.value;
    const technicalName = indicatorMapping[displayName] || '';
    const indicatorConfig = indicatorConfigurations[displayName] || { inputs: [], defaultValues: {} };

    const initialInputs = indicatorConfig.inputs.reduce((acc, inputName) => {
        acc[inputName] = indicatorConfig.defaultValues[inputName] || '';
        return acc;
    }, {});

    const updateStrategy = strategyType === 'long' ? setStrategy : setStrategy2;

    updateStrategy(prev => {
        const updatedConditions = [...prev.conditions];
        updatedConditions[index] = {
            ...updatedConditions[index],
            [indicatorKey]: {
                value: technicalName,
                displayValue: displayName,
                indiInputs: initialInputs
            }
        };
        return { ...prev, conditions: updatedConditions };
    });

    setLocalIndicatorDetails(initialInputs);
    if (technicalName) {
        openOffsetModalForEditing(strategyType, index, indicatorKey);
    }
    
};



const handleInputChange = (e, inputName) => {
    let value = e.target.value;

    // Only convert to number if the input is not empty
    if (value !== '') {
        value = Number(value);
    }

    // Update local state
    setLocalIndicatorDetails(prev => ({
        ...prev,
        [inputName]: value
    }));
};

   

    const handleModalSubmit = () => {
        const { strategyType, index, key } = currentEditing;
        const updateStrategy = strategyType === 'long' ? setStrategy : setStrategy2;

        

        updateStrategy(prev => {
            const newConditions = [...prev.conditions];
            if (index != null && key) {
                newConditions[index][key] = {
                    ...newConditions[index][key],
                    indiInputs: localIndicatorDetails
                };
            }
            return { ...prev, conditions: newConditions };
        });

        setLocalIndicatorDetails({});
        setCurrentEditing({ strategyType: null, index: null, key: null });
        setModalIsOpen(false);
    };

  

    const handleDeleteIndicator = (e,strategyType, index, indicatorKey) => {
        e.preventDefault()
        const updateStrategy = strategyType === 'long' ? setStrategy : setStrategy2;

        

        updateStrategy(prev => ({
            ...prev,
            conditions: prev.conditions.map((condition, i) => {
                if (i === index) {
                    return {
                        ...condition,
                        [indicatorKey]: { value: '', displayValue: '', offset: '', period: '', isNew: true, indiInputs: {} }
                    };
                }
                return condition;
            })
        }));
    };



    function formatIndicatorDisplay(indicator) {
        // Ensure indicator and indiInputs are not undefined or null
        if (!indicator || !indicator.indiInputs) {
            return ''; // Return an empty string or a default value if the indicator or its inputs are not available
        }
    
        let displayValue = indicator.displayValue || ''; // Use displayValue or an empty string if it's not defined
    
        // Use Object.entries safely by ensuring indiInputs is always an object
        Object.entries(indicator.indiInputs || {}).forEach(([key, value]) => {
            if (value) {
                displayValue += ` (${key}: ${value})`; // Format and append the input key and value
            }
        });
    
        return displayValue;
    }
    

    function addCondition(e,strategyType) {
        e.preventDefault()
        const newCondition = {
            indicatorOne: { value: "", params: {} },
            comparator: "",
            indicatorTwo: { value: "", params: {} }
        };

        const updateStrategy = strategyType === 'long' ? setStrategy :setStrategy2
        updateStrategy(prev => {
            const newStrategy = {
                ...prev,
                conditions: [...prev.conditions, newCondition]
            };

            if (prev.conditions.length > 0) {
                newStrategy.logicalOperators = [...prev.logicalOperators, 'AND'];
            } else {
                newStrategy.logicalOperators = [];
            }

            return newStrategy;
        });

       
    }
    

    function changeLogicalOperator(e,strategyType, index, operator) {
        e.preventDefault()
        const updateStrategy = strategyType === 'long' ? setStrategy : setStrategy2;
        const newOperators = [...(strategyType === 'long' ? strategy.logicalOperators : strategy2.logicalOperators)];
        newOperators[index] = operator;

        

        updateStrategy(prev => ({
            ...prev,
            logicalOperators: newOperators
        }));
    }


    function deleteCondition(strategyType,index,event) {

        event.preventDefault();
        const updateStrategy = strategyType === 'long' ? setStrategy : setStrategy2
        

        updateStrategy(prev => ({
            ...prev,
            conditions: prev.conditions.filter((_, i) => i !== index),
            logicalOperators: prev.logicalOperators.filter((_, i) => i !== index - 1)
        }));


    }
    

    const handleComparatorChange = (e, strategyType, index) => {
        const newComparator = e.target.value;
        const updateStrategy = strategyType === 'long' ? setStrategy : setStrategy2;

        updateStrategy(prev => ({
            ...prev,
            conditions: prev.conditions.map((cond, idx) => idx === index ? { ...cond, comparator: newComparator } : cond)
        }));
    };



    // const [maxEntry,setMaxEntry] =useState({
    //     long:0 ,
    //     short:0
    // })

    // const handleMinus = (type) =>{
    //     if (maxEntry!=0){ 

    //     setMaxEntry(...maxEntry,maxEntry.type-1)
    //     }
    // }
    
    const [maxEntry, setMaxEntry] = useState({
        long: 1,
        short: 1
      });
    
      const handleMinus = (type,e) => {
        e.preventDefault()
        setMaxEntry((prevMaxEntry) => {
          if (prevMaxEntry[type] > 0) {
            return {
              ...prevMaxEntry,
              [type]: prevMaxEntry[type] - 1
            };
          }
          return prevMaxEntry; 
        });

       
      };
    

    const handlePlus = (type,e) =>{
        e.preventDefault()
        setMaxEntry((prevMaxEntry) => {
            return {
                ...prevMaxEntry,
                [type]: prevMaxEntry[type] + 1
              };
          });

         
    }


    useEffect(()=>{
        setMaxLong(maxEntry.long)
        setMaxShort(maxEntry.short)

    },[maxEntry])
   

    return (
        <div className='condition-page mt-3'>

            
            <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Indicator Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Object.entries(localIndicatorDetails).map(([key, value], index) => (
                        <Form.Group key={index} className="mb-3">
                            <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                            <Form.Control
                                type="number"
                                value={value}
                                onChange={(e) => handleInputChange(e, key)}
                        />      
                        </Form.Group>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Close</Button>
                    <Button variant="primary" onClick={handleModalSubmit}>Save</Button>
                </Modal.Footer>
            </Modal>


            <Form >

            {(selectedSide === 'both' || selectedSide === 'long' || selectedSideExit ==='both' || selectedSideExit === 'long')  && (

                <div>
                 <div className='sub-heading-long'>
                                <h3>Long</h3>
                                
                                {type === 'Entry' && (
                                    <div className='max-entry'>
                                    <h4>Max Entry</h4>

                                    <div className='max-entry-container'>
                                        <button className='minus' onClick={(e)=>handleMinus('long',e)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                        <circle cx="7.5" cy="8" r="7.5" fill="#5A55D2"/>
                                        <rect x="2.25" y="7.25" width="10.5" height="1.5" rx="0.75" fill="white"/>
                                        </svg>
                                        </button>
                                        <h4>{maxEntry.long}</h4>
                                        <button className='plus' onClick={(e)=>handlePlus('long',e)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                        <circle cx="7.5" cy="8" r="7.5" fill="#5A55D2"/>
                                        <rect x="2.25" y="7.25" width="10.5" height="1.5" rx="0.75" fill="white"/>
                                        <rect x="8.25" y="2.75" width="10.5" height="1.5" rx="0.75" transform="rotate(90 8.25 2.75)" fill="white"/>
                                        </svg>
                                        </button>
                                    </div>  
                                    
                                  </div>
                                )}
                                
                            </div>
            <div className='long-condition w-100'>
                
            
                <div className='w-100'>
            {strategy.conditions.map((condition, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <div className="logical-operator d-flex justify-content-center my-2">
                            {/* <Form.Control
                                as="select"
                                value={strategy.logicalOperators[index - 1] || 'AND'}
                                // onChange={(e) => changeLogicalOperator(index - 1, e.target.value)}
                                onChange={(e) => changeLogicalOperator('long', index - 1, e.target.value)}
                                className="form-control mb-3 w-25 text-center"
                            >   
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </Form.Control> */}


                            <div className='compare-input'>
                                <button className={strategy.logicalOperators[index - 1]==='AND' ? 'selected' : ''}  onClick={(e) => changeLogicalOperator(e,'long', index - 1, 'AND')}>AND</button>
                                <button className={strategy.logicalOperators[index - 1]==='OR' ?  'selected' : ''}  onClick={(e) => changeLogicalOperator(e,'long', index - 1, 'OR')}>OR</button>
                            </div>

                            <div>

                            </div>


                        </div>
                        
                    )}


              
                
                <div className='w-100'>
                    {/* <h5 className='text-center'>Long {type} Condition</h5> */}
                <div className='d-flex justify-content-between align-items-center'>
                   <div className='d-flex justify-content-between w-100'>
                    <div className='fun-labels'>
                    <h3 className='select-indicator'>Select Indicator</h3>
                    <div className='fun-btn-container'>
                        <button className='edit-btn' onClick={(e) => openOffsetModalForEdit(e,'long',index,'indicatorOne')}><MdEdit /></button>
                        
                        {/* <Button variant="danger" size="sm" onClick={() => handleDeleteIndicator(index, 'indicatorOne')}>Delete</Button> */}
                            {/* <Button onClick={() => openOffsetModalForEditing('long', index, 'indicatorOne')} size='sm'>Edit</Button> */}
                            <button className='delete-btn' onClick={(e) => handleDeleteIndicator(e,'long', index, 'indicatorOne')}><MdDelete /></button>
                          
                        </div>
                    <input
                        list="indicators-list"
                        value={formatIndicatorDisplay(condition.indicatorOne)}
                        // onChange={(e) => handleIndicatorChange(e, index, 'indicatorOne')}
                        onChange={(e) => handleIndicatorChange(e, 'long', index, 'indicatorOne')}
                        placeholder="Select First Indicator"
                        className="form-control"
                        size='sm'
                    />
                     <datalist id="indicators-list">
                            {Object.keys(indicatorMapping).map((indicator, index) => (
                                <option key={index} value={indicator}>{indicator}</option>
                            ))}
                        </datalist>
                       
                       
                        </div>
                    
                    <div>
                        <h3 className='select-comparator'>Select Comparator</h3>
                        
                    <Form.Control
                        as="select"
                        value={condition.comparator}
                        // onChange={(e) => handleComparatorChange(e, index)}
                        placeholder='OK'
                        onChange={(e) => handleComparatorChange(e, 'long', index)}
                        className="form-control comparator">
                        <option value="">Select Comparator</option>
                        <option value="crosses-below">Crosses Below</option>
                        <option value="equal-to">Equal To</option>
                        <option value="lower-than">Lower Than</option>
                        <option value="higher-than">Higher Than</option>
                        <option value="crosses-above">Crosses Above</option>
                    </Form.Control>
                    </div>

                    <div className='fun-labels'>
                    <h3 className='select-indicator'>Select Indicator</h3>
                    <div className='fun-btn-container'>
                        
                        <button className='edit-btn' onClick={(e) => openOffsetModalForEdit(e,'long',index,'indicatorTwo')}><MdEdit /></button>
                        
                        {/* <Button variant="danger" size="sm" onClick={() => handleDeleteIndicator(index, 'indicatorTwo')}>Delete</Button> */}
                        {/* <Button onClick={() => openOffsetModalForEditing('long', index, 'indicatorTwo')} size='sm'>Edit</Button> */}
                        <button className='delete-btn' onClick={(e) => handleDeleteIndicator(e,'long', index, 'indicatorTwo')}><MdDelete /></button>
                       
                        </div>
                    <input
                        list="indicators-list"
                        value={formatIndicatorDisplay(condition.indicatorTwo)}
                        // onChange={(e) => handleIndicatorChange(e, index, 'indicatorTwo')}
                        onChange={(e) => handleIndicatorChange(e, 'long', index, 'indicatorTwo')}
                        placeholder="Select Second Indicator"
                        className="form-control"
                        size='sm'
                    />
                   

                    </div>
                    </div>    
                        
                  
                        

                            {index > 0 &&(

                                <button variant="danger" size="sm" className='delete-condition ' onClick={(e) => deleteCondition('long',index,e)}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <circle cx="15" cy="15" r="14.5" stroke="#CC4F4F" stroke-dasharray="3 3"/>
                                    <path d="M9.09091 9.00019V21.5002C9.09091 22.0525 9.53862 22.5002 10.0909 22.5002H18.9091C19.4614 22.5002 19.9091 22.0525 19.9091 21.5002V9.00019M7 9.00019L22 9.0001M12 8.0001L16.8182 8M12.1818 12.0002C12.1818 12.5641 12.1818 14.5618 12.1818 15.0002C12.1818 17.3601 12.1818 19.5002 12.1818 19.5002M16.8182 19.5002V12.0002" stroke="#CC4F4F" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            ) }
                   
                                {index <=0 && (
                                     <button  className='add-long-btn mt-4' onClick={(e)=>addCondition(e,'long')}>
                                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                                     <circle cx="15" cy="15.3893" r="14.5" stroke="#5A55D2" stroke-dasharray="3 3"/>
                                     <path d="M16.0884 15.307H22V16.4851H16.0884V22.3893H14.8979V16.4851H9V15.307H14.8979V9.38928H16.0884V15.307Z" fill="#5A55D2"/>
                                     </svg>
                                     </button>
                                )

                                }
                        
                   
                </div>
                </div>

                    
            </React.Fragment>
        ))}
             </div>
             
       
           
                
            </div>
            </div>
            )}
            
            {(selectedSide === 'both' || selectedSide === 'short' || selectedSideExit ==='both' || selectedSideExit === 'short')  && (

                    <div>

                    <div className='sub-heading-short'>
                        <h3>Short</h3>

                        {type === 'Entry' && (
                                            <div className='max-entry'>
                                            <h4>Max Entry</h4>

                                            <div className='max-entry-container'>
                                                <button className='minus' onClick={(e)=>handleMinus('short',e)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                                <circle cx="7.5" cy="8" r="7.5" fill="#5A55D2"/>
                                                <rect x="2.25" y="7.25" width="10.5" height="1.5" rx="0.75" fill="white"/>
                                                </svg>
                                                </button>
                                                <h4>{maxEntry.short}</h4>
                                                <button className='plus' onClick={(e)=>handlePlus('short',e)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                                <circle cx="7.5" cy="8" r="7.5" fill="#5A55D2"/>
                                                <rect x="2.25" y="7.25" width="10.5" height="1.5" rx="0.75" fill="white"/>
                                                <rect x="8.25" y="2.75" width="10.5" height="1.5" rx="0.75" transform="rotate(90 8.25 2.75)" fill="white"/>
                                                </svg>
                                                </button>
                                            </div>  
                                            
                                        </div>
                                        )}
                    </div>

                    <div  className='short-condition w-100'>
                        <div className='w-100'>
                    {strategy2.conditions.map((condition, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <div className="logical-operator d-flex justify-content-center my-2">
                                    {/* <Form.Control
                                        as="select"
                                        value={strategy.logicalOperators[index - 1] || 'AND'}
                                        // onChange={(e) => changeLogicalOperator(e,index - 1, e.target.value)}
                                        onChange={(e) => changeLogicalOperator(e,'long', index - 1, e.target.value)}
                                        className="form-control mb-3 w-25 text-center"
                                    >
                                        <option value="AND">AND</option>
                                        <option value="OR">OR</option>
                                    </Form.Control> */}
                                    <div className='compare-input'>
                                        <button className={strategy2.logicalOperators[index - 1]==='AND' ? 'selected' : ''}  onClick={(e) => changeLogicalOperator(e,'short', index - 1, 'AND')}>AND</button>
                                        <button className={strategy2.logicalOperators[index - 1]==='OR' ?  'selected' : ''}  onClick={(e) => changeLogicalOperator(e,'short', index - 1, 'OR')}>OR</button>
                                    </div>
                                </div>
                            )}


                        
                                        
                        <div className='w-100'>
                        {/* <h5 className='text-center'>Short {type} Condition</h5> */}
                        <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex justify-content-between w-100'>
                            <div>
                                <div className='fun-labels'>
                                    <h3 className='select-indicator'>Select Indicator</h3>

                                    <div className='fun-btn-container'>
                                    <button className='edit-btn' onClick={(e) => openOffsetModalForEdit(e,'short',index,'indicatorOne')} size='sm'><MdEdit /></button>

                                    <button className='delete-btn' variant="danger" size="sm" onClick={(e) => handleDeleteIndicator(e,'short', index, 'indicatorOne')}>
                                    <MdDelete />
                                    </button>
                                    </div>

                                    </div>
                                
                            <input
                                list="indicators-list"
                                value={formatIndicatorDisplay(condition.indicatorOne)}
                                // value={strategy2.logicalOperators[index - 1] || 'AND'}
                                // onChange={(e) => handleIndicatorChange(e, index, 'indicatorOne')}
                                onChange={(e) => handleIndicatorChange(e,'short', index ,'indicatorOne')}
                                placeholder="Select First Indicator"
                                className="form-control"
                                size='sm'
                            />
                            <datalist id="indicators-list">
                                    {Object.keys(indicatorMapping).map((indicator, index) => (
                                        <option key={index} value={indicator}>{indicator}</option>
                                    ))}
                                </datalist>
                                <div className='fun-btn-container'>
                                
                                
                            
                        
                            </div>
                                </div>
                            
                            <div>
                            <h3 className='select-comparator'>Select Comparator</h3>
                            <Form.Control
                                as="select"
                                value={condition.comparator}
                                // onChange={(e) => handleComparatorChange(e, index)}
                                onChange={(e) => handleComparatorChange(e, 'short', index)}
                                className="form-control comparator">
                                <option value="">Select Comparator</option>
                                <option value="crosses-below">Crosses Below</option>
                                <option value="equal-to">Equal To</option>
                                <option value="lower-than">Lower Than</option>
                                <option value="higher-than">Higher Than</option>
                                <option value="crosses-above">Crosses Above</option>
                            </Form.Control>
                            </div>

                            <div className='fun-labels'>
                            <h3 className='select-indicator'>Select Indicator</h3>
                            <div className='fun-btn-container'>
                            <button className='edit-btn' onClick={(e) => openOffsetModalForEdit(e,'short',index,'indicatorTwo')} size='sm'><MdEdit /></button>
                        
                            <button className='delete-btn' variant="danger" size="sm" onClick={(e) => handleDeleteIndicator(e,'short', index, 'indicatorTwo')}><MdDelete /></button>
                            </div>
                            <input
                                list="indicators-list"
                                value={formatIndicatorDisplay(condition.indicatorTwo)}
                                // onChange={(e) => handleIndicatorChange(e, index, 'indicatorTwo')}
                                onChange={(e) => handleIndicatorChange(e, 'short', index, 'indicatorTwo')}
                                placeholder="Select Second Indicator"
                                className="form-control"
                                size='sm'
                            />
                            
                            </div>
                            </div>    
                                
                        
                            
                                {index > 0 &&(

                            <button variant="danger" size="sm" className='delete-condition' onClick={(e) => deleteCondition('short',index,e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <circle cx="15" cy="15" r="14.5" stroke="#CC4F4F" stroke-dasharray="3 3"/>
                            <path d="M9.09091 9.00019V21.5002C9.09091 22.0525 9.53862 22.5002 10.0909 22.5002H18.9091C19.4614 22.5002 19.9091 22.0525 19.9091 21.5002V9.00019M7 9.00019L22 9.0001M12 8.0001L16.8182 8M12.1818 12.0002C12.1818 12.5641 12.1818 14.5618 12.1818 15.0002C12.1818 17.3601 12.1818 19.5002 12.1818 19.5002M16.8182 19.5002V12.0002" stroke="#CC4F4F" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                            </svg>
                            </button>
                                )}
                            
                                

                                {index <= 0 &&(
                                    <button variant="secondary" className='add-short-btn mt-4' onClick={(e)=>addCondition(e,'short')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                                        <circle cx="15" cy="15.3893" r="14.5" stroke="#5A55D2" stroke-dasharray="3 3"/>
                                        <path d="M16.0884 15.307H22V16.4851H16.0884V22.3893H14.8979V16.4851H9V15.307H14.8979V9.38928H16.0884V15.307Z" fill="#5A55D2"/>
                                        </svg>
                                    </button>
                                )}
                                
                        
                        </div>
                        </div>


                    
                    </React.Fragment>
                    ))}
                    </div>


                    </div>
                    </div>

            )}
          
    </Form>

           
        </div>
    );
};

export default Condition;
