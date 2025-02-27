import React, { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';

const TimePicker = ({ selectedTime, onChange }) => {
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState('AM');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the time picker with the selectedTime - ONLY ONCE
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

  // Handle combined time changes with a single function to prevent double updates
  const updateTime = (newHours, newMinutes, newPeriod) => {
    let hoursVal = newHours;
    
    // Convert to 24-hour format for the onChange handler
    if (newPeriod === 'PM' && newHours < 12) {
      hoursVal += 12;
    } else if (newPeriod === 'AM' && newHours === 12) {
      hoursVal = 0;
    }
    
    const newTime = `${hoursVal.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    onChange(newTime);
  };

  // Handle hour changes
  const handleHourChange = (e) => {
    const value = parseInt(e.target.value, 10) || 12;
    const newHours = Math.min(Math.max(value, 1), 12);
    setHours(newHours);
    updateTime(newHours, minutes, period);
  };

  // Handle minute changes
  const handleMinuteChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    const newMinutes = Math.min(Math.max(value, 0), 59);
    setMinutes(newMinutes);
    updateTime(hours, newMinutes, period);
  };

  // Handle AM/PM toggle
  const togglePeriod = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    setPeriod(newPeriod);
    updateTime(hours, minutes, newPeriod);
  };

  return (
    <div className="time-picker flex items-center space-x-2 border rounded-md p-2 bg-white">
      <div className="flex-1 flex items-center space-x-1">
        <input
          type="number"
          min="1"
          max="12"
          value={hours}
          onChange={handleHourChange}
          className="w-12 text-center border-0 focus:outline-none focus:ring-0"
        />
        <span>:</span>
        <input
          type="number"
          min="00"
          max="59"
          value={minutes}
          onChange={handleMinuteChange}
          className="w-12 text-center border-0 focus:outline-none focus:ring-0"
        />
      </div>
      
      <button
        type="button"
        onClick={togglePeriod}
        className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
      >
        {period}
      </button>
      
      <FiClock className="text-gray-400" />
    </div>
  );
};

export default TimePicker;