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

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
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



    </div>
  )
}

export default Subscribe