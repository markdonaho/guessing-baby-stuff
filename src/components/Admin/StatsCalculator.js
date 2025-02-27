// src/components/Admin/StatsCalculator.js
import { formatDate } from '../../utils/formatters';

export const calculateStats = (predictions) => {
  if (!predictions || predictions.length === 0) {
    return {
      total: 0,
      boys: 0,
      girls: 0,
      averageWeight: '7 lbs 8 oz',
      averageLength: '21.0 inches',
      mostPopularDate: 'No data',
    };
  }
  
  try {
    // Basic counts
    const boysCount = predictions.filter(p => p.gender === 'Boy').length;
    const girlsCount = predictions.filter(p => p.gender === 'Girl').length;
    
    // Date analysis
    const dateFrequency = {};
    
    predictions.forEach(p => {
      try {
        if (p.date) {
          const dateStr = formatDate(p.date);
          if (dateStr && dateStr !== 'Invalid date') {
            dateFrequency[dateStr] = (dateFrequency[dateStr] || 0) + 1;
          }
        }
      } catch (err) {
        console.error('Error processing date for frequency:', err);
      }
    });
    
    let mostPopularDate = 'No data';
    let maxFrequency = 0;
    
    Object.entries(dateFrequency).forEach(([date, count]) => {
      if (count > maxFrequency) {
        mostPopularDate = date;
        maxFrequency = count;
      }
    });
    
    // Weight calculation
    let totalWeightInOunces = 0;
    let weightCount = 0;
    
    predictions.forEach(p => {
      try {
        // Parse weight like "7 lbs 8 oz"
        if (typeof p.weight === 'string') {
          const weightMatch = p.weight.match(/(\d+)\s*lbs\s*(\d+)\s*oz/);
          if (weightMatch) {
            const pounds = parseInt(weightMatch[1], 10);
            const ounces = parseInt(weightMatch[2], 10);
            totalWeightInOunces += (pounds * 16) + ounces;
            weightCount++;
          }
        } else if (p.weight && typeof p.weight === 'object') {
          // Handle object format {pounds: 7, ounces: 8}
          if (p.weight.pounds !== undefined && p.weight.ounces !== undefined) {
            totalWeightInOunces += (p.weight.pounds * 16) + p.weight.ounces;
            weightCount++;
          }
        }
      } catch (err) {
        console.error('Error processing weight:', err);
      }
    });
    
    // Length calculation
    let totalLengthInInches = 0;
    let lengthCount = 0;
    
    predictions.forEach(p => {
      try {
        // Parse length like "21 inches"
        if (typeof p.length === 'string') {
          const lengthMatch = p.length.match(/(\d+\.?\d*)\s*inches?/);
          if (lengthMatch) {
            totalLengthInInches += parseFloat(lengthMatch[1]);
            lengthCount++;
          }
        } else if (typeof p.length === 'number') {
          totalLengthInInches += p.length;
          lengthCount++;
        }
      } catch (err) {
        console.error('Error processing length:', err);
      }
    });
    
    // Calculate averages
    let averageWeight = '7 lbs 8 oz'; // Default
    let averageLength = '21.0 inches'; // Default
    
    if (weightCount > 0) {
      const avgWeightInOunces = totalWeightInOunces / weightCount;
      const avgWeightPounds = Math.floor(avgWeightInOunces / 16);
      const avgWeightOunces = Math.round(avgWeightInOunces % 16);
      averageWeight = `${avgWeightPounds} lbs ${avgWeightOunces} oz`;
    }
    
    if (lengthCount > 0) {
      const avgLengthInInches = totalLengthInInches / lengthCount;
      averageLength = `${avgLengthInInches.toFixed(1)} inches`;
    }
    
    // Format most popular date with count - handle singular/plural
    const mostPopularDateDisplay = maxFrequency > 0 
      ? `${mostPopularDate} (${maxFrequency} ${maxFrequency === 1 ? 'guess' : 'guesses'})` 
      : 'No data';
    
    return {
      total: predictions.length,
      boys: boysCount,
      girls: girlsCount,
      averageWeight,
      averageLength,
      mostPopularDate: mostPopularDateDisplay,
    };
  } catch (err) {
    console.error('Error calculating stats:', err);
    return {
      total: 0,
      boys: 0,
      girls: 0,
      averageWeight: '7 lbs 8 oz',
      averageLength: '21.0 inches',
      mostPopularDate: 'No data',
    };
  }
};

export const filterAndSortPredictions = (predictions, searchTerm, genderFilter, sortOption) => {
  if (!predictions || predictions.length === 0) return [];
  
  try {
    let filtered = [...predictions];
    
    // Apply gender filter
    if (genderFilter !== 'all') {
      filtered = filtered.filter(pred => pred.gender === genderFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(pred => 
        pred.name && pred.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting with timestamp handling
    filtered.sort((a, b) => {
      try {
        const [field, direction] = sortOption.split('-');
        
        if (field === 'createdAt') {
          // Handle Firestore timestamps for createdAt
          const timeA = a.createdAt && a.createdAt.seconds ? a.createdAt.seconds : 0;
          const timeB = b.createdAt && b.createdAt.seconds ? b.createdAt.seconds : 0;
          return direction === 'desc' ? timeB - timeA : timeA - timeB;
        }
        
        if (field === 'name') {
          const nameA = a.name || '';
          const nameB = b.name || '';
          return direction === 'desc' ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
        }
        
        if (field === 'date') {
          // Handle Firestore timestamps for date
          const dateA = a.date && a.date.seconds ? a.date.seconds : 0;
          const dateB = b.date && b.date.seconds ? b.date.seconds : 0;
          return direction === 'desc' ? dateB - dateA : dateA - dateB;
        }
        
        return 0;
      } catch (err) {
        console.error('Error during sort:', err);
        return 0;
      }
    });
    
    return filtered;
  } catch (err) {
    console.error('Error filtering predictions:', err);
    return [];
  }
};