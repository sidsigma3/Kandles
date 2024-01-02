import axios from 'axios';
import React, { useState } from 'react';
import './reset.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './reset.css'

function Reset(){
    const [user,setUser]= useState({email:''})

    const [user1,setUser1] = useState({
    })
    
 const [isSignUp, setIsSignUp] = useState(false);

  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

    const changeHandler= (e)=>{
        const em = e.target.value
        setUser({email:em})
        
    }

    const changeHandler1=(e)=>{
        const {name,value}=e.target
        setUser1({...user1,[name]:value})
      }
    const submitHandler = () =>{
        axios.post('http://localhost:5000/reset',user)
        .then((res)=>{
            if (res.status===200){
                toast.success("Reset Password link sent to your Email",{autoClose:3000})
            }

    })
    }

    return (
        
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8"></meta>
    //         <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    //         <link rel="stylesheet" href="Forgetpass.css"></link>
    //         <title>Forget password</title>
    //     </head>
    //     <body>
    //         <ToastContainer></ToastContainer>
    //         <div class="split-screen">
    //             <div class="left">
    //                 <section class="copy">
    //                     <h1><strong>Kandle</strong></h1>
    //                 </section>
    //             </div>
    //         <div class="right">
    //             <form onSubmit={submitHandler}>
    //                 <section class="copy">
    //                     <h2>Forget Password</h2>
    //                 </section>
    //                 <div class="input-container email">
    //                     <label for="email">Email</label>
    //                     <input id="email" name="email" type="email" placeholder="Enter your email" onChange={changeHandler} required></input>
    //                 </div>
    //                 <button class="login-btn" type="submit">Submit</button>
    //             </form>
    //         </div>
    //         </div>
    //     </body>
    //     </html>
        
        <div>
             <div className='log'>
        <ToastContainer></ToastContainer>
      <div id="container" className='login-container  right-panel-active'>
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={submitHandler}>
            <h1>Password Reset</h1>
            {/* <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div> */}
            {/* <span>or use your email for registration</span> */}
            <input type="text" placeholder="Name" name='name' onChange={changeHandler1}/>
            <input type="text" placeholder="User Name" name='username'  onChange={changeHandler1}/>
            <input type="email" placeholder="Email" name='email'  onChange={changeHandler1}/>
           
            <input type="password" placeholder="Password" name='password' onChange={changeHandler1}/>
            {/* <input  placeholder="Phone No." name='phoneNumber' onChange={changeHandler1}/> */}
          

            <button className="ghost sign-in" type='submit' id="signIn">
              Sign Up
            </button>
          </form>
        </div>

        {/* <div className="form-container sign-in-container">
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
        </div> */}
        <div className="overlay-container">
          <div className="overlay">
            {/* <div className={`overlay-panel overlay-left ${isSignUp ? 'overlay-right' : ''}`}> */}
            <div class="overlay-panel overlay-left">
              <h1 className='welcome'>Welcome Back!</h1>
              <p>To keep connected with us, please log in with your personal info</p>
              <button className="ghost" id="signIn" >
                Sign In
              </button>
            </div>
            {/* <div className={`overlay-panel overlay-right ${isSignUp ? 'overlay-left' : ''}`}> */}
            <div class="overlay-panel overlay-right">
              <h1 className='hello'>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" id="signUp" >
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
        </div>
    )

}

export default Reset


