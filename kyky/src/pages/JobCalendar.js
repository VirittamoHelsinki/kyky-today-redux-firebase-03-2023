import { useState, useEffect } from 'react';
import '../styles/JobCalendar.scss';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const years = Array(50)
  .fill(0)
  .map((_, i) => i + 2019);
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export default function JobCalendar() {
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    setDays(getDaysToDisplay(date.getFullYear(), date.getMonth()));
  }, [date]);
  useEffect(() => {
    setDate(new Date(date.getFullYear(), date.getMonth(), selectedDay));
  }, [selectedDay]);
  function getDaysInMonth(year, month) {
    return 32 - new Date(year, month, 32).getDate();
  }

  function getDaysToDisplay(year, month) {
    const numberOfDays = getDaysInMonth(year, month);
    const daysArr = Array(35).fill(null);
    for (let i = 0; i < daysArr.length; i++) {
      if (i + 1 > numberOfDays) {
        daysArr[i] = i + 1 - numberOfDays;
      } else {
        daysArr[i] = i + 1;
      }
    }
    return daysArr;
  }

  return (
    <div>
      {' '}
      <div className="MainContainer">
        <div className="monthYear">
          <button className="todayButton">Today</button>
          <select
            className="month-select"
            value={date.getMonth()}
            onChange={(e) => {
              setDate(new Date(date.getFullYear(), e.target.value, date.getDate()));
            }}>
            {months.map((month, i) => (
              <option key={i} value={i}>
                {month}
              </option>
            ))}
          </select>
          <select
            className="year-select"
            value={years.find((n) => {
              return n === date.getFullYear();
            })}
            onChange={(e) => {
              setDate(new Date(e.target.value, date.getMonth(), date.getDate()));
            }}>
            {years.map((year, i) => (
              <option key={i} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="weekDays">
          {weekDays.map((week) => (
            <span key={week}>{week}</span>
          ))}
        </div>
        <div className="job-calendar">
          <div className="calendar-days">
            {days.map((day, index) => (
              <div
                key={`day-${index}`}
                className={`calendar-day ${selectedDay === index ? 'selected' : ''} ${
                  index > day ? 'disabled' : ''
                }`}
                onClick={() => setSelectedDay(index)}>
                {day}
              </div>
            ))}
          </div>
        </div>
        <div className="addScheduleContainer">
          <button className= "scheduleButton">+ Add a schedule</button>
        </div>
      </div>
    </div>
  );
}
