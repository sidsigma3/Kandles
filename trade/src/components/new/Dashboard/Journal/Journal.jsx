import React, { useState } from 'react';

function Journal() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    entryDate:'',
    symbol: '',
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prevEntry => ({
      ...prevEntry,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries(prevEntries => [...prevEntries, newEntry]);
    // Clear the form
    setNewEntry({
      symbol: '',
      entryPrice: '',
      exitPrice: '',
      quantity: '',
      notes: '',
      stoploss:'',
      takeProfit:'',
      strategy:'',
      pnl:'',
      rewardRisk:'',


    });
  };

  return (
    <div className="journal d-flex justify-content-between bg-light p-2 h-100">
        <div className='w-25 bg-white p-2'>
      <h2 className="mb-4">Add New Journal Entry</h2>
      <form onSubmit={handleSubmit} className="mb-5">
        
      <div className="mb-3">
        
        <input 
          type="date" 
          className="form-control" 
          id="entryDate" 
          name="entryDate"
          value={newEntry.date}
          onChange={handleChange}
        />
      </div>

        <div className="mb-3">
          <input className="form-control" name="symbol" value={newEntry.symbol} onChange={handleChange} placeholder="Instrument" />
        </div>
        <div className="mb-3">
          <input className="form-control" name="entryPrice" type="number" value={newEntry.entryPrice} onChange={handleChange} placeholder="Entry Price" />
        </div>
        <div className="mb-3">
          <input className="form-control" name="exitPrice" type="number" value={newEntry.exitPrice} onChange={handleChange} placeholder="Exit Price" />
        </div>
        <div className="mb-3">
          <input className="form-control" name="quantity" type="number" value={newEntry.quantity} onChange={handleChange} placeholder="Quantity" />
        </div>

        <div className="mb-3">
          <input className="form-control" name="rewardRisk" type="number" value={newEntry.rewardRisk} onChange={handleChange} placeholder="Risk / Reward" />
        </div>

        <div className="mb-3">
          <input className="form-control" name="stoploss" type="number" value={newEntry.stoploss} onChange={handleChange} placeholder="Stoploss" />
        </div>

        <div className="mb-3">
          <input className="form-control" name="takeProfit" type="number" value={newEntry.takeProfit} onChange={handleChange} placeholder="Take Profit" />
        </div>

        <div className="mb-3">
          <input className="form-control" name="pnl" type="number" value={newEntry.pnl} onChange={handleChange} placeholder="PnL" />
        </div>

        <div className="mb-3">
          <input className="form-control" name="strategy" value={newEntry.strategy} onChange={handleChange} placeholder="Strategy" />
        </div>


        <div className="mb-3">
          <textarea className="form-control" name="notes" value={newEntry.notes} onChange={handleChange} placeholder="Notes"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Entry</button>
      </form>
      </div>

      <div className='w-75 m-2 p-2'>
      <h2 className="mb-4">Journal Entries</h2>
    <div className='bg-white'>
        <table className='table table-hover'>
            <thead className='thead-dark'>
            <tr>
                <th scope='col'>#</th>
                <th scope='col'>Entry Date</th>
                <th scope='col'>Symbol</th>
                <th scope='col'>Entry Price</th>
                <th scope='col'>Exit Price</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Risk/Reward</th>
                <th scope='col'>Stop Loss</th>
                <th scope='col'>Take Profit</th>
                <th scope='col'>Pnl</th>
                <th scope='col'>Strategy</th>
                <th scope='col'>Notes</th>
            </tr>
            </thead>
            {entries.map((entry,index)=>(
                <tbody>
                <tr>
                    <th scope='row'>{index+1}</th>
                    <td>{entry.entryDate}</td>
                    <td>{entry.symbol}</td>
                    <td>{entry.entryPrice}</td>
                    <td>{entry.exitPrice}</td>
                    <td>{entry.quantity}</td>
                    <td>{entry.rewardRisk}</td>
                    <td>{entry.stoploss}</td>
                    <td>{entry.takeProfit}</td>
                    <td>{entry.pnl}</td>
                    <td>{entry.strategy}</td>
                    <td>{entry.notes}</td>
                </tr>
                </tbody>
            ))}
        </table>
    </div>
     
     
      {/* <div>
        {entries.map((entry, index) => (
          <div key={index} className="mb-4 p-3 border rounded d-flex justify-content-between bg-white">
             <p><strong>Entry Date:</strong> {entry.entryDate}</p>
            <p><strong>Symbol:</strong> {entry.symbol}</p>
            <p><strong>Entry Price:</strong> {entry.entryPrice}</p>
            <p><strong>Exit Price:</strong> {entry.exitPrice}</p>
            <p><strong>Quantity:</strong> {entry.quantity}</p>
            <p><strong>Risk/Reward:</strong> {entry.rewardRisk}</p>
            <p><strong>Stop Loss:</strong> {entry.stoploss}</p>
            <p><strong>Take Profit:</strong> {entry.takeProfit}</p>
            <p><strong>PnL:</strong> {entry.pnl}</p>
            <p><strong>Strategy:</strong> {entry.strategy}</p>
            <p><strong>Notes:</strong> {entry.notes}</p>
          </div>
        ))}
      </div> */}
      </div>
    </div>
  );
}

export default Journal;
