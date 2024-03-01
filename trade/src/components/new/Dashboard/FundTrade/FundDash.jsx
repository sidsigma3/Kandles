import React , {useState} from 'react'
import './FundDash.css'
import { ProgressBar } from 'react-bootstrap';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import PsychologyGraph from './PsychologyGraph';
import PsychologySummaryPieChart from './PsychologySummaryPieChart';

const FundDash = () => {
    const [accountType, setAccountType] = useState('demo')
    const dailyLoss = 70; // 20%
    const maxLoss = 50; // 50%
    const profitTarget = 75; // 75%


    const psychologyData = [
        { date: '2023-02-01', fear: 5, greed: 3, hope: 2, regret: 4, ego: 1, fomo: 3 },
        { date: '2023-02-02', fear: 2, greed: 1, hope: 3, regret: 3, ego: 2, fomo: 5 },
        { date: '2023-02-03', fear: 3, greed: 5, hope: 5, regret: 4, ego: 3, fomo: 3 },
        { date: '2023-02-04', fear: 1, greed: 2, hope: 2, regret: 1, ego: 4, fomo: 2 },
        { date: '2023-02-05', fear: 4, greed: 1, hope: 1, regret: 2, ego: 5, fomo: 1 },
        { date: '2023-02-06', fear: 2, greed: 4, hope: 5, regret: 5, ego: 4, fomo: 5 },
        { date: '2023-02-07', fear: 5, greed: 3, hope: 2, regret: 4, ego: 3, fomo: 4 },
        { date: '2023-02-08', fear: 1, greed: 2, hope: 4, regret: 1, ego: 2, fomo: 2 },
        // Add more data for each day
    ];

    const psychologySummaryData = [
        { name: "Fear", value: 400 , loss:45},
        { name: "Greed", value: 300 ,loss:23},
        { name: "Hope", value: 300 ,loss:78},
        { name: "Regret", value: 200 ,loss:32},
        { name: "Ego", value: 100 ,loss:42},
        { name: "FOMO", value: 100 , loss:25},
        // Aggregate your data appropriately for the pie chart
    ];

    const psychologyTypes = [
        { type: "Fear", criteria: "Not following risk reward." },
        { type: "Greed", criteria: "Trading after profit." },
        { type: "Hope", criteria: "Going beyond stoploss." },
        { type: "Regret", criteria: "Revenge trading." },
        { type: "Ego", criteria: "Going against the market trend" },
        { type: "FOMO", criteria: "Impulsive trading." },
      ];

  return (
    <div className='fund-dash'>
        {/* <div className='acc-detail'>
            <div className='acc-type'>
                  <h3> Demo account </h3> 
            </div>

        

        </div> */}

        <div className='acc-detail'>
                <div className='acc-type'>
                    <h3>{accountType.charAt(0).toUpperCase() + accountType.slice(1)} account</h3> 
                </div>

                {/* <div className='acc-change'>
                    <button onClick={() => setAccountType('demo')}>Demo Account</button>
                    <button onClick={() => setAccountType('live')}>Live Account</button>
                </div> */}

                <div className='acc-change'>
                <select value={accountType} onChange={(e) => setAccountType(e.currentTarget.value)} className="form-select" style={{ backgroundColor: '#60A3D9' ,color:'white'}}>
                                            <option value="demo">Demo Account</option>
                                            <option value="personal">Live Account (Personal Funds)</option>
                                            <option value="funded">Live Account (Funded)</option>
                                        </select>
  {/* <ToggleButtonGroup type="radio" name="accountType" defaultValue={'demo'}>
    <ToggleButton id="tbg-radio-1" variant="outline-secondary" value={'demo'} checked={accountType === 'demo'} onChange={(e) => setAccountType(e.currentTarget.value)}>
      Demo Account
    </ToggleButton>
    <ToggleButton id="tbg-radio-2" variant="outline-secondary" value={'live'} checked={accountType === 'live'} onChange={(e) => setAccountType(e.currentTarget.value)}>
      Live Account
    </ToggleButton>
  </ToggleButtonGroup> */}
</div>



            </div>


        <div className='top'>
            <div className='top-left'>
                <div className='acc-info'>
                        <div>
                              <h5>Account Type:</h5> 
                                {/* <p>Evalution</p> */}
                                <p>{
                                    accountType === 'demo' ? 'Demo' :
                                    accountType === 'personal' ? 'Personal' :
                                    'Funded'
                                }</p>
                        </div>
        
                        <div>
                            <h5>Phase:</h5>
                            {/* <p>Student</p> */}
                            <p>{
                                    accountType === 'demo' ? 'Demo' :
                                    accountType === 'personal' ? 'Live' :
                                    'Student Phase 1'
                                }</p>
                        </div>

                        <div>
                            <h5>Account Size:</h5>
                            <p>{
                                    accountType === 'demo' ? '13255' :
                                    accountType === 'personal' ? '121' :
                                    '50000'
                                }</p>
                            {/* <p>1,000,000 Rs</p> */}
                        </div>

                        <div>
                            <h5>Start Trade Period:</h5>
                            <p>-</p>
                        </div>

                        <div>
                            <h5>End Trade Period:</h5>
                            <p>-</p>
                        </div>

                </div>

                <div className='target-info'>
                    <div className='daily-loss'>
                        Daily Loss Limit:
                        <ProgressBar now={dailyLoss} label={`${dailyLoss}%`} />
                    </div>

                    <div className='max-loss'>
                       Max Loss Limit:
                       <ProgressBar now={maxLoss} label={`${maxLoss}%`} variant="warning" />
                    </div>

                    <div className='profit-target'>
                        Profit target:
                        <ProgressBar now={profitTarget} label={`${profitTarget}%`} variant="success" />
                    </div>

                </div>

            </div>

            <div className='top-right'>
               <div>
                <table>
                    <tr>
                        <th>
                            Date
                        </th>
                        <th>
                            Trades
                        </th>
                        <th>
                            Lots
                        </th>
                        <th>
                            Result
                        </th>
                        
                    </tr>

                    <tr>
                        <td>
                            2/7/24
                        </td>

                        <td>
                            5
                        </td>

                        <td>
                            3
                        </td>

                        <td>
                            25
                        </td>
                    </tr>

                </table>
               </div>
            </div>


        </div>

        <div className='position'>
           <table>
            <tr>
                <th>
                    Symbol
                </th>

                <th>
                    Type
                </th>

                <th>
                    Entry Date
                </th>

                <th>
                    Entry
                </th>

                <th>
                    Target
                </th>

                <th>
                   Stoploss
                </th>

                <th>
                    Lots
                </th>

                <th>
                   Profit
                </th>
            </tr>


            <tr>
                <td>Reliance</td>
                <td>Buy</td>
                <td>21/02/2024</td>
                <td>5664</td>
                <td>9765</td>
                <td>3156</td>
                <td>10</td>
                <td>6455</td>
            </tr>

            <tr>
                <td>HDFC</td>
                <td>Buy</td>
                <td>21/02/2024</td>
                <td>5421</td>
                <td>965</td>
                <td>642</td>
                <td>20</td>
                <td>648</td>
            </tr>

            <tr>
                <td>Gail</td>
                <td>Buy</td>
                <td>21/02/2024</td>
                <td>6424</td>
                <td>325</td>
                <td>123</td>
                <td>5</td>
                <td>36</td>
            </tr>

            <tr>
                <td>HCLTECH</td>
                <td>Buy</td>
                <td>21/02/2024</td>
                <td>5664</td>
                <td>9765</td>
                <td>3156</td>
                <td>10</td>
                <td>6455</td>
            </tr>

           </table>

        </div>

        <div className='bottom'>
            <div className='bottom-left'>

                <div className='row-1'>    
                    <div className='avg-win d-flex justify-content-between p-3'>
                        <h5>Avg Win</h5>
                        <p>654</p>

                    </div>

                    <div className='avg-loss d-flex justify-content-between p-3'>
                    <h5>Avg Loss</h5>
                        <p>32</p>
                    </div>
                </div>

                <div className='row-2'>    
                    <div className='win-ratio d-flex justify-content-between p-3'>
                    <h5>Win Ratio</h5>
                        <p>21</p>
                    </div>

                    <div className='profit-factor d-flex justify-content-between p-3'>
                    <h5>Profit factor</h5>
                        <p>12</p>
                    </div>
                </div>

            </div>

          


            <div className='bottom-right'>
              <table>
                <tr>
                    <td>
                        Number Of days
                    </td>

                    <td>
                        2
                    </td>
                </tr>


                <tr>
                    <td>
                        Number Of days
                    </td>

                    <td>
                        2
                    </td>
                </tr>


                <tr>
                    <td>
                       Total trades taken
                    </td>

                    <td>
                        15
                    </td>
                </tr>


                <tr>
                    <td>
                        Avg trades Per day
                    </td>

                    <td>
                        7
                    </td>
                </tr>


                <tr>
                    <td>
                        Total lots used
                    </td>

                    <td>
                        50
                    </td>
                </tr>


                <tr>
                    <td>
                      Average Lots used
                    </td>

                    <td>
                        15
                    </td>
                </tr>


                <tr>
                    <td>
                        Biggest Win
                    </td>

                    <td>
                        10
                    </td>
                </tr>

                <tr>
                    <td>
                        Biggest Loss
                    </td>

                    <td>
                        -8
                    </td>
                </tr>
              </table>
            </div>
            


        </div>

{/* 
        <div className='trading-psychology-section'>
                <h2 className='mb-5 mt-3'>Trading Psychology Over Time</h2>
                <PsychologyGraph data={psychologyData} />
            </div> */}

            <div className='trading-psychology-section d-flex justify-content-between'>

                <div>
                <h2 className='mb-5 mt-3'>Trading Psychology Over Time</h2>
                <PsychologyGraph data={psychologyData} />
                </div>
              <div>
                <h2 className='mb-5 mt-3'>Summary of Trading Psychology Factors</h2>
                <PsychologySummaryPieChart data={psychologySummaryData} />
                </div>
            </div>

            <div className='d-flex justify-content-center mt-3'>
            <table className='psych-table'>
      <thead>
        <tr>
          <th>Type</th>
          <th>Criteria</th>
        </tr>
      </thead>
      <tbody>
        {psychologyTypes.map((item, index) => (
          <tr key={index}>
            <td>{item.type}</td>
            <td>{item.criteria}</td>
          </tr>
        ))}
      </tbody>
    </table>
            </div>



    </div>
  )
}

export default FundDash