import React from 'react'
import './CompeteRank.css'

const CompeteRank = () => {
  return (
    <div className='compete-rank'>
        <div className='top'>
            <div>
            <h3>
                February Competition
            </h3>

            <p>Ongoing</p>
            </div>

            <div>
            <button>Join</button>
            <button>Prizes</button>
            <button>Description</button>
            </div>


        </div>


        <div className='bottom'>
            <div className='bottom-left'>
                <table>
                    <tr>
                        <th>Rank</th>
                        <th></th>
                        <th>Trades</th>
                        <th>Win Ratio</th>
                        <th>Profit</th>
                        <th>Gain</th>
                    </tr>

                    <tr>
                        <td>1</td>
                        <td>Moin A</td>
                        <td>13</td>
                        <td>100</td>
                        <td>111947</td>
                        <td>1145</td>
                    </tr>


                    <tr>
                        <td>1</td>
                        <td>Moin A</td>
                        <td>13</td>
                        <td>100</td>
                        <td>111947</td>
                        <td>1145</td>
                    </tr>


                    <tr>
                        <td>1</td>
                        <td>Moin A</td>
                        <td>13</td>
                        <td>100</td>
                        <td>111947</td>
                        <td>1145</td>
                    </tr>


                    <tr>
                        <td>1</td>
                        <td>Moin A</td>
                        <td>13</td>
                        <td>100</td>
                        <td>111947</td>
                        <td>1145</td>
                    </tr>


                    <tr>
                        <td>1</td>
                        <td>Moin A</td>
                        <td>13</td>
                        <td>100</td>
                        <td>111947</td>
                        <td>1145</td>
                    </tr>


                    <tr>
                        <td>1</td>
                        <td>Moin A</td>
                        <td>13</td>
                        <td>100</td>
                        <td>111947</td>
                        <td>1145</td>
                    </tr>


                    <tr>
                        <td>1</td>
                        <td>Moin A</td>
                        <td>13</td>
                        <td>100</td>
                        <td>111947</td>
                        <td>1145</td>
                    </tr>

                </table>

            </div>


            <div className='bottom-right'>
                <div className='rank-stat'>
                    <h5>Current Rank?</h5>
                    <p>Your rank in current competition</p>

                </div>


                <div>
                    <div className='duration'>
                        <div>
                        <h5>Starts</h5>
                        <p>Feb 1</p>
                        </div>

                        <div>
                        <h5>Ends</h5>
                        <p>Feb 29</p>
                        </div>
                    </div>

                    <div className='partcipant'>
                    <div>
                        <h5>Entry</h5>
                        <p>Free</p>
                    </div>
                    <div>
                        <h5>Partcipants</h5>
                        <p>500</p>
                        </div>    
                    </div>
                </div>

                <div className='rules'>
                    <h3>Trading Rules</h3>
                    <ul>
                        <li>10% Max Overall Loss</li>
                        <li>5% Max Daily Loss</li>
                        <li>Max 5 positions open at any given time</li>
                        <li>EA execution is prohibited</li>
                    </ul>
                </div>


            </div>

        </div>


    </div>
  )
}

export default CompeteRank