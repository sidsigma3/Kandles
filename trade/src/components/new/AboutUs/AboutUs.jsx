import React from 'react'
import { useNavigate } from 'react-router-dom'
import './AboutUs.css'

const AboutUs = () => {

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

    <div className='about-sec-1'>
        <div className='sec-1-container'>
            <div className='info'>
                <h2>
                Global Market Leader
                </h2>

                <p>
                We’ve found to connect independent traders to the potential of the global stock market since 2021. Today, we continue to challenge ourselves to provide traders with what they need to succeed. 
                </p>



            </div>

            <button>
                Learn More
            </button>
            
        </div>



    </div>



    <div className='about-sec-2'>
        <div className='sec-2-container'>


      
        <div className='heading'>
            <h3>
            A trading partner you can trust
            </h3>
            <p>
            At Tradiant, we rigorously focus on quality and transparency. Our order execution quality is independently monitored. Order execution with high quality means: you save money with every investment you make with Tradiant.
            </p>

        </div>

        <div className='sub-heading'>
            <div className='sub-left'>
                <img src='/essentional.svg'>

                </img>

                <h3>
                Quality execution on every trade
                </h3>

                <p>
                Backed by multiple analyzes and precise algorithms providing quality execution decisions on every trade. Guarantee your comfort and perfection in making decisions.
                </p>

                <h4>
                View our execution scoreboard
                </h4>

            </div>

            <div className='sub-right'>

                <img src='/search.svg'>
                
                </img>

                <h3>
                Transparent & competitive pricing
                </h3>

                <p>
                Provides transparency Pricing Emphasizes Value, not Price. As price becomes clearer to everyone in the market, each competitor's value also comes into sharper focus.
                </p>

                <h4>
                View pricing and execution advantage
                </h4>

            </div>


        </div>

        
    </div>
    </div>

    <div className='sec-3'>
        <div className='sec-3-left'>
            <img src='/our-vision.png'>
            </img>

        </div>

        <div className='sec-3-right'>
            <div className='heading'>
            Our Vision
            </div>
            <div className='sub-heading'>
                <p>
                Our vision is to become a trusted advisor, intermediary, and partner to assist customers in determining financial strategies in the capital market and Become a professional reinsurance broker with a global reputation
                </p>

                <h5>
                See More
                </h5>

            </div>

        </div>

    </div>

    <div className='sec-4'>

        <div className='sec-4-left'>
            <div className='heading'>
            Our Mission
            </div>
            <div className='sub-heading'>
                <p>

                Providing excellent service from risk placement to settlement of compensation in the interest of obtaining the best capital market results. Maintain the profitability of each user with the aim of meeting the expectations of each user
              </p>

                <h5>
                See More
                </h5>

            </div>

        </div>

        <div className='sec-4-right'>
            <img src='/our-mission.png'>
            </img>

        </div>

    </div>

    <div className='sec-5'>
        <div className='heading'>

                <h3>
                Our Values
                </h3>

                <p>
                Our values are reflected in our product offering and user experience, as well as being embedded in our internal culture and employee experience.
                </p>
        </div>

        <div className='sub-heading'>
            <div className='left'>
                <img src='/button-left.svg'>
                </img>
            </div>
            <div className='middle'>
                <div className='top'>
                    <img src='/simplicity.svg'>
                    </img>
                </div>
                <div className='bottom'>
                    <h4>
                    Simplicity
                    </h4>

                    <p>
                    We strive for simplicity in all things: our product, our marketing, our processes, our business model. The result is solutions that are beautiful in their efficiency and clarity, easier to understand wholly, easier to translate to different situations and scales, and easier to change later.
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

export default AboutUs