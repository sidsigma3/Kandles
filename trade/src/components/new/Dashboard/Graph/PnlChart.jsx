import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PnLChart = ({ pnlData }) => {
  return (
    <LineChart
      width={135} // Adjust size as necessary
      height={104}
      data={pnlData}
      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pnl" stroke="#5A55D2" />
    </LineChart>
  );
};

export default PnLChart;
