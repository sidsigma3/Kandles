import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { MdDeleteOutline } from "react-icons/md";

const Strategy = ({ indicatorDetails, setIndicatorDetails , strategy , setStrategy , strategy2 , setStrategy2 ,type}) => {
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
    
    
    // const indicatorConfigurations = {
    //     "Money Flow Index": { inputs: ["period"] },
    //     "ADX": { inputs: ["period"] },
    //     "RSI": { inputs: ["period"] },
    //     "MACD": { inputs: ["fastPeriod", "slowPeriod", "signalPeriod"] },
    //     "Stochastic": { inputs: ["kPeriod", "dPeriod", "slowing"] },
    //     "WMA": { inputs: ["period"] },
    //     "EMA": { inputs: ["period"] },
    //     "SMA": { inputs: ["period"] },
    //     "WMA": { inputs: ["period"]},
    //     "VWAP": { inputs: ['offset'] }, // VWAP has no parameters
    //     "Bollinger Bands": { inputs: ["period", "stdDev"] },
    //     "Parabolic SAR": { inputs: ["step", "max"] },
    //     "ATR": { inputs: ["period"] },
    //     "Ichimoku Cloud": { inputs: ["conversionLinePeriod", "baseLinePeriod", "laggingSpan2Period", "displacement"] },
    //     "Stochastic RSI": { inputs: ["period"] },
    //     "CCI": { inputs: ["period"] },
    //     "Williams %R": { inputs: ["period"] },
    //     "Keltner Channel": { inputs: ["length", "mult", "offset"] },
    //     "Ultimate Oscillator": { inputs: ["short", "medium", "long", "ws", "wm", "wl"] },
    //     "OBV": { inputs: [] }, // OBV does not take any parameters
    //     "TRIX": { inputs: ["length"] },
    //     "APO": { inputs: ["fast", "slow"] },
    //     "PPO": { inputs: ["fast", "slow", "signal"] },
    //     "Momentum": { inputs: ["period"] },
    //     "DMI": { inputs: ["period"] },
    //     "BBWidth": { inputs: ["period"] }, // Needs confirmation on additional settings
    //     "Number" : {inputs:['number']},
    //     "Close"  : {inputs:['offset']},
    //     "Open": {inputs:['offset']},
    //     "High":{inputs:['offset']},
    //     "Low":{inputs:['offset']},
    //     "Volume":{inputs:['offset']},
    //     "SuperTrend": { inputs: ["period", "multiplier"] },
    //     "Pivot Point": { inputs: ["period"] },  
    //     "RSI MA": { inputs: ["period", "ma_period"] }, 
    //     "Plus DI": { inputs: ["period"] }, 
    //     "Minus DI": { inputs: ["period"] } 
    // };
    
    const DynamicInputFields = ({ currentEditing, indicatorDetails, setIndicatorDetails }) => {
        const inputs = indicatorConfigurations[indicatorDetails[currentEditing]?.displayValue]?.inputs || [];
    
        return (
            <>
                {inputs.map((inputName, index) => (
                    <Form.Control
                        key={index}
                        type="number"
                        placeholder={inputName.charAt(0).toUpperCase() + inputName.slice(1)}
                        value={indicatorDetails[currentEditing][inputName] || ''}
                        onChange={(e) => setIndicatorDetails(prev => ({
                            ...prev,
                            [currentEditing]: {
                                ...prev[currentEditing],
                                [inputName]: e.target.value
                            }
                        }))}
                        className="mb-3"
                    />
                ))}
            </>
        );
    };

    
    // const openOffsetModalForEditing = (index,indicatorKey) => {
    //     setCurrentEditing({ index, key: indicatorKey });
    //     const currentDetails = strategy.conditions[index][indicatorKey];
    
      
    //     setModalIsOpen(true);
    //     // setLocalIndicatorDetails(currentDetails.indiInputs || {});
    //     console.log(currentDetails)
    // };

    const openOffsetModalForEditing = (strategyType, index, indicatorKey) => {
        setCurrentEditing({ strategyType, index, key: indicatorKey });
        const currentDetails = (strategyType === 'long' ? strategy : strategy2).conditions[index][indicatorKey];
        setModalIsOpen(true);
        // setLocalIndicatorDetails(currentDetails.indiInputs || {});
        console.log(currentDetails);
    };


    

    // const openOffsetModalForEdit = (index,indicatorKey) => {
    //     setCurrentEditing({ index, key: indicatorKey });
    //     const currentDetails = strategy.conditions[index][indicatorKey];
        
      
    //     setModalIsOpen(true);
    //     setLocalIndicatorDetails(currentDetails.indiInputs || {});
    //     console.log(currentDetails)
    // };

    const openOffsetModalForEdit = (strategyType,index,indicatorKey) => {
        setCurrentEditing({ strategyType, index, key: indicatorKey });
        const currentDetails = (strategyType === 'long' ? strategy : strategy2).conditions[index][indicatorKey];
        setModalIsOpen(true);
        setLocalIndicatorDetails(currentDetails.indiInputs || {});
        console.log(currentDetails)
    };


    // const handleIndicatorChange = (e, indicatorKey) => {
    //     const displayName = e.target.value;
    //     const technicalName = indicatorMapping[displayName] || '';

    //     setIndicatorDetails(prev => ({
    //         ...prev,
    //         [indicatorKey]: { ...prev[indicatorKey], value: technicalName, displayValue: displayName, isNew: false },
    //     }));

    //     if (technicalName && !indicatorDetails[indicatorKey].offset) {
    //         openOffsetModalForEdit(indicatorKey);
    //     }
    // };


//     const handleIndicatorChange = (e, index, indicatorKey) => {
//         const displayName = e.target.value;
//         const technicalName = indicatorMapping[displayName] || '';
//         const indicatorConfig = indicatorConfigurations[displayName] || { inputs: [], defaultValues: {} };
    
//         // Create an object to hold the initial values for each input, using defaults
//         const initialInputs = indicatorConfig.inputs.reduce((acc, inputName) => {
//             acc[inputName] = indicatorConfig.defaultValues[inputName] || '';  // Use the default value or fallback to an empty string
//             return acc;
//         }, {});


//         setStrategy(prev => {
//             const updatedConditions = [...prev.conditions];
//             updatedConditions[index] = {
//                 ...updatedConditions[index],
//                 [indicatorKey]: {
//                     value: technicalName,
//                     displayValue: displayName,
//                     indiInputs: initialInputs
//                 }
//             };
//             return { ...prev, conditions: updatedConditions };
//         });


//     console.log(initialInputs)

//     // Update the indicator details state
//     setIndicatorDetails(prev => ({
//         ...prev,
//         [indicatorKey]: {
//             ...prev[indicatorKey],
//             value: technicalName,
//             displayValue: displayName,
//             isNew: false,
//             indiInputs: initialInputs
//         },
//     }));

//     setLocalIndicatorDetails(initialInputs);
//     if (technicalName && !indicatorDetails[indicatorKey].offset) {
//         openOffsetModalForEditing(index,indicatorKey);
//     }
// };

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

    setIndicatorDetails(prev => ({
        ...prev,
        [indicatorKey]: {
            ...prev[indicatorKey],
            value: technicalName,
            displayValue: displayName,
            isNew: false,
            indiInputs: initialInputs
        },
    }));

    setLocalIndicatorDetails(initialInputs);
    if (technicalName && !indicatorDetails[indicatorKey].offset) {
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

    // const handleModalSubmit = () => {
        
        
    //     setIndicatorDetails(prev => ({
    //         ...prev,
    //         [currentEditing]: {
    //             ...prev[currentEditing],
    //             indiInputs:localIndicatorDetails              
    //         },
    //     }));

    //     setStrategy(prev => {
    //         const newConditions = [...prev.conditions];
    //         const { index, key } = currentEditing;
    //         if (index != null && key) {
    //             newConditions[index][key] = {
    //                 ...newConditions[index][key],
    //                 indiInputs: localIndicatorDetails
    //             };
    //         }
    //         return { ...prev, conditions: newConditions };
    //     });


    //     setLocalIndicatorDetails({})
    //     setCurrentEditing({ index: null, key: null });
    //     setModalIsOpen(false);
       
    // };

    const handleModalSubmit = () => {
        const { strategyType, index, key } = currentEditing;
        const updateStrategy = strategyType === 'long' ? setStrategy : setStrategy2;

        setIndicatorDetails(prev => ({
            ...prev,
            [currentEditing]: {
                ...prev[currentEditing],
                indiInputs: localIndicatorDetails
            },
        }));

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

    // const handleDeleteIndicator = (index,indicatorKey) => {
    //     setIndicatorDetails(prev => ({
    //         ...prev,
    //         [indicatorKey]: { value: '', displayValue: '', offset: '', period: '', isNew: true ,indiInputs : {}},
    //     }));

    //     setStrategy(prev => ({
    //         ...prev,
    //         conditions: prev.conditions.map((condition, i) => {
    //             if (i === index) {
    //                 return {
    //                     ...condition,
    //                     [indicatorKey]: { value: '', displayValue: '', offset: '', period: '', isNew: true, indiInputs: {} }
    //                 };
    //             }
    //             return condition;
    //         })
    //     }));
    // };

    const handleDeleteIndicator = (strategyType, index, indicatorKey) => {
        const updateStrategy = strategyType === 'long' ? setStrategy : setStrategy2;

        setIndicatorDetails(prev => ({
            ...prev,
            [indicatorKey]: { value: '', displayValue: '', offset: '', period: '', isNew: true, indiInputs: {} },
        }));

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
    


    
    // function addCondition() {
    //     const newCondition = {
    //         indicatorOne: { value: "", params: {} },
    //         comparator: "",
    //         indicatorTwo: { value: "", params: {} }
    //     };
    
    //     setStrategy(prev => {
    //         const newStrategy = {
    //             ...prev,
    //             conditions: [...prev.conditions, newCondition]
    //         };
    
    //         // Check if conditions length is greater than 1 to add default logical operator
    //         if (prev.conditions.length > 0) {
    //             newStrategy.logicalOperators = [...prev.logicalOperators, 'AND'];
    //         }

    //         else{
                
    //         }
    
    //         return newStrategy;
    //     });
    // }

    function addCondition(strategyType) {
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
    
    // function changeLogicalOperator(index, operator) {
    //     const newOperators = [...strategy.logicalOperators];
    //     newOperators[index] = operator;
    //     setStrategy(prev => ({
    //         ...prev,
    //         logicalOperators: newOperators
    //     }));
    // }

    function changeLogicalOperator(strategyType, index, operator) {
        const updateStrategy = strategyType === 'long' ? setStrategy : setStrategy2;
        const newOperators = [...(strategyType === 'long' ? strategy.logicalOperators : strategy2.logicalOperators)];
        newOperators[index] = operator;

        updateStrategy(prev => ({
            ...prev,
            logicalOperators: newOperators
        }));
    }

    
    // function deleteCondition(index) {
    //     setStrategy(prev => ({
    //         ...prev,
    //         conditions: prev.conditions.filter((_, i) => i !== index),
    //         logicalOperators: prev.logicalOperators.filter((_, i) => i !== index - 1) // Adjust logical operators array as well
    //     }));
    // }

    function deleteCondition(strategyType,index) {
        const updateStrategy = strategyType === 'long' ? setStrategy : setStrategy2
        

        updateStrategy(prev => ({
            ...prev,
            conditions: prev.conditions.filter((_, i) => i !== index),
            logicalOperators: prev.logicalOperators.filter((_, i) => i !== index - 1)
        }));


    }
    


    // const handleComparatorChange = (e, index) => {
    //     const newComparator = e.target.value;
    //     setStrategy(prev => ({
    //         ...prev,
    //         conditions: prev.conditions.map((cond, idx) => idx === index ? { ...cond, comparator: newComparator } : cond)
    //     }));
    // };
    const handleComparatorChange = (e, strategyType, index) => {
        const newComparator = e.target.value;
        const updateStrategy = strategyType === 'long' ? setStrategy : setStrategy2;

        updateStrategy(prev => ({
            ...prev,
            conditions: prev.conditions.map((cond, idx) => idx === index ? { ...cond, comparator: newComparator } : cond)
        }));
    };

    return (
        <div className='mt-3'>
            {/* <Form>
                <div className='d-flex justify-content-between bg-light p-3'>
                  
                    <div>
                        <input
                            list="indicators-list"
                            value={formatIndicatorDisplay(indicatorDetails.indicatorOne)}
                            onChange={(e) => handleIndicatorChange(e, 'indicatorOne')}
                            placeholder="Select First Indicator"
                            className="form-control"
                        />
                        <datalist id="indicators-list">
                            {Object.keys(indicatorMapping).map((indicator, index) => (
                                <option key={index} value={indicator}>{indicator}</option>
                            ))}
                        </datalist>
                        <Button onClick={() => openOffsetModalForEdit('indicatorOne')} size='sm'>Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteIndicator('indicatorOne')}>Delete</Button>
                    </div>

                  
                    <div>
                        <Form.Control
                            as="select"
                            value={indicatorDetails.comparator}
                            onChange={(e) => setIndicatorDetails(prev => ({ ...prev, comparator: e.target.value }))}
                            className="form-control"
                        >
                            <option value="">Select Comparator</option>
                            <option value="crosses-below">Crosses Below</option>
                            <option value="equal-to">Equal To</option>
                            <option value="lower-than">Lower Than</option>
                            <option value="higher-than">Higher Than</option>
                            <option value="crosses-above">Crosses Above</option>
                        </Form.Control>
                    </div>

                   
                    <div>
                        <input
                            list="indicators-list"
                            value={formatIndicatorDisplay(indicatorDetails.indicatorTwo)}
                            onChange={(e) => handleIndicatorChange(e, 'indicatorTwo')}
                            placeholder="Select Second Indicator"
                            className="form-control"
                        />
                        <Button onClick={() => openOffsetModalForEdit('indicatorTwo')} size='sm'>Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteIndicator('indicatorTwo')}>Delete</Button>
                    </div>
                </div>
            </Form> */}
            
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


            <Form className='d-flex'>
            <div className='w-100'>

            {strategy.conditions.map((condition, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <div className="logical-operator d-flex justify-content-center my-2">
                            <Form.Control
                                as="select"
                                value={strategy.logicalOperators[index - 1] || 'AND'}
                                // onChange={(e) => changeLogicalOperator(index - 1, e.target.value)}
                                onChange={(e) => changeLogicalOperator('long', index - 1, e.target.value)}
                                className="form-control mb-3 w-25 text-center"
                            >
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </Form.Control>
                        </div>
                    )}


              
                
                <div className='w-100'>
                    <h5 className='text-center'>Long {type} Condition</h5>
                <div className='d-flex justify-content-between bg-light p-3'>
                   <div className='d-flex justify-content-between w-100'>
                    <div>
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
                        <Button onClick={() => openOffsetModalForEdit('long',index,'indicatorOne')} size='sm'>Edit</Button>
                        {/* <Button variant="danger" size="sm" onClick={() => handleDeleteIndicator(index, 'indicatorOne')}>Delete</Button> */}
                            {/* <Button onClick={() => openOffsetModalForEditing('long', index, 'indicatorOne')} size='sm'>Edit</Button> */}
                            <Button variant="danger" size="sm" onClick={() => handleDeleteIndicator('long', index, 'indicatorOne')}>Delete</Button>
                        </div>
                    
                    <div>
                    <Form.Control
                        as="select"
                        value={condition.comparator}
                        // onChange={(e) => handleComparatorChange(e, index)}
                        onChange={(e) => handleComparatorChange(e, 'long', index)}
                        className="form-control">
                        <option value="">Select Comparator</option>
                        <option value="crosses-below">Crosses Below</option>
                        <option value="equal-to">Equal To</option>
                        <option value="lower-than">Lower Than</option>
                        <option value="higher-than">Higher Than</option>
                        <option value="crosses-above">Crosses Above</option>
                    </Form.Control>
                    </div>

                    <div>
                    <input
                        list="indicators-list"
                        value={formatIndicatorDisplay(condition.indicatorTwo)}
                        // onChange={(e) => handleIndicatorChange(e, index, 'indicatorTwo')}
                        onChange={(e) => handleIndicatorChange(e, 'long', index, 'indicatorTwo')}
                        placeholder="Select Second Indicator"
                        className="form-control"
                        size='sm'
                    />
                    <Button onClick={() => openOffsetModalForEdit('long',index,'indicatorTwo')} size='sm'>Edit</Button>
                    {/* <Button variant="danger" size="sm" onClick={() => handleDeleteIndicator(index, 'indicatorTwo')}>Delete</Button> */}
                    {/* <Button onClick={() => openOffsetModalForEditing('long', index, 'indicatorTwo')} size='sm'>Edit</Button> */}
                    <Button variant="danger" size="sm" onClick={() => handleDeleteIndicator('long', index, 'indicatorTwo')}>Delete</Button>
                    </div>
                    </div>    
                        
                  
                        <div>
                    <Button variant="danger" size="sm" className='ms-2' onClick={() => deleteCondition('long',index)}> <MdDeleteOutline size={30}/></Button>
                    
                        </div>
                   
                </div>
                </div>

                    
            </React.Fragment>
        ))}
       
            <Button variant="secondary" className='mt-4' onClick={()=>addCondition('long')}>{type} Long Condition</Button>
                
            </div>

            <div  className='w-100'>
            {strategy2.conditions.map((condition, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <div className="logical-operator d-flex justify-content-center my-2">
                            <Form.Control
                                as="select"
                                value={strategy.logicalOperators[index - 1] || 'AND'}
                                // onChange={(e) => changeLogicalOperator(index - 1, e.target.value)}
                                onChange={(e) => changeLogicalOperator('long', index - 1, e.target.value)}
                                className="form-control mb-3 w-25 text-center"
                            >
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </Form.Control>
                        </div>
                    )}



                                
                <div className='w-100'>
                <h5 className='text-center'>Short {type} Condition</h5>
                <div className='d-flex justify-content-between bg-light p-3 border-3 border-start'>
                   <div className='d-flex justify-content-between w-100'>
                    <div>
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
                        <Button onClick={() => openOffsetModalForEdit('short',index,'indicatorOne')} size='sm'>Edit</Button>
                        {/* <Button variant="danger" size="sm" onClick={() => handleDeleteIndicator(index, 'indicatorOne')}>Delete</Button>
                    <Button onClick={() => openOffsetModalForEditing('short', index, 'indicatorOne')} size='sm'>Edit</Button> */}
                    <Button variant="danger" size="sm" onClick={() => handleDeleteIndicator('short', index, 'indicatorOne')}>Delete</Button>
                        </div>
                    
                    <div>
                    <Form.Control
                        as="select"
                        value={condition.comparator}
                        // onChange={(e) => handleComparatorChange(e, index)}
                        onChange={(e) => handleComparatorChange(e, 'short', index)}
                        className="form-control">
                        <option value="">Select Comparator</option>
                        <option value="crosses-below">Crosses Below</option>
                        <option value="equal-to">Equal To</option>
                        <option value="lower-than">Lower Than</option>
                        <option value="higher-than">Higher Than</option>
                        <option value="crosses-above">Crosses Above</option>
                    </Form.Control>
                    </div>

                    <div>
                    <input
                        list="indicators-list"
                        value={formatIndicatorDisplay(condition.indicatorTwo)}
                        // onChange={(e) => handleIndicatorChange(e, index, 'indicatorTwo')}
                        onChange={(e) => handleIndicatorChange(e, 'short', index, 'indicatorTwo')}
                        placeholder="Select Second Indicator"
                        className="form-control"
                        size='sm'
                    />
                    <Button onClick={() => openOffsetModalForEdit('short',index,'indicatorTwo')} size='sm'>Edit</Button>
                    {/* <Button variant="danger" size="sm" onClick={() => handleDeleteIndicator(index, 'indicatorTwo')}>Delete</Button>
                   <Button onClick={() => openOffsetModalForEditing('short', index, 'indicatorTwo')} size='sm'>Edit</Button> */}
                    <Button variant="danger" size="sm" onClick={() => handleDeleteIndicator('short', index, 'indicatorTwo')}>Delete</Button>
                    </div>
                    </div>    
                        
                  
                        <div>
                    <Button variant="danger" size="sm" className='ms-2' onClick={() => deleteCondition('short',index)}> <MdDeleteOutline size={30}/></Button>
                    
                        </div>
                   
                </div>
                </div>


               
            </React.Fragment>
        ))}
       
        <Button variant="secondary" className='mt-4' onClick={()=>addCondition('short')}>{type} Short Condition</Button>
        </div>
    </Form>

           
        </div>
    );
};

export default Strategy;
