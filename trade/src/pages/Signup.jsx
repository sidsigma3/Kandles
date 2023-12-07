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
// import './signup.css'




function Signup() {
  const location1 = useLocation();
  const state = location1.state;
  

  // if (state.msg.txt) {
  //   console.log('ohhh bhaiii')
  //   const msg =state.msg
  //   toast.success(msg, {autoClose:3000})
  // }
  
  const navigate = useNavigate();


  const location = useLocation();

  const [user1,setUser1] = useState({
  })


  const changeHandler=(e)=>{
    const {name,value}=e.target
    setUser1({...user1,[name]:value})
  }
 
  const submitHandler= (e)=>{
  
    e.preventDefault()
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let refp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    if(re.test(user1.email)){

      if (isValidPhoneNumber(user1.phone) === false){
        toast.warning('Not a valid Number',{autoClose:10000})

       }
  
      else{
          if (refp.test(user1.password)){
            
            axios.post("http://localhost:5000/signup",user1)
            .then((res)=>{
           
            if (res.data.stat===200){
                toast.success(res.data.msg, {autoClose:3000})
      
                
        }
        else{
          toast.warning(res.data.msg, {autoClose:10000})
        }
          }
      )}
      else{
        toast.warning('Password should contain 8 character,Alphanumerical,Uppercase and lower case combination')
      }
      
}
    }
    else{
      toast.warning('Not a valid email')
    }
    
    
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
        <title>Signup</title>
        <link rel="stylesheet" href="KandleSignup.css"></link>
    </head>
    <body>
      <ToastContainer></ToastContainer>
        <div class="split-screen">
            <div class="left">
                <section class="copy">
                    <h1><strong>Kandle</strong></h1>
                    <p>Signup to Know more</p>
                </section>
            </div>
            <div class="right">
                <form onSubmit={submitHandler}>
                    <section class="copy">
                        <h2>Sign Up</h2>
                        <div class="login-container">
                            <p>Already have an account? <a href='#' onClick={()=>navigate('/login',{replace:true})} ><strong>Log In</strong></a> </p>
                        </div>
                    </section>
                    <div class="input-container name">
                    <label for="fname">First name</label>
                    <input id="fname" name="fname" type="text"onChange={changeHandler} value={user1.fname} required></input>
                </div>
                <div class="input-container name">
                    <label for="fname">Last name</label>
                    <input id="fname" name="lname" type="text"onChange={changeHandler} value={user1.lname} required></input>
                </div>
                    <div class="input-container username">
                        <label for="username">User Name</label>
                        <input id="username" name="username" type="username" onChange={changeHandler} value={user1.username} required></input>
                    </div>
                    <div class="input-container email">
                        <label for="email">Email</label>
                        <input id="email" name="email" type="email" onChange={changeHandler} value={user1.email} required></input>
                    </div>
                    <div class="input-container number">
                        <label for="number">Phone number</label>
                        <PhoneInput
                              className='form-control' id='floatingInput' 
                              name='phoneNumber'  
                              placeholder=""

                              defaultCountry='in'
                              onChange={(e)=>{
                                setUser1({...user1,['phone']:e})
                              }}
                              
                              required/>
                    </div>
                    <div class="input-container password">
                        <label for="password">Password</label>
                        <input id="password" name="password" placeholder="Must be atleast 8 characters" type={password} onChange={changeHandler} value={user1.password} required></input>
                        {/* <i id="toggle-password" class="eyeid" style="height: 35px;width: 40px;">&#128065</i> */}

                    <div class="input-container cta d-flex justify-content-center">
                        <label class="checkbox-container"><input type="checkbox" onClick={showPassword} ></input>
                        <span class="checkmark"></span>
                        Show password
                        </label>
                        {/* <i
                            id="toggle-password"
                            className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}
                            onClick={showPassword}
                          /> */}
                         {/* <input class="form-check-input " onClick={showPassword} type="checkbox" value="" id="flexCheckDefault"></input><span></span>
                         <label for='flexCheckDefault'className='col--8' >Show Password</label> */}
                    </div>
                    </div>
                    <button class="signup-btn" type="submit">Sign Up</button>
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

export default Signup
