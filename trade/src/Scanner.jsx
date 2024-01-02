import React, { Component, useEffect, useState ,useRef } from 'react';
import {Dropdown,Tab,Tabs} from 'react-bootstrap';
import MaxPain from './MaxPain';
import Change from './Change';
import Exp from './Exp';
import Greek from './Greek';
import axios from 'axios';
import queryString from 'query-string';
import './Scanner.css'
function Scanner(){
    // const [requestToken,setrequestToken] = useState(null)
    // const hasExecuted = useRef(false);
    const [instrumentList,setinstrumentList] = useState()



    // useEffect(() => {
    //   const fetchInstrumentNames = async () => {
    //     try {
    //       console.log('hoga ki nahin')
    //       const response = await axios.post('http://localhost:5000/api/instrumentslist');
    //       setinstrumentList(response.data.instrumentNames);
    //       console.log(response.data.instrumentNames)
    //       localStorage.setItem('instrumnetNames',response.data.instrumentNames)
    //       console.log('achha')
    //     } catch (error) {
    //       console.error('Error fetching instrument names:', error);
    //     }
    //   };
      
    //   fetchInstrumentNames();
    // }, []);


    useEffect(()=>{
      const fetchInstrumentNames = async () => {
        try {
          console.log('hoga ki nahin')
          const response = await axios.post('http://localhost:5000/get-master-quote');
          
          const instrumentName= response.data
          console.log(response.data)
          const additionalInstruments = ['NIFTY', 'BANKNIFTY', 'FINNIFTY', 'MIDCPNIFTY'];
          setinstrumentList([...instrumentName,...additionalInstruments]);
          // localStorage.setItem('instrumnetNames',response.data.instrumentNames)
          console.log('achha')
        } catch (error) {
          console.error('Error fetching instrument names:', error);
        }
      };
      
      fetchInstrumentNames();

    },[])


    // useEffect(() => {
    //     console.log('kese ho')
    //     const queryParams = queryString.parse(window.location.search);
    //     if(!requestToken){
    //     setrequestToken(queryParams.request_token);
    //     }
    //   }, []); 

    // useEffect(()=>{
    //     console.log('on process');
    //     if (requestToken && !hasExecuted.current) {
    //         hasExecuted.current = true;
      
    //         axios.post(`http://localhost:5000/connect`, { requestToken })
    //           .then((response) => {
    //             // Handle the response
    //           })
    //           .catch((error) => {
    //            console.log(error)
    //           });
    //       }


    // // console.log('on process')
    // // axios.post(`http://localhost:5000/connect`,{requestToken})
    // // .then((response)=>{
       
    // // })
    //     },[requestToken])

    return(
      <div className='scanner'>
        <Tabs
        defaultActiveKey="oi"
        id="uncontrolled-tab-example"
        className="scanner-tab"
        
      >
        <Tab eventKey="oi" title="Open Interest">
         <Change className="tab-content" instrumentList={instrumentList}></Change>
        </Tab>
        <Tab eventKey="maxpain" title="Max Pain">
        <MaxPain className="tab-content" instrumentList={instrumentList}></MaxPain>
        </Tab>
        <Tab eventKey="optionchain" title="Option Chain Data">
          <Exp className="tab-content" instrumentList={instrumentList}></Exp>
        </Tab>
        <Tab eventKey="greek" title="Greek Data">
          <Greek className="tab-content" instrumentList={instrumentList}></Greek>
          </Tab>
      </Tabs>

      </div>
    )
}


export default Scanner