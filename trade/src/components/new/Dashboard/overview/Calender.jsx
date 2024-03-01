import React from 'react';
import './Calender.css'

const Calender = () => {
  return (
    <div className='eco-calender'
     style={{
            width:'100%',
            height: '100%',
          }}
    >
      {/* <iframe
        src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&category=_employment,_economicActivity,_inflation,_centralBanks&importance=3&features=datepicker,timezone&countries=14,5&calType=week&timeZone=23&lang=56"
        width="100%"
        height="100%"
        frameBorder="0"
        allowTransparency="true"
        marginWidth="0"
        marginHeight="0"
        
      ></iframe> */}
   

    <iframe src="https://widget.myfxbook.com/widget/calendar.html?lang=en&impacts=0,1,2,3&countries=India"style={{width:'100%' , height:'100%'}} ></iframe>
  {/* <div style={{ width: 'fit-content', margin: 'auto', fontFamily: 'roboto, sans-serif', fontSize: '13px', color: '#666666' }}>
    <a href="https://www.myfxbook.com/forex-economic-calendar?utm_source=widget13&utm_medium=link&utm_campaign=copyright" title="Economic Calendar" className="myfxbookLink" target="_blank" rel="noopener noreferrer" style={{ color: '#666666' }}>
      <b>Economic Calendar</b>
    </a> by Myfxbook.com
  </div> */}


    </div>
  );
};

export default Calender;
