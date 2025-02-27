// src/components/PredictionForm/ImprovedTimePicker.jsx
import React, { useState, useEffect } from 'react';
import { FiClock, FiChevronUp, FiChevronDown } from 'react-icons/fi';

const ImprovedTimePicker = ({ selectedTime, onChange }) => {
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState('AM');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the time picker with the selectedTime
  useEffect(() => {
    if (!isInitialized && selectedTime) {
      const [hoursStr, minutesStr] = selectedTime.split(':');
      const hoursVal = parseInt(hoursStr, 10);
      
      setHours(hoursVal > 12 ? hoursVal - 12 : (hoursVal === 0 ? 12 : hoursVal));
      setMinutes(parseInt(minutesStr, 10));
      setPeriod(hoursVal >= 12 ? 'PM' : 'AM');
      setIsInitialized(true);
    }
  }, [selectedTime, isInitialized]);

  // Handle hour changes
  const handleHourChange = (newHours) => {
    // Ensure hours is between 1 and 12
    const validHours = Math.min(Math.max(newHours, 1), 12);
    setHours(validHours);
    updateTime(validHours, minutes, period);
  };

  // Handle minute changes
  const handleMinuteChange = (newMinutes) => {
    // Ensure minutes is between 0 and 59
    const validMinutes = Math.min(Math.max(newMinutes, 0), 59);
    setMinutes(validMinutes);
    updateTime(hours, validMinutes, period);
  };

  // Handle AM/PM toggle
  const togglePeriod = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    setPeriod(newPeriod);
    updateTime(hours, minutes, newPeriod);
  };

  // Update the time and call onChange
  const updateTime = (h, m, p) => {
    let hoursVal = h;
    
    // Convert to 24-hour format for the onChange handler
    if (p === 'PM' && h < 12) {
      hoursVal += 12;
    } else if (p === 'AM' && h === 12) {
      hoursVal = 0;
    }
    
    const formattedTime = `${hoursVal.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    onChange(formattedTime);
  };

  return (
    <div className="improved-time-picker">
      <div className="flex items-center justify-between border rounded-lg p-3 bg-white">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => handleHourChange(hours + 1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <FiChevronUp />
          </button>
          <div className="w-10 text-center font-bold text-lg">{hours}</div>
          <button
            type="button"
            onClick={() => handleHourChange(hours - 1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <FiChevronDown />
          </button>
        </div>
        
        <div className="text-xl font-bold">:</div>
        
        {/* Minutes */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => handleMinuteChange(minutes + 5)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <FiChevronUp />
          </button>
          <div className="w-10 text-center font-bold text-lg">{minutes.toString().padStart(2, '0')}</div>
          <button
            type="button"
            onClick={() => handleMinuteChange(minutes - 5)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <FiChevronDown />
          </button>
        </div>
        
        {/* AM/PM */}
        <button
          type="button"
          onClick={togglePeriod}
          className="bg-primary-50 hover:bg-primary-100 px-3 py-2 rounded-lg font-medium text-primary-700"
        >
          {period}
        </button>
      </div>
    </div>
  );
};

export default ImprovedTimePicker;