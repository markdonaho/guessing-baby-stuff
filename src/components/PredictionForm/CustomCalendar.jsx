import React, { useState } from 'react';

const CustomCalendar = ({ selectedDate, onChange }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  
  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long' });
  };
  
  // Get the year
  const getYear = (date) => {
    return date.getFullYear();
  };
  
  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week of first day in month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };
  
  // Navigate to next month
  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };
  
  // Check if a date is the same as the selected date (ignoring time)
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };
  
  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return isSameDay(date, today);
  };
  
  // Create the calendar grid
  const createCalendarGrid = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Add cells for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && isSameDay(date, selectedDate);
      const isTodayDate = isToday(date);
      
      days.push(
        <button
          key={day}
          type="button"
          onClick={() => onChange(date)}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
            ${isSelected 
              ? 'bg-primary-600 text-white' 
              : isTodayDate 
                ? 'bg-primary-100 text-primary-800'
                : 'hover:bg-gray-100'}`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };
  
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  return (
    <div className="custom-calendar w-full max-w-xs border border-gray-200 rounded-lg shadow-sm bg-white">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        <span className="text-lg font-medium">
          {`${getMonthName(currentMonth)} ${getYear(currentMonth)}`}
        </span>
        
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-1 py-2 px-3 text-center">
        {weekDays.map(day => (
          <div key={day} className="text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 p-3 pt-0">
        {createCalendarGrid()}
      </div>
      
      {/* Current selection (optional) */}
      {selectedDate && (
        <div className="border-t p-3 text-center bg-gray-50 rounded-b-lg">
          <span className="font-medium text-primary-700">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;