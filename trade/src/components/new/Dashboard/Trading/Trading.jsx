import React from 'react'
import { useState ,useEffect} from 'react';
import { Modal, Button, Form ,FormLabel, FormControl, FormGroup, FormCheck, FormSelect } from 'react-bootstrap';
import { IoIosAdd } from "react-icons/io";
import RealTimeClock from '../overview/RealTimeClock';
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Trading = ({strategyList,setStrategyList ,editingStrategyIndex, setEditingStrategyIndex ,isEditing,setIsEditing}) => {
    const [accountType, setAccountType] = useState('live')
    const [legList,setLegList] = useState([])
    const [currentLeg,setCurrentleg]= useState()
    const [showInputs, setShowInputs] = useState(false);
   
    
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


    const [overallSl,setOverallSl]=useState()
    const [overallSlType,setOverallSlType] =useState()
    const [overallTarget,setOverallTarget] = useState()
    const [overallTargetType,setOverallTargetType] =useState()


    const [pyTarget,setPyTarget]= useState()
    const [pyStoploss,setPyStoploss]= useState()
    const [backtest,setBacktest] = useState()
    const [backSymbol,setBackSymbol] =useState()
    const [startDate,setStratDate] = useState()
    const [endDate,setEndDate] = useState()
    const [imageSrc,setImageSrc] = useState()
    const [backCapital,setBackCapital] =useState()
    const [backQuantity,setBackQuantity] =useState()

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

        axios.post(`http://localhost:5000/backtest`,{pyStoploss,pyTarget,backSymbol,startDate,endDate,backCapital,backQuantity})
              .then((response)=>{
                console.log(response)
                const responseData = JSON.parse(response.data); // Manually parse the JSON string
                setBacktest(responseData)
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


        const [indicator, setIndicator] = useState('');
        const [condition, setCondition] = useState('');
        const [threshold, setThreshold] = useState('');
      
        // Function to handle the "Create Strategy" click
        const handleCreateStrategy = () => {
          // Here you would call a function to handle the strategy logic
          console.log({ indicator, condition, threshold });
          // This could involve calling an API, performing calculations, etc.
        };

  return (
    <div className='trade p-2 mx-2'>
       <ToastContainer></ToastContainer>
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


        <div className='d-flex justify-content-center mt-3 bg-light'>
            <button className='btn btn-secondary' onClick={handleSave}>save</button>
        </div>



        <div className='w-50 mt-3'>
            <FormGroup>
              <FormSelect onChange={(e)=>setBackSymbol(e.target.value)}>
                <option value='SBIN'>SBIN</option>
                <option value='CIPLA'>CIPLA</option>
                <option value='HDFCBANK'>HDFCBANK</option>
              </FormSelect>
            </FormGroup>


            <FormGroup>
              <FormLabel>Date</FormLabel>
              <FormGroup className='d-flex'>
              <FormControl type='date' onChange={(e)=>setStartDates(e.target.value)}></FormControl>
              <FormControl type='date' onChange={(e)=>setEndDates(e.target.value)}></FormControl>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <FormLabel>Quantity</FormLabel>
              <FormControl type='number' onChange={(e)=>setBackQuantity(Number(e.target.value))}></FormControl>
            </FormGroup>

            <FormGroup>
              <FormLabel>Initial Capital</FormLabel>
              <FormControl type='number' onChange={(e)=>setBackCapital(Number(e.target.value))}></FormControl>
            </FormGroup>


            <FormGroup>
              <FormLabel>Stoploss</FormLabel>
              <FormControl onChange={(e)=>setPyStoploss(Number(e.target.value))}></FormControl>
            </FormGroup>

            <FormGroup>
              <FormLabel>Target</FormLabel>
              <FormControl onChange={(e)=>setPyTarget(Number(e.target.value))}></FormControl>
              
            </FormGroup>

            <div>
      <select value={indicator} onChange={e => setIndicator(e.target.value)}>
        <option value="">Select Indicator</option>
        <option value="rsi">RSI</option>
        <option value="macd">MACD</option>
      </select>

      <select value={condition} onChange={e => setCondition(e.target.value)}>
        <option value="">Select Condition</option>
        <option value="above">Above</option>
        <option value="below">Below</option>
      </select>

      <input
        type="number"
        value={threshold}
        onChange={e => setThreshold(e.target.value)}
        placeholder="Threshold Value"
      />

      <button onClick={handleCreateStrategy}>Create Strategy</button>
    </div>

              <button onClick={handleStrategy} className='mt-4'>Start BackTest</button>

        </div>
        
      
       
        
        {backtest && (
        <>
            <h3>Strategy Metrics</h3>
          <ul>
            <li>Total Signals: {backtest.result["Total Signals"]}</li>
            <li>Number of Wins: {backtest.result["Number of Wins"]}</li>
            <li>Number of Losses: {backtest.result["Number of Losses"]}</li>
            <li>Winning Streak: {backtest.result["Winning Streak"]}</li>
            <li>Losing Streak': {backtest.result["Losing Streak"]}</li>
            <li>Max Gains: {backtest.result["Max Gains"]}</li>
            <li>Max Loss: {backtest.result["Max Loss"]}</li>
            <li>Avg Gain per Winning Trade: {backtest.result["Avg Gain per Winning Trade"]}</li> 
            <li>Avg Loss per Losing Trade: {backtest.result["Avg Loss per Losing Trade"]}</li>
            <li>Max Drawdown: {backtest.result["Max Drawdown"]}</li>
            <li>Win Rate (%): {backtest.result["Win Rate (%)"]}</li>
            <li>Loss Rate (%): {backtest.result["Loss Rate (%)"]}</li>
            <li>Profit Factor: {backtest.result["Profit Factor"]}</li>
            <li>Total PnL: {backtest.result["Total PnL"]}</li>
            <li>Final Funds: {backtest.result["Remaining Funds"]}</li>
          </ul>


          <h3>Trade Details</h3>
          <ul>
            {backtest.result.trades.map((trade, index) => (
              <li key={index}>
                {trade.action} at {trade.price}{trade.pnl ? `, PnL: ${trade.pnl}` : ''}
              </li>
            ))}
          </ul>

        

          {/* Assuming you have a Base64 encoded image or a URL for the graph */}
          <img src={imageSrc} alt="Strategy Performance Graph" />
        </>
      )}

    </div>
  )
}

export default Trading