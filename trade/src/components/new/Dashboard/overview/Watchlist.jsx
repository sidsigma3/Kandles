import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { FixedSizeList as List } from 'react-window';
import Autosuggest from 'react-autosuggest';
import './Watchlist.css'

const Watchlist = ({ onSelectInstrument , selectInstrument }) => {
  const [selectedInstrument, setSelectedInstrument] = useState('Nifty 50');
  const [instrumentNames, setInstrumentNames] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState([]);


  const handleInstrumentChange = (instrument) => {
    setSelectedInstrument(instrument);
    onSelectInstrument(instrument);
  };


  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
  
    setSearchTerm(term);
  
    const filtered = instrumentNames.filter(
      (instrument) =>
        instrument.name.toLowerCase().includes(term) ||
        instrument.instrument_key.toLowerCase().includes(term)
    );
  
    setFilteredNames(filtered);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : instrumentNames.filter(
          (instrument) =>
            instrument.name.toLowerCase().includes(inputValue) ||
            instrument.instrument_key.toLowerCase().includes(inputValue)
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.name}
    </div>
  );

  const onSuggestionsFetchRequested = ({ value }) => {
    setFilteredNames(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setFilteredNames([]);
  };

  const onChange = (event, { newValue }) => {
    setSelectedInstrument(newValue);
  };

  const handleSetInstrument = () => {
    if (selectedInstrument) {
      selectInstrument(selectedInstrument);
      setWatchlist([...watchlist, selectedInstrument]);
      setSelectedInstrument('');
    }
  };

  const handleClearWatchlist = () => {
    setWatchlist([]);

  };



  const handleSuggestionSelected = (_, { suggestion }) => {
    console.log(suggestion)
    onSelectInstrument(suggestion)
    // selectInstrument(suggestion.instrument_key)
    console.log(suggestion)

   
  };

 
  useEffect(() => {

    const cachedInstruments = localStorage.getItem('instrumentNames')

    if (cachedInstruments) {
      setInstrumentNames(JSON.parse(cachedInstruments))
    }

    else{
    const fetchInstrumentNames = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/instruments');
        setInstrumentNames(response.data.instrumentNames);
        console.log(response.data.instrumentNames)
        localStorage.setItem('instrumentNames',JSON.stringify(response.data.instrumentNames))
        console.log('achha')
      } catch (error) {
        console.error('Error fetching instrument names:', error);
      }
    };

    fetchInstrumentNames();
  }

  }, []);




  return (

    <div className='watchlist'>
    <Autosuggest
      suggestions={filteredNames}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{
        placeholder: 'Search instrument names',
        value: searchTerm,
        onChange: (e, { newValue }) => setSearchTerm(newValue),
        style: {
          width: '100%', // Set the width to 100% to fill the available space
      
        },
      }}
      onSuggestionSelected={handleSuggestionSelected}
    />
     {/* <button onClick={handleSetInstrument}>Add to Watchlist</button>
      <button onClick={handleClearWatchlist}>Clear Watchlist</button>
      <ul>
        {watchlist.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}
   
  </div>


    // <div>
    //   <input
    //     type="text"
    //     placeholder="Search instrument names"
    //     value={searchTerm}
    //     onChange={handleSearch}
    //   />
    //   <select>
    //     {filteredNames.map((name, index) => (
    //       <option key={index} value={name}>
    //         {name}
    //       </option>
    //     ))}
    //   </select>
    // </div>
    // <div>
    //   <select
    //     value={selectedInstrument}
    //     onChange={(e) => handleInstrumentChange(e.target.value)}
    //     style={{

    //         width: '100%',
    //       }}
    //   >
    //     {/* {instrumentNames.map((name,index,) => (
    //       <option key={index} value={name}>
    //         {name}
    //       </option>
    //     ))} */}
    //     <option value="" disabled>Select an instrument</option>
    //     <option value="Nifty 50">NIFTY 50</option>
    //     <option value="Nifty Bank">BANKNIFTY</option>
    //     <option value="Nifty Fin Service">FINNIFTY</option>
    //     <option value="Nifty IT">NIFTY IT</option>
    //     <option value="Nifty Midcap 50">NIFTY MIDCAP50</option>
      
    //   </select>
    //   {/* <button onClick={handleSetInstrument}>Set Instrument</button> */}
    // </div>
  );
};

export default Watchlist;
