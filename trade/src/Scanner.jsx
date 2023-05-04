import React, { Component } from 'react';
import {Dropdown,Tab,Tabs} from 'react-bootstrap';
import MaxPain from './MaxPain';
import Change from './Change';
import Exp from './Exp';
import Greek from './Greek';
function Scanner(){


    return(
        <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="oi" title="Open Interest">
         <Change></Change>
        </Tab>
        <Tab eventKey="maxpain" title="Max Pain">
        <MaxPain></MaxPain>
        </Tab>
        <Tab eventKey="optionchain" title="Option Chain Data">
          <Exp></Exp>
        </Tab>
        <Tab eventKey="greek" title="Greek Data">
          <Greek></Greek>
          </Tab>
      </Tabs>


    )
}


export default Scanner