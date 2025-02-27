// src/components/Success/SuccessStats.jsx
import React, { useState, useEffect } from 'react';
import { FiBarChart2, FiCalendar, FiActivity, FiTruck } from 'react-icons/fi';
import LoadingSpinner from '../shared/LoadingSpinner';
import { calculateStats } from '../Admin/StatsCalculator';
import { usePredictions } from '../../hooks/usePredictions';

const SuccessStats = () => {
  const { predictions, isLoading, error, getPredictions } = usePredictions();
  const [stats, setStats] = useState({
    total: 0,
    boys: 0,
    girls: 0,
    averageWeight: '7 lbs 8 oz',
    averageLength: '21.0 inches',
    mostPopularDate: 'Calculating...',
  });

  // Fetch predictions on component mount
  useEffect(() => {
    getPredictions();
  }, [getPredictions]);

  // Calculate stats when predictions change
  useEffect(() => {
    if (predictions && predictions.length > 0) {
      setStats(calculateStats(predictions));
    }
  }, [predictions]);

  // Calculate the ratio for the gender gradient
  const totalGenderPredictions = stats.boys + stats.girls;
  const boyPercentage = totalGenderPredictions > 0 ? (stats.boys / totalGenderPredictions) * 100 : 50;
  const girlPercentage = totalGenderPredictions > 0 ? (stats.girls / totalGenderPredictions) * 100 : 50;
  
  // Colors for gender display
  const boyColor = '#1e40af'; // blue-800 for boy (darker blue)
  const girlColor = '#be185d'; // pink-800 for girl (darker pink)
  
  // Create gradient style based on the ratio
  const genderGradientStyle = {
    background: `linear-gradient(to right, ${boyColor} ${boyPercentage}%, ${girlColor} ${boyPercentage}%)`,
    height: '8px',
    borderRadius: '4px',
    marginTop: '8px'
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-500">Loading prediction stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Could not load prediction stats at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top row: Total, Gender, Popular Date */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Predictions */}
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center mb-3">
            <div className="rounded-full bg-gradient-to-br from-primary-100 to-primary-200 p-4 mr-4">
              <FiBarChart2 className="text-primary-700" size={20} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Predictions</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {stats.total === 1 
              ? 'One prediction has been submitted so far.' 
              : `${stats.total} predictions have been submitted so far.`}
          </p>
        </div>
        
        {/* Gender Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center mb-3">
            <div className="rounded-full bg-gradient-to-br from-primary-100 to-primary-200 p-4 mr-4">
              <FiBarChart2 className="text-primary-700" size={20} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Predicted Gender</h3>
              <p className="text-2xl font-bold text-gray-800">
                {`${stats.boys} ${stats.boys === 1 ? 'Boy' : 'Boys'} / ${stats.girls} ${stats.girls === 1 ? 'Girl' : 'Girls'}`}
              </p>
            </div>
          </div>
          
          {/* Gender ratio visualization */}
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-800 mr-1"></div>
                <span className="text-blue-800 font-medium">{Math.round(boyPercentage)}% Boys</span>
              </div>
              <div className="flex items-center">
                <span className="text-pink-800 font-medium">{Math.round(girlPercentage)}% Girls</span>
                <div className="w-3 h-3 rounded-full bg-pink-800 ml-1"></div>
              </div>
            </div>
            <div style={genderGradientStyle}></div>
          </div>
        </div>
        
        {/* Most Popular Date */}
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center mb-3">
            <div className="rounded-full bg-gradient-to-br from-primary-100 to-primary-200 p-4 mr-4">
              <FiCalendar className="text-primary-700" size={20} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Most Popular Date</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.mostPopularDate}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            This is the most common predicted birth date.
          </p>
        </div>
      </div>
      
      {/* Bottom row: Weight and Length */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Average Weight */}
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center mb-3">
            <div className="rounded-full bg-gradient-to-br from-primary-100 to-primary-200 p-4 mr-4">
              <FiActivity className="text-primary-700" size={20} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Average Predicted Weight</h3>
              <p className="text-2xl font-bold text-primary-700">{stats.averageWeight}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            The average of all predicted baby weights.
          </p>
        </div>
        
        {/* Average Length */}
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center mb-3">
            <div className="rounded-full bg-gradient-to-br from-primary-100 to-primary-200 p-4 mr-4">
              <FiTruck className="text-primary-700" size={20} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Average Predicted Length</h3>
              <p className="text-2xl font-bold text-primary-700">{stats.averageLength}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            The average of all predicted baby lengths.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessStats;