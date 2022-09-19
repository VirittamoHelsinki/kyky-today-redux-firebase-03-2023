import { useState } from 'react';

import Input from '../Input';

export default function DateAndTime() {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  // value is in months
  const advanceTimes = [
    { value: 0.5, text: '2 weeks' },
    { value: 1, text: '1 month' },
    { value: 2, text: '2 months' },
    { value: 3, text: '3 months' },
    { value: 6, text: '6 months' },
    { value: 12, text: '12 months' }
  ];
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <>
      <h2>Date & Time</h2>
      <div className="schedule-duration container">
        <p>Schedule duration</p>
        <Input type="radio" name="auto" label="" />
        <select className="short" defaultValue={3}>
          {advanceTimes.map((time) => (
            <option key={time.value} value={time.value}>
              {time.text}
            </option>
          ))}
        </select>
        <Input type="radio" name="auto" label="" />
        <Input
          type="date"
          value={startDate.toLocaleDateString('sv-SV')}
          name="start-date"
          label="Start date"
          labelOnFront
        />
        <Input
          type="date"
          value={endDate.toLocaleDateString('sv-SV')}
          name="end-date"
          label="End date"
          labelOnFront
        />
      </div>
      <div className="time container">
        <p>Time</p>
        <Input type="time" value={'08:00'} label="Start:" labelOnFront />
        <Input type="time" value={'16:00'} label="End:" labelOnFront />
      </div>
      <div className="recurrence container">
        <p>Recurring</p>
        <div className="recurrence-days">
          {days.map((day) => {
            return (
              <div className="recurrence-day" key={day}>
                <Input type="checkbox" name={day} label={day} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
