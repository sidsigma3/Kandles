import React from 'react'
import './Competition.css'
import { useNavigate } from 'react-router-dom'
const Competition = ({setActive}) => {

const navigate = useNavigate()

  return (
    <div className='competition'>
        <div className='top'>
                <div className='top-left'>
                    <h3> Fetured Competition</h3>
                    
                    <p>Ends In</p>
                    <div>
                        Date
                    </div>
                </div>

                <div className='top-right'>
                    <h3>February Competition</h3>

                    <p>Welcome to the thrilling world of Funding Pips competitions! Get ready to embark on a journey of strategy, skill, and financial expertise as traders from around the globe come together to showcase their abilities and compete for exciting prices.</p>
                    
                    <div>
                        <p>Entry Free</p>
                        <p>500 Partcipants</p>
                    </div>

                    <button className='btn-view' onClick={()=>setActive('rank')} >View</button>
                </div>
        </div>

        <div className='bottom'>
            <h3>All Competition</h3>
            <select>
                <option>All</option>
                <option>Ongoing</option>
                <option>Upcoming</option>
                <option>Ended</option>
            </select>

            <div className='challenge-list'>
                <ul>
                    <li>
                        <div>
                            <h4>Sepetember Competition</h4>
                            <p>Ended</p>

                            <div>
                                <p>Entry Free</p>
                                <p>500 Partcipant</p>
                            </div>
                            <button className='btn-view'>View</button>
                        </div>
                    </li>

                    <li>
                        <div>
                            <h4>November Competition</h4>
                            <p>Ended</p>

                            <div>
                                <p>Entry Free</p>
                                <p>500 Partcipant</p>
                                <button className='btn-view'>View</button>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div>
                            <h4>December Competition</h4>
                            <p>Ended</p>

                            <div>
                                <p>Entry Free</p>
                                <p>500 Partcipant</p>
                                <button className='btn-view'>View</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>


    </div>
  )
}

export default Competition