import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './App.css'
import axios from 'axios'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {useNavigate,useLocation} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordStrengthBar from 'react-password-strength-bar';


function App() {
  const location1 = useLocation();
  const state = location1.state;


  // if (state.msg.txt) {
  //   console.log('ohhh bhaiii')
  //   const msg =state.msg
  //   toast.success(msg, {autoClose:3000})
  // }
  
  
  
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
        setShow(true)
        setShow1(false)              
  };

  const navigate = useNavigate();

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true)
    setShow(false)
  };

  const location = useLocation();
  const [user,setUser] = useState({
  })

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
            console.log(res)
            if (res.data.stat===200){
                toast.success(res.data.msg, {autoClose:3000})
      
                 handleClose1() 
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

  const submitHandler1= (e)=>{
    e.preventDefault()
    axios.post("http://localhost:5000/login",user)
    .then((res)=>{
      console.log(res.data.stat)
      if (res.data.stat===200){
        toast.success(res.data.msg, {autoClose:3000})
        handleClose()
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
<body>
	<header>
		<h1>Logo</h1>
		<nav>
			<ul>
				{/* <li><a href="#">Home</a></li>
				<li><a href="#">Dashboard</a></li>
				<li><a href="#">Order</a></li>
                <li><a href="#">System Trading</a></li>
                <li><a href="#">User</a></li> */}
        <li><Button variant="primary" onClick={handleShow1}>
         Sign Up
      </Button>

        <Modal show={show1} onHide={handleClose1}>
         <Modal.Header closeButton>
           <Modal.Title>SignUp Form </Modal.Title>
         </Modal.Header>
        <Modal.Body></Modal.Body>
        <form onSubmit={submitHandler}>
        <div class="form-floating mb-3">
           <input type="text" class="form-control" id="floatingInputName" placeholder="" name='fullname' onChange={changeHandler} required></input>
           <label for='floatingInputName'>Full name</label>
           
         </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInputUser" placeholder="" name='username' onChange={changeHandler}required></input>
           <label for="floatingInputUser">User Name</label>
        </div>


        <div class="form-floating mb-3">
           <input type="email" class="form-control" id="floatingInputEmail" placeholder="" name='email' onChange={changeHandler}required></input>
           <label for="floatingInputEmail">Email address</label>
         </div>

        
          <div className='form-floating mb-3'>    
         <PhoneInput
            className='form-control' id='floatingInput' 
            name='phoneNumber'  
            placeholder="Enter phone number"

            defaultCountry='in'
            onChange={(e)=>{
              setUser({...user,['phone']:e})
            }}
            required/>
  
          </div>

        <div class="form-floating mb-3">
           <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name='password' onChange={changeHandler} required></input>
           <label for="floatingPassword">Password</label>
           <PasswordStrengthBar password={user.password}></PasswordStrengthBar>
         </div>

         <div class="form-floating mb-3">
           <input type="password" class="form-control" id="floatingInput" placeholder="re-type password" name='rePassword' onChange={changeHandler} required></input>
           <label for="floatingInput">Confirm Password</label>
           <PasswordStrengthBar password={user.rePassword}></PasswordStrengthBar>
         </div>
       
        <Modal.Footer>
            <ToastContainer/>
           <Button variant="secondary" onClick={handleClose1}>
             Close
           </Button>
           <Button type='submit' variant="primary">
             Submit
           </Button>
         </Modal.Footer>
         </form>
      </Modal></li>
			
      <Button variant="primary" onClick={handleShow}>
         Login
       </Button>
       
      <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Login Form </Modal.Title>
         </Modal.Header>
         <Modal.Body></Modal.Body>
         <form onSubmit={submitHandler1}>
         <div class="form-floating mb-3">
           <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name='email' onChange={changeHandler} required/>
           <label for="floatingInput">Email address / User name</label>
      
         </div>
         <div class="form-floating">
           <input type={password} class="form-control" id="floatingPassword" placeholder="Password" name='password' onChange={changeHandler} required></input>
          <label for="floatingPassword">Password</label>
        </div>
        <input class="form-check-input" onClick={showPassword} type="checkbox" value="" id="flexCheckDefault"></input>
          <label for='flexCheckDefault' >Show Password</label>
       
        <div>
       <a href='#' onClick={()=>navigate('/resetPassword')}>Forgot password?</a>
       </div>
         <Modal.Footer>
         <button className='btn btn-info float-start' onClick={handleShow1}>New User</button>
           
           <Button variant="secondary" onClick={handleClose}>
             Close
           </Button>
           <Button type='submit' variant="primary">
             Submit
           </Button>
           
         </Modal.Footer>
         </form>
       </Modal>
       
      </ul>
		</nav>
	</header>

	<main>
		<section>
			<h2>Quoets with Word Cloud</h2>
			<p>-NIFTY and BANKNIFTY (Live Stock Information)
                - ADs
                - News related to traning  </p>
		</section>
        <section>
			<h2>Why us?</h2>
			<ul>
				<li>Ease of trading</li>
				<li>Risk management</li>
				<li>Geek indicator</li>
			</ul>
			
		</section>
        <section>
			<h2>How we help You</h2>
			<ul>
				<li>System Trading</li>
				<li>Indicator</li>
				<li>Report</li>
			</ul>
		</section>
		<section>
			<h2>Who we are</h2>
			<ul>
				<li>About us (About the product , It's features[few lines summary])</li>
				<li>Social Media Link</li>
				<li>24/7 customer support</li>
			</ul>
		</section>
	</main>
	<footer>
		<p>&copy; 2023 Trade India</p>
	</footer>
</body>



  );
}

export default App


