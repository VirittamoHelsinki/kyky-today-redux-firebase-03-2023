import { useState, useEffect } from 'react';

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

export default function Calendar({
  date,
  setDate,
  minYears = 5,
  maxYears = 50,
  locale = 'fi',
  highlightWeekDays = []
}) {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [years, setYears] = useState([]);

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
    setSelectedDay(date.getDate() + lastDaysOfPreviousMonth.length - 2);
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
      selectedDay !== date.getDate() + lastDaysOfPreviousMonth.length - 2
    ) {
      setDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          selectedDay - (getFirstDayOfMonth(currentYear, currentMonth) - 2)
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
    return new Date(year, month, 1).getDay();
  }

  function getDaysInMonth(year, month) {
    return 32 - new Date(year, month, 32).getDate();
  }

  function getLastDaysOfPreviousMonth(year, month, howManyDays) {
    const days = [];
    const lastDayOfPreviousMonth = new Date(year, month, 0).getDate();
    for (let i = lastDayOfPreviousMonth - howManyDays + 1; i <= lastDayOfPreviousMonth; i++) {
      days.push(i);
    }
    return days;
  }
  console.log(highlightWeekDays);

  // Messy as hell, but it works (for now)
  function getDaysToDisplay(year, month) {
    const numberOfDays = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const lastDaysOfPreviousMonth = getLastDaysOfPreviousMonth(year, month - 1, firstDayOfMonth);
    const daysTotal = Array(35).fill({ day: -1, isCurrentMonth: false });
    daysTotal.forEach((_, i) => {
      if (i + 1 < firstDayOfMonth) {
        daysTotal[i] = {
          day: lastDaysOfPreviousMonth[i + 1],
          isCurrentMonth: false
        };
      } else if (i + 1 < numberOfDays + firstDayOfMonth) {
        daysTotal[i] = {
          day: i + 2 - firstDayOfMonth,
          weekDay: weekDays[i % 7],
          isCurrentMonth: true
        };
      } else {
        daysTotal[i] = {
          day: i + 2 - firstDayOfMonth - numberOfDays,
          isCurrentMonth: false
        };
      }
    });
    return daysTotal;
  }

  return (
    <div className="minified-calendar">
      <div className="calendar-header">
        <div className="calendar-header-top">
          <button className="kyky-rounded" onClick={() => setDate(new Date())}>
            Today
          </button>
          <div className="calendar-select">
            <button className="arrow" onClick={() => changeMonth(currentMonth - 1)}>
              <i className="material-icons-outlined">chevron_left</i>
            </button>
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
            <button className="arrow" onClick={() => changeYear(currentYear - 1)}>
              <i className="material-icons-outlined">chevron_left</i>
            </button>
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
          {days.map((day, index) => (
            <div
              key={`day-${index}`}
              className={`calendar-day ${selectedDay === index ? 'selected' : ''} ${
                !day.isCurrentMonth ? 'disabled' : ''
              }${highlightWeekDays.includes(day.weekDay) ? ' highlight' : ''}`}
              onClick={() => setSelectedDay(index)}>
              {day.day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
