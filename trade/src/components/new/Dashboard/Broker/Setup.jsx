import React,{ useRef } from 'react'

const Setup = () => {


    const inputRef = useRef(null);
    const linkToCopy = "https://tradiant.in/broker?brokerName=Zerodha"; // Predefined link
  
    const handleCopy = () => {
      const input = inputRef.current;
      input.select();
      document.execCommand('copy');
    };


  return (
    <div className='w-50 p-2 mt-3 ms-5'>
        <h4>Follow the Steps</h4>


        <div className='mt-3 mb-3 d-flex '>
            <h5>1.Enter your client ID </h5>
            <input className='form-control w-50 ms-5'></input>
        </div>

        <div  className='mt-5 mb-3'>
            <h5>2. Copy the Redirect URL and add it to your app</h5>

            <div class="input-group mb-3 w-75 mt-4">
            <h5>Redirect URL:</h5>
        <input type="text" class="form-control ms-3 text-primary " id="copyInput" placeholder="Text to copy" value={linkToCopy} aria-describedby="button-addon2"></input>
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="copyToClipboard()">Copy</button>
        </div>
    </div>
        </div>

        <div  className='mt-5 mb-3'>
            <h5>3. Copy your API key and API secret and save</h5>

            <input className='form-control w-50 mb-3' placeholder='api-key'></input>
            <input className='form-control w-50' placeholder='api-secret'></input>
        </div>

        <button className='btn btn-primary mt-5'>Save</button>


    </div>
  )
}

export default Setup