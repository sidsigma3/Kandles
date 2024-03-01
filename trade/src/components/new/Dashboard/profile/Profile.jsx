import React from 'react'
import './Profile.css'
import { CiEdit } from "react-icons/ci";
const Profile = () => {
  return (
    <div className='profile-page'>
        <div className='profile-top'>
               <div className='profile-pic'>
                    <img src='/image-60.svg'></img>
                </div> 

                <div className='profile-detail'>
                    <h3>Profile Information</h3>

                    <div className='profile-name'>
                      Name:  Sidhant Pradhan
                    </div>

                    <div className='profile-email'>
                      Email:  sidsigma3@gmail.com
                    </div>

                    <div className='profile-number'>
                    Phone No.:    7077376003

                    </div>

                    <div className='profile-edit'>
                    Edit Information 
                    <b><button>Edit  <span><CiEdit /></span></button></b>
                    
                    </div>

                </div>

               

        </div>


        <div className='profile-buttom'>
            <div className='range-inputs'>
                <div className='equity w-25'>
                  <h2>Equity</h2>

                  <div className='d-flex justify-content-between w-100'>
                      <h4>Available Margin</h4>
                      <h3>7800</h3>
                  </div> 

                  <div className='d-flex justify-content-between w-100'>
                      <h4>Used Margin</h4>
                      <h3>0.00</h3>
                  </div> 

                  <div className='d-flex justify-content-between w-100'>
                      <h4>Available Cash</h4>
                      <h3>0.00</h3>
                  </div>

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Opening balance</h5>
                      <h4>7800</h4>
                  </div>

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Payin</h5>
                      <h4>0.00</h4>
                  </div>

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Payout</h5>
                      <h4>0.00</h4>
                  </div>

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Span</h5>
                      <h4>0.00</h4>
                  </div> 

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Delivery margin</h5>
                      <h4>0.00</h4>
                  </div>   

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Exposure</h5>
                      <h4>0.00</h4>
                  </div>              

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Options Premium</h5>
                      <h4>0.00</h4>
                  </div> 

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Collateral(Liquid Funds)</h5>
                      <h4>0.00</h4>
                  </div> 

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Collateral(Equity)</h5>
                      <h4>0.00</h4>
                  </div> 

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Total Collateral</h5>
                      <h4>0.00</h4>
                  </div> 

                  

                </div>

                <div className='Commodity w-25'>
                  <h2>Commodity</h2>

                  <div className='d-flex justify-content-between w-100'>
                      <h4>Available Margin</h4>
                      <h3>0.00</h3>
                  </div> 

                  <div className='d-flex justify-content-between w-100'>
                      <h4>Used Margin</h4>
                      <h3>0.00</h3>
                  </div> 

                  <div className='d-flex justify-content-between w-100'>
                      <h4>Available Cash</h4>
                      <h3>0.00</h3>
                  </div>

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Opening balance</h5>
                      <h4>0.00</h4>
                  </div>

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Payin</h5>
                      <h4>0.00</h4>
                  </div>

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Payout</h5>
                      <h4>0.00</h4>
                  </div>

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Span</h5>
                      <h4>0.00</h4>
                  </div> 

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Delivery margin</h5>
                      <h4>0.00</h4>
                  </div>   

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Exposure</h5>
                      <h4>0.00</h4>
                  </div>              

                  <div className='d-flex justify-content-between w-100'>
                      <h5>Options Premium</h5>
                      <h4>0.00</h4>
                  </div> 

                

                  

                </div>





            </div>

        </div>



    </div>
  )
}

export default Profile