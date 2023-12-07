import React from 'react'
import { useNavigate } from 'react-router-dom'
import './WhyUs.css'

const WhyUs = () => {
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


    <div className='sec-1'>
        <div className='top'>
            <h3>
            <span>&nbsp;</span>

           <span> Easy Transaction </span>with Tradiant
           <span>&nbsp;</span>

            </h3>


            <p>
            Confused about what to trade? When trading at Tradiant, you can use analytical tools from various well-known providers to get price movement reports, the latest market news, and other important information you need when trading.
            </p>

        </div>


        <div className='bottom'>
            <button>
                Get Started
            </button>

        </div>

    </div>

    <div className='sec-2'>
    <div className='sec-2-left'>
                
                <div className='info'>
                    <h4>
                    Why us?
                    </h4>

                    <h2>
                    A<span>&nbsp;</span><span>Friendly Platform</span><span>&nbsp;</span>for Beginner Traders
                    </h2>


                    <text>
                    Many people want to trade forex, but have a hard time understanding the basics and how to trade forex. Therefore, Tradiant presents an online-based interactive educational platform to help you learn to trade. The educational content is made light and concise so that a novice trader can learn to trade from scratch in 1 hour.
                    </text>

                    
                </div>

                <button>
                    Learn More
                </button>

            </div>

            <div className='sec-2-right'>
                <div className='pic-container'>
                    <img src='/unsplash_Gw_sFen8VhU.png' >
                    </img>
                </div>

            </div>



    </div>


    <div className='sec-3'>


    <div className='sec-3-left'>
                <div className='pic-container'>
                    <img src='/Additional.png' >
                    </img>
                </div>

            </div>
    <div className='sec-3-right'>
                
                <div className='info'>
                    <h4>
                    Why us?
                    </h4>

                    <h2>
                    <span>&nbsp;</span><span>Additional Benefits </span>of Trading at Tradiant
                     <span>&nbsp;</span>

                    </h2>


                    <text>
                    Every time you transact at Tradiant, you earn Tradiant Rewards points which can be exchanged for various travel, gadget, lifestyle, and automotive gifts. This program applies to all Live Standard Account customers. If trading on a Demo Account you don't get a prize, yes.
                    </text>

                    
                </div>

                <button>
                   Learn More
                </button>

            </div>

           



    </div>


    <div className='why-sec-4'>
        <div className='sec-4-top'>
            <h2>
            Additional advantages from <span>Tradiant</span>
            </h2>

            <p>
            At Tradiant, you will benefit from us, such as many conveniences in transactions, user-friendly transparency, and many others
            </p>

        </div>

        <div className='sec-4-bottom'>
            <ul className='info-list'>
                <li className='info-1'>
                    <div className='top'>
                        <img src='/high-standards.svg'>
                        </img>
                    </div>

                    <div className='bottom'>
                        <h4>
                        High standards
                        </h4>

                        <p>
                        At Tradiant, we have high standards, all forms of transactions will be processed professionally, so that Tradiant users feel safe and comfortable
                        </p>
                         
                    </div>

                </li>

                <li className='info-2'>
                    <div className='top'>
                        <img src='/simplicity-1.svg'>
                        </img>
                    </div>

                    <div className='bottom'>
                        <h4>
                        Simplicity
                        </h4>

                        <p>
                        We guarantee the ease of transactions at Tradiant, so that users will have convenience in transactions
                        </p>
                         
                    </div>

                </li>


                <li className='info-3'>
                    <div className='top'>
                        <img src='/transparency.svg'>
                        </img>
                    </div>

                    <div className='bottom'>
                        <h4>
                        Transparency
                        </h4>

                        <p>
                        We will report all forms of transactions as they are, transparency is very important to grow the trust of Tradiant users

                        </p>
                         
                    </div>

                </li>



                <li className='info-4'>
                    <div className='top'>
                        <img src='/invention.svg'>
                        </img>
                    </div>

                    <div className='bottom'>
                        <h4>
                        Invention
                        </h4>

                        <p>
                        Tradiant is the result of the production, refinement, or development of the original invention. It is also continuous and continuously developing in a better direction.
                        </p>
                         
                    </div>

                </li>

            </ul>

        </div>


    </div>



    <div className='sec-5'>
        <div className='heading'>

                <h3>
                Testimonials
                </h3>

                <p>
                Millions of global traders have chosen Tradiant as their stock broker of choice and here are their thoughts after trading with Tradiant:
                </p>
        </div>

        <div className='sub-heading'>
            <div className='left'>
                <img src='/button-left.svg'>
                </img>
            </div>
            <div className='middle'>
                <div className='top'>
                    <img src='/testimonials.svg'>
                    </img>
                </div>
                <div className='bottom'>
                    <h4>
                    Savannah Nguyen
                    </h4>

                    <p>
                    The Tradiant app is great. For me who is just starting out, the features are really helpful for getting trading references. The appearance is also pleasing to the eye and has facilities that compete with international brokers.
                    </p>

                </div>

            </div>

            <div className='right'>
                <img src='/button-right.svg'>
                </img>

            </div>

          

        </div>

    </div>

    <div className='sec-6'>
                <div className='top'>

                    <h3>
                    All of this and much more dedicated from  
                    <span>&nbsp;</span>
                    
                    <span>
                      Tradiant 
                    </span>
                    <span>&nbsp;</span>
                    to your success

                    </h3>


                </div>

                <div className='bottom'>
                    <button>
                        Trade With Us
                    </button>

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

export default WhyUs