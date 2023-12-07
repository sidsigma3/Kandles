import React from 'react'
import { useNavigate } from 'react-router-dom'
import './News.css'

const News = () => {

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
            <a href='#' onClick={()=>navigate('/about-us')}>
            About Us    
            </a>
        </li>
        
        <li className='why-us'>
            <a href='#' onClick={()=>navigate('/why-Us')}>
                Why Us?
            </a>

        </li>
        <li className='Blog'>
            <a href='#' onClick={()=>navigate('/blog')}>
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



<div className='news-sec-1'>
    <div className='sec-1-container'>
    <div className='info'>
        <div className='top'>
            <h4>
            Market Updates
            </h4>

            <h2>
            Take note! This is the important point for Bitcoin price to strengthen again
            </h2>

        </div>


        <div className='bottom'>
            <p>
            There are a number of key points for Bitcoin to strengthen again, closely tied to the Fed's policy, if the US central bank fails to control inflation and the economy heads into recession.
            </p>

        </div>

    </div>

    <div>
        <button>
            Read More
        </button>
    </div>

</div>

</div>


<div className='news-sec-2'>
   <div className='top'>
        <h3>
        Newest Update
        </h3>

        <h4>
            See All
        </h4>
    </div> 

    <div className='bottom'>
        <ul className='sec-2-list'>
            <li>
                <img src='/understanding.png'>
                
                </img>

                <div className='info-container'>
                    <div className='info'>

                    
                    <div className='info-top'>
                        <h5>
                        21/03/2022
                        </h5>

                        <h4>
                        Corporate News
                        </h4>
                    </div>

                    <div className='info-bottom'>
                        <h3>
                        Understanding Legal Commodity Futures Trading Transactions
                        </h3>

                        <p>
                        Currently, there are many issues regarding brokers and illegal transactions such as binary options. Binary options are products that are duplicated from options products. Where this option product is a product used for ...
                        </p>

                    </div>
                    </div>



                    <div className='read-more'>
                        <h4>
                            Read More
                        </h4>
                    </div>

                </div>

                
            </li>


            <li>
                <img src='/indonesia.png'>
                
                </img>

                <div className='info-container'>
                    <div className='info'>

                    
                    <div className='info-top'>
                        <h5>
                        21/03/2022
                        </h5>

                        <h4>
                        Corporate News
                        </h4>
                    </div>

                    <div className='info-bottom'>
                        <h3>
                        Understanding Legal Commodity Futures Trading Transactions
                        </h3>

                        <p>
                        Currently, there are many issues regarding brokers and illegal transactions such as binary options. Binary options are products that are duplicated from options products. Where this option product is a product used for ...
                        </p>

                    </div>
                    </div>



                    <div className='read-more'>
                        <h4>
                            Read More
                        </h4>
                    </div>

                </div>

                
            </li>



            <li>
                <img src='/icdx.png'>
                
                </img>

                <div className='info-container'>
                    <div className='info'>

                    
                    <div className='info-top'>
                        <h5>
                        21/03/2022
                        </h5>

                        <h4>
                        Corporate News
                        </h4>
                    </div>

                    <div className='info-bottom'>
                        <h3>
                        Understanding Legal Commodity Futures Trading Transactions
                        </h3>

                        <p>
                        Currently, there are many issues regarding brokers and illegal transactions such as binary options. Binary options are products that are duplicated from options products. Where this option product is a product used for ...
                        </p>

                    </div>
                    </div>



                    <div className='read-more'>
                        <h4>
                            Read More
                        </h4>
                    </div>

                </div>

                
            </li>



        </ul>

    </div>

</div>




<div className='news-sec-2'>
   <div className='top'>
        <h3>
        Newest Update
        </h3>

        <h4>
            See All
        </h4>
    </div> 

    <div className='bottom'>
        <ul className='sec-2-list'>
            <li>
                <img src='/top-stock.png'>
                
                </img>

                <div className='info-container'>
                    <div className='info'>

                    
                    <div className='info-top'>
                        <h5>
                        21/03/2022
                        </h5>

                        <h4>
                        Corporate News
                        </h4>
                    </div>

                    <div className='info-bottom'>
                        <h3>
                        Understanding Legal Commodity Futures Trading Transactions
                        </h3>

                        <p>
                        Currently, there are many issues regarding brokers and illegal transactions such as binary options. Binary options are products that are duplicated from options products. Where this option product is a product used for ...
                        </p>

                    </div>
                    </div>



                    <div className='read-more'>
                        <h4>
                            Read More
                        </h4>
                    </div>

                </div>

                
            </li>


            <li>
                <img src='/best-stocks.png'>
                
                </img>

                <div className='info-container'>
                    <div className='info'>

                    
                    <div className='info-top'>
                        <h5>
                        21/03/2022
                        </h5>

                        <h4>
                        Corporate News
                        </h4>
                    </div>

                    <div className='info-bottom'>
                        <h3>
                        Understanding Legal Commodity Futures Trading Transactions
                        </h3>

                        <p>
                        Currently, there are many issues regarding brokers and illegal transactions such as binary options. Binary options are products that are duplicated from options products. Where this option product is a product used for ...
                        </p>

                    </div>
                    </div>



                    <div className='read-more'>
                        <h4>
                            Read More
                        </h4>
                    </div>

                </div>

                
            </li>



            <li>
                <img src='/3-tops.png'>
                
                </img>

                <div className='info-container'>
                    <div className='info'>

                    
                    <div className='info-top'>
                        <h5>
                        21/03/2022
                        </h5>

                        <h4>
                        Corporate News
                        </h4>
                    </div>

                    <div className='info-bottom'>
                        <h3>
                        Understanding Legal Commodity Futures Trading Transactions
                        </h3>

                        <p>
                        Currently, there are many issues regarding brokers and illegal transactions such as binary options. Binary options are products that are duplicated from options products. Where this option product is a product used for ...
                        </p>

                    </div>
                    </div>



                    <div className='read-more'>
                        <h4>
                            Read More
                        </h4>
                    </div>

                </div>

                
            </li>



        </ul>

    </div>

</div>




<div className='news-sec-2'>
   <div className='top'>
        <h3>
        Newest Update
        </h3>

        <h4>
            See All
        </h4>
    </div> 

    <div className='bottom'>
        <ul className='sec-2-list'>
            <li>
                <img src='/crowd.png'>
                
                </img>

                <div className='info-container'>
                    <div className='info'>

                    
                    <div className='info-top'>
                        <h5>
                        21/03/2022
                        </h5>

                        <h4>
                        Corporate News
                        </h4>
                    </div>

                    <div className='info-bottom'>
                        <h3>
                        Understanding Legal Commodity Futures Trading Transactions
                        </h3>

                        <p>
                        Currently, there are many issues regarding brokers and illegal transactions such as binary options. Binary options are products that are duplicated from options products. Where this option product is a product used for ...
                        </p>

                    </div>
                    </div>



                    <div className='read-more'>
                        <h4>
                            Read More
                        </h4>
                    </div>

                </div>

                
            </li>


            <li>
                <img src='/best.png'>
                
                </img>

                <div className='info-container'>
                    <div className='info'>

                    
                    <div className='info-top'>
                        <h5>
                        21/03/2022
                        </h5>

                        <h4>
                        Corporate News
                        </h4>
                    </div>

                    <div className='info-bottom'>
                        <h3>
                        Understanding Legal Commodity Futures Trading Transactions
                        </h3>

                        <p>
                        Currently, there are many issues regarding brokers and illegal transactions such as binary options. Binary options are products that are duplicated from options products. Where this option product is a product used for ...
                        </p>

                    </div>
                    </div>



                    <div className='read-more'>
                        <h4>
                            Read More
                        </h4>
                    </div>

                </div>

                
            </li>



            <li>
                <img src='/4-consumer.png'>
                
                </img>

                <div className='info-container'>
                    <div className='info'>

                    
                    <div className='info-top'>
                        <h5>
                        21/03/2022
                        </h5>

                        <h4>
                        Corporate News
                        </h4>
                    </div>

                    <div className='info-bottom'>
                        <h3>
                        Understanding Legal Commodity Futures Trading Transactions
                        </h3>

                        <p>
                        Currently, there are many issues regarding brokers and illegal transactions such as binary options. Binary options are products that are duplicated from options products. Where this option product is a product used for ...
                        </p>

                    </div>
                    </div>



                    <div className='read-more'>
                        <h4>
                            Read More
                        </h4>
                    </div>

                </div>

                
            </li>



        </ul>

    </div>

</div>



<div className='news-sec-2'>
   <div className='top'>
        <h3>
        Newest Update
        </h3>

        <h4>
            See All
        </h4>
    </div> 

    <div className='bottom'>
        <ul className='sec-2-list'>
            <li>
                <img src='/top-tech.png'>
                
                </img>

                <div className='info-container'>
                    <div className='info'>

                    
                    <div className='info-top'>
                        <h5>
                        21/03/2022
                        </h5>

                        <h4>
                        Corporate News
                        </h4>
                    </div>

                    <div className='info-bottom'>
                        <h3>
                        Understanding Legal Commodity Futures Trading Transactions
                        </h3>

                        <p>
                        Currently, there are many issues regarding brokers and illegal transactions such as binary options. Binary options are products that are duplicated from options products. Where this option product is a product used for ...
                        </p>

                    </div>
                    </div>



                    <div className='read-more'>
                        <h4>
                            Read More
                        </h4>
                    </div>

                </div>

                
            </li>


            <li>
                <img src='/is.png'>
                
                </img>

                <div className='info-container'>
                    <div className='info'>

                    
                    <div className='info-top'>
                        <h5>
                        21/03/2022
                        </h5>

                        <h4>
                        Corporate News
                        </h4>
                    </div>

                    <div className='info-bottom'>
                        <h3>
                        Understanding Legal Commodity Futures Trading Transactions
                        </h3>

                        <p>
                        Currently, there are many issues regarding brokers and illegal transactions such as binary options. Binary options are products that are duplicated from options products. Where this option product is a product used for ...
                        </p>

                    </div>
                    </div>



                    <div className='read-more'>
                        <h4>
                            Read More
                        </h4>
                    </div>

                </div>

                
            </li>



            <li>
                <img src='/we.png'>
                
                </img>

                <div className='info-container'>
                    <div className='info'>

                    
                    <div className='info-top'>
                        <h5>
                        21/03/2022
                        </h5>

                        <h4>
                        Corporate News
                        </h4>
                    </div>

                    <div className='info-bottom'>
                        <h3>
                        Understanding Legal Commodity Futures Trading Transactions
                        </h3>

                        <p>
                        Currently, there are many issues regarding brokers and illegal transactions such as binary options. Binary options are products that are duplicated from options products. Where this option product is a product used for ...
                        </p>

                    </div>
                    </div>



                    <div className='read-more'>
                        <h4>
                            Read More
                        </h4>
                    </div>

                </div>

                
            </li>



        </ul>

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

export default News