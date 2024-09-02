import React from 'react'
import { useEffect } from 'react';
import './Order.css'

const Order = ({ trades ,setTrades }) => {

    useEffect(() => {
        // Fetch trades from local storage when the component mounts
        const storedTrades = JSON.parse(localStorage.getItem('Trades'));
        setTrades(storedTrades);
      }, []);


  return (
    <div className='order'>
         <table className="order-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Type</th>
          <th>Instrument</th>
          <th>Product</th>
          <th>Qty</th>
          <th>Avg Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {trades && trades.map((order, index) => (
          <tr key={index}>
          <td>{order.time.toLocaleString()}</td>
          <td style={{ color: order.type === 'BUY' ? '#0074B7' : 'orange' }}>{order.type}</td>
          <td>{order.symbol}</td>
          <td>{order.pro}</td>
          <td>{order.quantity}</td>
          <td>{order.optionPrice}</td>
          <td style={{ color: order.status === 'completed' ? 'green' : 'inherit' }}>{order.status}</td>
        </tr>
        ))}
      </tbody>
    </table>
    <img src="https://logo.clearbit.com/ADANIPORTS.com" ></img>



    </div>
  )
}

export default Order