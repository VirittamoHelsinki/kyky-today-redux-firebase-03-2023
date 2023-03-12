import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];
const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const us_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Calendar({
  date,
  setDate,
  minYears = 5,
  maxYears = 50,
  highlightDays = [],
  enabledDays = us_days
}) {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [years, setYears] = useState([]);
  const [notificationDays, setNotificationDays] = useState([])

  useEffect(() => {
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
    setDays(getDaysToDisplay(date.getFullYear(), date.getMonth()));

    const firstDayOfMonth = getFirstDayOfMonth(date.getFullYear(), date.getMonth());
    const lastDaysOfPreviousMonth = getLastDaysOfPreviousMonth(
      date.getFullYear(),
      date.getMonth() - 1,
      firstDayOfMonth
    );
    setSelectedDay(date.getDate() + lastDaysOfPreviousMonth.length - 1);
  }, [date]);

  useEffect(() => {
    const firstDayOfMonth = getFirstDayOfMonth(date.getFullYear(), date.getMonth());
    const lastDaysOfPreviousMonth = getLastDaysOfPreviousMonth(
      date.getFullYear(),
      date.getMonth() - 1,
      firstDayOfMonth
    );
    if (
      selectedDay !== null &&
      selectedDay !== date.getDate() + lastDaysOfPreviousMonth.length - 1
    ) {
      setDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          selectedDay - (getFirstDayOfMonth(currentYear, currentMonth) - 1)
        )
      );
    }
  }, [selectedDay]);

  useEffect(() => {
    setYears(
      Array(maxYears)
        .fill(0)
        .map((_, i) => i + new Date().getFullYear() - minYears)
    );
  }, [minYears, maxYears]);

  useEffect(() => {
    setNotificationDays(enabledDays)
  }, [enabledDays])

  function changeMonth(month) {
    let year = currentYear;
    if (month > 11) {
      month = 0;
      year++;
    }
    if (month < 0) {
      month = 11;
      year--;
    }
    setDate(new Date(year, month, date.getDate()));
  }

  function changeYear(year) {
    setDate(new Date(year, currentMonth, date.getDate()));
  }

  function getFirstDayOfMonth(year, month) {
    return getTrueDay(new Date(year, month, 1));
  }

  function getDaysInMonthAsArray(year, month) {
    const lastDay = new Date(year, month + 1, 0).getDate();
    return new Array(lastDay).fill(0).map((_, i) => new Date(year, month, i + 1));
  }

  function getTrueDay(date) {
    let day = date.getDay();
    if (day === 0) return 6;
    return day - 1;
  }

  function getLastDaysOfPreviousMonth(year, month, howManyDays) {
    const days = [];
    const lastDayOfPreviousMonth = new Date(year, month + 1, 0).getDate();
    for (let i = lastDayOfPreviousMonth - howManyDays; i < lastDayOfPreviousMonth; i++) {
      days.push(new Date(year, month, i + 1));
    }
    return days;
  }

  function getFirstDaysOfNextMonth(year, month, howManyDays) {
    const days = [];
    for (let i = 1; i <= howManyDays; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }

  function getDaysToDisplay(year, month) {
    // Get the first day of the month
    const firstDayOfMonth = getTrueDay(new Date(year, month, 1));

    // Get list of the last days in the previous month (to fill the first row)
    const lastDaysOfPreviousMonth = getLastDaysOfPreviousMonth(year, month - 1, firstDayOfMonth);

    // Get the bulk of the days in the current month
    const daysInMonth = getDaysInMonthAsArray(year, month);

    // Merge first row with the bulk of the days
    let days = [...lastDaysOfPreviousMonth, ...daysInMonth];

    // Calculate how many days are needed to fill the last row
    const daysFromNextMonth = 42 - days.length;

    // Get the first days of the next month (to fill the last row)
    const firstDaysOfNextMonth = getFirstDaysOfNextMonth(year, month + 1, daysFromNextMonth);

    // Merge the last row with the bulk of the days
    days = [...days, ...firstDaysOfNextMonth];
    return days;
  }

  return (
    <div className="minified-calendar">
      <div className="calendar-header">
        <div className="calendar-header-top">
          <button className="kyky-rounded" onClick={() => setDate(new Date())}>
            Today
          </button>
          <div className="calendar-select">
            {currentMonth === 0 && currentYear === new Date().getFullYear() - minYears ? (
              <button className="arrow" disabled>
                <i className="material-icons-outlined">chevron_left</i>
              </button>
            ) : (
              <button className="arrow" onClick={() => changeMonth(currentMonth - 1)}>
                <i className="material-icons-outlined">chevron_left</i>
              </button>
            )}
            <select
              className="month-select rounded-select"
              value={currentMonth}
              onChange={(e) => {
                changeMonth(e.target.value);
              }}>
              {months.map((month, i) => (
                <option key={i} value={i}>
                  {month}
                </option>
              ))}
            </select>
            <button className="arrow" onClick={() => changeMonth(currentMonth + 1)}>
              <i className="material-icons-outlined">chevron_right</i>
            </button>
          </div>
          <div className="calendar-select">
            {currentYear === new Date().getFullYear() - minYears ? (
              <button className="arrow" disabled>
                <i className="material-icons-outlined">chevron_left</i>
              </button>
            ) : (
              <button className="arrow" onClick={() => changeYear(currentYear - 1)}>
                <i className="material-icons-outlined">chevron_left</i>
              </button>
            )}
            <select
              className="year-select rounded-select"
              value={years.find((n) => {
                return n === currentYear;
              })}
              onChange={(e) => {
                changeYear(e.target.value);
              }}>
              {years.map((year, i) => (
                <option key={i} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <button className="arrow" onClick={() => changeYear(currentYear + 1)}>
              <i className="material-icons-outlined">chevron_right</i>
            </button>
          </div>
        </div>
        <div className="calendar-header-bottom">
          {weekDays.map((day, i) => (
            <div key={i} className="calendar-header-day">
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="calendar-body">
        <div className="calendar-days">
          {days.map((day, index) => {
            const isCurrentMonth = day.getMonth() === currentMonth;
            const highlight = isCurrentMonth && highlightDays[day.getDate() - 1]?.highlight;
            const disabled = !isCurrentMonth || !notificationDays.includes(us_days[day.getDay()]);
            return (
              <div
                key={`day-${index}`}
                className={`calendar-day ${selectedDay === index ? 'selected' : ''} ${
                  disabled ? 'disabled' : ''
                }${highlight ? ' highlight' : ''}`}
                onClick={() => {
                  if (!disabled) {
                    setSelectedDay(index)
                  }
                }}>
                {day.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
  minYears: PropTypes.number,
  maxYears: PropTypes.number,
  highlightDays: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.instanceOf(Date),
      highlight: PropTypes.bool
    })
  )
};
