import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
// import './pages/start.css'

function Start (){

const navigate = useNavigate();

    return (
       
<html lang="en">
<head>
    <meta charset="UTF-8"></meta>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <title>KandleHome</title>
    <link rel="stylesheet" href="KandleLog.css"></link>
    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap" rel="stylesheet"></link>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/fontawesome.min.css"></link>
</head>
<body>
    <section class="header">
        <nav class="navbar">
            <h1 class="logo">Kandle</h1>
             {/* <a href="#"><img src="Kandle4.PNG"></img></a> */}
            <div class="header-btn">
                {/* <a class="Log-in"  > Login</a>
                <a class="Sign-up">Signup</a> */}
              <a className='Log-in'>  <button className='b btn btn-primary' onClick={()=>navigate('/login')}>Login</button></a>
               <a className='Sign-up'> <button className='b btn btn-primary' onClick={()=>navigate('/signup')}>Signup</button></a>
            </div>
             {/* <div class="nav-links" id="navLinks">
                <i class="fa fa-times" onclick="hideMenu()"></i>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Scanner</a></li>
                    <li><a href="#">Trading</a></li>
                    <li><a href="#">Report</a></li>
                    <li><a href="#">Subscription</a></li>
                    <li><a href="#">Profile</a></li>
                </ul>
            </div>  */}
            <i class="fa fa-bars" onclick="showMenu()"></i>
        </nav>
<div class="text-box">
    <h1>"An Investment in Knowledge pays the best interest"</h1>
    <p>— Carlos Slim Helu</p>
    <a href="" class="hero-btn">Explore</a>
</div>
    </section>

    <section class="Scanner">
       <h1><img class="scn-img" src="scanner.gif"></img></h1>
       <h1>Scanner</h1>
       <div class="row">
        <div class="scanner-col">
            <h3>What is Scanner.. You might ask?</h3>
            <p>A Scanner is a program or a service that filters the markets to find stocks that meet a specific set of criteria.A Scanner is a program or a service that filters the markets to find stocks that meet a specific set of criteria.A Scanner is a program or a service that filters the markets to find stocks that meet a specific set of criteria.A Scanner is a program or a service that filters the markets to find stocks that meet a specific set of criteria.A Scanner is a program or a service that filters the markets to find stocks that meet a specific set of criteria.</p>
        </div>
        <div class="scanner-col1">
            <h3>You might think of</h3>
            <p>A Scanner is a program or a service that filters the markets to find stocks that meet a specific set of criteria.</p>
        </div>
        <div class="scanner-col2">
            <h3>Well it basically..</h3>
            <p>A Scanner is a program or a service that filters the markets to find stocks that meet a specific set of criteria.</p>
        </div>
       </div>
    </section>

    

    <section class="Trading">
        <h1>what is trading..?</h1>
        <p>Trading for first time!</p>

        <div class="row">
            <div class="trading-col">
                <img src="https://thumbs.gfycat.com/BitterSinfulChinesecrocodilelizard-size_restricted.gif"></img>
                <div class="layer">
                    <h3>Trading involves vigorous participation in the financial markets in comparison to investing, which works on a buy-and-hold strategy</h3>
                </div>
            </div>
            <div class="trading-col1">
                <img src="Content.jpg"></img>
                <div class="layer">
                    <h3>Trading involves vigorous participation in the financial markets in comparison to investing, which works on a buy-and-hold strategy</h3>
                </div>
            </div>
            <div class="trading-col2">
                <img src="Content2.jpg"></img>
                <div class="layer">
                    <h3>Trading involves vigorous participation in the financial markets in comparison to investing, which works on a buy-and-hold strategy</h3>
                </div>
            </div>
        </div>

    </section>

    

    <section class="Report">
        <h1>Report</h1>
        <p>Trading involves vigorous participation in the financial markets in comparison to investing, which works on a buy-and-hold strategy</p>
        <div class="row">
            <div class="report-col">
                <img src="Report.gif" alt="Annual Report 2017 Reveals All-time High Of Incoming - Weekly Report Clip Art @clipartmax.com"></img>
                <h3>Daily check on ur growth report</h3>
            </div>
            <div class="report-col">
                <img src="Report3.gif" alt="7a - Qualityreporting - Physician Quality Reporting System @clipartmax.com"></img>
                <h3>Daily check on ur growth report</h3>
            </div>
            <div class="report-col">
                <img src="Report2.gif" alt="Financial Reporting @clipartmax.com"></img>
                <h3>Daily check on ur growth report</h3>
            </div>
        </div>
    </section>

 

    <section class="Subscription">
        <h1>Benifits of Subscription</h1>

        <div class="row">
            <div class="subscription-col">
                <img src="https://www.clipartmax.com/png/small/19-194676_business-model-business-model.png" alt="Business Model - Business Model @clipartmax.com"></img>
                <div>
                    <p>This is the benifits that you can get after done subscription</p>
                    <h3>Get it at just 499/- only</h3>
                </div>
            </div>
            <div class="subscription-col">
                <img src="https://www.clipartmax.com/png/small/14-148889_handshake-clip-art.png" alt="Handshake Clip Art @clipartmax.com"></img>
                <div>
                    <p>This is the benifits that you can get after done subscription</p>
                    <h3>Get it at just 999/- only</h3>
                </div>
            </div>
        </div>

    </section>

   

    <section class="about-us">
        <h1>About Us</h1>
        <table>
          <tr>
            <td>
              <p>All investing involves risk. Brokerage services are offered through Robinhood Financial LLC, (“RHF”) a registered broker dealer (member SIPC) and clearing services through Robinhood Securities, LLC, (“RHS”) a registered broker dealer (member SIPC). Cryptocurrency services are offered through Robinhood Crypto, LLC (“RHC”) (NMLS ID: 1702840).</p>
            </td>
            <td>
              <ul class="social-icons">
                <li><a href="#"><img src="instagram.png" alt="Instagram"></img></a></li>
                <li><a href="#"><img src="twitter.png" alt="Twitter"></img></a></li>
                <li><a href="#"><img src="facebook.png" alt="Facebook"></img></a></li>
              </ul>
            </td>
          </tr>
        </table>
        <a href="" class="hero-btn">Contact Us</a>
      </section>

     <section class="about-us">
        <h1>About-us</h1>
        <p>All investing involves risk.Brokerage services are offered through <br></br> Robinhood Financial LLC, (“RHF”) a registered broker dealer (member SIPC) and clearing services through Robinhood Securities, LLC, (“RHS”) a registered broker dealer (member SIPC). <br></br>Cryptocurrency services are offered through Robinhood Crypto, LLC (“RHC”) (NMLS ID: 1702840).</p>
        <a href="#" class="hero-btn">CONTACT US</a>
    </section> 

   
    {/* <section class="footer">
        <h4>Contact us on here</h4>
        <p>All investing involves risk.
            <br></br>Brokerage services are offered through Robinhood Financial LLC, (“RHF”) a registered broker dealer (member SIPC) and clearing services through Robinhood Securities, LLC, (“RHS”) a registered broker dealer (member SIPC). Cryptocurrency services are offered through Robinhood Crypto, LLC (“RHC”) (NMLS ID: 1702840).
            <br> </br>The Robinhood Money spending account is offered through Robinhood Money, LLC (“RHY”) (NMLS ID: 1990968), a licensed money transmitter. The Robinhood Cash Card is a prepaid card issued by Sutton Bank, Member FDIC, pursuant to a license from Mastercard® International Incorporated. 
            <br></br>RHF, RHY, RHC and RHS are affiliated entities and wholly owned subsidiaries of Robinhood Markets, Inc. RHF, RHY, RHC and RHS are not banks. Securities products offered by RHF are not FDIC insured and involve risk, including possible loss of principal.
            <br></br> Cryptocurrencies held in RHC accounts are not covered by FDIC or SIPC protections and are not regulated by FINRA. RHY products are not subject to SIPC coverage but funds held in the Robinhood Money spending account and Robinhood Cash Card account may be eligible for FDIC pass-through insurance (see the Robinhood Cash Card Agreement and the Robinhood Spending Account Agreement).
            Options trading entails significant risk and is not appropriate for all customers. Customers must read and understand the Characteristics and Risks of Standardized Options before engaging in any options trading strategies. Options transactions are often complex and may involve the potential of losing the entire investment in a relatively short period of time. Certain complex options strategies carry additional risk, including the potential for losses that may exceed the original investment amount.
            <br></br>
            Commission-free trading of stocks, ETFs and options refers to $0 commissions for Robinhood Financial self-directed individual cash or margin brokerage accounts that trade U.S. listed securities and certain OTC securities electronically. Keep in mind, other fees such as trading (non-commission) fees, Gold subscription fees, wire transfer fees, and paper statement fees may apply to your brokerage account. Please see Robinhood Financial’s Fee Schedule to learn more.
            <br></br>© 2023 Robinhood. All rights reserved.</p>
        <div class="icons">
            <i class="fa-brands fa-facebook fa-lg" style="color: #162f5a;"></i>
            <i class="fa-brands fa-instagram" style="color: #9a1d60;"></i>
            <i class="twitter" style="color: #14b2f5;"></i>
        </div>
    </section> */}


   
</body>
</html>
    )
}

export default Start