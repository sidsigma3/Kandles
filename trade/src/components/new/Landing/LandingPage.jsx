import React from 'react'
import './LandingPage.css'



const LandingPage = () => {
  return (
    <div className='landing-page'>
        
        <div className='landing-page-container'>
            <div className='left'>

            </div>

            <div className='right'>
                <div className='logo-container'>
                    <div className='logo-img'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
                    <path d="M31.125 17.699C26.7985 17.699 22.5692 18.9965 18.9719 21.4275C15.3746 23.8584 12.5708 27.3137 10.9151 31.3562C9.25948 35.3988 8.82628 39.8471 9.67033 44.1387C10.5144 48.4302 12.5978 52.3723 15.657 55.4663C18.7163 58.5604 22.6141 60.6674 26.8574 61.5211C31.1007 62.3747 35.4991 61.9366 39.4962 60.2621C43.4933 58.5876 46.9098 55.752 49.3134 52.1138C51.7171 48.4756 53 44.1982 53 39.8226H31.125V17.699Z" stroke="#5A55D2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M39.875 30.973H61.75C61.75 25.1054 59.4453 19.4782 55.343 15.3292C51.2406 11.1802 45.6766 8.84937 39.875 8.84937V30.973Z" stroke="#FFC100" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </div>


                    <div className='logo-name'>
                        <h3>Stock <a>Angel</a></h3>
                    </div>
                     
                </div>


                <h3>Welcome to Login!</h3>

                <h4>New User? <a>Create an account</a></h4>

                <form>
                        <div className='input-field'>
                            <label>Email or Username <a>*</a></label>

                            <input></input>
                        </div>

                        <div className='input-field'>
                            <label>Password <a>*</a></label>

                            <input></input>
                        </div>


                        <div>
                            <div>
                                <input type='checkbox'></input>
                                <label>Remember me</label>
                            </div>

                            <h5>Forgot Password?</h5>






                        </div>


                        <button>LOGIN</button>


                </form>

            </div>

        </div>

    </div>
  )
}

export default LandingPage