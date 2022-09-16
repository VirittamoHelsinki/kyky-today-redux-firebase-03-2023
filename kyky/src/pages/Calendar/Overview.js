/* This code is atrocious, PLEASE FIX IT */

import Calendar from '../../components/Calendar';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import '../../styles/JobCalendarOverview.scss';

import mockData from '../../mock_bookings.json';

const times = [
  '0.00',
  '1.00',
  '2.00',
  '3.00',
  '4.00',
  '5.00',
  '6.00',
  '7.00',
  '8.00',
  '9.00',
  '10.00',
  '11.00',
  '12.00',
  '13.00',
  '14.00',
  '15.00',
  '16.00',
  '17.00',
  '18.00',
  '19.00',
  '20.00',
  '21.00',
  '22.00',
  '23.00'
];

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function Overview() {
  const [setSelectedWindow] = useOutletContext();
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    setSelectedWindow('overview');
  }, []);

  useEffect(() => {
    const data = mockData.find((booking) => {
      return new Date(booking.date).toLocaleDateString() === date.toLocaleDateString();
    });
    if (data) {
      const jobs = checkOverlap(data.jobs);
      const all_jobs = [];
      jobs.forEach((job) => {
        job.times.forEach((time) => {
          all_jobs.push({ start: time.start, end: time.end, job: job.name });
        });
      });
      all_jobs.sort((a, b) => {
        return a.start - b.start;
      });
      setAllJobs(all_jobs);
      setBookings(jobs);
    } else {
      setBookings([]);
    }
  }, [date]);

  function ConvertTimeStringToDecimal(time) {
    if (!time) return 0;
    const timeArray = time.split('.');
    return parseFloat(timeArray[0]) + parseFloat(timeArray[1]) / 60;
  }

  /* I should look for a different profession */
  // This code works, but is definitely NOT the way I would like to do it.
  function Booking({ booking }) {
    const { name, times } = booking;
    return times.map(({ start, end, overlap, overlapIndex }) => {
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
    });
  }

  // I should be ashamed to even commit this function.
  function checkOverlap(jobs) {
    // We start checking for overlaps by looping through each job
    for (let i = 0; i < jobs.length; i++) {
      const { times } = jobs[i]; // get times array from job via destructuring
      // Now we loop through each time in the times array
      times.forEach((time) => {
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
            const { times: times2 } = jobs[j];
            times2.forEach((time2) => {
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
            });
          } else {
            // instead we can now place ourselves in the overlap array
            overlaps.push(1);
          }
        }
        // We can finally get the overlap index of this time
        time.overlapIndex = overlaps.indexOf(1);
      });
    }
    return jobs;
  }

  return (
    <main className="job-calendar-overview">
      <div className="side-bar">
        <Calendar date={date} setDate={setDate} />
        <div className="bookings-short">
          <p>
            <strong>{weekDays[date.getDay()]}</strong> {date.toLocaleDateString('fi-fi')}
          </p>
          {allJobs.map((job) => {
            return (
              <div className="job-short">
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
          {bookings.map((booking, index) => {
            return <Booking booking={booking} key={index} />;
          })}
        </div>
      </div>
    </main>
  );
}

export default Overview;