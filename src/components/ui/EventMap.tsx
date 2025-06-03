import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Webhooks', value: 45, color: '#3b82f6' },
  { name: 'API Calls', value: 30, color: '#10b981' },
  { name: 'Pub/Sub', value: 20, color: '#f59e0b' },
  { name: 'Manual', value: 5, color: '#ef4444' },
];

const EventMap = () => {
  return (
    <div className="h-48"> {/* Reduced height */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45} // Smaller inner radius
            outerRadius={70} // Smaller outer radius
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm"> {/* Smaller margin and text */}
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-1.5">
            <div 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-gray-600">{item.name}</span>
            <span className="font-medium text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventMap;
