import { useState, useEffect } from 'react';

import Input from '../Input';

export default function DateAndTime({ setField }) {
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
  const [schedule, setSchedule] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('16:00');
  const [recurringDays, setRecurringDays] = useState([]);

  useEffect(() => {
    setField('time', { start: startTime, end: endTime });
  }, [startTime, endTime]);

  useEffect(() => {
    setField('recurring', recurringDays);
  }, [recurringDays]);
  return (
    <>
      <h2>Date & Time</h2>
      <div className="schedule-duration container">
        <p>Schedule duration</p>
        <div className={`box center ${!schedule ? 'selected' : ''}`}>
          <Input
            type="radio"
            name="auto"
            label=""
            checked={!schedule}
            onChange={() => setSchedule(false)}
          />
          <select
            className="short"
            defaultValue={3}
            onChange={(e) => setField('scheduleDuration', e.target.value)}>
            {advanceTimes.map((time) => (
              <option key={time.value} value={time.value}>
                {time.text}
              </option>
            ))}
          </select>
        </div>
        <div className={`box center ${schedule ? 'selected' : ''}`}>
          <Input
            type="radio"
            name="auto"
            label=""
            checked={schedule}
            onChange={() => setSchedule(true)}
          />
          <Input
            type="date"
            value={startDate.toLocaleDateString('sv-SV')}
            name="start-date"
            label="Start date"
            onChange={(e) => setStartDate(e.target.date)}
            labelOnFront
          />
          <Input
            type="date"
            value={endDate.toLocaleDateString('sv-SV')}
            name="end-date"
            label="End date"
            onChange={(e) => setEndDate(e.target.date)}
            labelOnFront
          />
        </div>
      </div>
      <div className="time container">
        <p>Time</p>
        <Input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          label="Start:"
          labelOnFront
        />
        <Input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          label="End:"
          labelOnFront
        />
      </div>
      <div className="recurrence container">
        <p>Recurring</p>
        <div className="recurrence-days">
          {days.map((day) => {
            return (
              <div className="recurrence-day" key={day}>
                <Input
                  type="checkbox"
                  checked={recurringDays.includes(day)}
                  onChange={(e) => {
                    setRecurringDays(
                      e.target.checked
                        ? [...recurringDays, day]
                        : recurringDays.filter((d) => d !== day)
                    );
                  }}
                  id={day}
                  name={day}
                  label={day}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
