import React, { useState } from 'react';
import './Log.css'; // Import your CSS file
import axios from 'axios'
import 'react-phone-number-input/style.css'
import {useNavigate,useLocation} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
// import '@fortawesome/fontawesome-free/css/all.css';
import 'font-awesome/css/font-awesome.min.css';

const Log = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

  const [user,setUser] = useState({
})

const [user1,setUser1] = useState({
})

const navigate = useNavigate();


const changeHandler=(e)=>{
    const {name,value}=e.target
    setUser({...user,[name]:value})
  }
 
  const changeHandler1=(e)=>{
    const {name,value}=e.target
    setUser1({...user1,[name]:value})
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

  
 
  const submitHandler1= (e)=>{
  
  
    e.preventDefault()
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let refp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      
    console.log(user1)

    if(re.test(user1.email)){

      if (isValidPhoneNumber(user1.phone) === false){
        toast.warning('Not a valid Number',{autoClose:10000})

       }
  
      else{
          if (refp.test(user1.password)){
            
            axios.post("https://kandles-back.onrender.com/signup",user1)
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
    <div className='log'>
        <ToastContainer></ToastContainer>
      <div id="container" className={`login-container ${isSignUp ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={submitHandler1}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" name='name' onChange={changeHandler1} required></input>
            <input type="text" placeholder="User Name" name='username'  onChange={changeHandler1} required></input>
            <input type="email" placeholder="Email" name='email'  onChange={changeHandler1} required></input>
            <PhoneInput
                              className='phone-input' id='floatingInput' 
                              name='phoneNumber'  
                              placeholder=" Phone Number"

                              defaultCountry='in'
                              onChange={(e)=>{
                                setUser1({...user1,['phone']:e})
                              }}
                              
                              required/>
            <input type="password" placeholder="Password" name='password' onChange={changeHandler1}/>
            {/* <input  placeholder="Phone No." name='phoneNumber' onChange={changeHandler1}/> */}
          

            <button className="ghost sign-in" type='submit' id="signIn">
              Sign Up
            </button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form action="#" onSubmit={submitHandler}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" name='email'  onChange={changeHandler} />
            <input type="password" placeholder="Password" name='password' onChange={changeHandler} />
            <a href="#" onClick={()=>navigate('/reset')}>Forgot your password?</a>
            <button className="ghost sign-up" type='submit'  id="signUp">
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            {/* <div className={`overlay-panel overlay-left ${isSignUp ? 'overlay-right' : ''}`}> */}
            <div class="overlay-panel overlay-left">
              <h1 className='welcome'>Welcome Back!</h1>
              <p>To keep connected with us, please log in with your personal info</p>
              <button className="ghost" id="signIn" onClick={togglePanel}>
                Sign In
              </button>
            </div>
            {/* <div className={`overlay-panel overlay-right ${isSignUp ? 'overlay-left' : ''}`}> */}
            <div class="overlay-panel overlay-right">
              <h1 className='hello'>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" id="signUp" onClick={togglePanel}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>
          Created with <i className="fa fa-heart"></i> by
          <a target="_blank" href="https://florin-pop.com">Florin Pop</a> - Read how I created this and how you can join the challenge
          <a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
        </p>
      </footer>
    </div>
  );
};

export default Log;
