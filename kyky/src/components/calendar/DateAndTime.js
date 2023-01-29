import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';

export default function DateAndTime({ properties, setField, setCanContinue }) {
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
  const [schedule, setSchedule] = useState(properties.scheduleDuration.months === null);
  const [months, setMonths] = useState(properties.scheduleDuration.months || 3);
  const [startDate, setStartDate] = useState(
    new Date(properties.scheduleDuration.startDate) || new Date()
  );
  const [endDate, setEndDate] = useState(
    new Date(properties.scheduleDuration.endDate) || new Date()
  );
  const [startTime, setStartTime] = useState(properties.time.start);
  const [endTime, setEndTime] = useState(properties.time.end);
  const [recurringDays, setRecurringDays] = useState(properties.recurring);
  const [dateFieldError, setDateFieldError] = useState(false);
  const [timeFieldError, setTimeFieldError] = useState(false);

  useEffect(() => {
    checkIfCanContinue();
    if (schedule) {
      setField('scheduleDuration', {
        months: null,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      });
    } else {
      setField('scheduleDuration', {
        months: months,
        startDate: null,
        endDate: null
      });
    }
  }, [schedule, months, startDate, endDate]);

  useEffect(() => {
    checkIfCanContinue();
    setField('time', { start: startTime, end: endTime });
  }, [startTime, endTime]);

  useEffect(() => {
    if (recurringDays.length === 0) {
      setField('recurringDays', days);
    } else setField('recurring', recurringDays);
  }, [recurringDays]);

  function checkIfCanContinue() {
    let can = true;
    if (schedule) {
      if (startDate.getTime() > endDate.getTime()) {
        can = false;
        setDateFieldError(true);
      } else {
        setDateFieldError(false);
      }
    }
    if (parseInt(startTime) > parseInt(endTime)) {
      can = false;
      setTimeFieldError(true);
    } else {
      setTimeFieldError(false);
    }

    setCanContinue(can);
    return can;
  }
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
          <select className="short" value={months} onChange={(e) => setMonths(+e.target.value)}>
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
            onChange={(e) => setStartDate(new Date(e.target.value))}
            labelOnFront
          />
          <Input
            type="date"
            value={endDate.toLocaleDateString('sv-SV')}
            name="end-date"
            label="End date"
            onChange={(e) => setEndDate(new Date(e.target.value))}
            labelOnFront
          />
          {dateFieldError && (
            <div className="error">
              <i className="material-icons-outlined">error_outline</i>
              <div>
                Check the fields.
                <ul>
                  <li>Start date can't be later than end date.</li>
                  <li>Date must be in format: Day-Month-Year</li>
                  <li>Date field cannot be empty</li>
                </ul>
              </div>
            </div>
          )}
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
        {timeFieldError && (
          <div className="error">
            <i className="material-icons-outlined">error_outline</i>
            <div>
              Check the fields.
              <ul>
                <li>Start time can't be later than end time.</li>
                <li>Time must be in format: hh:mm</li>
              </ul>
            </div>
          </div>
        )}
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

DateAndTime.propTypes = {
  properties: PropTypes.shape({
    recurring: PropTypes.arrayOf(PropTypes.string).isRequired,
    scheduleDuration: PropTypes.shape({
      months: PropTypes.number,
      startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    }).isRequired,
    time: PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  setField: PropTypes.func.isRequired,
  setCanContinue: PropTypes.func.isRequired
};
