import React, { useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { format, parseISO, startOfYear, endOfYear, isValid } from 'date-fns';
import { Tooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import './DailyPnlGraph.css'; // Ensure this file exists for custom styles
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

const DailyPnlGraph = ({ tradeData, avgWin, avgLoss }) => {
  const { maxPositivePnl, minPositivePnl, maxNegativePnl, minNegativePnl } = tradeData.reduce((acc, trade) => {
    const pnl = Math.round(trade.pnl || 0);

    if (pnl > 0) {
      acc.maxPositivePnl = Math.max(acc.maxPositivePnl, pnl);
      acc.minPositivePnl = Math.min(acc.minPositivePnl, pnl);
    } else if (pnl < 0) {
      acc.maxNegativePnl = Math.min(acc.maxNegativePnl, pnl);
      acc.minNegativePnl = Math.max(acc.minNegativePnl, pnl);
    }

    return acc;
  }, { maxPositivePnl: -Infinity, minPositivePnl: Infinity, maxNegativePnl: Infinity, minNegativePnl: -Infinity });

  const pnlDataMap = tradeData.reduce((acc, trade) => {
    const date = parseISO(trade.date);
    if (!isValid(date)) return acc; // Skip invalid dates

    const formattedDate = format(date, 'yyyy-MM-dd');
    const pnl = Math.round(trade.pnl || 0);

    if (acc[formattedDate]) {
      acc[formattedDate] += pnl;
    } else {
      acc[formattedDate] = pnl;
    }

    return acc;
  }, {});

  const { winDays, lossDays } = Object.values(pnlDataMap).reduce((acc, pnl) => {
    if (pnl > 0) {
      acc.winDays += 1;
    } else if (pnl < 0) {
      acc.lossDays += 1;
    }
    return acc;
  }, { winDays: 0, lossDays: 0 });

  const pnlData = Object.entries(pnlDataMap).map(([date, count]) => {
    const parsedDate = parseISO(date);
    return {
      date: isValid(parsedDate) ? parsedDate : null,
      count,
    };
  }).filter(item => item.date); // Filter out invalid dates

  const getClassForValue = (value) => {
    if (!value) return 'color-empty';

    const pnl = value.count;

    if (pnl > 0) {
      if (pnl > maxPositivePnl * 0.7) return 'color-positive-strong';
      if (pnl > maxPositivePnl * 0.4) return 'color-positive-medium';
      if (pnl > minPositivePnl * 0.1) return 'color-positive-weak';
    } else if (pnl < 0) {
      if (pnl < maxNegativePnl * 0.7) return 'color-negative-strong';
      if (pnl < maxNegativePnl * 0.4) return 'color-negative-medium';
      if (pnl < minNegativePnl * 0.1) return 'color-negative-weak';
    }

    return 'color-neutral';
  };

  const colorStyles = {
    'color-empty': { fill: '#eeeeee' },
    'color-positive-strong': { fill: '#056d13' },
    'color-positive-medium': { fill: '#089c19' },
    'color-positive-weak': { fill: '#5bcf76' },
    'color-negative-strong': { fill: '#D32F2F' },
    'color-negative-medium': { fill: '#EC7063' },
    'color-negative-weak': { fill: '#F5B7B1' },
    'color-neutral': { fill: '#d9d9d9' },
  };

  const dates = pnlData.map(item => item.date);
  const startYear = new Date(Math.min(...dates)).getFullYear();
  const endYear = new Date(Math.max(...dates)).getFullYear();

  const [selectedYear, setSelectedYear] = useState(startYear);

  const handlePreviousYear = () => {
    setSelectedYear((prevYear) => Math.max(prevYear - 1, startYear));
  };

  const handleNextYear = () => {
    setSelectedYear((prevYear) => Math.min(prevYear + 1, endYear));
  };

  const startDate = startOfYear(new Date(selectedYear, 0, 1));
  const endDate = endOfYear(new Date(selectedYear, 11, 31));

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 6, }} className='daily-pnl-graph'>
      <div style={{ width: '98%', height: 'auto', overflowX: 'auto' }}>
        <div className='d-flex justify-content-between mx-2 my-2'>
          <h5
          style={{
            color: 'var(--Dark, #1A1E29)',
            textAlign: 'center',
            fontFamily: "Open Sans",
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            letterSpacing: '-0.28px',
            textTransform: 'capitalize',

         }}
          >No. of Win Days: {winDays}</h5>
          <h5
          style={{
            color: 'var(--Dark, #1A1E29)',
            textAlign: 'center',
            fontFamily: "Open Sans",
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            letterSpacing: '-0.28px',
            textTransform: 'capitalize',

         }}
          >No. of Loss Days: {lossDays}</h5>
        </div>
        <div className='d-flex justify-content-between mx-2 my-2 '>
          <h5
          style={{
            color: 'var(--Dark, #1A1E29)',
            textAlign: 'center',
            fontFamily: "Open Sans",
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            letterSpacing: '-0.28px',
            textTransform: 'capitalize',

         }}
          >Avg. Win Per Trade: ₹ {avgWin.toFixed(2)}</h5>
          <h5
          style={{
            color: 'var(--Dark, #1A1E29)',
            textAlign: 'center',
            fontFamily: "Open Sans",
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            letterSpacing: '-0.28px',
            textTransform: 'capitalize',

         }}
          >Avg. Loss Per Trade: ₹ {avgLoss.toFixed(2)}</h5>
        </div>
        <div className='d-flex justify-content-center gap-3 mx-2 my-2 align-items-center'>
          <button onClick={handlePreviousYear} >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <g clip-path="url(#clip0_640_3242)">
              <circle cx="10" cy="10" r="10" transform="matrix(-0.0069111 -0.999976 -0.999976 0.0069111 20.1378 19.9995)" fill="#5A55D2"/>
              <path d="M11.8916 5.79739L7.75386 9.99275L11.9492 14.1305" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_640_3242">
                <rect width="20" height="20" fill="white" transform="translate(0 0.138184) rotate(-0.39598)"/>
              </clipPath>
            </defs>
          </svg>
          </button>
          <h6>{selectedYear}</h6>
          <button onClick={handleNextYear} >
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <g clip-path="url(#clip0_640_3250)">
              <circle cx="10" cy="10" r="10" transform="matrix(-0.00201957 0.999998 0.999998 0.00201957 0.0891113 0.048645)" fill="#5A55D2"/>
              <path d="M8.20808 14.3238L12.3832 10.1656L8.22491 5.99049" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_640_3250">
                <rect width="20" height="20" fill="white" transform="translate(20.0487 20.089) rotate(-179.884)"/>
              </clipPath>
            </defs>
          </svg>
          </button>
        </div>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={pnlData}
          classForValue={(value) => getClassForValue(value)}
          showWeekdayLabels={false}
          tooltipDataAttrs={value => ({
            'data-tip': value && value.date ? `${value.count}: ${format(value.date, 'yyyy-MM-dd')}` : 'No data',
          })}
          titleForValue={value => value && value.date ? `${value.count} : ${format(value.date, 'yyyy-MM-dd')}` : 'No data'}
          gutterSize={3}
          className="heatmap-container"
        />
        <Tooltip />
        <style>
          {`
            .react-calendar-heatmap .color-empty { fill: ${colorStyles['color-empty'].fill}; }
            .react-calendar-heatmap .color-positive-strong { fill: ${colorStyles['color-positive-strong'].fill}; }
            .react-calendar-heatmap .color-positive-medium { fill: ${colorStyles['color-positive-medium'].fill}; }
            .react-calendar-heatmap .color-positive-weak { fill: ${colorStyles['color-positive-weak'].fill}; }
            .react-calendar-heatmap .color-negative-strong { fill: ${colorStyles['color-negative-strong'].fill}; }
            .react-calendar-heatmap .color-negative-medium { fill: ${colorStyles['color-negative-medium'].fill}; }
            .react-calendar-heatmap .color-negative-weak { fill: ${colorStyles['color-negative-weak'].fill}; }
            .react-calendar-heatmap .color-neutral { fill: ${colorStyles['color-neutral'].fill}; }
          `}
        </style>
      </div>
    </div>
  );
};

export default DailyPnlGraph;
