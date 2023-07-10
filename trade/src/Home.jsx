import React, { Component} from 'react';
import axios from 'axios'
import queryString from 'query-string';
import Reset from './pages/Reset';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserHistory} from 'history';
import Pass from './pages/Pass';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Start from './Start';
import Exp from "./Exp"
import Greek from "./Greek"
import Scanner from './Scanner';
import TradePage from './pages/TradePage';
import Position from './pages/Position';
const browserHistory = createBrowserHistory({forceRefresh:true})

const Home = () =>{
   


return(
    <div className='routes'>
        <Router history={browserHistory}>
                <Routes>
                <Route exact path='/' element={<Start></Start>}/> 
                <Route exact path='/homepage' element={<Homepage></Homepage>}/> 
                <Route exact path='/login' element={<Login></Login>}/> 
                <Route exact path='/signup' element={<Signup></Signup>}/>  
                <Route exact path='/reset' element={<Reset></Reset>}/>  
                <Route exact path='/scanner' element={<Scanner></Scanner>}/>  
                <Route exact path='/greek' element={<Greek></Greek>}/>  
                <Route exact path='/trading' element={<TradePage></TradePage>}/>  
                <Route exact path='/report' element={<Position></Position>}/>  
                    {/* <Route exact path='/' element={<App></App>}/>   
                    <Route exact path='/resetPassword' element={<Reset></Reset>}/> */}
                <Route exact path='/pass' element={<Pass></Pass>}/>
                </Routes>
        </Router>

        </div>
        

    )
}

export default Home