import React from 'react';

const LengthPicker = ({ length, onChange }) => {
  const handleLengthChange = (newValue) => {
    // Ensure length is between 12 and 30 inches
    const clampedValue = Math.min(Math.max(newValue, 12), 30);
    onChange(clampedValue);
  };

  // Handle 0.5 inch increments
  const increment = () => {
    handleLengthChange(length + 0.5);
  };

  const decrement = () => {
    handleLengthChange(length - 0.5);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={increment}
          className="w-full p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-primary-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        <div className="flex items-center py-2">
          <input
            type="number"
            min="12"
            max="30"
            step="0.5"
            value={length}
            onChange={(e) => handleLengthChange(parseFloat(e.target.value) || 12)}
            className="w-16 text-center border border-gray-300 p-1 rounded"
          />
          <span className="ml-1 text-sm text-gray-600">in</span>
        </div>
        
        <button
          type="button"
          onClick={decrement}
          className="w-full p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-primary-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="bg-primary-50 rounded-lg py-2 px-4 text-center">
        <span className="text-lg font-bold text-primary-700">
          {length} inches
        </span>
      </div>
    </div>
  );
};

export default LengthPicker;