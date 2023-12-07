import React, { Component ,useEffect,useState,useRef} from 'react';
// import './homepage.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
function Homepage (){
    const navigate = useNavigate();

    const [requestToken,setrequestToken] = useState(null)
    const hasExecuted = useRef(false);


    useEffect(() => {
    
        const queryParams = queryString.parse(window.location.search);
        if(!requestToken){
        setrequestToken(queryParams.request_token);
        }
      }, []); 

    useEffect(()=>{
       
        if (requestToken && !hasExecuted.current) {
            hasExecuted.current = true;
      
            axios.post(`http://localhost:5000/connect`, { requestToken })
              .then((response) => {
                // Handle the response
              })
              .catch((error) => {
               console.log(error)
              });
          }


    // console.log('on process')
    // axios.post(`http://localhost:5000/connect`,{requestToken})
    // .then((response)=>{
       
    // })
        },[requestToken])




    const loginProcess = () =>{
        console.log('yoooo')
        axios.post('http://localhost:5000/kite')
        .then((res)=>
        console.log(res))

    }



    return(
<html lang="en">
<head>
    <meta charset="UTF-8"></meta>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <title>KandleHome</title>
    <link rel="stylesheet" href="Kandle.css"></link>
    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap" rel="stylesheet"></link>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/fontawesome.min.css"></link>
</head>
<body>
    <section class="header">
        <nav class="navbar">
            <h1 class="logo">Kandle</h1>
             <a href="#"><img src="Kandle4.PNG"></img></a> 
            <div class="nav-links" id="navLinks">
                <i class="fa fa-times" onclick="hideMenu()"></i>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#" onClick={()=>navigate('/scanner')}>Scanner</a></li>
                    <li><a href="#" onClick={()=>navigate('/trading')}>Trading</a></li>
                    <li><a href="#" onClick={loginProcess}>Login</a></li>
                    <li><a href="#" onClick={()=>navigate('/report')}>Report</a></li>
                    <li><a href="#">Subscription</a></li>
                    <li><a href="#">Profile</a></li>
                     <li class="logout-icon"><a href="KandleLog.html"><i class="fa fa-sign-out" aria-hidden="true"></i></a></li> 
                </ul>
                <li class="logout-icon"><a href="KandleLog.html"><i class="fa fa-sign-out" aria-hidden="true"></i></a></li> 
            </div>
            <i class="fa fa-bars" onclick="showMenu()"></i>
            <div class="logout-icon">
                <a href="KandleLog.html">Log out</a>
              </div>
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
        <h1>Trade with us</h1>
        <p>Trading for first time!</p>

        <div class="row">
            <div class="trading-col">
                <img src="https://thumbs.gfycat.com/BitterSinfulChinesecrocodilelizard-size_restricted.gif"></img>
                <div class="layer">
                    <h3>A licensing agreement is a legal agreement giving an individual the rights to use or do something.</h3>
                </div>
            </div>
            <div class="trading-col1">
                <img src="Content.jpg"></img>
                <div class="layer">
                    <h3>Infrastructure refers to the basic structures, like roads and roads, that cities or countries need in order to function.</h3>
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
              <div class="social-icons-wrapper">
                <ul class="social-icons">
                  <li><a href="#"><img src="instagram.png" alt="Instagram"></img></a></li>
                  <li><a href="#"><img src="twitter.png" alt="Twitter"></img></a></li>
                  <li><a href="#"><img src="facebook.png" alt="Facebook"></img></a></li>
                </ul>
              </div>
            </td>
          </tr>
        </table>
        <a href="" class="hero-btn">Contact Us</a>
      </section>      

     
   

<section data-bs-version="5.1" class="footer">
    <div class="container">
        
    </div>
</section>


   


    {/* <script>
        var navLinks = document.getElementById("navLinks");
        function showMenu(){
            navLinks.style.right = "0"
        }
        function hideMenu(){
            navLinks.style.right = "-200px"
        }
    </script> */}
</body>
</html>

    )
}

export default Homepage