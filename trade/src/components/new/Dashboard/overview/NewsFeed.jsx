import React, { useEffect } from 'react';

const NewsFeed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.innerHTML = JSON.stringify({
      "feedMode": "all_symbols",
      "colorTheme": "light",
      "isTransparent": false,
      "displayMode": "regular",
      "width":'100%',
      "height": '100%',
      "locale": "en"
    });
  
    const parentElement = document.getElementById('tradingview-timeline-container');
    if (parentElement) {
      parentElement.appendChild(script);
  
      return () => {
        parentElement.removeChild(script);
      };
    }
  }, []);
  
  return (
    <div id="tradingview-timeline-container" className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        {/* <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a> */}
      </div>
    </div>
  );
};

export default NewsFeed;
