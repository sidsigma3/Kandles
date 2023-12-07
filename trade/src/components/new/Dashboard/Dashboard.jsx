import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import HomePage from './Home/HomePage';
import Graph from './Graph/Graph';
import SystemTrading from './systemTrading/SystemTrading';
import Scanner from '../../../Scanner';
import axios from 'axios';
import queryString from 'query-string';
import Order from './Order/Order';
import Profile from './profile/Profile';
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GoBook } from "react-icons/go";
import { MdOutlineAdfScanner } from "react-icons/md";
import { MdOutlineCalculate } from "react-icons/md";

const Dashboard = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState();
  const [requestToken, setRequestToken] = useState(null);
  const [isConnectComplete, setConnectComplete] = useState(false);
  const hasExecuted = useRef(false);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    if (!requestToken) {
      setRequestToken(queryParams.code);
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
    axios.post('http://localhost:5000/upstox').then((res) => console.log(res));
  };

  const pageHandler = (page) => {
    setActive(page);
  };

  const renderContent = () => {
    if (!isConnectComplete) {
      return <div>Loading...</div>;
    }

    switch (active) {
      case 'home':
        return <HomePage></HomePage>;
      case 'system-trading':
        return <SystemTrading trades={trades} setTrades={setTrades}></SystemTrading>;
      case 'order':
        return <Order trades={trades} setTrades={setTrades}></Order>;
      case 'scanner':
        return <Scanner></Scanner>;
      case 'account':
        return <Profile></Profile>
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
              <b>Tradiant</b>
            </li>
            <li className={`home-page ${active === 'home' ? 'active' : ''}`} onClick={() => pageHandler('home')}>
               <IoHomeOutline className='dash-icons'/> 
              <h3>Home</h3>
            </li>
            <li className={`system-trading ${active === 'system-trading' ? 'active' : ''}`} onClick={() => pageHandler('system-trading')}>
              <MdOutlineCalculate className='dash-icons' /> 
              <h3>System Trading</h3>
            </li>
            <li  className={`scanner-page ${active === 'scanner' ? 'active' : ''}`} onClick={() => pageHandler('scanner')}>
              <MdOutlineAdfScanner className='dash-icons'/>
              <div>
              <h3>Option Scanner</h3>
              </div>
            </li>
            <li className={`order ${active === 'order' ? 'active' : ''}`} onClick={() => pageHandler('order')}>
                <GoBook className='dash-icons'/>
              <h3>Order</h3>
            </li>
            <li className={`account ${active === 'account' ? 'active' : ''}`} onClick={() => pageHandler('account')}>
              <CgProfile className='dash-icons'/>
              <h3>Profile</h3>
            </li>
            <li onClick={loginHandler}>
              <h3>Login</h3>
            </li>
          </ul>
        </div>
        <div className='content'>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;