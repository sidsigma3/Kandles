import React, { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer ,Legend
} from 'recharts';
import { format } from 'date-fns';
import { First } from 'react-bootstrap/esm/PageItem';

const DrawdownGraph = ({ filteredTrades, initialCapital }) => {
  // Calculate drawdown data from filtered trades
  

  const calculateDrawdownData = useMemo(() => {
    let maxEquity = filteredTrades[1].invested
    let currentEquity = filteredTrades[1].invested
    let drawdownData = [];

    filteredTrades.forEach((trade) => {
      if (trade.pnl !== undefined) {  // Check if pnl exists
        currentEquity += trade.pnl;  // Update current equity with pnl

        if (currentEquity > maxEquity) {
          maxEquity = currentEquity;
        }

        const drawdown = -((maxEquity - currentEquity) / maxEquity) * 100;

        drawdownData.push({
          date: new Date(trade.date),  // Store raw date objects
          drawdown: drawdown,
        });
      }
    });

    return drawdownData;
  }, [filteredTrades, initialCapital]);

  // Calculate maximum drawdown
  const maxDrawdown = useMemo(() => {
    if (calculateDrawdownData.length === 0) return 0;
    return Math.min(...calculateDrawdownData.map(data => data.drawdown));
  }, [calculateDrawdownData]);

  // Tooltip content renderer
  const renderTooltipContent = ({ payload }) => {
    if (!payload || payload.length === 0) return null;
    const { date, drawdown } = payload[0].payload;
    return (
      <div style={{ background: '#fff', padding: '5px 10px', border: '1px solid #ccc' }}>
        <p>Date: {format(date, 'dd/MM/yy')}</p>
        <p>Drawdown: {drawdown.toFixed(2)}%</p>
      </div>
    );
  };

  // Formatter for X-axis tick
  const formatXAxisTick = (tick) => {
    return format(new Date(tick), 'dd/MMM'); // Format date as "21-Nov"
  };

  return (
    <div style={{ width: '100%', height: 262 }}>
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
            marginBottom: -5,
            marginTop:10,
            paddingLeft:50
           
         }}
          > Max Drawdown: {maxDrawdown.toFixed(2)}%</h5>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={calculateDrawdownData}
          margin={{ top: 40, right: 30, left: -5, bottom: 5 }}
        >
          <XAxis dataKey="date" tickFormatter={formatXAxisTick} />
          <YAxis />
          <Tooltip content={renderTooltipContent} />
        
          <Area
            type="monotone"
            dataKey="drawdown"
            stroke="#C39BD3"
            fill="#D7BDE2 " // Fill color for the area
            strokeWidth={2}
            dot={false}
          />
          {/* <text
            x={60}  // Adjust the x position
            y={12}  // Adjust the y position
            textAnchor="start"
            dominantBaseline="middle"
            style={{ fontSize: '24px', fontWeight: 'bold', fill: '#333' }}
          >
            Max Drawdown: {maxDrawdown.toFixed(2)}%
          </text> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DrawdownGraph;
