import React, { useState ,useEffect} from 'react';
import axios from 'axios';

const Watchlist = ({ onSelectInstrument , selectInstrument }) => {
  const [selectedInstrument, setSelectedInstrument] = useState('Nifty 50');
  const [instrumentNames, setInstrumentNames] = useState([]);

  const handleInstrumentChange = (instrument) => {
    setSelectedInstrument(instrument);
    onSelectInstrument(instrument);
  };

  const handleSetInstrument = () => {
    selectInstrument(selectedInstrument);
    
  };


  useEffect(() => {
    const fetchInstrumentNames = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/instruments');
        setInstrumentNames(response.data.instrumentNames);
        console.log(response.data.instrumentNames)
      } catch (error) {
        console.error('Error fetching instrument names:', error);
      }
    };

    fetchInstrumentNames();
  }, []);


  return (
    <div>
      <select
        value={selectedInstrument}
        onChange={(e) => handleInstrumentChange(e.target.value)}
        style={{

            width: '100%',
          }}
      >
        {instrumentNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
        {/* <option value="" disabled>Select an instrument</option>
        <option value="Nifty 50">NIFTY 50</option>
        <option value="Nifty Bank">BANKNIFTY</option>
        <option value="Nifty Fin Service">FINNIFTY</option>
        <option value="Nifty IT">NIFTY IT</option>
        <option value="Nifty Midcap 50">NIFTY MIDCAP50</option> */}
        {/* Add more instrument options as needed */}
      </select>
      {/* <button onClick={handleSetInstrument}>Set Instrument</button> */}
    </div>
  );
};

export default Watchlist;
