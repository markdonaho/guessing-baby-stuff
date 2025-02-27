import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = ({ selectedDate, onChange }) => {
  // Set min/max date range (e.g., reasonable range around due date)
  const today = new Date();
  const minDate = new Date(today);
  minDate.setMonth(minDate.getMonth() - 1);
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 3);

  // Set default date to March 1st, 2025
  const defaultDate = new Date(2025, 2, 1); // Month is 0-based, so 2 = March

  return (
    <div className="date-picker w-full flex justify-center">
      <ReactDatePicker
        selected={selectedDate || defaultDate}
        onChange={onChange}
        dateFormat="MM/dd/yyyy"
        minDate={minDate}
        maxDate={maxDate}
        inline 
        showPopperArrow={false}
        className="form-input"
        calendarClassName="!fixed" 
        wrapperClassName="!static" 
      />
    </div>
  );
};

export default DatePicker;