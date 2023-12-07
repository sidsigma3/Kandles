import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const Map1 = ({ indices }) => {
  const [price, setPrice] = useState();
  const [change, setChange] = useState();

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    // Listen for updates from the WebSocket
    socket.on('marketDataUpdate', (data) => {
      // Handle the received data
      console.log('Received market data update:', data);
      if (data.indices === indices) {
        // Check if the symbol matches the selected instrument
        // Update state with new data
        setPrice(data.lastPrice.toFixed(2));
        setChange(data.change.toFixed(2));
      }
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log('Fetching initial data');
    axios
      .post('http://localhost:5000/getlastPrice', { indices })
      .then((res) => {
        console.log(res);
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
      <h4 style={{ color: getPriceColor() }}>{price}</h4>
      <h5>{change}</h5>
    </div>
  );
};

export default Map1;
