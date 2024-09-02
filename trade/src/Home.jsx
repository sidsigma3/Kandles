import React, { Component ,useState , useEffect} from 'react';
import axios from 'axios'
import queryString from 'query-string';
import Reset from './pages/Reset';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserHistory} from 'history';
import Pass from './pages/Pass';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import Homepage from './pages/Homepage';
import Start from './Start';
import Exp from "./Exp"
import Greek from "./Greek"
import Scanner from './Scanner';
import TradePage from './pages/TradePage';
import Position from './pages/Position';
import Landing from './components/new/Landing/Landing';
import WhyUs from './components/new/WhyUs/WhyUs';
import AboutUs from './components/new/AboutUs/AboutUs';
import News from './components/new/News/News';
import LogIn from './components/new/LogIn/LogIn';
import SignUp from './components/new/SignUp/SignUp';
import Log from './components/new/LogIn/Log';
import Dashboard from './components/new/Dashboard/Dashboard';
import HomePage from './components/new/Dashboard/Home/HomePage';
import SystemTrading from './components/new/Dashboard/systemTrading/SystemTrading';
import CompeteRank from './components/new/Dashboard/Competition/CompeteRank';
import Graph from './components/new/Dashboard/Graph/Graph';
import StrategyHome from './components/new/Dashboard/Strategy/StrategyHome';

import StrategyBuild from './components/new/Dashboard/Strategy/StrategyBuild';
import StrategyBuildPage from './components/new/Dashboard/Strategy/StrategyBuildPage';


const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
const retrieveFromLocalStorage = (key, defaultValue) => {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : defaultValue;
  };
  
    

const browserHistory = createBrowserHistory({forceRefresh:true})

const Home = () =>{
   
const [strategyListIndi,setStrategyListIndi] = useState(() => retrieveFromLocalStorage('strategyListIndi', []))

useEffect(()=>{
    saveToLocalStorage('strategyListIndi',strategyListIndi)
},[strategyListIndi])


return(
    <div className='routes'>
        <Router history={browserHistory}>
                <Routes>
                <Route exact path='/' element={<Landing></Landing>}/> 
                <Route exact path='/why-Us' element={<WhyUs></WhyUs>}/>                 
                <Route exact path='/about-Us' element={<AboutUs></AboutUs>}/> 
                <Route exact path='/blog' element={<News></News>}/> 
                
                
                {/* <Route path="homepage" element={<HomePage></HomePage>} /> */}
                <Route path="system-trading" element={<SystemTrading />} />
                <Route path="order" element={<Graph></Graph>} />
                <Route path="scanner" element={<Scanner />} />
                <Route path="account" element={<div>Account Information Content</div>} />
                {/* Add more routes as needed */}
                {/* Redirect to home if no match */}
                <Route path="/" element={<HomePage></HomePage>} />




                {/* <Route exact path='/' element={<Start></Start>}/>  */}
                {/* <Route exact path='/dashboard' element={<StrategyHome></StrategyHome>}/>  */}

                <Route exact path='/dashboard' element={<StrategyBuildPage  setStrategyListIndi={setStrategyListIndi} strategyListIndi={strategyListIndi}></StrategyBuildPage>}/> 

                {/* <Route exact path='/dashboard' element={<Dashboard></Dashboard>}/>  */}
                <Route exact path='/login' element={<Log></Log>}/> 
                <Route exact path='/signup' element={<Log></Log>}/>  
                <Route exact path='/reset' element={<Reset></Reset>}/>  
                <Route exact path='/scanner' element={<Scanner></Scanner>}/>  
                <Route exact path='/greek' element={<Greek></Greek>}/>  
                <Route exact path='/trading' element={<TradePage></TradePage>}/>  
                <Route exact path='/report' element={<Position></Position>}/>  
                    {/* <Route exact path='/' element={<App></App>}/>   
                    <Route exact path='/resetPassword' element={<Reset></Reset>}/> */}
                <Route exact path='/pass' element={<Pass></Pass>}/>

                <Route exact path='/rank' element={<CompeteRank></CompeteRank>}/>

                </Routes>
        </Router>

        </div>
        

    )
}

export default Home