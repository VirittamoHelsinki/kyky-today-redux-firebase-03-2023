import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from '../../redux/sellers/calendarScheduleSlice';
import { fetchBookingsByQuery } from '../../redux/buyers/serviceBookingSlice';
import { useOutletContext } from 'react-router-dom';
import '../../styles/JobCalendar.scss';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';

import activities from '../../activities.json';

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

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekDaysHeader = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];
const weekDaysArray = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export default function JobCalendar() {
  const [setSelectedWindow, setEditing, setScheduleWindow] = useOutletContext();
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [currentActivities, setCurrentActivities] = useState([]);
  const [currentJob, setCurrentJob] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [openedSchedules, setOpenedSchedules] = useState([]);
  const [highlightDays, setHighlightDays] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [activities, setActivities] = useState([]);

  const user = useSelector((state) => state.user.user);
  const _schedules = useSelector((state) => state.schedule);
  const _bookings = useSelector((state) => state.booking.bookings);
  const isLoading = useSelector((state) => state.schedule.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    getSchedules();
  }, [currentJob, _schedules]);

  useEffect(() => {
    const keys = Object.keys(_schedules).filter((key) => key.includes('_schedules'));
    const job_list = [];
    keys.forEach((k) => {
      k = k.slice(0, -10);
      job_list.push(k);
    });
    setJobs(job_list.sort());
    if (currentJob === '' && jobs.length > 0) {
      setCurrentJob(jobs[0]);
    }
  }, [_schedules]);

  useEffect(() => {
    if (_bookings) {
      setActivities(_bookings);
    }
  }, [_bookings]);

  useEffect(() => {
    const allDaysOfMonth = getDaysInMonthAsArray(date.getFullYear(), date.getMonth());
    const daysToHighlight = [];
    allDaysOfMonth.forEach((day) => {
      const dayOfWeek = day.getDay();
      const dayOfWeekString = weekDaysArray[dayOfWeek];
      const _schedules = schedules.filter((schedule) => {
        return checkWeekdaySchedule(schedule, dayOfWeekString);
      });
      daysToHighlight.push({ day, highlight: _schedules.length > 0 });
    });
    setHighlightDays(daysToHighlight);
  }, [schedules]);

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
    getSchedules();
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
    if (user.uid) {
      dispatch(fetchSchedules(user.uid));
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchBookingsByQuery(user.uid));
  }, []);

  function getSchedules() {
    const schedules = _schedules[currentJob + '_schedules'] || [];
    setSchedules(schedules);
  }

  function checkWeekdaySchedule(schedule, weekDay) {
    return schedule.recurring.findIndex((day) => day === weekDay) !== -1;
  }

  function getDaysInMonth(year, month) {
    return 32 - new Date(year, month, 32).getDate();
  }

  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  function getLastDaysOfPreviousMonth(year, month, howManyDays) {
    const days = [];
    const lastDayOfPreviousMonth = new Date(year, month + 1, 0).getDate();
    for (let i = lastDayOfPreviousMonth - howManyDays; i < lastDayOfPreviousMonth; i++) {
      days.push(new Date(year, month, i + 1));
    }
    return days;
  }

  function getTrueDay(date) {
    let day = date.getDay();
    if (day === 0) return 6;
    return day - 1;
  }

  function getDaysInMonthAsArray(year, month) {
    const lastDay = new Date(year, month + 1, 0).getDate();
    return new Array(lastDay).fill(0).map((_, i) => new Date(year, month, i + 1));
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
    const daysFromNextMonth = 35 - days.length;

    // Get the first days of the next month (to fill the last row)
    const firstDaysOfNextMonth = getFirstDaysOfNextMonth(year, month + 1, daysFromNextMonth);

    // Merge the last row with the bulk of the days
    days = [...days, ...firstDaysOfNextMonth];
    return days;
  }

  useEffect(() => {
    setSelectedWindow('job-calendar');
  }, []);

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

  return (
    <div>
      {' '}
      <div className="MainContainer">
        <div className="calendar-container">
          <div className="job-select">
            {jobs.length === 0 ? (
              <select disabled>
                <option value="none">None selected</option>
              </select>
            ) : (
              <select
                onChange={(e) => {
                  setCurrentJob(e.target.value);
                }}>
                {jobs.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="monthYear">
            <button className="todayButton" onClick={() => setDate(new Date())}>
              Today
            </button>{' '}
            <button className="arrow" onClick={() => changeMonth(currentMonth - 1)}>
              <i className="material-icons-outlined">chevron_left</i>
            </button>
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
            <button className="arrow" onClick={() => changeMonth(currentMonth + 1)}>
              <i className="material-icons-outlined">chevron_right</i>
            </button>
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
            {weekDaysHeader.map((week) => (
              <span key={week}>{week}</span>
            ))}
          </div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="job-calendar">
              <div className="calendar-days">
                {days.map((day, index) => {
                  const isCurrentMonth = day.getMonth() === date.getMonth();
                  const disabled =
                    !isCurrentMonth ||
                    (day.getDate() < new Date().getDate() &&
                      day.getMonth() <= new Date().getMonth() &&
                      day.getFullYear() <= new Date().getFullYear()) ||
                    (day.getMonth() < new Date().getMonth() &&
                      day.getFullYear() <= new Date().getFullYear());
                  /* Convoluted mess, just makes totally sure to display current day correctly */
                  const curr =
                    isCurrentMonth &&
                    day.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear();
                  const activitiesToday = activities.filter(
                    (activity) =>
                      new Date(activity.date).toISOString().slice(0, 10) ===
                        new Date(date.getFullYear(), date.getMonth(), day.getDate())
                          .toISOString()
                          .slice(0, 10) && activity.jobId === currentJob
                  );
                  const confirmed = activitiesToday.filter((activity) => activity.confirmed);
                  const pending = activitiesToday.filter((activity) => !activity.confirmed);
                  return (
                    <div
                      key={`day-${index}`}
                      className={`calendar-day${selectedDay === index ? ' selected' : ''}${
                        disabled ? ' disabled' : ''
                      }${highlightDays[day.getDate()]?.highlight ? ' highlight' : ''}`}
                      onClick={() => {
                        if (!disabled) {
                          setSelectedDay(index);
                          setCurrentActivities(activitiesToday);
                        }
                      }}>
                      <span className={`date${curr ? ' current' : ''}`}>{day.getDate()}</span>
                      {activitiesToday.length > 0 && (
                        <div className="activities">
                          {confirmed.length > 0 && (
                            <div className="confirmed">
                              <i className="material-icons-outlined">check_circle</i>
                              <span>{confirmed.length} Confirmed</span>
                            </div>
                          )}
                          {pending.length > 0 && (
                            <div className="pending">
                              <i className="material-icons-outlined">priority_high</i>
                              <span>{pending.length} Pending</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="addScheduleContainer">
          {' '}
          <p className="scheduleDate">
            <strong>{weekDays[date.getDay()]}</strong> {date.toLocaleDateString('fi-fi')}
          </p>
          {currentActivities.length > 0 ? (
            <div className="schedules">
              {schedules.map((schedule) => {
                let _id = schedule.jobId + schedule.time.start;
                const activitiesNow = currentActivities.filter(
                  (activity) =>
                    activity.time.start < schedule.time.end &&
                    activity.time.end > schedule.time.start
                );
                if (activitiesNow.length === 0) {
                  return null;
                }
                const confirmed = activitiesNow.filter((activity) => activity.confirmed);
                const pending = activitiesNow.filter((activity) => !activity.confirmed);
                return (
                  <div className="schedule" key={schedule.id}>
                    <div className="schedule-details">
                      <Button className="expand">
                        <i
                          className="material-icons-outlined"
                          onClick={() => {
                            if (openedSchedules.includes(_id)) {
                              setOpenedSchedules(openedSchedules.filter((id) => id !== _id));
                            } else {
                              setOpenedSchedules([...openedSchedules, _id]);
                            }
                          }}>
                          {openedSchedules.includes(_id) ? 'expand_less' : 'expand_more'}
                        </i>
                      </Button>
                      <i className="material-icons-outlined">edit</i>
                      <p>
                        {schedule.time.start} - {schedule.time.end}
                      </p>
                      <p>
                        <i className="material-icons-outlined">event_available</i>(
                        {confirmed.length})
                      </p>
                      <p>
                        <i className="material-icons-outlined">running_with_errors</i>(
                        {pending.length})
                      </p>
                    </div>
                    <div className={`activities${openedSchedules.includes(_id) ? ' open' : ''}`}>
                      {activitiesNow.map((activity) => {
                        /* This should eventually check the schedule actually matches week day, but not yet! */
                        if (
                          activity.time.start > schedule.time.end ||
                          activity.time.end < schedule.time.start
                        )
                          return;
                        return (
                          <div key={activity.id} className="activity">
                            <div className="activityInfo">
                              <p>
                                <i className="material-icons-outlined">schedule</i>{' '}
                                {activity.time.start} - {activity.time.end}
                              </p>
                              <p>
                                {' '}
                                <i className="material-icons-outlined">location_on</i>
                                {activity.location}
                              </p>
                              <p>
                                {' '}
                                <i className="material-icons-outlined">account_circle</i>
                                {activity.user}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>You have no activites for the selected day</p>
          )}
          <button className="scheduleButton" onClick={() => setScheduleWindow(true)}>
            + Add a schedule
          </button>
        </div>
      </div>
    </div>
  );
}
