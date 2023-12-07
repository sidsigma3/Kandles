import React from 'react'
import { useState } from 'react'
import './SignUp.css'
import '../../../global.css'
import axios from 'axios'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {useNavigate,useLocation} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColumnSizer } from 'react-virtualized'

const SignUp = () => {

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
    <div>
        <ToastContainer></ToastContainer>
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
    <div className='top'>
    <p>Already have an account? <a href='#' onClick={()=>navigate('/login',{replace:true})} ><strong>Log In</strong></a> </p>
    </div>


    <div className='bottom'>
        <h3>Sign Up</h3>
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
            <form onSubmit={submitHandler}>
             <div className='name'>
                <h4>
               Full Name
                </h4>

                <div className='full-name'>
                <input type='text' name='fname' onChange={changeHandler} required>

                </input>

                 <input type='text' name='lname' onChange={changeHandler} required>
                </input>
                </div>

            </div>

            <div className='user-name'>
                <h4>
                User Name
                </h4>

                <input type='text' name='username' onChange={changeHandler} required>

                </input>


            </div>
            <div className='email'>
                <h4>
                Email address
                </h4>

                <input type='text' name='email' onChange={changeHandler} required>

                </input>


            </div>
            <div className='phone'>
                <h4>
                Phone Number
                </h4>

                {/* <input type='text'>

                </input> */}
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

            <div className='password'>
            <h4>
               Your Password
                </h4>

                <input type={password} name='password' onChange={changeHandler} required>

                </input>

                <label class="checkbox-container"><input type="checkbox" onClick={showPassword} ></input>
                        <span class="checkmark"></span>
                        Show password
                        </label>
            </div>

            <div className='submit'>
                <button type='submit'>
                    Sign Up
                </button>

        

            </div>

            </form>

        </div>

    </div>

</div>



</div>



    </div>
  )
}

export default SignUp