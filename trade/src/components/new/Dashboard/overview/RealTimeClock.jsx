import React, { useState, useEffect } from 'react';

const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className='d-flex flex-row '>
     
      <p className='fs-5 border-end me-2 pe-2 border-4'>{currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} </p>
      <p className='fs-5'>{currentTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default RealTimeClock;
