import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
  // Import your date formatting function

const tableDownload = ({ currentTrades }) => {
  
  const headers = [
    { label: "Trade", key: "tradeNumber" },
    { label: "Date", key: "date" },
    { label: "Sentiment", key: "day_type" },
    { label: "Signal Type", key: "signalType" },
    { label: "Symbol", key: "symbol" },
    { label: "Price", key: "price" },
    { label: "Stoploss", key: "stopLossprice" },
    { label: "Trailing Sl", key: "trailingSl" },
    { label: "Target", key: "targetPrice" },
    { label: "PnL", key: "pnl" },
    { label: "Cumulative Pnl", key: "cumulativePnL" },
    { label: "Action", key: "action" },
    { label: "Quantity", key: "quantity" },
    { label: "Trigger", key: "trigger" }
  ];

  const csvData = currentTrades.map(trade => ({
    tradeNumber: trade.tradeNumber,
    date: trade.date,
    day_type: trade.day_type,
    signalType: trade.signalType,
    symbol: trade.symbol,
    price: trade.price.toFixed(2),
    stopLossprice: trade.stopLossprice !== undefined ? trade.stopLossprice.toFixed(2) : '0',
    trailingSl: trade.trailingSl !== undefined ? trade.trailingSl.toFixed(2) : '0',
    targetPrice: trade.targetPrice.toFixed(2),
    pnl: trade.pnl ? `₹ ${trade.pnl.toFixed(2)}` : '',
    cumulativePnL: trade.cumulativePnL !== undefined ? `₹ ${trade.cumulativePnL.toFixed(2)}` : '',
    action: trade.action,
    quantity: trade.quantity,
    trigger: trade.trigger
  }));

  return (
    <div>
        <div>
        yahoo
        </div>

      {/* <button>
        <CSVLink data={csvData} headers={headers} filename="trades.csv">
          Download CSV
        </CSVLink>
      </button> */}

      </div>
  );
};

export default tableDownload;