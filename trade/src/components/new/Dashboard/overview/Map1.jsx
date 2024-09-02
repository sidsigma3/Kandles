import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const Map1 = ({ indices }) => {
  const [price, setPrice] = useState();
  const [change, setChange] = useState();
  const [priceChange,setPriceChange] = useState()

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    // Listen for updates from the WebSocket
    socket.on('marketDataUpdate', (data) => {
      // Handle the received data
     
      if (data.indices === indices) {
        // Check if the symbol matches the selected instrument
        // Update state with new data
        setPrice(data.lastPrice.toFixed(2));
        setChange(data.percentageChange.toFixed(2));
        setPriceChange(data.priceChange.toFixed(2))
      }
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    axios
      .post('http://localhost:5000/getlastPrice', { indices })
      .then((res) => {
       
        setPrice(res.data.lastPrice.toFixed(2));
        setChange(res.data.change.toFixed(2));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Define a function to determine the color based on the price movement
  const getPriceColor = () => {
    return change >= 0 ? 'green' : 'red';
  };

  return (
    <div>
      <h5>{indices}</h5>
      <h5 style={{ color: getPriceColor() }}>{price}</h5>
      <h5 style={{ color: getPriceColor() }}>{priceChange}</h5>
      <h5 style={{ color: getPriceColor() }}>{change+'%'}</h5>
    </div>
  );
};

export default Map1;
