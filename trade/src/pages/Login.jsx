import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import './App.css'
import axios from 'axios'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {useNavigate,useLocation} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordStrengthBar from 'react-password-strength-bar';
// import Pass from './components/pass';
// import './login.css'


function Login() {
  const location1 = useLocation();
  const state = location1.state;


  
  
 

  const navigate = useNavigate();

  
  const location = useLocation();
  const [user,setUser] = useState({
  })

  
  const changeHandler=(e)=>{
    const {name,value}=e.target
    setUser({...user,[name]:value})
  }
 
  

  const submitHandler= (e)=>{
    e.preventDefault()
    axios.post("http://localhost:5000/login",user)
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
<html lang="en">
<head>
    <meta charset="UTF-8"></meta>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <title>Login</title>
    <link rel="stylesheet" href="KandleLogin.css"></link>

</head>
<body>
    <ToastContainer></ToastContainer>
    <div class="split-screen">
        <div class="left">
            <section class="copy">
                <h1><strong>Kandle</strong></h1>
            </section>
        </div>
        <div class="right">
            <form onSubmit={submitHandler}>
                <section class="copy">
                    <h2>LOGIN</h2>
                </section>
                <div class="input-container email">
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email" onChange={changeHandler} required></input>
                </div>
                <div class="input-container password">
                    <label for="password">Password</label>
                    <input id="password" name="password" placeholder="Must be atleast 8 characters" type={password} onChange={changeHandler} required></input>
                    <i class="far fa-eye-slash"></i>
                </div>
                <div class="input-container cta">
                    <label class="checkbox-container"><input type="checkbox" onClick={showPassword}></input>
                    <span class="checkmark"></span>
                    Show Password
                </label>
                <a href="#" class="forgot-password" onClick={()=>navigate('/reset')}>Forgot Password?</a>
                <p class="signup-text">Don't have an account? <a href='#' onClick={()=>navigate('/signup')}>Sign Up here</a></p>
                </div>
                <button class="login-btn" type="submit">LOGIN</button>
                <section class="copy legal">
                    <p><span class="small">By continuing, you agree to accept our <br></br>
                        <a href="#">Privacy Policy</a> &amp; <a href="#">Term of Service</a>.</span></p>
                </section>
            </form>
        </div>
    </div>
</body>
</html>
  )
}

export default Login