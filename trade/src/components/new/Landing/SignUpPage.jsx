import React from 'react'
import './SignUpPage.css'


const SignUpPage = () => {
  return (
    <div className='signup-page'>
        <div className='heading'>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="71" viewBox="0 0 70 71" fill="none">
                <path d="M30.625 17.699C26.2985 17.699 22.0692 18.9965 18.4719 21.4275C14.8746 23.8584 12.0708 27.3137 10.4151 31.3562C8.75948 35.3988 8.32628 39.8471 9.17033 44.1387C10.0144 48.4302 12.0978 52.3723 15.157 55.4663C18.2163 58.5604 22.1141 60.6674 26.3574 61.5211C30.6007 62.3747 34.9991 61.9366 38.9962 60.2621C42.9933 58.5876 46.4098 55.752 48.8134 52.1138C51.2171 48.4756 52.5 44.1982 52.5 39.8226H30.625V17.699Z" stroke="#5A55D2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M39.375 30.973H61.25C61.25 25.1054 58.9453 19.4782 54.843 15.3292C50.7406 11.1802 45.1766 8.84937 39.375 8.84937V30.973Z" stroke="#FFC100" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>

            <div>
                <h3>Stock <a>Angel</a></h3>
            </div>
        </div>


        <div className='container'>
            <div className='left'>
                <img src='./signup-img.png'></img>
            </div>

            <div className='right'>

                <h3>Sign up</h3>

                <h4>Let’s get you all st up so you can access your personal account.</h4>

                <form>
                    <div className='name-container'>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input type='text'></input>
                        </div>

                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text'></input>
                        </div>


                    </div>

                    <div className='name-container'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'></input>
                        </div>

                        <div className='input-container'>
                            <label>Phone Number</label>
                            <input type='tel'></input>
                        </div>


                    </div>

                    <div className='input-container'>
                        <label>Password</label>
                        <input type='text'></input>
                    </div>

                    <div className='input-container'> 
                        <label>Confirm Password</label>
                        <input type='text'></input>
                    </div>

                </form>


                <div className='agree-policy'>
                    <input type='checkbox'></input>
                    <label>I agree to all the <a>Terms</a> and <a>Privacy Policies</a></label>
                </div>

                <button>Create account</button>

                <h4 className='already-have'>Already have an account? <a>Login</a></h4>

                <h5>--------------------Or Sign up with----------------------</h5>

                <div className='login-alternative'>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M24 12.0733C24 5.40546 18.6274 0 12 0C5.37262 0 0 5.40536 0 12.0733C0 18.0994 4.38825 23.0943 10.125 24V15.5633H7.07812V12.0733H10.125V9.41343C10.125 6.38755 11.9166 4.71615 14.6575 4.71615C15.9705 4.71615 17.3438 4.95195 17.3438 4.95195V7.92313H15.8306C14.3398 7.92313 13.875 8.85381 13.875 9.80864V12.0733H17.2031L16.6711 15.5633H13.875V24C19.6117 23.0943 24 18.0995 24 12.0733Z" fill="#1877F2"/>
                </svg>
                </div>

                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                <path d="M3.15332 7.3455L6.43882 9.755C7.32782 7.554 9.48082 6 12.0003 6C13.5298 6 14.9213 6.577 15.9808 7.5195L18.8093 4.691C17.0233 3.0265 14.6343 2 12.0003 2C8.15932 2 4.82832 4.1685 3.15332 7.3455Z" fill="#FF3D00"/>
                <path d="M12.0002 22.0001C14.5832 22.0001 16.9302 21.0116 18.7047 19.4041L15.6097 16.7851C14.5719 17.5743 13.3039 18.0011 12.0002 18.0001C9.39916 18.0001 7.19066 16.3416 6.35866 14.0271L3.09766 16.5396C4.75266 19.7781 8.11366 22.0001 12.0002 22.0001Z" fill="#4CAF50"/>
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
                </svg>
                    
                </div>

                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17.5172 12.5555C17.5078 10.957 18.232 9.75234 19.6945 8.86406C18.8766 7.69219 17.6391 7.04766 16.0078 6.92344C14.4633 6.80156 12.7734 7.82344 12.1547 7.82344C11.5008 7.82344 10.0055 6.96563 8.82891 6.96563C6.40078 7.00313 3.82031 8.90156 3.82031 12.7641C3.82031 13.9055 4.02891 15.0844 4.44609 16.2984C5.00391 17.8969 7.01484 21.8133 9.1125 21.75C10.2094 21.7242 10.9852 20.9719 12.4125 20.9719C13.7977 20.9719 14.5148 21.75 15.7383 21.75C17.8547 21.7195 19.6734 18.1594 20.2031 16.5563C17.3648 15.218 17.5172 12.6375 17.5172 12.5555ZM15.0539 5.40703C16.2422 3.99609 16.1344 2.71172 16.0992 2.25C15.0492 2.31094 13.8352 2.96484 13.1437 3.76875C12.382 4.63125 11.9344 5.69766 12.0305 6.9C13.1648 6.98672 14.2008 6.40313 15.0539 5.40703Z" fill="#1A1E29"/>
                </svg>
                    
                </div>

            </div>

            </div>

        </div>

    </div>
  )
}

export default SignUpPage