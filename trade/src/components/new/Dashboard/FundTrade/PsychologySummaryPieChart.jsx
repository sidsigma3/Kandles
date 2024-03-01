import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const PsychologySummaryPieChart = ({ data }) => {
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d08488'];

    // Custom label rendering function
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
        const radius = outerRadius * 1.1; // Position the label slightly outside of the pie
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        return (
            <text
                x={x}
                y={y}
                fill="black" // Change the color to improve visibility
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                style={{ fontSize: '14px' }} // Adjust font size as needed
            >
                {`${name}: ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload; // Assuming payload[0] contains the data for the hovered segment
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                    <p>{`Name: ${data.name}`}</p>
                    <p>{`Value: ${data.value}`}</p>
                    <p>{`Loss: ${data.loss}`}</p> {/* Display the loss value */}
                </div>
            );
        }

        return null;
    };

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel} // Use the custom label rendering function
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip content={<CustomTooltip />}/>
        </PieChart>
    );
};

export default PsychologySummaryPieChart;


// import React from 'react';
// import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

// const PsychologySummaryPieChart = ({ data }) => {
//     const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d08488'];

//     return (
//         <PieChart width={400} height={400}>
//             <Pie
//                 data={data}
//                 cx={200}
//                 cy={200}
//                 labelLine={false}
//                 outerRadius={150}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//             >
//                 {data.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//             </Pie>
//             <Tooltip />
           
//         </PieChart>
//     );
// };

// export default PsychologySummaryPieChart;
