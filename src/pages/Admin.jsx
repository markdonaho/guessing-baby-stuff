// src/pages/Admin.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { formatDate, formatTime } from '../utils/formatters';
import { usePredictions } from '../hooks/usePredictions';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import StatsOverview from '../components/Admin/StatsOverview';
import FilterControls from '../components/Admin/FilterControls';
import PredictionsTable from '../components/Admin/PredictionsTable';
import { calculateStats, filterAndSortPredictions } from '../components/Admin/StatsCalculator';

const Admin = () => {
  const { predictions, isLoading, error, getPredictions } = usePredictions();
  const [filteredPredictions, setFilteredPredictions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('createdAt-desc');
  const [genderFilter, setGenderFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    boys: 0,
    girls: 0,
    averageWeight: '7 lbs 8 oz',
    averageLength: '21.0 inches',
    mostPopularDate: 'Calculating...',
  });
  
  // Fetch predictions ONLY ONCE on component mount
  useEffect(() => {
    console.log("Fetching predictions...");
    getPredictions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once
  
  // Update stats and filtered predictions when needed
  useEffect(() => {
    if (predictions && predictions.length > 0) {
      console.log("Updating stats and filtered predictions");
      setStats(calculateStats(predictions));
      setFilteredPredictions(filterAndSortPredictions(predictions, searchTerm, genderFilter, sortOption));
    }
  }, [predictions, searchTerm, genderFilter, sortOption]);
  
  const handleDownloadCSV = () => {
    if (filteredPredictions.length === 0) return;
    
    try {
      const headers = ['Name', 'Date', 'Time', 'Weight', 'Length', 'Gender', 'Submitted'];
      const rows = filteredPredictions.map(pred => [
        pred.name || '',
        formatDate(pred.date) || '',
        formatTime(pred.time) || '',
        pred.weight || '',
        pred.length || '',
        pred.gender || '',
        formatDate(pred.createdAt) || ''
      ]);
      
      // Create CSV content
      let csvContent = headers.join(',') + '\n';
      rows.forEach(row => {
        csvContent += row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(',') + '\n';
      });
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'baby_predictions.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error generating CSV:', err);
      alert('Error generating CSV file. Please try again.');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Baby Prediction Admin</h1>
        <p className="text-gray-600">View and manage submitted predictions</p>
      </div>
      
      {/* Stats Overview */}
      <StatsOverview stats={stats} />
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Filter Controls */}
        <FilterControls 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        
        {/* Predictions Table or Loading/Error States */}
        {isLoading ? (
          <div className="py-8 text-center">
            <LoadingSpinner size="large" />
            <p className="mt-4 text-gray-600">Loading predictions...</p>
          </div>
        ) : error ? (
          <div className="py-8 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filteredPredictions.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-600">No predictions found.</p>
          </div>
        ) : (
          <PredictionsTable 
            predictions={filteredPredictions} 
            handleDownloadCSV={handleDownloadCSV} 
          />
        )}
      </div>
    </div>
  );
};

export default Admin;