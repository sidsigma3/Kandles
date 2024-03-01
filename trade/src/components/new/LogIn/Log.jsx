import React, { useState ,useEffect} from 'react';
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
// import { GoogleLoginProvider, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
import FacebookLogin from '@greatsumini/react-facebook-login';
import { FaFacebook } from "react-icons/fa";

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


// const googleLogin = useGoogleLogin({
//   clientId: '377046758434-nnu0bme8nrlogj08vuk72e8ss20b10a1.apps.googleusercontent.com',
//   onSuccess: (user) => {
//     console.log('Google login success:', user);

//     // Access user information
//     const email = user.profileObj.email;
//     const name = user.profileObj.name;
//     // You can add more fields as needed

//     // Perform sign-up or login with the retrieved information
//     // ...

//     // Handle successful login
//   },
//   onFailure: (error) => {
//     console.error('Google login error:', error);
//     // Handle login error
//   },
// });

const changeHandler=(e)=>{
    const {name,value}=e.target
    setUser({...user,[name]:value})
  }
 
  const changeHandler1 = (e) => {
    const { name, value } = e.target;
    setUser1({ ...user1, [name]: value, 'registrationMethod': 'email' });
    console.log(user1)
}
  const submitHandler= (e)=>{
    e.preventDefault()
    axios.post("http://localhost:5000/login",user)
    .then((res)=>{
      console.log(res)
      console.log(res.data.stat)
      if (res.data.stat===200){
        toast.success(res.data.msg, {autoClose:3000})
        localStorage.setItem('authToken',res.data.token)


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
  
  const responseMessage = (response) => {
    const decoded=jwtDecode(response.credential)
    console.log(decoded)
    console.log(response)
    const name =decoded.name
    const email = decoded.email
    const id = decoded.sub
    console.log(name,email)    
    setUser1({'name':name,'email':email ,'password':id ,registrationMethod:'google'})
    // axios.post("http://localhost:5000/signup",user1)
    // .then((res)=>{
   
    // if (res.data.stat===200){
    //     toast.success(res.data.msg, {autoClose:3000})     
    // }
    // else{
    //   toast.warning(res.data.msg, {autoClose:10000})
    // }
    //   }
    // )
      

    
  };


  useEffect(() => {
    // Make the Axios request when the user state is updated
    if (user1.email && user1.password && user1.registrationMethod==='google') {
      axios.post('http://localhost:5000/signup', user1).then((res) => {
        if (res.data.stat === 200) {
          toast.success(res.data.msg, { autoClose: 3000 });
        } else {
          toast.warning(res.data.msg, { autoClose: 10000 });
        }
      });
    }
  }, [user1]);

  const responseMessage1 = (response) => {
    const decoded=jwtDecode(response.credential)
    console.log(decoded)
    const password =decoded.sub
    const email = decoded.email
    
    setUser({'email':email ,'password': password})
    console.log(user)
    // axios.post("http://localhost:5000/login",user)
    // .then((res)=>{
    //   console.log(res.data.stat)
    //   if (res.data.stat===200){
    //     toast.success(res.data.msg, {autoClose:3000})
    //     localStorage.setItem('authToken',res.data.token)
        

    //     navigate('/dashboard',{replace:true})

    //   }
    //   else if(res.data.stat==401){
    //     toast.error(res.data.msg,{autoClose:7000})
    //   }
    //   else{
    //     toast.warning(res.data.msg, {autoClose:10000})
    //   }
    
    // }
    //   )
    

    ;
  };

  useEffect(() => {
    // Make the Axios request when the user state is updated
    if (user.email && user.password && user.registrationMethod==='google') {
      console.log(user)
      axios.post('http://localhost:5000/login', user).then((res) => {
        if (res.data.stat === 200) {
          toast.success(res.data.msg, { autoClose: 3000 });
         
          localStorage.setItem('authToken',res.data.token)
        navigate('/dashboard',{replace:true})

        } else {
          toast.warning(res.data.msg, { autoClose: 10000 });
        }
      });
    }
  }, [user]);

  const errorMessage = (error) => {
      console.log(error);
  };
    
  const errorMessage1 = (error) => {
    console.log(error);
};
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
      console.log(user1)
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

  const responseMessageFacebook = (response) => {
    if (response.status === 'connected') {
      const name = response.name;
      const email = response.email;
      const id = response.id;
      console.log(response)
      // Use the retrieved information as needed
      // ...
    } else {
      // Handle login error
      console.error('Facebook login error:', response);
    }
  };

  const responseMessageFacebook1 = (response) => {
    if (response.status === 'connected') {
      const name = response.name;
      const email = response.email;
      const id = response.id;
  
      console.log(response)
      // Use the retrieved information as needed
      // ...
    } else {
      // Handle login error
      console.error('Facebook login error:', response);
    }
  };


  return (
    <div className='log'>
        <ToastContainer></ToastContainer>
      <div id="container" className={`login-container ${isSignUp ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={submitHandler1}>
            <h1>Create Account</h1>
            <div className="social-container">
              {/* <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a> */}
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
              {/* <FacebookLogin
                  appId="1381167079441158"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseMessageFacebook1}
                  
                  render={(renderProps) => (
                    <button onClick={renderProps.onClick} className="facebook-btn">
                     <FaFacebook  className='fb-logo'/>
                    </button>
                  )}

                  
                /> */}
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
              {/* <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a> */}
            <GoogleLogin onSuccess={responseMessage1} onError={errorMessage1} />

                {/* <FacebookLogin
                  appId="1381167079441158"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseMessageFacebook}
                  render={(renderProps) => (
                    <button onClick={renderProps.onClick} className="facebook-btn">
                     <FaFacebook  className='fb-logo'/>                 
                    </button>
                  )}
                /> */}
            
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
      {/* <footer>
        <p>
          Created with <i className="fa fa-heart"></i> by
          <a target="_blank" href="https://florin-pop.com">Florin Pop</a> - Read how I created this and how you can join the challenge
          <a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
        </p>
      </footer> */}
    </div>
  );
};

export default Log;
