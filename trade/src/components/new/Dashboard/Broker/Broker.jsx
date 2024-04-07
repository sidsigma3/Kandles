import React from 'react'

const Broker = ({setActive}) => {
  return (
    <div className='p-2 mt-3'>
        <div className='mb-4 border-bottom border-3'>
            <h4>Broker Setup</h4>
        </div>

        <div className='d-flex justify-content-around'>
            <div className='shadow d-flex flex-column justify-content-between align-items-center p-2'>
                <img src='./Zerodha (1).svg' width={200}></img>
                <button className='btn btn-primary btn-sm w-50' onClick={()=>setActive('setup')}>SetUp</button>
            </div>

            <div className='shadow d-flex flex-column justify-content-between align-items-center p-2'>
                <img src='./upstox-logo.png' width={200}></img>
                <button className='btn btn-primary btn-sm w-50'  onClick={()=>setActive('setup')}>SetUp</button>
            </div>

            <div className='shadow d-flex flex-column justify-content-between align-items-center p-2'>
                <img src='./angelone-logo.png' width={200}></img>
                <button className='btn btn-primary btn-sm w-50'  onClick={()=>setActive('setup')}>SetUp</button>
            </div>

            <div className='shadow d-flex flex-column justify-content-between align-items-center p-2'>
                <img src='./fyers-logo.webp' width={200} height={80} className='pt-4'></img>
                <button className='btn btn-primary btn-sm w-50'  onClick={()=>setActive('setup')}>SetUp</button>
            </div>
        </div>



    </div>
  )
}

export default Broker