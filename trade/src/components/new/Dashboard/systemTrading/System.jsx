import React ,{useState} from 'react'
import './System.css'
import Calender from '../overview/Calender'
import { Button, Modal, Form, FormGroup, FormSelect, FormLabel, FormControl, FormCheck } from 'react-bootstrap';
const System = () => {

    const [accountType, setAccountType] = useState('live')
    const [activeTab, setActiveTab] = useState('Position');
    const [activeWatchTabs,setActiveWatchTabs] = useState('indices')

    const [selectedPattern, setSelectedPattern] = useState('');
    const [selectedInterval, setSelectedInterval] = useState('');
    const [hoveredRow, setHoveredRow] = useState(null);
    const [product,setProduct] = useState() 
    const [orderType,setOrderType] = useState()
    const [quantity,setQuantity]=useState()
    const [stopLoss,setStoploss] = useState()
    const [alertData,setAlertData] = useState([])

    const [showFeatures, setShowFeatures] = useState(false);

    const dataset = [
        { id: 1, product: 'Nifty 50', LTP: 22000, change: 123, changePercent: 0.32, sell: 456, buy: 876, interval: '15 Min', trend: 'Bullish', pattern: 'Wedge', stars: '*****' },
        { id: 2, product: 'Bank Nifty', LTP: 46000, change: 156, changePercent: 1.5, sell: 651, buy: 364, interval: '1 Hour', trend: 'Bearish', pattern: 'Triangle', stars: '****' },
        { id: 3, product: 'Midcap 50', LTP: 14062, change: 75, changePercent: 0.45, sell: 325, buy: 154, interval: '1 Day', trend: 'Bullish', pattern: 'Head and Shoulders', stars: '*****' },
        { id: 4, product: 'FINNIFTY', LTP: 20677, change: 32, changePercent: 0.15, sell: 871, buy: 716, interval: '15 Min', trend: 'Bullish', pattern: 'Triangle', stars: '*****' },
        { id: 5, product: 'Nifty IT', LTP: 38045, change: 89, changePercent: 0.39, sell: 320, buy: 537, interval: '1 Day', trend: 'Bullish', pattern: 'Wedge', stars: '*****' },
        { id: 6, product: 'Nifty Pharma', LTP: 19048, change: 423, changePercent: 1.13, sell: 451, buy: 741, interval: '1 Hour', trend: 'Bullish', pattern: 'Head and Shoulders', stars: '*****' },
        { id: 7, product: 'Nifty PSE', LTP: 9318, change: 64, changePercent: 0.42, sell: 693, buy: 456, interval: '1 Day', trend: 'Bullish', pattern: 'Wedge', stars: '*****' },
        { id: 8, product: 'Nifty Auto', LTP: 20621, change: 321, changePercent: 1.2, sell: 246, buy: 654, interval: '15 Min', trend: 'Bullish', pattern: 'Wedge', stars: '*****' },
        // Add more rows as needed
    ];

    const defaultGraphs = [
        { id: 1, name: 'Nifty 50', src: 'path/to/default/graph1.png' },
       
        // Add more default graphs as needed
      ];

    const newsData = [

        {
            Date:'12-Feb-2024',
            news: "Paytm stock erases early losses; rises 5% to hit upper circuit",
            stockImpacted: "Paytm",
            degreeOfImpact: "High",
            detailAnalysis: "/analysis/tech-giant-quantum-computing"
        },
        
        {
            Date:'12-Feb-2024',
            news: "LIC shares rise 2% after receiving Rs 21,740-crore refund",
            stockImpacted: "LIC",
            degreeOfImpact: "Moderate",
            detailAnalysis: "/analysis/tech-giant-quantum-computing"
        },
        {
            Date:'12-Feb-2024',
            news: "India's Federal Bank sinks 6% after CEO candidate extends stay at Kotak",
            stockImpacted: "Fedral Bank",
            degreeOfImpact: "High",
            detailAnalysis: "/analysis/tech-giant-quantum-computing"
        },

        {
            Date:'12-Feb-2024',
            news: "LTIMindtree Launches AI-Powered Procurement Platform",
            stockImpacted: "LTIM",
            degreeOfImpact: "High",
            detailAnalysis: "/analysis/tech-giant-quantum-computing"
        },
        {
            Date:'12-Feb-2024',
            news: "Tech Giant Announces Breakthrough in Quantum Computing",
            stockImpacted: "Tech Innovators Inc.",
            degreeOfImpact: "High",
            detailAnalysis: "/analysis/tech-giant-quantum-computing"
        },
        {
            Date:'12-Feb-2024',
            news: "Major Oil Spill Reported Off the Coast of Country X",
            stockImpacted: "Global Oil Corp.",
            degreeOfImpact: "Moderate",
            detailAnalysis: "/analysis/major-oil-spill"
        },
        {
            Date:'12-Feb-2024',
            news: "Global E-Commerce Platform Expands into New Market",
            stockImpacted: "E-Shop World",
            degreeOfImpact: "High",
            detailAnalysis: "/analysis/e-commerce-expansion"
        },
        // Add more entries as needed...
    ];

    const filteredData = dataset.filter(item => {
        return (selectedPattern ? item.pattern === selectedPattern : true) &&
               (selectedInterval ? item.interval === selectedInterval : true);
    });

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };


    const handleWatchtabClick = (tabName) => {
        setActiveWatchTabs(tabName)
    }


    const handleProductChange = (e) => {
        setProduct(e.target.value);
        localStorage.setItem('product', e.target.value); 
      };

      const handleOrderTypeChange = (e) => {
        setOrderType(e.target.value);
        localStorage.setItem('orderType',e.target.value); 
      };


      const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
        localStorage.setItem('quantity', e.target.value); 
      };




    const [showModal, setShowModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        id: null,
        action: '',
        stopLoss: '',
        target: '',
        unit: 'percentage',
    });

    const handleBuy = (id) => {
        setOrderDetails({ ...orderDetails, id, action: 'buy' });
        setShowModal(true);
    };

    const handleSell = (id) => {
        setOrderDetails({ ...orderDetails, id, action: 'sell' });
        setShowModal(true);
    };

    const handleCancel = (index) => {
        const updatedAlertData = alertData.filter((item,itemIndex) => itemIndex !== index);
        setAlertData(updatedAlertData);
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        console.log('Placing order:', orderDetails);
        setShowModal(false);
        // Implement your order processing logic here
    };
   

    const handleAlert = (id) =>{
        const product = filteredData.find(item => item.id === id);
        if (!product) return; // Product not found
    
        const newAlert = {
            
            product: product.product,
            // Example: use last traded price as the alert price
            expires: "2023-12-31", // Example: set a fixed expiry date
            triggered: false, // Initial state
            sell: product.sell,
            buy: product.buy,
        };
    
        setAlertData([...alertData, newAlert]);
    }


    const [openedGraphs, setOpenedGraphs] = useState([...defaultGraphs]);
    const [activeGraph, setActiveGraph] = useState(openedGraphs[0]?.id || null);

    // Mapping graph IDs to image paths
    const graphImages = {
        1: './overview.png',
        2: './overview-1.png',
        3: './overview-2.png',
        4: './overview-3.png',
        5: './overview-4.png',
        6: './overview-5.png',
        7: './overview-6.png',
        // Add more mappings as necessary
    };

    const handleOpenGraph = (id,name) => {
        setOpenedGraphs(prev => prev.includes(id) ? prev : [...prev, {id,name}]);
        setActiveGraph(id);
    };

    const handleCloseGraph = (id) => {
        setOpenedGraphs(prev => prev.filter(graphId => graphId.id !== id));
        if (activeGraph === id) {
            setActiveGraph(openedGraphs[0] || null);
        }
    };

    // Placeholder data for demonstration
    const filteredDataGraph = [
        { id: 'graph1', product: 'Product 1' },
        { id: 'graph2', product: 'Product 2' },
        // Add more items as needed
    ];

    const [isRiskModeOn, setIsRiskModeOn] = useState(false);

    const handleRiskModeChange = (e) => {
        // Allow manual toggling only if the account is not "Funded"
        if (accountType !== 'funded') {
            setIsRiskModeOn(e.target.checked);
        }
    };

    const handleAccountTypeChange = (e) => {
        const selectedAccountType = e.currentTarget.value;
        setAccountType(selectedAccountType);
    
        // Automatically turn on Risk Mode for "Funded" accounts, and off for others
        setIsRiskModeOn(selectedAccountType === 'funded');
    };

  return (
    <div className='system'>

                <div className='acc-change d-flex justify-content-between'>
                    <select value={accountType} onChange={handleAccountTypeChange} className="form-select bg-primary" style={{ backgroundColor: '#60A3D9' ,color:'white'}}>
                        <option value="demo">Demo Account</option>
                        <option value="personal">Live Account (Personal Funds)</option>
                        <option value="funded">Live Account (Funded)</option>
                    </select>
                    
                   {/* {activeWatchTabs==='Demo' : <h3>Account Value: 154 Rs</h3>} */}
                    
                    <div  className='d-flex w-25 justify-content-around'>
                    <h4>Capital: 7800</h4>
                    
                    {/* <h5>Cash: 7800 </h5> */}

                    <h5>Profit: 455</h5>

                    </div>
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header  closeButton style={{ backgroundColor: orderDetails.action === 'buy' ? 'blue' : 'orange', color:orderDetails.action==='buy'? 'white':'black', }}>
        <Modal.Title>{orderDetails.action.toUpperCase()} Order</Modal.Title>
        {/* <Button 
            onClick={() => setOrderDetails({ ...orderDetails, action: orderDetails.action === 'buy' ? 'sell' : 'buy' })}
            variant={orderDetails.action === 'buy' ? 'warning' : 'primary'} 
            style={{ marginLeft: 'auto' }}> 
            Switch to {orderDetails.action === 'buy' ? 'Sell' : 'Buy'}
        </Button> */}
        <Form.Check // prettier-ignore
         onClick={() => setOrderDetails({ ...orderDetails, action: orderDetails.action === 'buy' ? 'sell' : 'buy' })}
        type="switch"
        id="custom-switch"
        label="Swap"
        style={{ marginLeft: 200, alignSelf: 'center' }}
      />
    </Modal.Header>

                <Modal.Body className='p-4'>
               
    
                    <Form onSubmit={handlePlaceOrder}>

                        <div className='d-flex w-100 justify-content-around' >

                        <Form.Group className="mb-3">
                            <Form.Label>Product</Form.Label>
                            <FormSelect value={product} onChange={(e) => setProduct(e.target.value)}>
                            <option value="default">--select--</option>
                                        <option value="MARKET">Market</option>
                                        <option value="LIMIT">Limit</option>
                                        <option value="SL">SL</option>
                                        <option value="SL-M">SL-M</option>

                            </FormSelect>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Order</Form.Label>
                            <FormSelect value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                                    <option value="default">--select--</option>
                                    <option value="MIS">Intraday</option>
                                    <option value="CNC">Longterm</option>

                            </FormSelect>
                        </Form.Group>

                        </div>

                            <div className='d-flex justify-content-around'>

                                 
                        <Form.Group className="mb-3 w-25">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </Form.Group>

                         
                        <Form.Group className="mb-3 w-25">
                            <Form.Label>Capital Risk Per Day</Form.Label>
                            <Form.Control type="number"  onChange={(e) => setOrderDetails({ ...orderDetails, stopLoss: e.target.value })} />
                        </Form.Group>

                              </div>



                              <div className='d-flex justify-content-around mb-3'>

                                 
                                <Form.Group className="mb-3 w-25">
                                    <Form.Label>Stopl Loss</Form.Label>
                                    <Form.Control type="number" value={stopLoss} onChange={(e) => setStoploss(e.target.value)} />
                                </Form.Group>

                                
                                <Form.Group className="mb-3 w-25">
                                    <Form.Label>Target</Form.Label>
                                    <Form.Control type="number"  onChange={(e) => setOrderDetails({ ...orderDetails, stopLoss: e.target.value })} />
                                </Form.Group>

                                    </div>

                                    {/* <Button className='mb-4' variant="secondary" onClick={() => setShowFeatures(!showFeatures)}>
                                        {showFeatures ? 'Hide Features' : 'Advanced Features'}
                                    </Button> */}

                                    <div 
                                        
                                        style={{ cursor: 'pointer', color: '#007bff' , margin:'20px' }} 
                                        onClick={() => setShowFeatures(!showFeatures)}
                                    >
                                        {showFeatures ? 'Advanced Features ▲' : 'Advanced Features ▼'}
                                    </div>


                                    {showFeatures && (
                                    <div className='fetures-sec'>

                                        <FormGroup className='fetures-inputs mb-3 d-flex justify-content-between row'>
                                            <FormLabel className='col'>Trailing StopLoss</FormLabel>
                                          <FormCheck className='col' type='checkbox'></FormCheck>
                                            <FormControl  className='col w-25' type='number'></FormControl>
                                        </FormGroup>

                                        <FormGroup className='row fetures-inputs mb-3 d-flex justify-content-between'>
                                            <FormLabel className='col'>Buy At Low</FormLabel>
                                          <FormCheck  className='col' type='checkbox'></FormCheck>
                                            <FormControl  className='col w-25' type='number'></FormControl>
                                        </FormGroup>


                                        <FormGroup className='row fetures-inputs mb-3 d-flex justify-content-between'>
                                            <FormLabel className='col'>Protect Profit</FormLabel>
                                          <FormCheck className='col' type='checkbox'></FormCheck>
                                            <FormControl  className='col w-25' type='number'></FormControl>
                                        </FormGroup>


                                        <FormGroup className='row fetures-inputs mb-3 d-flex justify-content-between'>
                                            <FormLabel className='col'>Incremental Buy</FormLabel>
                                          <FormCheck className='col' type='checkbox'></FormCheck>
                                            <FormControl  className='col w-25' type='number'></FormControl>
                                        </FormGroup>


                                        <FormGroup className='row fetures-inputs mb-3 d-flex justify-content-between'>
                                            <FormLabel className='col'>Timer Trade</FormLabel>
                                          <FormCheck className='col' type='checkbox'></FormCheck>
                                            <FormControl  className='col w-25' type='number'></FormControl>
                                        </FormGroup>

                                        <FormGroup className='row fetures-inputs mb-3 d-flex justify-content-between'>
                                            <FormLabel className='col'>Breakout Buy</FormLabel>
                                          <FormCheck className='col' type='checkbox'></FormCheck>
                                            <FormControl  className='col w-25' type='number'></FormControl>
                                        </FormGroup>

                                        <FormGroup className='row fetures-inputs mb-3 d-flex justify-content-between'>
                                            <FormLabel className='col'>Guaranteed Stoploss</FormLabel>
                                          <FormCheck className='col' type='checkbox'></FormCheck>
                                            <FormControl  className='col w-25' type='number'></FormControl>
                                        </FormGroup>
                                    </div>

                                )}
                      
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Target</Form.Label>
                            <Form.Control type="text" value={orderDetails.target} onChange={(e) => setOrderDetails({ ...orderDetails, target: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Unit</Form.Label>
                            <Form.Select value={orderDetails.unit} onChange={(e) => setOrderDetails({ ...orderDetails, unit: e.target.value })}>
                                <option value="percentage">Percentage</option>
                                <option value="points">Points</option>
                            </Form.Select>
                        </Form.Group> */}
                      
                    </Form>
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-between'>
                <Button variant="primary" type="submit">
                            Place Order
                        </Button>

                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        <div className='top'>
        <div className='watch-list'>
            <div className='search d-flex justify-content-between'>
               <div>
                <input placeholder='Search'></input>
                <button>Submit</button>
                </div>

                <div >

                <Form.Check
    type="switch"
    id="custom-switch"
    label="Risk Mode"
    onChange={handleRiskModeChange}
    checked={isRiskModeOn}
    disabled={accountType === 'funded'} // Disables manual toggling for "Funded" accounts
    className='risk-switch'
/>

                </div>
                


            </div>
            <div className='watch-tabs'>
                    <button  className={activeWatchTabs === 'indices' ? 'selected' : ''} onClick={() => handleWatchtabClick('indices')}>Indices</button>
                    <button  className={activeWatchTabs === 'stocks' ? 'selected' : ''} onClick={() => handleWatchtabClick('stocks')}>Stocks</button>
                    <button  className={activeWatchTabs === 'customise' ? 'selected' : ''}  onClick={() => handleWatchtabClick('customise')}>Customise</button>
                    <button  className={activeWatchTabs === 'EcoCalender' ? 'selected' : ''} onClick={() => handleWatchtabClick('EcoCalender')}>Economic Calender</button>
                    <button  className={activeWatchTabs === 'news' ? 'selected' : ''} onClick={() => handleWatchtabClick('news')}>News</button>
                    {/* <button onClick={() => handleTabClick('History')}>History</button> */}

                    {/* <div className='filters'>
                    <select value={selectedInterval} onChange={e => setSelectedInterval(e.target.value)}>
                        <option value="">Interval</option>
                        <option value="15 Min">15 Minutes</option>
                        <option value="1 Hour">1 Hour</option>
                        <option value="1 Day">1 Day</option>
                        // Add more intervals as needed
                    </select>

                    <select value={selectedPattern} onChange={e => setSelectedPattern(e.target.value)}>
                        <option value="">Pattern</option>
                        <option value="Wedge">Wedge</option>
                        <option value="Triangle">Triangle</option>
                        <option value="Head and Shoulders">Head and Shoulders</option>
                        // Add more patterns as needed
                    </select>
                </div> */}
            </div>

            {activeWatchTabs === 'indices' && (
                <div className='watch-table'>
                
                <div className='unscrollable-columns table-container'>
                <table>
                    <tr>
                        <th>Product</th>
                        <th>LTP</th>
                        <th>Change</th>
                        <th>Change(%)</th>
                        <th className='sell'>Sell</th>
                        <th className='buy'>Buy</th>
                    </tr>


                    {
                        filteredData.map((item,index) => (
                            <tr 
                                key={item.id} 
                                className="table-row" 
                                onMouseEnter={() => setHoveredRow(index)} 
                                onMouseLeave={() => setHoveredRow(null)}
                            >
                                <td>{item.product}</td>
                                <td>{item.LTP}</td>
                                <td>{item.change}</td>
                                <td>{item.changePercent}</td>
                                <td>{item.sell}</td>
                                <td>{item.buy}</td>

                                { hoveredRow === index && (
                                    
                                        <div className="options-container">
                                            <button onClick={() => handleBuy(item.id)}>Buy</button>
                                            <button onClick={() => handleSell(item.id)}>Sell</button>
                                            <button onClick={() => handleOpenGraph(item.id,item.product)}>Graph</button>
                                            <button onClick={()=> handleAlert(item.id)}>Set Alert</button>
                                        </div>
                                   
                                )

                                }

                            </tr>
                        ))
                    }   
                       
                </table>    

                {/* {hoveredRow !== null && (
                     <div className="options-container" style={{ top: '10%', left: '10%', position: 'fixed' }}>
                        <button onClick={() => handleBuy(filteredData[hoveredRow].id)}>Buy</button>
                        <button onClick={() => handleSell(filteredData[hoveredRow].id)}>Sell</button>
                        <button onClick={() => handleOpenGraph(filteredData[hoveredRow].id)}>Graph</button>
                    </div>
                )} */}

                </div>
                <div className="scrollable-columns">
        <table>
           
            <thead>
                <tr>
                    <th> <select value={selectedInterval} onChange={e => setSelectedInterval(e.target.value)}>
                        <option value="">Interval</option>
                        <option value="15 Min">15 Minutes</option>
                        <option value="1 Hour">1 Hour</option>
                        <option value="1 Day">1 Day</option>
                        // Add more intervals as needed
                    </select></th>
                    <th>Trend</th>
                    <th> <select value={selectedPattern} onChange={e => setSelectedPattern(e.target.value)}>
                        <option value="">Pattern</option>
                        <option value="Wedge">Wedge</option>
                        <option value="Triangle">Triangle</option>
                        <option value="Head and Shoulders">Head and Shoulders</option>
                        // Add more patterns as needed
                    </select></th>
                    <th>Stars</th>
                </tr>
            </thead>
            <tbody>

                
            {
                        filteredData.map(item => (
                            <tr key={item.id}>                               
                                <td>{item.interval}</td> 
                                <td className={item.trend.toLowerCase().includes('bullish') ? 'bullish' : item.trend.toLowerCase().includes('bearish') ? 'bearish' : ''}>{item.trend}</td>
                                <td>{item.pattern}</td>
                                <td>{item.stars}</td>
                            </tr>
                        ))
                    }
            {/* <tr>
                <td>15 Minutes</td>
                <td>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            <tr>
                <td>15 Minutes</td>
                <td>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Minutes</td>
                <td>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Minutes</td>
                <td>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Minutes</td>
                <td>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Minutes</td>
                <td>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr> */}

            
            
            </tbody>
        </table>
    </div>
    </div>

            )}


{activeWatchTabs === 'stocks' && (
            <div className='watch-table'>

        <div className='unscrollable-columns'>
                <table>
                    <tr>
                        <th>Product</th>
                        <th>LTP</th>
                        <th>Change</th>
                        <th>Change(%)</th>
                        <th className='sell'>Sell</th>
                        <th className='buy'>Buy</th>
                    </tr>


                    <tr>
                        <td>Reliance</td>
                        <td>2987</td>
                        <td>123</td>
                        <td>0.8%</td>
                        <td>456</td>
                        <td>876</td>
                    </tr>

                    <tr>
                            <td>PAYTM <span style={{color: "red"}}>&#x25BC;</span></td>
                        <td>407</td>
                        <td>123</td>
                        <td>4.07%</td>
                        <td>421</td>
                        <td>756</td>
                    </tr>

                    <tr>
                        <td>HDFC Bank</td>
                        <td>1420</td>
                        <td>23</td>
                        <td>0.02%</td>
                        <td>42</td>
                        <td>76</td>
                    </tr>

                    <tr>
                        <td>Axis Bank</td>
                        <td>1096</td>
                        <td>12</td>
                        <td>-0.32%</td>
                        <td>42</td>
                        <td>86</td>
                    </tr>

                    <tr>
                        <td>TCS</td>
                        <td>4052</td>
                        <td>123</td>
                        <td>-0.82%</td>
                        <td>637</td>
                        <td>716</td>
                    </tr>

                    <tr>
                        <td>COAL INDIA</td>
                        <td>443</td>
                        <td>56</td>
                        <td>-0.28%</td>
                        <td>46</td>
                        <td>62</td>
                    </tr>


                    <tr>
                        <td>BAJAJFINSV</td>
                        <td>1616</td>
                        <td>45</td>
                        <td>1.52%</td>
                        <td>326</td>
                        <td>452</td>
                    </tr>
                </table>
                </div>
                <div className="scrollable-columns">
        <table>
           
            <thead>
                <tr>
                    <th>Interval</th>
                    <th>Trend</th>
                    <th>Pattern</th>
                    <th>Stars</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>15 Min</td>
                <td style={{color:'green'}}>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            <tr>
                <td>15 Min</td>
                <td style={{color:'green'}}>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            <tr>
                <td>15 Min</td>
                <td style={{color:'green'}}>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Min</td>
                <td style={{color:'green'}}>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Min</td>
                <td style={{color:'green'}}>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Min</td>
                <td style={{color:'green'}}>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Min</td>
                <td style={{color:'green'}}>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            
            </tbody>
        </table>
    </div>
    </div>

            )}

        {activeWatchTabs === 'customise' && (
                <div className='watch-table'>

            <div className='unscrollable-columns'>
                <table className='w-100'>
                    <tr>
                        <th>Product</th>
                        <th>LTP</th>
                        <th>Change</th>
                        <th>Change(%)</th>
                        <th className='sell'>Sell</th>
                        <th className='buy'>Buy</th>
                    </tr>


                    <tr>
                        <td>NIFTY 50</td>
                        <td>22000</td>
                        <td>123</td>
                        <td>0.32%</td>
                        <td>456</td>
                        <td>876</td>
                    </tr>

                    <tr>
                        <td>HDFC Bank</td>
                        <td>20000</td>
                        <td>123</td>
                        <td>0.32%</td>
                        <td>456</td>
                        <td>876</td>
                    </tr>

                    <tr>
                        <td>FIN NIFTY</td>
                        <td>46000</td>
                        <td>123</td>
                        <td>0.32%</td>
                        <td>456</td>
                        <td>876</td>
                    </tr>

                    <tr>
                        <td>TCS</td>
                        <td>21910</td>
                        <td>123</td>
                        <td>0.32%</td>
                        <td>456</td>
                        <td>876</td>
                    </tr>

                    <tr>
                        <td>Midcap 50</td>
                        <td>2500</td>
                        <td>122</td>
                        <td>0.32%</td>
                        <td>456</td>
                        <td>876</td>
                    </tr>


                    <tr>
                        <td>BAJAJFINSV</td>
                        <td>450</td>
                        <td>123</td>
                        <td>0.32%</td>
                        <td>456</td>
                        <td>876</td>
                    </tr>
                </table>
                </div>
                <div className="scrollable-columns">
        <table>
           
            <thead>
                <tr>
                    <th>Interval</th>
                    <th>Trend</th>
                    <th>Pattern</th>
                    <th>Stars</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>15 Min</td>
                <td style={{color:'green'}}>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            <tr>
                <td>15 Min</td>
                <td style={{color:'green'}} >Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Min</td>
                <td style={{color:'green'}}>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Min</td>
                <td style={{color:'green'}}>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Min</td>
                <td style={{color:'green'}}>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Min</td>
                <td style={{color:'green'}}>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            
            </tbody>
        </table>
    </div>
    </div>

            )}
  {activeWatchTabs === 'EcoCalender' && (
    <div className='calender'>
        <Calender></Calender>
    </div>
  )}

  {activeWatchTabs === 'news' && (
    <div className='news'>
        <table className='w-100 h-100'>
            <tr>
                <th>Date</th>
                <th>News</th>
                <th>Stock impacted</th>
                <th>Degree of Impact</th>
                <th>Detail Analysis</th>

            </tr>
            {newsData.map((item, index) => (
            <tr key={index}>
                <td>{item.Date}</td>
                <td>{item.news}</td>
                <td>{item.stockImpacted}</td>
                <td className={item.degreeOfImpact==='High'?'High': 'Moderate'}>{item.degreeOfImpact}</td>
                <td><a href={item.detailAnalysis} target="_blank" rel="noopener noreferrer">View Analysis</a></td>
            </tr>
        ))}

            
        </table>


    </div>
  )}


            {/* <div className='watch-table'>

             
                <table>
                    <tr>
                        <th>Product</th>
                        <th>LTP</th>
                        <th>Change</th>
                        <th>Change(%)</th>
                        <th className='sell'>Sell</th>
                        <th className='buy'>Buy</th>
                    </tr>


                    <tr>
                        <td>Nifty 50</td>
                        <td>22000</td>
                        <td>123</td>
                        <td>0.32%</td>
                        <td>456</td>
                        <td>876</td>
                    </tr>

                    <tr>
                        <td>Fin NIfty</td>
                        <td>20000</td>
                        <td>123</td>
                        <td>0.32%</td>
                        <td>456</td>
                        <td>876</td>
                    </tr>

                    <tr>
                        <td>Bank Nifty</td>
                        <td>46000</td>
                        <td>123</td>
                        <td>0.32%</td>
                        <td>456</td>
                        <td>876</td>
                    </tr>

                    <tr>
                        <td>Midcap Nifty 50</td>
                        <td>21910</td>
                        <td>123</td>
                        <td>0.32%</td>
                        <td>456</td>
                        <td>876</td>
                    </tr>

                    <tr>
                        <td>Reliance</td>
                        <td>2500</td>
                        <td>122</td>
                        <td>0.32%</td>
                        <td>456</td>
                        <td>876</td>
                    </tr>


                    <tr>
                        <td>HDFC Bank</td>
                        <td>450</td>
                        <td>123</td>
                        <td>0.32%</td>
                        <td>456</td>
                        <td>876</td>
                    </tr>
                </table>
                <div className="scrollable-columns">
        <table>
           
            <thead>
                <tr>
                    <th>Interval</th>
                    <th>Trend</th>
                    <th>Pattern</th>
                    <th>Stars</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>15 Minutes</td>
                <td>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            <tr>
                <td>15 Minutes</td>
                <td>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Minutes</td>
                <td>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Minutes</td>
                <td>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Minutes</td>
                <td>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            <tr>
                <td>15 Minutes</td>
                <td>Bullish</td>
                <td>Wedge</td>
                <td>*****</td>
            </tr>

            
            
            </tbody>
        </table>
    </div>

            </div> */}
            
        </div>


        <div className='over-view'>
       
            <div className="active-graph-content">
                {activeGraph && graphImages[activeGraph] ? (
                    <div>
                        <img src={graphImages[activeGraph]} alt={`Graph ${activeGraph}`} />
                    </div>
                ) : (
                    <p>No graph selected</p>
                )}
            </div>

            <div className="graph-tabs">
                {openedGraphs.map((graphId) => (
                    <button 
                        key={graphId.id} 
                        className={`tab ${activeGraph === graphId.id ? "active" : ""}`}
                        onClick={() => setActiveGraph(graphId.id)}
                    >
                        {graphId.name}
                        <span onClick={(e) => { e.stopPropagation(); handleCloseGraph(graphId.id); }}> x </span>
                    </button>
                ))}
            </div>  
            {/* <div className="item-list">
                {filteredDataGraph.map((item) => (
                    <button key={item.id} onClick={() => handleOpenGraph(item.id)}>
                        Open {item.product}
                    </button>
                ))}
            </div> */}

            <div>

            </div>
            {/* <img src='./overview.png'></img> */}

        </div>

        </div>



        <div className='position-sec'>
        
            <div className='position-tabs'>
                    <button className={activeTab === 'Position' ? 'selected' : ''} onClick={() => handleTabClick('Position')}>Position</button>
                    <button className={activeTab === 'Orders' ? 'selected' : ''} onClick={() => handleTabClick('Orders')}>Orders</button>
                    <button className={activeTab === 'Price Alerts' ? 'selected' : ''} onClick={() => handleTabClick('Price Alerts')}>Price Alerts</button>
                    <button className={activeTab === 'History' ? 'selected' : ''} onClick={() => handleTabClick('History')}>History</button>
                </div>

            {activeTab === 'Position' && (
                <table>
                <tr>
                    <th>
                        Position
                    </th>

                    <th>
                        B/S
                    </th>

                    <th>
                        Units
                    </th>

                    <th>
                        Amount
                    </th>

                    <th>
                        Price
                    </th>

                    <th>Total P&L</th>

                    <th>Stoploss</th>

                    <th>Take Profit</th>


                </tr>

                <tr>
                    <td> Nifty 50</td>
                    <td> Buy</td>
                    <td> 50</td>
                    <td>2165</td>
                    <td>5156</td>
                    <td>231</td>
                    <td>6546</td>
                    <td>21</td>

                </tr>

                <tr>
                    <td> BankNifty</td>
                    <td> Buy</td>
                    <td> 50</td>
                    <td>321</td>
                    <td>554</td>
                    <td>623</td>
                    <td>482</td>
                    <td>32</td>

                </tr>

                <tr>
                    <td> Reliance</td>
                    <td> Buy</td>
                    <td> 50</td>
                    <td>6454</td>
                    <td>315</td>
                    <td>643</td>
                    <td>946</td>
                    <td>12</td>

                </tr>

                <tr>
                    <td> Finnifty</td>
                    <td> Buy</td>
                    <td> 25</td>
                    <td>6351</td>
                    <td>481</td>
                    <td>246</td>
                    <td>654</td>
                    <td>15</td>

                </tr>

            </table>

            )}

            {activeTab === 'Orders' && (
                <table>
                    <tr>
                    <th>
                       Product
                    </th>

                    <th>
                      Order#
                    </th>

                    <th>
                       Type
                    </th>

                    <th>
                        Units
                    </th>

                    <th>
                        Expiry
                    </th>

                    <th>Order Price</th>

                    <th>Stoploss</th>

                    <th>Take Profit</th>

                    <th>Sell</th>

                    <th>Buy</th>

                </tr>


                <tr>
                    <td>Nifty 50</td>
                    <td>WP-asd32</td>
                    <td>Buy</td>
                    <td>50</td>
                    <td>23135</td>
                    <td>1235</td>
                    <td>566</td>
                    <td>987</td>
                    <td>351</td>
                    <td>654</td>
                </tr>

                <tr>
                    <td>Nifty Bank</td>
                    <td>WW-qwed32</td>
                    <td>Buy</td>
                    <td>550</td>
                    <td>221</td>
                    <td>1235</td>
                    <td>566</td>
                    <td>987</td>
                    <td>351</td>
                    <td>654</td>
                </tr>

                <tr>
                    <td>Nifty 50</td>
                    <td>WP-asd32</td>
                    <td>Buy</td>
                    <td>50</td>
                    <td>23135</td>
                    <td>1235</td>
                    <td>566</td>
                    <td>987</td>
                    <td>351</td>
                    <td>654</td>
                </tr>
                </table>
            )}

          

            {activeTab === 'History' && (
                <table>
                   <tr>
                    <th>
                        Date/time
                    </th>

                    <th>Type</th>
                    <th>Order#</th>
                    <th>Trade#</th>
                    <th>Product</th>
                    <th>Unit</th>
                    <th>Price</th>
                    <th>Value</th>
                    <th>Amount</th>
                    <th>Balance</th>
                   </tr>


                   <tr>
                    <td>28 Jan 12:45:17</td>
                    <td>Subscribed</td>
                    <td>Q2-asasd-asdas</td>
                    <td>T2-asd-xnja</td>
                    <td>Nifty 50</td>
                    <td>50</td>
                    <td>23154</td>
                    <td>234342</td>
                    <td>516879</td>
                    <td>994566</td>
                   </tr>

                   <tr>
                    <td>28 Jan 12:45:17</td>
                    <td>Subscribed</td>
                    <td>Q2-asasd-asdas</td>
                    <td>T2-asd-xnja</td>
                    <td>Nifty 50</td>
                    <td>50</td>
                    <td>23154</td>
                    <td>234342</td>
                    <td>516879</td>
                    <td>994566</td>
                   </tr>

                   <tr>
                    <td>28 Jan 12:45:17</td>
                    <td>Subscribed</td>
                    <td>Q2-asasd-asdas</td>
                    <td>T2-asd-xnja</td>
                    <td>Nifty 50</td>
                    <td>50</td>
                    <td>23154</td>
                    <td>234342</td>
                    <td>516879</td>
                    <td>994566</td>
                   </tr>
                </table>
            )}

        {activeTab === 'Price Alerts' && (
            <table>
                <tr>
                    <th>
                        Product
                    </th>

                    <th>Price</th>
                    <th>Expires</th>
                    <th>Triggered</th>
                    <th>Sell</th>
                    <th>Buy</th>
                    <th>Action</th>
                </tr>

                {alertData.map((item, index) => (
            <tr key={index}>
                <td>{item.product}</td>
                <td><input type='number' placeholder='Enter Price'></input></td>
                <td>{item.expires}</td>
                <td>{item.triggered}</td>
                <td>{item.sell}</td>
                <td>{item.buy}</td>
                <td>
                    <button onClick={() => handleBuy(item.id)}>Buy</button>
                    <button onClick={() => handleSell(item.id)}>Sell</button>
                    <button onClick={()=>handleCancel(index)}>Cancel</button>
                </td>
               
            </tr>
        ))}
                
            </table>
        )}

           

        </div>



    </div>
  )
}

export default System