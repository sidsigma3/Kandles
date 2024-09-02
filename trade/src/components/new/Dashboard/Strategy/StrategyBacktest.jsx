import React , {useState , useEffect} from 'react'
import axios from 'axios';
import Select from 'react-select';
import { Modal, Button, Form ,FormLabel, FormControl, FormGroup, FormCheck, FormSelect } from 'react-bootstrap';
import StrategyResult from './StrategyResult';

const StrategyBacktest = ({strategyListIndi}) => {

    const {strategyDetails,strategyDetails2,strategyDetailsExit,strategyDetailsExit2,graphType,marketType,maxQuantity,moveInstrument,moveSl,positionSizeType,backQuantity,sizeAmount,pyStoploss,backSymbol,pyTarget,timePeriod,trailingType,maxLong,maxShort} = strategyListIndi[strategyListIndi.length-1]

    console.log(strategyListIndi)
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

      const toggleAllDays = (selectAll) => {
        const newSelectedDays = {};
        Object.keys(selectedDays).forEach((day) => {
          newSelectedDays[day] = selectAll;
        });
        setSelectedDaysForIndi(newSelectedDays);
      };

      const toggleDayForIndi = (day) => {
        setSelectedDaysForIndi((prevDays) => ({
          ...prevDays,
          [day]: !prevDays[day],
        }));
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


    // useEffect(()=>{
    //   setTrailPct(trailing/100) 
      
    // },[trailing])



    
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
              
                const parsedData = responseData.map(item => {
                  return {
                      ...item,
                      monthly_pnl: typeof item.monthly_pnl === 'string' ? JSON.parse(item.monthly_pnl) : item.monthly_pnl,
                      monthly_pnl_short: typeof item.monthly_pnl === 'string' ? JSON.parse(item.monthly_pnl_short) : item.monthly_pnl_short,
                      monthly_pnl_total: typeof item.monthly_pnl === 'string' ? JSON.parse(item.monthly_pnl_total) : item.monthly_pnl_total,
                      closePrices: typeof item.closePrices === 'string' ? JSON.parse(item.closePrices) : item.closePrices,
                  };

                 });
               
                // setMonthlyData(parsedData)
                console.log(parsedData)
                setLoading(false)
                 
                // setExpandedRow(null)
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


  return (
    <div className='p-3'>

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

          <div className='d-flex justify-content-between'>
           
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


              </div>

                <div className='mt-1 mb-3'>

                <button onClick={handleStrategy} className='mt-4 btn btn-warning'>Start BackTest</button>

                </div>


                <div>
                  <StrategyResult backtest={backtest} loading={loading} backCapital={backCapital} marketType={marketType}></StrategyResult>
                </div>


    </div>
  )
}

export default StrategyBacktest