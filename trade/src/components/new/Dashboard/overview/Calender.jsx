import React from 'react';

const Calender = () => {
  return (
    <div 
     style={{
     
            height: '100%',
          }}
    >
      <iframe
        src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&category=_employment,_economicActivity,_inflation,_centralBanks&importance=3&features=datepicker,timezone&countries=14,5&calType=week&timeZone=23&lang=56"
        width="100%"
        height="100%"
        frameBorder="0"
        allowTransparency="true"
        marginWidth="0"
        marginHeight="0"
        
      ></iframe>
    </div>
  );
};

export default Calender;
