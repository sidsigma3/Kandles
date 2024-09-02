import React ,{useState} from 'react'

import { Modal, Button, Form ,FormLabel, FormControl, FormGroup, FormCheck, FormSelect } from 'react-bootstrap';
import Select from 'react-select';
import optionList from '../overview/optionList';
import stockList from '../overview/StockList';
import Strategy from '../overview/Strategy';




const StrategyBuild = ({setStrategyShow,setStrategyListIndi ,strategyListIndi}) => {

    

    const [instrumentType,setInstrumentType] = useState('equity')
    const [positionSizeType,setPositionSizeType] = useState('')
    const [graphType,setGraphType] = useState('candle')
    const [marketType,setMarketType] = useState('mis')
    const [timePeriod,setTimePeriod] = useState('day')
    const [entryType,setEntryType] = useState('buy')
    const [pyTarget,setPyTarget]= useState()
    const [pyStoploss,setPyStoploss]= useState()
    const [backtest,setBacktest] = useState([])
    const [backSymbol,setBackSymbol] =useState()
   
    const [imageSrc,setImageSrc] = useState()
  
    const [backQuantity,setBackQuantity] =useState()

    const [showMore,setShowMore] = useState(false)
    const [showMore1,setShowMore1] = useState(false)
    const [trailing,setTrailing] = useState(0)
    const [maxQuantity,setMaxQuantity] = useState()
    const [sizeAmount,setSizeAmount] = useState()

    const [trailingType,setTrailingType] = useState()
    const [moveSl,setMoveSl] = useState()
    const [moveInstrument,setMoveInstrument] = useState()

    const [maxLong,setMaxLong] = useState(1)
    const [maxShort,setMaxShort] = useState(1)
  

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



      const handleSaveStrategy = () =>{

        const newStrategy = {
            backSymbol : backSymbol,
            backQuantity:backQuantity,
            graphType:graphType,
            timePeriod:timePeriod,
            marketType:marketType,
            strategyDetails:strategyDetails,
            strategyDetails2:strategyDetails2,
            strategyDetailsExit:strategyDetailsExit,
            strategyDetailsExit2:strategyDetailsExit2,
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

        }


        setStrategyListIndi([...strategyListIndi,newStrategy])
        

        setStrategyShow('backtest')

      }

  return (
    <div>
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
              
            </div>


            <button onClick={handleSaveStrategy}>Save Strategy</button>

    </div>
  )
}

export default StrategyBuild