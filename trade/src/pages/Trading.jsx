import React, { Component, useState } from 'react';

function Trading () {
    const [noOfTrades,setNoOfTrades] = useState()



    return (

        <div class=' row container-fluid'>
            <div class='col-3 bg-light'>


            </div>

            <div class='col-9'>

        <div class='row ' >
            <div class='col-4'>
                <div>
                <label>Capital</label>
                <input class="form-control"></input>
                </div>

                <div>
                <label>Capital risk per day</label>
                <input class="form-control"></input>

                </div>

                <div>
                <label>Reward to risk</label>
              
              <div  class='d-flex'>
               <input type="text" class="form-control form-control-sm"></input> 
               <h6>To</h6>
               <input type="text" class="form-control form-control-sm"></input>
               </div>
                </div>

            </div>

            <div class='col-4'>
            <label>No. of trades</label>
                <input class="form-control" onChange={(e)=>{
                    setNoOfTrades(e.target.value)
                }}></input>

                <label>Index</label>
                <input class="form-control"></input>

                <label>Strike</label>
                <input class="form-control"></input>

            </div>


            <div class='col-4'>
            <label>Type</label>
                <input class="form-control"></input>
                

                <label>Trailing SL</label>
                <input class="form-control"></input>

                 <label>Buy @ Low</label>
                <input class="form-control"></input>   

                  <label>Protect profit</label>
                <input class="form-control" ></input>

            </div>


        </div>
        </div>
        </div>

        

      


    )

}


export default Trading