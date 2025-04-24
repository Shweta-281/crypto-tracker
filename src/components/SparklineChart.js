// components/SparklineChart.js
import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const SparklineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart
        data={data}
        margin={{ top: 2, right: 0, left: 0, bottom: 2 }}
      >
        <Line
          type="linear"
          dataKey="price"
          stroke="#ea3943"
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
          connectNulls={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SparklineChart;