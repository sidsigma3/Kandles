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

const HomePage = () => {
    const [selectedInstrument, setSelectedInstrument] = useState('');
    const [watchlist, setWatchlist] = useState([]);

    const handleSelectInstrument = (selectedInstrument) => {
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

  return (
    <div className='home'>
        <div className='home-sec-1'>
            <div className='index'>
              <h4>Indices</h4>
                <ul>
                    <li> <Map1 indices={'Nifty 50'}></Map1></li>

                    <li> <Map1 indices={'Nifty Bank'}> </Map1>    </li>

                    <li> <Map1 indices={'Nifty Fin Service'}> </Map1> </li>

                    <li> <Map1 indices={'Nifty IT'}> </Map1> </li>

                    <li> <Map1 indices={'Nifty Midcap 50'}> </Map1> </li>
                </ul>

            </div>

            <div className='profile'>
                <img src='/image-60.svg'>
                </img>
                <h6>
                   Sidhanta Pradhan
                </h6>
                <p>sidsigma3@gmail.com</p>

            </div>
        </div>

        <div className='home-sec-2'>
         
              <div className='sec-2-overview'>
                <h4>Overview</h4>
            <div className='graph'>
           
              
              <Graph selectedInstrument={selectedInstrument}></Graph>
            {/* <Order selectedInstrument={selectedInstrument} /> */}
            </div>
            </div>
            <div className='watch-list-container'>
              <h4>Watchlist</h4>
            <div className='watch-list'>
                {/* <ul>
                    <li>hdfc</li>
                    <li>reliance</li>
                    <li>tata</li>
                    <li>adani</li>
                </ul> */}
                {/* <Hotlist></Hotlist> */}
                {/* <Watchlist onSelectInstrument={setSelectedInstrument} /> */}
               
                <div>
      <Watchlist onSelectInstrument={handleSelectInstrument} selectInstrument={handleSelectedInstrument} />
      {/* Display the watchlist or do other things with the selected instruments */}
      <div className='watchlist-list'>
        
        <ul>
          {watchlist.map((instrument) => (
            <li key={instrument}>
              {instrument} 
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



        </div>

        <div className='home-sec-3'>
            
            <div className='calender-container'>
            <h4>Economic calender</h4>
            <div className='result'>
                    
                   <Calender></Calender>
            </div>
            </div>

            <div className='news-container'>
            <h4>News Feed</h4>
            <div className='news'>
                    {/* <NewsFeed></NewsFeed> */}
            </div>
            </div>

            <div className='trend-container'>
            <h4>Top Movers</h4>
            <div className='trend'>
                    {/* <NewsFeed></NewsFeed> */}
            </div>
            </div>
        </div>


    </div>
  )
}

export default HomePage