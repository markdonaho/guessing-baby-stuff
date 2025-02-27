import React from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

const WeightPicker = ({ weight, onChange }) => {
  const { pounds, ounces } = weight;

  const handlePoundsChange = (newValue) => {
    // Ensure pounds is between 0 and 20
    const clampedValue = Math.min(Math.max(newValue, 0), 20);
    onChange({ pounds: clampedValue, ounces });
  };

  const handleOuncesChange = (newValue) => {
    // Ensure ounces is between 0 and 15
    const clampedValue = Math.min(Math.max(newValue, 0), 15);
    onChange({ pounds, ounces: clampedValue });
  };

  return (
    <div className="weight-picker flex items-center space-x-4">
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="p-1 rounded hover:bg-gray-100"
          onClick={() => handlePoundsChange(pounds + 1)}
        >
          <FiChevronUp />
        </button>
        <div className="flex items-end">
          <input
            type="number"
            min="0"
            max="20"
            value={pounds}
            onChange={(e) => handlePoundsChange(parseInt(e.target.value, 10) || 0)}
            className="w-16 text-center border p-2 rounded"
          />
          <span className="ml-1 text-sm text-gray-600">lbs</span>
        </div>
        <button
          type="button"
          className="p-1 rounded hover:bg-gray-100"
          onClick={() => handlePoundsChange(pounds - 1)}
        >
          <FiChevronDown />
        </button>
      </div>
      
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="p-1 rounded hover:bg-gray-100"
          onClick={() => handleOuncesChange(ounces + 1)}
        >
          <FiChevronUp />
        </button>
        <div className="flex items-end">
          <input
            type="number"
            min="0"
            max="15"
            value={ounces}
            onChange={(e) => handleOuncesChange(parseInt(e.target.value, 10) || 0)}
            className="w-16 text-center border p-2 rounded"
          />
          <span className="ml-1 text-sm text-gray-600">oz</span>
        </div>
        <button
          type="button"
          className="p-1 rounded hover:bg-gray-100"
          onClick={() => handleOuncesChange(ounces - 1)}
        >
          <FiChevronDown />
        </button>
      </div>
    </div>
  );
};

export default WeightPicker;