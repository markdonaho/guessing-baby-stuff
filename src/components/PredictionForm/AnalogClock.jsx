import React from 'react';

const AnalogClock = ({ hours, minutes }) => {
  // Calculate hand angles for the analog clock
  const hourAngle = (hours % 12) * 30 + minutes * 0.5; // 30 degrees per hour, plus a bit for minutes
  const minuteAngle = minutes * 6; // 6 degrees per minute

  return (
    <div className="relative w-28 h-28 rounded-full bg-white border-2 border-primary-200 shadow">
      {/* Clock face */}
      <div className="absolute inset-0 rounded-full">
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-2 bg-gray-300"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-50%)`,
              top: '50%',
              left: 'calc(50% - 0.125rem)',
              transformOrigin: '50% 0'
            }}
          />
        ))}
        
        {/* Hour hand */}
        <div className="absolute bg-black rounded-full" style={{
          width: '1.5px',
          height: '8px',
          bottom: '50%',
          left: 'calc(50% - 0.75px)',
          transformOrigin: 'bottom center',
          transform: `rotate(${hourAngle}deg)`
        }} />
        
        {/* Minute hand */}
        <div className="absolute bg-primary-600 rounded-full" style={{
          width: '1px',
          height: '11px',
          bottom: '50%',
          left: 'calc(50% - 0.5px)',
          transformOrigin: 'bottom center',
          transform: `rotate(${minuteAngle}deg)`
        }} />
        
        {/* Center dot */}
        <div className="absolute w-3 h-3 bg-primary-800 rounded-full" style={{
          top: 'calc(50% - 1.5px)',
          left: 'calc(50% - 1.5px)'
        }} />
      </div>
    </div>
  );
};

export default AnalogClock;