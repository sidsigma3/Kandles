import React, { useState ,useEffect } from 'react';
import {useLocation,useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './pass.css'
import PasswordStrengthBar from 'react-password-strength-bar';
function Pass(){
    
    
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate()
    // const [isValidToken, setIsValidToken] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    // setUser({...user,['Email']:email})

    let refp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    const [user,setUser]= useState({
        Email:email,
        pass:'',
        repass:''
        })

    const changeHandler= (e)=>{
        const {name,value} = e.target
        setUser({...user,[name]:value})
        
    }
    


    const SubmitHandler =  (e) =>{
        e.preventDefault()
      
        if (refp.test(user.pass)){
        
        axios.post('http://localhost:5000/change',user)
        .then((res)=>{
            if (res.status===200){
                const msg={txt:'Password reset succesfull'}
                console.log("tjabgsbdjkb")
                const state = {msg}
                navigate('/', { replace: true },state)
                setUser({})
            }
            else{
                toast.warning("password Doesnt Match", {autoClose:3000})
            }
        }
        )
        // console.log('before')
        // const res= await axios.post('http://localhost:5000/change',user)
        // console.log(res.status)
        // console.log('asdjbabsd')
        }
        else{
            toast.warning('Password should contain Alphanumeric ,Uppercase character')
        }
    }



    // axios.post('http://localhost:5000/check',{email,token})
    // .then((res)=>{
        
    //     if (res.status!=200){
    //        setIsValid(false)
    //     }
    //     else{
    //         setIsValid(true)
            
    //     }
    // })  

    

   
//  if (isValid===false){
//         return(
//             <h4>Not a valid token or seesion timed out</h4>
//         )
//     }

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





    return(
        
        <html lang="en">
        <head>
            <meta charset="UTF-8"></meta>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <link rel="stylesheet" href="PasswordReset.css"></link>
            <title>Password Reset</title>
        </head>
        <body className='pass-reset'>
            <ToastContainer></ToastContainer>
            <div class="split-screen">
                <div class="left">
                    <section class="copy">
                        <h1><strong>Kandle</strong></h1>
                    </section>
                </div>
            <div class="right">
                <form onSubmit={SubmitHandler}>
                    <section class="copy">
                        <h2>Set new Password</h2>
                    </section>
                    <div class="input-container password">
                        <label for="password">Password</label>
                        <input id="password" name="pass" onChange={changeHandler} placeholder="Must be atleast 8 characters" type="password" required></input>
                        <i class="far fa-eye-slash"></i>
                    </div>
                    <div class="input-container password">
                        <label for="password">Confrim Password</label>
                        <input id="password" name="repass" onChange={changeHandler} placeholder="Must be atleast 8 characters" type="password" required></input>
                        <i class="far fa-eye-slash"></i>
                    </div>
                    <button class="login-btn" type="submit">Submit</button>
                </form>
            </div>
            </div>
        </body>
        </html>
        
        
    )

    }


 
   



export default Pass
