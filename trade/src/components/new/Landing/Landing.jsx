import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'
import '../../../global.css'

const Landing = () => {


const navigate = useNavigate()





















  return (
    <div>
    <div className='nav'>

        <div className='logo'>
           
        <a href='#'>
   <div className='logo-container' onClick={()=>navigate('/')}>
    <img src='/group-39795.svg'>
    </img>
    <b className='tradient'>
        Tradiant
    </b>

    </div>
    </a>

        <div className='navlinks'>
            <ul>

                <li>
                    <a onClick={()=>navigate('/about-us')}>
                    About Us    
                    </a>
                </li>
               
                <li className='why-us'>
                    <a  onClick={()=>navigate('/why-Us')}>
                        Why Us?
                    </a>

                </li>
                <li className='Blog'>
                    <a  onClick={()=>navigate('/blog')}>
                        Blog
                    </a>

                </li>
                <li className='Journey'>
                    <a href='#'>
                        Journey
                    </a>

                </li><li className='Help'>
                    <a  href='#'>
                        Help
                    </a>

                </li>
            </ul>

        </div>

        </div>

        <div className='login-buttons'>
            <div className='login'>
            <a onClick={()=>{navigate('/signup')}}>
                <div className='sign-up'>
               Sign Up
                </div>
                </a>
                <button onClick={()=>{navigate('/login')}}>Sign In</button>
            </div>

        </div>
    </div>

    <div className='section-1'>
        <div className='sec-1-left'>
            <h4>Smart Trading</h4>
           
            <h2>Trade With <span>Risk Management</span></h2>
            <div className='content'>
            <text>Maximize your investment in the capital market world with the </text>
            <text>convenience and various features provided by Tradiant.</text>
            </div>


            <div className='clickable'>
                <div className='get-started'>
                    Get Started
                </div>
                <div className='see'>
                    See How It Works
                </div>

            </div>
        </div>

        <div className='sec-1-right'>
         
            <img src='/Dashboard.svg' alt='dashboard'></img>
            
        </div>
    </div>

    <div className='section-2'>
        <h3>
        Elevate Your Trading Experience with Risk Management Features Across Diverse Broker Platforms
        </h3>

        <div className='flow-container'>
            <img src='/newflow.svg'></img>
        </div>

        {/* <ul className='logo-list'>
            <li>
                <img src='/Zerodha.svg'></img>
            </li>

            <li>
                <img src='/Zerodha.svg'></img>
            </li>

            <li>
                <img src='/group2.svg'></img>
            </li>

            <li>
                <img src='/group3.svg'></img>
            </li>

            <li>
                <img src='/group4.svg'></img>
            </li>

            <li>
                <img src='/group5.svg'></img>
            </li>

            <li>
                <img src='/group6.svg'></img>
            </li>
          

        </ul> */}

    </div>

    <div className='section-3'>
        <div className='section-3-top'>
            <h2>
            Why <span>Tradiant?</span>
            </h2>

            <p>
            At Tradiant, you will benefit from us, such as many conveniences in transactions, user-friendly transparency, and many others
            </p>

        </div>
        {/* <div className='heading'>
            <h4>Why Choose Tradiant</h4>
       

       
            <h2>Specially designed for stock market</h2>
        </div>

        <ul className='img-list'>
            <li>
                <div className='pic-list-1'>
                <img src='/pic-list-1.svg'>
                
                </img>
                </div>
            </li>

            <li>
            <div className='pic-list-2'>
                <img src='/pic-list-2.svg'>
                
                </img>
                </div>
            </li>

            <li>
            <div className='pic-list-3'>
                <img src='/pic-list-1.svg'>
                
                </img>
                </div>
            </li>

        </ul>

        <ul className='info-list'>
            <li className='info-1'>
                <h3>
                Quick Faster
                </h3>
                <text>
                Information spreads faster with the help of the Tradiant community. With Tradiant, you will be more updated with the latest information.
                </text>
            </li>
            
            <li className='info-2'>
                <h3>
                Manage your wallets
                </h3>
                <text>
                Make your finances easier and safer with Tradiant and make every transaction more secure and quality.
                </text>
            </li>

            <li className='info-3'>
                <h3>
                Update Your Statictics
                </h3>
                <text>
                Update your general stats faster with direct notifications from Tradiant and make your next transaction more quality.
                </text>
            </li>


        </ul> */}

<ul className='info-list'>
                <li className='info-1'>
                    <div className='top'>
                        <img src='/high-standards.svg'>
                        </img>
                    </div>

                    <div className='bottom'>
                        <h4>
                        Trailing Stoploss
                        </h4>

                        <p>
                        At Tradiant, we prioritize user safety and comfort. Experience enhanced risk management with our dynamic trailing stop-loss feature.
                        </p>
                         
                    </div>

                </li>

                <li className='info-2'>
                    <div className='top'>
                        <img src='/invention.svg'>
                        </img>
                    </div>

                    <div className='bottom'>
                        <h4>
                       Protect Profit
                        </h4>

                        <p>
                        At Tradiant, safeguard your gains with our robust profit protection tools, ensuring a secure and rewarding trading experience
                        </p>
                         
                    </div>

                </li>


                <li className='info-3'>
                    <div className='top'>
                        <img src='/simplicity.svg'>
                        </img>
                    </div>

                    <div className='bottom'>
                        <h4>
                        Buy At Low
                        </h4>

                        <p>
                        At Tradiant, seize opportunities to buy low with our strategic insights, empowering you to make informed and advantageous investment decisions

                        </p>
                         
                    </div>

                </li>



                <li className='info-4'>
                    <div className='top'>
                        <img src='/transparency.svg'>
                        </img>
                    </div>

                    <div className='bottom'>
                        <h4>
                        Maximum Capital Exposure
                        </h4>

                        <p>
                        At Tradiant, our cutting-edge scanner provides real-time data on OI changes, Max Pain, and Option Chain, empowering traders with comprehensive insights for informed decision-making.
                        </p>
                         
                    </div>

                </li>

            </ul>


            <ul className='info-list'>
                <li className='info-1'>
                    <div className='top'>
                        <img src='/buy-sell.svg'>
                        </img>
                    </div>

                    <div className='bottom'>
                        <h4>
                        Incremental Buy And Sell
                        </h4>

                        <p>
                        At Tradiant, we prioritize user safety and comfort. Experience enhanced risk management with our dynamic trailing stop-loss feature.
                        </p>
                         
                    </div>

                </li>

                <li className='info-2'>
                    <div className='top'>
                        <img src='/search.svg'>
                        </img>
                    </div>

                    <div className='bottom'>
                        <h4>
                      User Define Capital Risk
                        </h4>

                        <p>
                        At Tradiant, safeguard your gains with our robust profit protection tools, ensuring a secure and rewarding trading experience
                        </p>
                         
                    </div>

                </li>


                <li className='info-3'>
                    <div className='top'>
                        <img src='/quantity.svg'>
                        </img>
                    </div>

                    <div className='bottom'>
                        <h4>
                      Risk Based Quantity
                        </h4>

                        <p>
                        At Tradiant, seize opportunities to buy low with our strategic insights, empowering you to make informed and advantageous investment decisions

                        </p>
                         
                    </div>

                </li>



                <li className='info-4'>
                    <div className='top'>
                        <img src='/essentional.svg'>
                        </img>
                    </div>

                    <div className='bottom'>
                        <h4>
                       Reward To Risk
                        </h4>

                        <p>
                        At Tradiant, our cutting-edge scanner provides real-time data on OI changes, Max Pain, and Option Chain, empowering traders with comprehensive insights for informed decision-making.
                        </p>
                         
                    </div>

                </li>

            </ul>

    </div>




    <div className='section-4'>
            <div className='sec-4-left'>
                <div className='pic-container'>
                    <img src='/image-60.svg' >
                    </img>
                </div>

            </div>

            <div className='sec-4-right'>
                
                <div className='info'>
                    <h4>
                    Our Feature
                    </h4>

                    <h2>
                    Empowering Your Trading Journey with <span>Risk Management </span>features
                    </h2>


                    <text>
                    Unlock a world of financial intelligence with our platform's diverse features. Stay ahead of market events with our Economic Calendar, track market dynamics with real-time updates on Top Gainers and Losers, and stay informed with a curated News Feed. Elevate your trading experience by accessing a comprehensive suite of tools that empowers you with the knowledge needed to make strategic decisions in the ever-evolving financial landscape.
                    </text>

                    
                </div>

                <button>
                    Get Started
                </button>

            </div>

            



    </div>

    <div className='section-5'>
    <div className='sec-5-left'>
                
                <div className='info'>
                    <h4>
                    Our Feature
                    </h4>

                    <h2>
                    Get sense of market direction from <span>Option Scanner</span>
                    </h2>


                    <text>
                    Experience the power of our cutting-edge scanner feature that revolutionizes your trading decisions. Gain valuable insights into Open Interest changes, identify Max Pain levels, and access comprehensive Option Chain and Greek data.Empowering you to make informed and precise decisions in the dynamic world of finance.

                    </text>

                    
                </div>

                <button>
                    Get Started
                </button>

            </div>

            <div className='sec-5-right'>
                <div className='pic-container'>
                    <img src='/unsplash_Gw_sFen8VhU.png' >
                    </img>
                </div>

            </div>



    </div>


    <div className='section-6'>
        <div className='sec-6-container'>
            <div className='sec-6-left'>
                <h4>
                Our Newsletter
                </h4>

                <h2>
                Stay updated with our weekly newsletter
                </h2>

                <p>
                a collection of the hottest stock market news sent every week to your email
                </p>

            </div>


            <div className='sec-6-right'>
                <div className='info'>
                    <h4>
                    Signup For Newsletter
                    </h4>

                </div>

                <div className='input'>
                    <input className='email' placeholder='Email'>
                       
                       
                    </input>

                    <input className='password' placeholder='password'>
                    </input>

                    <button>
                        Get Started
                    </button>

                </div>

                <div>

                </div>

            </div>
            
        </div>

    </div>




    <div className='section-7'>
            <div className='sec-7-container'>
                <div className='sec-7-left'>
                <div className='brand'>
                    <img  src='/group-39795.svg'>
                    </img>

                    <h2>
                        Tradiant
                    </h2>

                </div>

                <p>
                Maximize your investment in the capital market world with the convenience and various features provided by Tradiant.
                </p>

                <h5>Unduh Aplikasi</h5>

                </div>

                <div className='sec-7-right'>
                    <div className='info-1'>
                        <h4>
                        Companies
                        </h4>

                        <ul>
                            <li>
                                <p>
                                About Us
                                </p>
                            </li>

                            <li>
                                <p>
                                Journey
                                </p>
                            </li>


                            <li>
                                <p>
                                Blog
                                </p>
                            </li>


                            <li>
                                <p>
                                Contact
                                </p>
                            </li>


                            <li>
                                <p>
                                Help
                                </p>
                            </li>
                        </ul>


                    </div>

                    <div className='info-2'>
                    <h4>
                    Resources
                        </h4>

                        <ul>
                            <li>
                                <p>
                                About Us
                                </p>
                            </li>

                            <li>
                                <p>
                                Journey
                                </p>
                            </li>


                            <li>
                                <p>
                                Blog
                                </p>
                            </li>


                            <li>
                                <p>
                                Contact
                                </p>
                            </li>


                            <li>
                                <p>
                                Help
                                </p>
                            </li>
                        </ul>


                        
                    </div>


                    <div className='info-3'>
                    <h4>
                    Help
                        </h4>

                        <ul>
                            <li>
                                <p>
                                House Rules
                                </p>
                            </li>

                            <li>
                                <p>
                                Our Terms
                                </p>
                            </li>


                            <li>
                                <p>
                                Privacy & Policy
                                </p>
                            </li>


                           
                        </ul>


                                            
                    </div>


                    <div className='info-4'>
                    <h4>
                        Companies
                        </h4>

                        <ul>
                            <li>
                                <p>
                                About Us
                                </p>
                            </li>

                            <li>
                                <p>
                                Journey
                                </p>
                            </li>


                            <li>
                                <p>
                                Blog
                                </p>
                            </li>


                            <li>
                                <p>
                                Contact
                                </p>
                            </li>


                            <li>
                                <p>
                                Help
                                </p>
                            </li>
                        </ul>


                                            
                    </div>

                     </div>




            </div>



    </div>
    <footer className='foot'>
    Copyright @Tradiant 2022. All Rights Reserved.

    </footer>



    </div>
    


  )
}

export default Landing