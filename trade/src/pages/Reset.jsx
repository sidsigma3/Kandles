import axios from 'axios';
import React, { useState } from 'react';
import './reset.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './reset.css'

function Reset(){
    const [user,setUser]= useState({email:''})



    const changeHandler= (e)=>{
        const em = e.target.value
        setUser({email:em})
        
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
        
        <html lang="en">
        <head>
            <meta charset="UTF-8"></meta>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <link rel="stylesheet" href="Forgetpass.css"></link>
            <title>Forget password</title>
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
                        <h2>Forget Password</h2>
                    </section>
                    <div class="input-container email">
                        <label for="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="Enter your email" onChange={changeHandler} required></input>
                    </div>
                    <button class="login-btn" type="submit">Submit</button>
                </form>
            </div>
            </div>
        </body>
        </html>
        
        
    )

}

export default Reset


