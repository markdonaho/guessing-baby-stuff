// src/components/Admin/StatCard.jsx
import React from 'react';

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center">
      <div className="rounded-full bg-gradient-to-br from-primary-100 to-primary-200 p-4 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;