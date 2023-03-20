/* This code is atrocious, PLEASE FIX IT */

import Calendar from '../../components/calendar/Calendar';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../../styles/JobCalendarOverview.scss';

// import mockData from '../../mock_bookings.json';

const times = [];

for (let i = 0; i <= 23; i++) {
  times.push(i + ':00');
}

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekDaysArray = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']; // americans..

function Overview() {
  const [setSelectedWindow] = useOutletContext();
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [daysWithJobs, setDaysWithJobs] = useState([]);

  const _schedules = useSelector((state) => state.schedule);

  function checkSchedule(schedule) {
    let { startDate: start, endDate: end } = schedule.scheduleDuration;
    let result = parseInt(start.seconds) <= parseInt(date.getTime() / 1000) && parseInt(end.seconds) >= parseInt(date.getTime() / 1000);
    console.log(result)
    return result;
  }

  function checkWeekdaySchedule(schedule, weekDay) {
    return schedule.recurring.findIndex((day) => day === weekDay) !== -1;
  }

  function getDaysInMonthAsArray(year, month) {
    const lastDay = new Date(year, month + 1, 0).getDate();
    return new Array(lastDay).fill(0).map((_, i) => new Date(year, month, i + 1));
  }

  useEffect(() => {
    setSelectedWindow('overview');
  }, []);

  useEffect(() => {
    const scheduleKeys = Object.keys(_schedules).filter((key) => key.includes('_schedules'));
    const data = scheduleKeys
      .map((key) => {
        /* copy the object to allow modifications because Firebase returns Object.freeze() */
        const schedule = JSON.parse(JSON.stringify(_schedules[key]));
        return schedule;
      })
      .flat(Infinity);
    // const data = allSchedules.filter((schedule) => {
    //   return checkSchedule(schedule);
    // });
    if (data) {
      const jobs = checkOverlap(data);
      const all_jobs = [];
      jobs?.forEach((job) => {
        console.log(job)
        if (!checkWeekdaySchedule(job, weekDaysArray[date.getDay()])) return;
        let time = job.time;
        all_jobs.push({ start: time.start, end: time.end, job: job.jobTitle });
      });
      all_jobs.sort((a, b) => {
        return a.start - b.start;
      });
      const allDaysOfMonth = getDaysInMonthAsArray(date.getFullYear(), date.getMonth());
      const daysToHighlight = [];
      allDaysOfMonth.forEach((day) => {
        const dayOfWeek = day.getDay();
        const dayOfWeekString = weekDaysArray[dayOfWeek];
        const schedules = data.filter((schedule) => {
          return checkWeekdaySchedule(schedule, dayOfWeekString);
        });
        daysToHighlight.push({ day, highlight: schedules.length > 0 });
      });
      setDaysWithJobs(daysToHighlight);
      setAllJobs(all_jobs);
      setBookings(jobs);
    } else {
      setBookings([]);
    }
  }, [date]);

  function ConvertTimeStringToDecimal(time) {
    if (!time) return 0;
    const timeArray = time.split(':');
    return parseFloat(timeArray[0]) + parseFloat(timeArray[1]) / 60;
  }

  /* I should look for a different profession */
  // This code works, but is definitely NOT the way I would like to do it.
  function Booking({ booking }) {
    const name = booking.jobTitle;
    const { start, end, overlap, overlapIndex } = booking.time;
    const startTime = ConvertTimeStringToDecimal(start);
    const time = ConvertTimeStringToDecimal(end) - ConvertTimeStringToDecimal(start);
    return (
      <div
        className={`booking  ${overlapIndex % 2 === 0 ? '' : 'light'}`}
        style={{
          width: `${100 / overlap}%`,
          height: `${50 * time}px`,
          top: `${50 * startTime}px`,
          left: `${(100 / overlap) * overlapIndex}%`
        }}>
        <h3>{name}</h3>
        <p>
          {start} - {end}
        </p>
      </div>
    );
  }

  // I should be ashamed to even commit this function.
  function checkOverlap(jobs) {
    // We start checking for overlaps by looping through each job
    for (let i = 0; i < jobs?.length; i++) {
      if (!checkWeekdaySchedule(jobs[i], weekDaysArray[date.getDay()])) continue;
      // Get start end time of the job
      let time = jobs[i].time;

      // this overlaps array is a dumb way to find out our overlap index
      const overlaps = [];
      // keep count of how many overlaps we have, start at 1 because it has to divide the actual width
      // (you cant divide by 0!)
      time.overlap = 1;
      // This is the overlap index, it tells us where the booking should be placed horizontally
      // (0 is the leftmost booking, 1 is the second leftmost booking, etc)
      time.overlapIndex = 0;
      // Convert start and end time strings to numbers, the function name doesn't lie
      const startTime = ConvertTimeStringToDecimal(time.start);
      const endTime = ConvertTimeStringToDecimal(time.end);
      // Now we have to do a second loop to make sure this terribleness runs as badly as possible
      for (let j = 0; j < jobs.length; j++) {
        // no need to check ourselves, we know we cant overlap ourselves
        if (i !== j) {
          if (!checkWeekdaySchedule(jobs[j], weekDaysArray[date.getDay()])) continue;
          let time2 = jobs[j].time;

          // Loop through every other time than ours
          // Convert start and end time strings to numbers, the function name doesn't lie part 2
          const startTime2 = ConvertTimeStringToDecimal(time2.start);
          const endTime2 = ConvertTimeStringToDecimal(time2.end);
          // Our booking starts first or at the same time and but before or at the end time of the other booking
          if (startTime >= startTime2 && startTime <= endTime2) {
            // Increment overlap times since we got a match
            time.overlap++;
            // Grow the overlaps array
            overlaps.push(0);
          } else if (endTime > startTime2 && endTime <= endTime2) {
            // The other booking starts before ours ends and ends later.
            time.overlap++;
            overlaps.push(0);
          } else if (startTime2 >= startTime && startTime2 < endTime) {
            // Still checking start times, yup
            time.overlap++;
            overlaps.push(0);
          }
        } else {
          // instead we can now place ourselves in the overlap array
          overlaps.push(1);
        }
      }
      // We can finally get the overlap index of this time
      time.overlapIndex = overlaps.indexOf(1);
    }

    return jobs;
  }

  return (
    <main className="job-calendar-overview">
      <div className="side-bar">
        <Calendar date={date} setDate={setDate} highlightDays={daysWithJobs} />
        <div className="bookings-short">
          <p>
            <strong>{weekDays[date.getDay()]}</strong> {date.toLocaleDateString('fi-fi')}
          </p>
          {allJobs.map((job, index) => {
            return (
              <div className="job-short" key={job.job + index}>
                <p className="title">{job.job}</p>
                <div className="time">
                  <i className="material-icons">calendar_month</i>
                  <p className="value">
                    {job.start} - {job.end}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="time-table">
        {times.map((time, index) => (
          <div className="time" key={index}>
            <span>{time}</span>
          </div>
        ))}
        <div className="bookings">
          {bookings?.map((booking, index) => {
            if (checkWeekdaySchedule(booking, weekDaysArray[date.getDay()])) {
              return <Booking booking={booking} key={index} />;
            } else return null;
          })}
        </div>
      </div>
    </main>
  );
}

export default Overview;
