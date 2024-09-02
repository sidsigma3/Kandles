import React, { useEffect, useState } from 'react';
import Trading from '../Trading/Trading';
import StrategyBacktest from './StrategyBacktest';
// import Optimise from '../Optimise/Optimise';  
// import Deploy from '../Deploy/Deploy';  
import StrategyBuild from './StrategyBuild';
import StrategyBuildPage from './StrategyBuildPage';


const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
const retrieveFromLocalStorage = (key, defaultValue) => {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : defaultValue;
  };
  


const StrategyHome = ({strategyList,setStrategyList ,editingStrategyIndex, setEditingStrategyIndex ,isEditing,setIsEditing}) => {
    const [strategyShow, setStrategyShow] = useState('build');

    const [strategyListIndi,setStrategyListIndi] = useState(() => retrieveFromLocalStorage('strategyListIndi', []))

    useEffect(()=>{
        saveToLocalStorage('strategyListIndi',strategyListIndi)
    },[strategyListIndi])

    const renderComponent = () => {
        switch (strategyShow) {
            case 'build':
                return <StrategyBuild setStrategyShow={setStrategyShow} setStrategyListIndi={setStrategyListIndi} strategyListIndi={strategyListIndi}></StrategyBuild>
                // return <Trading setStrategyList={setStrategyList} strategyList={strategyList} editingStrategyIndex={editingStrategyIndex} setEditingStrategyIndex={setEditingStrategyIndex} isEditing={isEditing} setIsEditing={setIsEditing}></Trading>;
            case 'backtest':
                return <StrategyBacktest strategyListIndi={strategyListIndi}></StrategyBacktest>;
            case 'optimise':
                return <StrategyBuildPage setStrategyShow={setStrategyShow}  setStrategyListIndi={setStrategyListIndi} strategyListIndi={strategyListIndi}></StrategyBuildPage>
                // return <Optimise />;
            case 'deploy':
                // return <Deploy />;
            default:
                return <div>Select an option to view the content.</div>;
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => setStrategyShow('build')}>
                    Build
                </button>

                <button onClick={() => setStrategyShow('backtest')}>
                    Backtest
                </button>

                <button onClick={() => setStrategyShow('optimise')}>
                    Optimise
                </button>

                <button onClick={() => setStrategyShow('deploy')}>
                    Deploy
                </button>
            </div>

            <div>
                {renderComponent()}
            </div>
        </div>
    );
};

export default StrategyHome;
