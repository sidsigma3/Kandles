import React, { Component, useState ,useEffect} from 'react';
import axios from 'axios';
import io from 'socket.io-client';



function Position (){
    const [position,setPosition] = useState() 
    const [pnl,setPnl] = useState()
 
   

    useEffect(() => {
        const socket = io('http://localhost:5000'); // Connect to the backend server
    
        // Listen for 'update' event and update the data state
        socket.on('update', (data) => {
            console.log(data)

            if(data && Object.keys(data).length > 0){
            setPnl(data)
            }
        //    setPnl(data)
          
        });
    
        return () => {
          socket.disconnect(); // Disconnect the socket when component unmounts
        };
      }, []);
      
    
    const handler =()=>{
        
        axios.post(`http://localhost:5000/position`)
        .then((response)=>{
            // setPnl(response.data)

        })
        .catch((err)=>{
            console.log(err)
        })


    }


    return (
        <div>
            <label><h4>Profit and Loss</h4></label>
            <button className='btn btn-primary' onClick={handler}>Show </button>

            {pnl && Object.keys(pnl).length > 0 && (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>LTP</th>
            <th>P&amp;L</th>
            <th>Day Change %</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(pnl).map((item, index) => (
            <tr key={index}>
              <td>{item.symbol}</td>
              <td>{item.quantity}</td>
              <td>{item.ltp}</td>
              <td>{item.pnl}</td>
              <td>{item.dayChange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}   
            
           

        </div>
        
    )


}


export default Position