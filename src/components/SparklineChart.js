import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Tooltip } from 'recharts';

const SparklineChart = ({ data, isPositive }) => {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
      <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop 
              offset="0%" 
              stopColor={isPositive ? '#16c784' : '#ea3943'}
              stopOpacity={0.2}
            />
            <stop 
              offset="100%" 
              stopColor={isPositive ? '#16c784' : '#ea3943'}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
      <Tooltip 
  contentStyle={{ background: '#fff', border: 'none', borderRadius: '4px' }}
  formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
  labelStyle={{ display: 'none' }}
/>
        <Area

          type="linear"
          dataKey="price"
          stroke={isPositive ? '#16c784' : '#ea3943'}
          strokeWidth={1.5}
          fill="url(#chartGradient)"
          fillOpacity={1}
          dot={false}
          isAnimationActive={false}
          
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SparklineChart;