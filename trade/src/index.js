import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap/css/bootstrap.css'
// import App from './App';
import Reset from './pages/Reset';
import Home from './Home';

import Subscribe from './components/new/Dashboard/subscription/Subscribe';

import HomePage from './pages/Homepage';
// import Signup from './Signup';
import Start from './Start';
import Pass from './pages/Pass';
import Login from './pages/Login';
import Exp from './Exp';
import Greek from './Greek';
import Change from './Change';
import MaxPain from './MaxPain';
import Scanner from './Scanner';
// import Trading from './pages/Trading';
import TradePage from './pages/TradePage';
import Landing from './components/new/Landing/Landing';
import AboutUs from './components/new/AboutUs/AboutUs';
import WhyUs from './components/new/WhyUs/WhyUs';
import News from './components/new/News/News';
import LogIn from './components/new/LogIn/LogIn';
import SignUp from './components/new/SignUp/SignUp';
import Log from './components/new/LogIn/Log';
import Dashboard from './components/new/Dashboard/Dashboard';
import SystemTrading from './components/new/Dashboard/systemTrading/SystemTrading';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="377046758434-nnu0bme8nrlogj08vuk72e8ss20b10a1.apps.googleusercontent.com">
  <React.StrictMode>
    
    {/* <Scanner></Scanner> */}
    {/* <MaxPain></MaxPain> */}
    {/* <Change></Change> */}
    {/* <Greek></Greek> */}
    {/* <Exp></Exp> */}
    {/* <Pass></Pass> */}
    <Home></Home>
    {/* <Subscribe></Subscribe> */}
    {/* <SystemTrading></SystemTrading> */}
    {/* <Dashboard></Dashboard> */}
    {/* <Landing></Landing> */}
    {/* <AboutUs></AboutUs> */}
    {/* <Log></Log> */}
    {/* <WhyUs></WhyUs> */}
    {/* <News></News> */}
    {/* <LogIn></LogIn> */}
{/* <SignUp></SignUp> */}
    {/* <Trading></Trading> */}
    {/* <TradePage></TradePage> */}
    {/* <Start></Start> */}
    {/* <HomePage></HomePage> */}
    {/* <App /> */}
    {/* <Reset></Reset> */}
    {/* <Login></Login> */}
    {/* <Signup></Signup> */}
  </React.StrictMode>
  </GoogleOAuthProvider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals













