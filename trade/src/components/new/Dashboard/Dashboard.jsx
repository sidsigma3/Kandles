import React, { useState, useEffect, useRef } from 'react';
import { useNavigate , useHistory } from 'react-router-dom';
import './Dashboard.css';
import HomePage from './Home/HomePage';
import Graph from './Graph/Graph';
import SystemTrading from './systemTrading/SystemTrading';
import Scanner from '../../../Scanner';
import axios from 'axios';
import queryString from 'query-string';
import Order from './Order/Order';
import Profile from './profile/Profile';
import Subscribe from './subscription/Subscribe';
import Fundtrade from './FundTrade/Fundtrade';
import Fundmain from './FundTrade/Fundmain';
import Competition from './Competition/Competition';
import CompeteRank from './Competition/CompeteRank';
import Leaderboard from './Leaderboard/Leaderboard';
import System from './systemTrading/System';

import { TbWorld } from "react-icons/tb";
import { BsTrophy } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GoBook } from "react-icons/go";
import { MdOutlineAdfScanner } from "react-icons/md";
import { MdOutlineCalculate } from "react-icons/md";
import { CiMoneyCheck1 } from "react-icons/ci";
// import open from 'open';

const Dashboard = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState('home');
  const [requestToken, setRequestToken] = useState(null);
  const [isConnectComplete, setConnectComplete] = useState(false);
  const hasExecuted = useRef(false);
  const [trades, setTrades] = useState([]);
  const [renderedContent, setRenderedContent] = useState(null);

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    if (!requestToken) {
      setRequestToken(queryParams.code);
      localStorage.setItem('reqToken', queryParams.code);
    }
  }, [requestToken]);

  useEffect(() => {
    if (requestToken && !hasExecuted.current) {
      hasExecuted.current = true;
      axios
        .post(`http://localhost:5000/connect/upstox`, { requestToken })
        .then((response) => {
          console.log(response);
          setConnectComplete(true);
          // Save connection state to local storage
          localStorage.setItem('isConnectComplete', 'true');
          // navigate('/system-trading');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [requestToken, navigate]);

  useEffect(() => {
   
      // Check local storage for connection state only when requestToken is present
      const storedConnectComplete = localStorage.getItem('isConnectComplete');
      if (storedConnectComplete === 'true') {
        setConnectComplete(true);
      }
  
  }, []);

  const loginHandler = () => {
    console.log('yoooo');
    axios.post('http://localhost:5000/upstox').then((res) =>{
      // open(res.data.authUrl)
      console.log(res)
      const { authUrl } = res.data;

    // Open the auth URL in a new window or tab
       window.open(authUrl, '_blank');
    });
  };

  const logOutHandler = ()=>{
    localStorage.removeItem('authToken')
    navigate('/');

  }

  const pageHandler = (page) => {
    setActive(page);
    setRenderedContent(null)
  };


  function toggleSidebar() {
    const sidebarContainer = document.querySelector('.sidebar-container');
    sidebarContainer.classList.toggle('show-sidebar');
}

  const renderContent = () => {
    if (!isConnectComplete) {
      return <div>Loading...</div>;
    }

    // Render the Subscription component when 'subscription' is active
    if (renderedContent) {
      return renderedContent;
    }


    switch (active) {
      case 'home':
        return <HomePage></HomePage>;
      case 'system-trading':
        // return <SystemTrading trades={trades} setTrades={setTrades} setRenderedContent={setRenderedContent}></SystemTrading>;
        return <System></System>
        case 'order':
        return <Order trades={trades} setTrades={setTrades}></Order>;
      case 'scanner':
        return <Scanner></Scanner>;
      case 'account':
        return <Profile></Profile>
      case 'subscription':
        return <Subscribe></Subscribe>  
      case 'fundtrade':
        return  <Fundmain></Fundmain> 
      case 'competition':
        return  <Competition setActive={setActive}></Competition>
      case 'rank':
          return  <CompeteRank></CompeteRank>
      case 'leaderboard':
        return <Leaderboard></Leaderboard>

      default:
        return <HomePage></HomePage>;
    }
  };

  return (
    <div className='dashboard'>
      <div className='dash'>
        <div className='side-bar'>
          
          <ul>
            <li className='dash-logo'>
              <img src="/group-39795.svg" alt="" />
              {/* <b>Tradiant</b> */}
            </li>
            <li className={`home-page ${active === 'home' ? 'active' : ''}`} onClick={() => pageHandler('home')} >
            <div className="icon-container">
               <IoHomeOutline className='dash-icons'/> 
               <span className="nav-text"><h3>Home</h3></span>
              {/* <h3>Home</h3> */}
              </div>
            </li>

            <li  className={`scanner-page ${active === 'scanner' ? 'active' : ''}`} onClick={() => pageHandler('scanner')} >
            
              <div className="icon-container">
              <MdOutlineAdfScanner className='dash-icons'/>
              <span className="nav-text"><h3>Scanner</h3></span>
              {/* <h3>Scanner</h3> */}
              </div>
            </li>

            <li className={`system-trading ${active === 'system-trading' ? 'active' : ''}`} onClick={() => pageHandler('system-trading')}>
            <div className="icon-container">
              <MdOutlineCalculate className='dash-icons' /> 
              <span className="nav-text"><h3>Trading</h3></span>
              {/* <h3>Trading</h3> */}
              </div>
            </li>
           
           
            {/* <li className={`order ${active === 'order' ? 'active' : ''}`} onClick={() => pageHandler('order')}>
            <div className="icon-container">
                <GoBook className='dash-icons'/>
                <span className="nav-text"><h3>Order</h3></span>
              <h3>Order</h3>
              </div>
            </li> */}

            <li className={`account ${active === 'fundtrade' ? 'active' : ''}`} onClick={() => pageHandler('fundtrade')}>
            <div className="icon-container">
            <TbReportAnalytics  className='dash-icons'/>
            <span className="nav-text"><h3>Performance</h3></span>
              {/* <h3>Performance</h3> */}
              </div>
            </li>

            <li className={`account ${active === 'competition' ? 'active' : ''}`} onClick={() => pageHandler('competition')}>
            <div className="icon-container">
            <BsTrophy  className='dash-icons'/>
            <span className="nav-text"><h3>Competition</h3></span>
              {/* <h3>Competition</h3> */}
              </div>
            </li>


   
            <li className={`account ${active === 'leaderboard' ? 'active' : ''}`} onClick={() => pageHandler('leaderboard')}>
            <div className="icon-container">
            <TbWorld className='dash-icons'/>
            <span className="nav-text"><h3>Leaderboard</h3></span>
              {/* <h3>Leaderboard</h3> */}
              </div>
            </li>

            <li className={`account ${active === 'subscription' ? 'active' : ''}`} onClick={() => pageHandler('subscription')}>
            <div className="icon-container">
            <CiMoneyCheck1 className='dash-icons'/>
            <span className="nav-text"><h3>Subscription</h3></span>
              {/* <h3>Subscription</h3> */}
              </div>
            </li>

          

         


            <li className={`account ${active === 'account' ? 'active' : ''}`} onClick={() => pageHandler('account')}>
            <div className="icon-container">
              <CgProfile className='dash-icons'/>
              <span className="nav-text"><h3>Profile</h3></span>
              {/* <h3>Profile</h3> */}
              </div>
            </li>
            {/* <li onClick={loginHandler}>
              <h3>Login</h3>
            </li> */}

            <li onClick={logOutHandler}>
              <h3>Log Out</h3>
            </li>
          </ul>
        </div>
        <div className='content'>{renderContent()}</div>
      </div>
    </div>
  );
};



export default Dashboard;
