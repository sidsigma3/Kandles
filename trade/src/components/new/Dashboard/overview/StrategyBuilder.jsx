import React, { useState } from 'react';
import Select from 'react-select';
import { Modal, Button, Form ,FormLabel, FormControl, FormGroup, FormCheck, FormSelect } from 'react-bootstrap';
import makeAnimated from 'react-select/animated';
const StrategyBuilder = () => {
  
    const [parameters, setParameters] = useState({ period: '', offset: '' });
    const [strategy, setStrategy] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [period, setPeriod] = useState('');
    const [offset, setOffset] = useState('');
    const [finalSelections, setFinalSelections] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedIndicator, setSelectedIndicator] = useState({});
        
    const animatedComponents = makeAnimated()
    
    const handleIndicatorChange = (options) => {
        setSelectedOptions(options); // Update state with currently selected options
        if (options.length > 0) { // Add this check to ensure options array is not empty
            const latestOption = options[options.length - 1]; // Assuming the latest selected option is at the end
            const category = groupedOptions.find(group => group.options.some(option => option.value === latestOption.value));
            if (category && category.label === 'Indicators') {
                setSelectedIndicator(latestOption);
                setModalIsOpen(true);
            } else {
                // For non-indicators, add directly to final selections
                setFinalSelections([...finalSelections, latestOption]);
            }
        } else {
            // Handle the case when all options are removed (e.g., reset selectedIndicator)
            setSelectedIndicator({}); // This might need adjustment based on your logic
        }
    };
    
      
        const handleModalSubmit = () => {
          const newSelection = {
            label: `Period: ${period}, Offset: ${offset}`,
            period,
            offset,
          };
          setFinalSelections([...finalSelections, newSelection]);
          setModalIsOpen(false); // Close the modal
          setPeriod(''); // Reset period input
          setOffset(''); // Reset offset input
        };

        const groupedOptions = [
          {
            label: 'Indicators',
            options: [
              { value: 'rsi', label: 'RSI' },
              { value: 'macd', label: 'MACD' },
              // add more indicators here
            ],
          },
          {
            label: 'Math Functions',
            options: [
              { value: 'add', label: 'Add' },
              { value: 'subtract', label: 'Subtract' },
              // add more math functions here
            ],
          },
          {
            label: 'Operators',
            options: [
              { value: 'greaterThan', label: 'Greater Than' },
              { value: 'lessThan', label: 'Less Than' },
              // add more operators here
            ],
          },
        ];

        const formatGroupLabel = (group) => (
          <div style={{ fontWeight: 'bold' }}>
            {group.label}
          </div>
        );
    


  return (
    <div>
             <div>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={groupedOptions}
        onChange={handleIndicatorChange}
        isMulti
      />
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Indicator Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input 
            type="text" 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)} 
            placeholder="Period" 
          />
          <input 
            type="text" 
            value={offset} 
            onChange={(e) => setOffset(e.target.value)} 
            placeholder="Offset" 
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Close</Button>
          <Button variant="primary" onClick={handleModalSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
      {/* <ul>
        {finalSelections.map((selection, index) => (
          <li key={index}>{selection.label}</li>
        ))}
      </ul> */}
    </div>


      
    </div>
  );
};

export default StrategyBuilder;