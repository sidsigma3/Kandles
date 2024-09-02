import React, { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label,
} from 'recharts';
import { format } from 'date-fns';



const CummulativePnlGraph = ({ tradeData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yy');
  };

  const pnlData = useMemo(() => {
    let cumulativePnl = 0;
    return tradeData.map((trade, index) => {
      cumulativePnl += Math.round(trade.pnl) || 0;
      return {
        date: formatDate(trade.date),
        pnl: cumulativePnl,
      };
    });
  }, [tradeData]);

  const finalCumulativePnl = pnlData.length > 0 ? pnlData[pnlData.length - 1].pnl : 0;

  const gradientOffset = () => {
    const dataMax = Math.max(...pnlData.map((i) => i.pnl));
    const dataMin = Math.min(...pnlData.map((i) => i.pnl));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <div style={{ width: '100%', height: '262px' }}>
       <h5
          style={{
            color: 'var(--Dark, #1A1E29)',
            textAlign: 'left',
            fontFamily: "Open Sans",
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            letterSpacing: '-0.28px',
            marginBottom: 0,
            marginTop:10,
            paddingLeft:35
           
         }}
          >  Cumulative PnL: {finalCumulativePnl}</h5>
      <ResponsiveContainer width="100%" height="110%"  >
        <AreaChart
          data={pnlData}
          margin={{ top: 40, right: 30, left: 0, bottom: 5 }} // Adjust top margin for the text
        >
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={0.4} />
              <stop offset={off} stopColor="red" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" height={60} />
          <YAxis />
          <Tooltip />
        
          <Area
            type="monotone"
            dataKey="pnl"
            stroke="#000"
            fill="url(#splitColor)"
        
          />
          {/* <text
            x={60}  // Adjust the x position
            y={12}  // Adjust the y position
            textAnchor="start"
            dominantBaseline="middle"
            style={{
              color: 'var(--Dark, #1A1E29)',
              textAlign: 'center',
              fontFamily: "Open Sans",
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
              letterSpacing: '-0.28px',}}
          >
          Cumulative PnL: {finalCumulativePnl}
          </text> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CummulativePnlGraph;
