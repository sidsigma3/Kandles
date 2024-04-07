import React from 'react'
import { useState ,useNavigate ,useRef,useEffect} from 'react'
import './HomePage.css'
import Graph from '../Graph/Graph'
import Map from '../overview/Map'
import NewsFeed from '../overview/NewsFeed'
import Hotlist from '../overview/Hotlist'
import Map1 from '../overview/Map1'
import Watchlist from '../overview/Watchlist'
import Calender from '../overview/Calender'
import { IoBarChartOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import ProfileSec from '../overview/ProfileSec'
import Movers from '../overview/Movers'
import Losers from '../overview/Losers'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { Modal, Form ,FormLabel, FormControl, FormGroup, FormCheck, FormSelect,Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs";
import RealTimeClock from '../overview/RealTimeClock'


const HomePage = ({strategyList ,setStrategyList ,setActive,setEditingStrategyIndex,setIsEditing}) => {
    const [selectedInstrument, setSelectedInstrument] = useState('');
    const [watchlist, setWatchlist] = useState([]);
    const [graphInstrument,setGraphInstrumnent] = useState()

    const [open, setOpen] = useState(false);
    const [openStates, setOpenStates] = useState({});

    const handleSelectInstrument = (selectedInstrument) => {
      setGraphInstrumnent(selectedInstrument.instrument_key)
      console.log(selectedInstrument)
        if (selectedInstrument) {
          // Add the selected instrument to the watchlist
          setWatchlist((prevWatchlist) =>{
           const temp =[...prevWatchlist, selectedInstrument]
           localStorage.setItem('watchlist', JSON.stringify(temp));
          return temp
          })
         
        }
      };

      const handleSelectedInstrument = (instrument) => {
        console.log(instrument)
        setSelectedInstrument(instrument)
      };


      const handleRemoveInstrument = (instrument) => {
        setWatchlist((prevWatchlist) => {
        const temp=prevWatchlist.filter(item => item !== instrument)
        localStorage.setItem('watchlist', JSON.stringify(temp));
        return  temp
      });
       

        // onRemoveInstrument(instrument);
      };


      useEffect(()=>{
        const storedWatchlist = localStorage.getItem('watchlist');
        if (storedWatchlist) {
            setWatchlist(JSON.parse(storedWatchlist));
        }

      },[])

      const toggleStrategyDetails = (strategyIndex) => {
        setOpenStates(prevOpenStates => ({
          ...prevOpenStates,
          [strategyIndex]: !prevOpenStates[strategyIndex]
        }));
      };


      const handleEdit = (index) => {
        setIsEditing(true);
        setEditingStrategyIndex(index);
        setActive('trading'); 
      };

      const handleCreateNew = () =>{
        setIsEditing(false)
        setEditingStrategyIndex(null);
        setActive('trading')
      }
    
      const handleShare = (strategyIndex) => {
        // Implement share functionality
      };
    
      const handleCopy = (strategyIndex) => {
        // Implement copy functionality
      };
    
      const handleDelete = (strategyIndex) => {
        // Implement delete functionality
        const updatedList = strategyList.filter((_, index) => index !== strategyIndex);
        setStrategyList(updatedList);
      };

  return (
    <div className='home'>

      <div className='bg-white d-flex justify-content-between py-2 mb-3 px-2 align-items-center'>
             <div className='d-flex justify-content-between align-items-center'>
                <div className='border border-primary rounded-circle p-3 fs-3 me-3'>SP</div>             
                <h3 className='text-primary'>Welcome SIDHANTA PRADHAN</h3>
            </div>

            <div>
              <h4>Dashboard</h4>
            </div>

            <div>
                <RealTimeClock></RealTimeClock>
            </div>
      </div>
        <div className='home-sec-1'>
            <div className='index'>
           
                <ul>
                    {/* <li> <Map1 indices={'Nifty 50'}></Map1></li>

                    <li> <Map1 indices={'Nifty Bank'}> </Map1>    </li>

                    <li> <Map1 indices={'Nifty Fin Service'}> </Map1> </li>

                    <li> <Map1 indices={'Nifty IT'}> </Map1> </li>

                    <li> <Map1 indices={'Nifty Midcap 50'}> </Map1> </li> */}

                    <li> <div>
      <h5>NIfty 50</h5>
      <h6 style={{color:'red'}}>22212.70</h6>
      <div className='d-flex justify-content-between  px-5'>
      <h6 style={{color:'red'}}>-4.75</h6>
      <h6 style={{color:'red'}}>-0.02%</h6>
      </div>
      
    </div></li>

    <li> <div>
      <h5>Nifty Bank</h5>
      <h6 style={{color:'red'}}>46811.75</h6>
      <div className='d-flex justify-content-between  px-5'>
      <h6 style={{color:'red'}}>-108.05</h6>
      <h6 style={{color:'red'}}>-0.23%</h6>
      </div>
    </div></li>

    <li> <div>
      <h5>Fin Nifty</h5>
      <h6 style={{color:'green'}}>20677.10</h6>
      <div className='d-flex justify-content-between  px-5'>
      <h6 style={{color:'green'}}>11.20</h6>
      <h6 style={{color:'green'}}>0.05%</h6>
      </div>
    </div></li>

    <li> <div>
      <h5>Nifty IT</h5>
      <h6 style={{color:'red'}}>38045.65</h6>
      <div className='d-flex justify-content-between  px-5'>
      <h6 style={{color:'red'}}>-84.50</h6>
      <h6 style={{color:'red'}}>-0.22%</h6>
      </div>
    </div></li>

    <li> <div>
      <h5>Nifty Midcap 50</h5>
      <h6 style={{color:'green'}}>14062.20</h6>
      <div className='d-flex justify-content-between  px-5'>
      <h6 style={{color:'green'}}>100.25</h6>
      <h6 style={{color:'green'}}>0.72%</h6>
      </div>
    </div></li>
                </ul>

            </div>

            {/* <div className='profile'>
                <h6>
                   Sidhanta Pradhan
                </h6>
                <p>sidsigma3@gmail.com</p>

            </div> */}
        </div>

        <div className='home-sec-2'>

                    <div className='d-flex justify-content-between w-100  h-25 p-2'>
                      <div className='d-flex justify-content-between w-25 me-3 bg-white p-1 px-3'>
                            <div className='border-4 border-end w-50 '>
                              <h4>Total PNl</h4>
                              <h5>0</h5>
                            </div>

                            <div>
                              <h4>Total Order</h4>
                              <h5>0</h5>
                            </div>
                            </div>
                      <div className='w-75 d-flex justify-content-between bg-white p-2 px-3 align-items-center'>
                        <div className='d-flex align-items-center'>
                          <h4 className='me-3'>Total Strategy:</h4>
                          <h4>{strategyList.length}</h4>
                        </div>

                        <div className='w-25'>
                          <input className='form-control' placeholder='search strategy'></input>
                        </div>

                        <button className='btn btn-primary' onClick={()=> handleCreateNew()}>Create New</button>



                      </div>
                    </div>
                    
                    {strategyList.map((strategy,index)=> (
                      <div>
                      <div key={index} className='d-flex justify-content-between mt-2 bg-white p-1 align-items-center'>
                            
                        <div className='d-flex'>

                            <div>


                                <FormGroup className='d-flex justify-content-between w-50'>

                                  <FormCheck className='me-5'></FormCheck>
                                  <FormCheck type='switch' size='lg'></FormCheck>
                                </FormGroup>

                             </div> 

                             <div className='d-flex align-items-center ms-5 me-4'>
                              <FormLabel className='w-75 fs-6 me-2'>No. of Runs:</FormLabel>
                              <FormControl type='number' size='sm' className='text-center' style={{width:'80px'}}></FormControl>

                             </div> 


                            <div>
                            <h5>{strategy.strategyName}</h5>
                            </div>

                          </div>

                            <div>
                             <FormSelect>
                              <option>Select Broker</option>
                              <option>Zerodha</option>
                              <option>Upstox</option>
                              <option>Angel One</option>
                              <option>Fyers</option>

                             </FormSelect>

                              </div>

                        <div className='d-flex'>

                              <div  className='me-4 '>
                              <button className='btn btn-outline-success'>RUN</button>
                               </div> 

                              <Button
                                className='me-3'
                                onClick={() => toggleStrategyDetails(index)}
                                aria-controls={`collapse-details-${index}`}
                                aria-expanded={openStates[index] || false}
                              >
                                Expand
                              </Button>


                              <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
            <BsThreeDotsVertical />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleEdit(index)}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => handleShare(index)}>Share</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCopy(index)}>Duplicate</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDelete(index)}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
                           
                        </div>

                      </div>

                      <div>
                            <Collapse in={openStates[index] || false}>
                            <div id={`collapse-details-${index}`} className='bg-white mt-2 p-1'>
                              <div className='d-flex justify-content-between'>
                                <div className='border-end w-25 me-4 ps-5'>
                                  <h4>Overall Pnl</h4>
                                  <p>0</p>
                                  <h5>Total Orders Executed</h5>

                                </div>


                                <div className='border-end w-25 me-4'>
                                  <h4>Overall MTM Criteria</h4>
                                  <div className='d-flex justify-content-between w-50'>
                                  <h5>SL:</h5>
                                  <p className='text-danger fs-5'>{strategy.overallSl} {strategy.overallSlType}</p>
                                  </div>

                                  <div className='d-flex justify-content-between w-50'>
                                    <h5>TP:</h5>
                                    <p className='text-success fs-5'>{strategy.overallTarget} {strategy.overallTargetType}</p>
                                  </div>
                                 
                                </div>

                                <div className='border-end w-25 me-4'>
                                  <h4>Strategy Time</h4>
                                  <div className='d-flex justify-content-between w-50'>
                                  <h5>Start Time</h5>
                                  <h5>{strategy.entryTime}</h5>
                                  </div>

                                  <div className='d-flex justify-content-between w-50'>
                                  <h5>Exit Time</h5>
                                  <h5>{strategy.exitTime}</h5>
                                  </div>
                                </div>

                                <div className='border-end w-25 me-4'>
                                  <h5>Execution Days</h5>
                                  <strong className='fs-5'>
                                  {Object.entries(strategy.days)
                                  .filter(([day, isSelected]) => isSelected)
                                  .map(([selectedDay]) => selectedDay)
                                  .join(", ")}
                                   </strong>
                                </div>



                                </div>

                                <div className='mt-2 px-2'>
                                <h4>Leg Details</h4>
                                {strategy.legList.map((leg,index)=>(
                                  <div key={index} className='d-flex justify-content-between border border-dark mb-2 p-2'>
                                    <div className='w-50 d-flex justify-content-between'>
                                    <p className='p-1 rounded' style={{backgroundColor:'#AED6F1'}}>{leg.position}</p>
                                    <p className='p-1 rounded' style={{backgroundColor:'#AED6F1'}}>{leg.instrument}</p>
                                    <p className='p-1 rounded' style={{backgroundColor:'#AED6F1'}}>{leg.segment}</p>
                                    <p className='p-1 rounded' style={{backgroundColor:'#AED6F1'}}>{leg.optionType}</p>
                                    <p className='p-1 rounded' style={{backgroundColor:'#AED6F1'}}>{leg.strikeCriteria}</p>
                                    <p className='p-1 rounded' style={{backgroundColor:'#AED6F1'}}>{leg.lot} Lot</p>

                                    </div>

                                    <div>


                                      </div>

                                    </div>

                                ))}
                                </div>
                            </div>
                          </Collapse>

                              </div>
                      </div>

 
                    ))}


         
              {/* <div className='sec-2-overview'>
                <h4>Overview</h4>
            <div className='graph'>
           
              
              <Graph selectedInstrument={selectedInstrument}></Graph>
          
            </div>
            </div>
            <div className='watch-list-container'>
              <h4>Watchlist</h4>
            <div className='watch-list'>
               
               
                <div>
      <Watchlist onSelectInstrument={handleSelectInstrument} selectInstrument={handleSelectedInstrument} />
      
      <div className='watchlist-list'>
        
        <ul>
          {watchlist.map((instrument) => (
            <li key={instrument}>
              <h8> {instrument.name} </h8> 
              <div>
              <button className='watch-select btn' onClick={()=>handleSelectedInstrument(instrument)}><IoBarChartOutline /></button>
              <button className='watch-delete btn' onClick={() => handleRemoveInstrument(instrument)}><MdOutlineDelete /></button>
              </div>
              </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
            </div>
 */}


        </div>

        <div className='home-sec-3'>
            
            <div className='calender-container'>
            <h4>Trending Stock</h4>

            <div className='result' style={{
                backgroundImage: 'url(./trending.svg)',
                backgroundSize: 'cover', // Ensure it covers the full div
                backgroundPosition: 'center', // Center the background image
                height: '100%', // Set to desired height
                width: '100%' // Set to desired width
            }}>
                {/* <Calender></Calender> */}
            </div>
            {/* <div className='result'>
                 <img src='./trending.svg' ></img>   
                   <Calender></Calender>
            </div> */}
            </div>

            <div className='news-container'>
            <h4>Top Gainers</h4>
            <div className='news'>
            <Movers></Movers>
                    {/* <NewsFeed></NewsFeed> */}
            </div>
            </div>

            <div className='trend-container'>
            <h4>Top Losers</h4>
            <div className='trend'>
                
                   <Losers></Losers>
            </div>
            </div>
        </div>


    </div>
  )
}

export default HomePage