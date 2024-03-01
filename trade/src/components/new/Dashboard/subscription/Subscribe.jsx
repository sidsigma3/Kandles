import React from 'react'
import './Subscription.css'
import axios from 'axios'
import useRazorpay from "react-razorpay";

const Subscribe = () => {

    const [Razorpay] = useRazorpay();

    const paymentHandler = ()=>{
        console.log('achha')
        axios.post('http://localhost:5000/payment')
        .then((res)=>{
          

            const data =res.data

            const options = {
                key: 'rzp_test_u9YDoBJGjerFbp', // Enter the Key ID generated from the Dashboard
                amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Tradiant",
                description: "Subscription Payment",
                // image: "https://example.com/your_logo",
                order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
                handler: function (response) {
                  alert(response.razorpay_payment_id);
                  alert(response.razorpay_order_id);
                  alert(response.razorpay_signature);
                },
                prefill: {
                  name: "Piyush Garg",
                  email: "youremail@example.com",
                  contact: "9999999999",
                },
                notes: {
                  address: "Razorpay Corporate Office",
                },
                theme: {
                  color: "#3399cc",
                },
              };

            

              const rzp1 = new Razorpay(options);
              rzp1.open();


        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div className='subscribe-page'>
        <div className='sub-page-heading'>
            <h2>
                Choose a plan
            </h2>

            <p>Select your Plan according to your Requirement </p>
        </div>

        <div className='sub-container'>
            <div className='Basic-plan'>
                <h3>
                    Free
                </h3>

                <h6>Per Month</h6>
                
                <h4>
                    Basic
                </h4>

                {/* <ul>
                    <li>
                        <p>
                           - Includes all instrument 
                        </p>
                    </li>

                    <li>
                        <p>
                           - Live Data
                        </p>
                    </li>

                    <li>
                        <p>
                           - Economic Calender
                        </p>
                    </li>


                    <li>
                        <p>
                           - Top movers
                        </p>
                    </li>

                    <li>
                        <p>
                          -  Option Scanner
                        </p>
                    </li>

                    <li>
                        <p>
                           - System Trading
                        </p>
                    </li>

                    <li>
                        <p>
                           - News Feed
                        </p>
                    </li>
                </ul> */}

                <button>Get Started</button>


            </div>

            <div className='Advance'>

                <h3>
                   500 ₹
                </h3>

                <h6>Per Month</h6>

                <h4>
                   Advance
                </h4>

                {/* <ul>
                    

                    <li>
                        <p>
                          - All basic features
                        </p>
                    </li>


                    <li>
                        <p>
                          - Trailing StopLoss
                        </p>
                    </li>

                    <li>
                        <p>
                          - Buy At Low 
                        </p>
                    </li>


                    <li>
                        <p>
                          - Protect Profit 
                        </p>
                    </li>

                    <li>
                        <p>
                          - Oi change Data
                        </p>
                    </li>

                    <li>
                        <p>
                          - Option chain
                        </p>
                    </li>


                   

                </ul> */}

                <button onClick={paymentHandler}>Get Started</button>

            </div>


        </div>

        <div className='sub-table'>
  <table>
    <thead>
      <tr>
        <th> 
            <h3>
                Features
            </h3>
        </th>
        <th>
          <h3>Basic</h3>
         
        </th>
        <th>
          <h3>Advance</h3>
          
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
            Includes all instrument
        </td>
        <td>
        <h4> √</h4>
        </td>
        <td>
        <h4> √</h4>
        </td>
      </tr>

      <tr>
        <td>
            Live Data
        </td>
        <td>
        <h4> √</h4>
        </td>
        <td>
        <h4> √</h4>
        </td>
      </tr>

      <tr>
        <td>
            Economic Calender
        </td>
        <td>
         <h4> √</h4>
        </td>
        <td>
        <h4> √</h4>
        </td>
      </tr>

      <tr>
        <td>
            Top Movers
        </td>
        <td>
        <h4> √</h4>
        </td>
        <td>
        <h4> √</h4>
        </td>
      </tr>


    

      <tr>
        <td>
            Option Scanner
        </td>
        <td>
        <h4> √</h4>
        </td>
        <td>
        <h4> √</h4>
        </td>
      </tr>


      <tr>
        <td>
            System Tradinng
        </td>
        <td>
        <h4> √</h4>
        </td>
        <td>
        <h4> √</h4>
        </td>
      </tr>


      <tr>
        <td>
            News feed
        </td>
        <td>
        <h4> √</h4>
        </td>
        <td>
        <h4> √</h4>
        </td>
      </tr>


      <tr>
        <td>
           Trailing Stoploss
        </td>
        <td>
        <h4>×</h4>
        </td>
        <td>
        <h4> √</h4>
        </td>
      </tr>


      <tr>
        <td>
           Buy At Low
        </td>
        <td>
         <h4>×</h4>
        </td>
        <td>
        <h4> √</h4>
        </td>
      </tr>


      <tr>
        <td>
           Protect Profit
        </td>
        <td>
        <h4>×</h4>
        </td>
        <td>
        <h4> √</h4>
        </td>
      </tr>


      <tr>
        <td>
           Incremental Buy
        </td>
        <td>
        <h4>×</h4>
        </td>
        <td>
        <h4> √</h4>
        </td>
      </tr>


      <tr>
        <td>
          Timer Trade
        </td>
        <td>
        <h4>×</h4>
        </td>
        <td>
        <h4> √</h4>
        </td>
      </tr>


      <tr>
        <td>
           Breakout Buy
        </td>
        <td>
        <h4>×</h4>
        </td>
        <td>
        <h4> √</h4>
        </td>
      </tr>


      {/* <tr>
        <td>

        </td>
        <td>
          <button>Get Started</button>
        </td>
        <td>
          <button onClick={paymentHandler}>Get Started</button>
        </td>
      </tr> */}
    </tbody>
  </table>
</div>
<div className='struggling'>

   <h2>"Are you struggling with insufficient trading capital?"</h2> 
</div>



<div className='fundtrade'>


      <div className='fundtrade-head'>
          <h4>
          Join Our Funded Trading Program
          </h4>
          <h5>Unlock Your Trading Potential</h5>
          <p>Dive into the world of funded trading with our exclusive program designed to elevate your trading journey. Whether you're a seasoned trader or just starting, our program offers the capital, tools, and support you need to succeed in the financial markets.</p>

      </div>



      <div className='how-it-works'>

        <h4>How It Works</h4>
        <ul>
            <li>
                <p><b>Subscribe and Show Your Skills:</b> Begin by subscribing to our program. Showcase your trading expertise in our evaluation process designed to highlight your strengths.</p>
            </li>

            <li>
                <p><b>Earn Your Funding:</b> Pass our evaluation and gain access to significant trading capital under our funded account. It's your skill, our capital - a perfect match for success.</p>
            </li>

            <li>
                <p><b>Trade and Profit:</b> Navigate the markets with our funds. Apply your strategies, manage risks effectively, and keep a significant portion of the profits you make.</p>
            </li>
            
        </ul>



      </div>


      <div className='how-it-works'>

        <h4>Why Subscribe?</h4>
        <ul>
            <li>
                <p><b>No Risk of Personal Capital: </b> Trade freely without the risk to your own money. Focus on what you do best – trading.</p>
            </li>

            <li>
                <p><b>Substantial Profit Share:</b>Your success is our success. Enjoy a lucrative share of the profits with the potential to increase as you grow.</p>
            </li>

            <li>
                <p><b>Comprehensive Support:</b> Benefit from our educational resources, cutting-edge trading tools, and a community of traders to exchange insights.</p>
            </li>

            <li>
                <p><b>Flexibility and Freedom:</b>Trade your strategy on your schedule. Our program offers the flexibility you need to trade at your best.</p>
            </li>
            
        </ul>



      </div>

<div className='top'>

    




<div className='top-left'>
    <h2>--------Evalution Stage---------</h2>
    <table>
<tr>
    <th></th>
    <th>Student</th>
    <th>Practitioner</th>
</tr>


<tr>
    <td>Trading Period</td>
    <td>∞</td>
    <td>∞</td>
</tr>
<tr>
    <td>Menium Trading days</td>
    <td>0 days</td>
    <td>0 days</td>
</tr>

<tr>
    <td>Maximum Daily Loss</td>
    <td>5%</td>
    <td>5%</td>
</tr>

<tr>
    <td>Maximum Loss</td>
    <td>10%</td>
    <td>10%</td>
</tr>

<tr>
    <td>Profit Target</td>
    <td>8%</td>
    <td>5%</td>
</tr>

<tr>
    <td>Leavrage</td>
    <td>1:100</td>
    <td>1:100</td>
</tr>

<tr>
    <td>Advanced Subscription Fetures</td>
    <td>Enable</td>
    <td>Enable</td>
</tr>

</table>
</div>


<div>
<h2>--------Funded Stage---------</h2>
<table>
<tr>
    <th></th>
    <th>Master</th>
</tr>
<tr>
    <td>Trading Period</td>
    <td>∞</td>
</tr>

<tr>
    <td>Maximum Loss</td>
    <td>5%</td>         
</tr>

<tr>
    <td>Maximum Loss</td>
    <td>10%</td>

</tr>

<tr>
    <td>Profit Target</td>
    <td>-</td>
  
</tr>

<tr>
    <td>Leavrage</td>
    <td>1:100</td>
 
</tr>
<tr>
    <td>Advanced Subscription Fetures</td>
    <td>Enable</td>
 
</tr>



</table>
</div>
</div>

<div className='bottom'>
    <h1>Subscription Plans</h1>

    <ul>
        <li>
                <h4>
                Account Size   1,000,000 INR
                </h4>
                
                
                <p>
                    8% Profit target
                </p>

                  
                <p>
                    10% Overall Loss
                </p>

                  
                <p>
                    5% maximum daily Loss
                </p>

                <h2>500 Rs
                    <button onClick={()=>paymentHandler(500)} >Choose</button>
                </h2>
          
        </li>

        <li>
                <h4>
                Account Size    5,000,000 INR
                </h4>
                
                <p>
                    8% Profit target
                </p>

                  
                <p>
                    10% Overall Loss
                </p>

                  
                <p>
                    5% maximum daily Loss
                </p>
                
                <h2>1000 Rs
                    <button onClick={()=>paymentHandler(1000)} >Choose</button>
                </h2>
        </li>

        <li>
        <h4>
                Account Size    10,000,000 INR
                </h4>
                
                <p>
                    8% Profit target
                </p>

                  
                <p>
                    10% Overall Loss
                </p>

                  
                <p>
                    5% maximum daily Loss
                </p>

                
                <h2>2000 Rs
                    <button onClick={()=>paymentHandler(2000)} >Choose</button>
                </h2>
        </li>
    </ul>
</div>



</div>





    </div>
  )
}

export default Subscribe