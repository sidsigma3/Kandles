import React from 'react'
import { useState } from 'react';
import './LogIn.css'
import axios from 'axios'
import 'react-phone-number-input/style.css'
import {useNavigate,useLocation} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = () => {
    const [user,setUser] = useState({
    })
  

    const navigate = useNavigate();


    const changeHandler=(e)=>{
        const {name,value}=e.target
        setUser({...user,[name]:value})
      }
     
      
    
      const submitHandler= (e)=>{
        e.preventDefault()
        axios.post("https://kandles-back.onrender.com/login",user)
        .then((res)=>{
          console.log(res.data.stat)
          if (res.data.stat===200){
            toast.success(res.data.msg, {autoClose:3000})
            navigate('/dashboard',{replace:true})
    
          }
          else if(res.data.stat==401){
            toast.error(res.data.msg,{autoClose:7000})
          }
          else{
            toast.warning(res.data.msg, {autoClose:10000})
          }
        
        }
          )
      }






    const[eye,seteye]=useState(true);
    const[password,setpassword]=useState("password");
    const[type,settype]=useState(false);

    const showPassword = ()=>{
        if(password=="text"){
          setpassword("password");
          
      }
      else{
          setpassword("text");
         
      }
      }




  return (
    <div>

        <div className='login-container'>

            <div className='left'>
                <h2>
                Trade with us
                </h2>

                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus nunc, ac rhoncus odio congue quis. Sed ac semper orci, eu porttitor lacus. 
                </p>

            </div>

            <div className='right'>
               
                <div className='bottom'>
                    <h3>Sign In</h3>
                    <div className='social-media'>
                        <div className='google'>
                       <span>
                        <img src='/google.svg'>
                        </img>
                        </span> 
                        Continue with Google
                        </div>

                        <div className='twitter'>
                        <span>
                        <img src='/twitter.svg'>
                        </img>
                        </span> 
                        Continue with Twitter
                        </div>
                    </div>

                    <div className='divider'>
                            <img src='/Divider.svg'>
                            </img>
                    </div>


                    <div className='form'>
                        <div className='email'>
                            <h4>
                            User name or email address
                            </h4>

                            <input type='text' name='email' onChange={changeHandler}>

                            </input>


                        </div>

                        <div className='password'>
                             <h4>
                           Your Password
                            </h4>

                            <input type={password} name='password' onChange={changeHandler}>

                            </input>
                            <label class="checkbox-container"><input type="checkbox" onClick={showPassword}></input>
                                <span class="checkmark"></span>
                                Show Password
                            </label>

                            <a href="#" class="forgot-password" onClick={()=>navigate('/reset')}>Forgot Password?</a>
                        </div>

                        <div>
                            
                        </div>

                        <div className='submit'>
                            <button onClick={submitHandler}>
                                Sign In
                            </button>

                            <p class="signup-text">Don't have an account? <a href='#' onClick={()=>navigate('/signup')}>Sign Up here</a></p>

                        </div>

                    

                    </div>

                </div>

            </div>



        </div>

    </div>
  )
}

export default LogIn