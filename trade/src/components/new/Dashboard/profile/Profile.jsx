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
                <input>
                
                </input>

                 <input></input>   

            </div>

        </div>



    </div>
  )
}

export default Profile