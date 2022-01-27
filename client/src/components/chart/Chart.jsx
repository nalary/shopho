import "./chart.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = ({ title, data, lineDataKey, yAxis, grid }) => {    

    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#5550bd"/>
                    {yAxis && (
                        <YAxis />
                    )}                    
                    <Tooltip />
                    <Line type="monotone" dataKey={lineDataKey} stroke="#5550bd"/>
                    {grid && (
                        <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
