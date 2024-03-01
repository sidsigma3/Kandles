import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PsychologyGraph = ({ data }) => {
    return (
        <LineChart width={1300} height={400} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign='top' align='center' />
            <Line type="monotone" dataKey="fear" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="greed" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="hope" stroke="#ffc658" strokeWidth={2} />
            <Line type="monotone" dataKey="regret" stroke="#ff8042" strokeWidth={2} />
            <Line type="monotone" dataKey="ego" stroke="#8dd1e1" strokeWidth={2} />
            <Line type="monotone" dataKey="fomo" stroke="#d08488" strokeWidth={2}/>
        </LineChart>
    );
};



export default PsychologyGraph