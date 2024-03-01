import React from 'react'
import './Fundtrade.css'
import axios from 'axios'
import useRazorpay from "react-razorpay";
const Fundtrade = () => {


    const [Razorpay] = useRazorpay();

    const paymentHandler = (price)=>{
        console.log('achha')
        axios.post('http://localhost:5000/payment',{price})
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
    <div className='fundtrade'>

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
            <td>5%%</td>         
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
  )
}

export default Fundtrade