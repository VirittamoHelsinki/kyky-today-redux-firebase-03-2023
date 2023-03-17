import React from 'react';

const TimeSelect = ({ setTime, startTime, endTime }) => {
  const start_split = startTime.split(':');
  const end_split = endTime.split(':');
  const start = parseInt(start_split[0]) || 0;
  const end = parseInt(end_split[0]) || 23;
  let values = [];
  for (let i = start; i < end; i++) {
    values.push(i + ':00');
    values.push(i + ':15');
    values.push(i + ':30');
    values.push(i + ':45');
  }
  values.push(end + ':00');
  return (
    <select className="time-select" onChange={(e) => setTime(e.target.value)}>
      {values.map((value, index) => (
        <option value={value} key={index}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default TimeSelect;
