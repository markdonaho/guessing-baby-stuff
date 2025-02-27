// src/components/Admin/StatsOverview.jsx
import React from 'react';
import StatCard from './StatCard';
import { FiUser, FiBarChart2, FiCalendar } from 'react-icons/fi';

const StatsOverview = ({ stats }) => {
  // Calculate the ratio for the gradient
  const totalGenderPredictions = stats.boys + stats.girls;
  const boyPercentage = totalGenderPredictions > 0 ? (stats.boys / totalGenderPredictions) * 100 : 50;
  const girlPercentage = totalGenderPredictions > 0 ? (stats.girls / totalGenderPredictions) * 100 : 50;
  
  // Colors matching the table - blue-100/blue-800 for boys, pink-100/pink-800 for girls
  const boyColor = '#1e40af'; // blue-800 for boy (darker blue)
  const girlColor = '#be185d'; // pink-800 for girl (darker pink)
  
  // Create gradient style based on the ratio
  const genderGradientStyle = {
    background: `linear-gradient(to right, ${boyColor} ${boyPercentage}%, ${girlColor} ${boyPercentage}%)`,
    height: '8px',
    borderRadius: '4px',
    marginTop: '8px'
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard 
          title="Total Predictions" 
          value={`${stats.total} ${stats.total === 1 ? 'Prediction' : 'Predictions'}`} 
          icon={<FiUser className="text-primary-700" size={20} />} 
        />
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-2">
            <div className="rounded-full bg-gradient-to-br from-primary-100 to-primary-200 p-4 mr-4">
              <FiBarChart2 className="text-primary-700" size={20} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Predicted Gender</h3>
              <p className="text-xl font-bold">
                {`${stats.boys} ${stats.boys === 1 ? 'Boy' : 'Boys'} / ${stats.girls} ${stats.girls === 1 ? 'Girl' : 'Girls'}`}
              </p>
            </div>
          </div>
          
          {/* Gender ratio visualization */}
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-800 mr-1"></div>
                <span className="text-blue-800 font-medium">{Math.round(boyPercentage)}%</span>
              </div>
              <div className="flex items-center">
                <span className="text-pink-800 font-medium">{Math.round(girlPercentage)}%</span>
                <div className="w-3 h-3 rounded-full bg-pink-800 ml-1"></div>
              </div>
            </div>
            <div style={genderGradientStyle}></div>
          </div>
        </div>
        
        <StatCard 
          title="Most Popular Date" 
          value={stats.mostPopularDate} 
          icon={<FiCalendar className="text-primary-700" size={20} />} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Average Weight</h2>
          <p className="text-xl font-bold text-primary-700">{stats.averageWeight}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Average Length</h2>
          <p className="text-xl font-bold text-primary-700">{stats.averageLength}</p>
        </div>
      </div>
    </>
  );
};

export default StatsOverview;