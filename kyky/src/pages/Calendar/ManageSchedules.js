import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Button from '../../components/Button';

import Input from '../../components/Input';
import Switch from 'react-switch';

export default function ManageSchedules() {
  const [setSelectedWindow] = useOutletContext();
  const [schedules, setSchedules] = useState({});
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [indefinite, setIndefinite] = useState(false);

  const daysLong = {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday'
  };

  function overlapText(schedule) {
    if (schedule.canOverlap) {
      let text = 'Allow other bookings to overlap with this job';
      if (schedule.overlapType === 'any') {
        text += ' (Any job type)';
      } else if (schedule.overlapType === 'same') {
        text += ' (Only same job type)';
      }
      return text;
    } else return 'Overlapping not allowed';
  }

  function displayLongerTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const mins = minutes % 60;
    let text = '';
    if (days > 0) {
      text += `${days} days `;
    }
    if (hours > 0) {
      text += `${hours % 24} hours `;
    }
    if (mins > 0) {
      text += `${mins} minutes`;
    }
    return text;
  }

  useEffect(() => {
    setSelectedWindow('manage-schedules');
  }, []);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((key) => key.includes('_schedules'));
    const allSchedules = keys.map((key) => {
      const schedule = JSON.parse(localStorage.getItem(key));
      return schedule;
    });
    const schedulesObject = {};
    allSchedules.forEach(([schedule]) => {
      const id = schedule.jobId;
      if (!schedulesObject[id]) {
        schedulesObject[id] = { jobId: id, schedules: [] };
      }
      schedulesObject[id].schedules.push(schedule);
    });
    setSchedules(schedulesObject);
  }, []);

  return (
    <main className="manage-schedules">
      <div className="left-side">
        <h1>Manage Schedules</h1>
        <div className="schedule-unavailability">
          <h2>Schedule Unavailability</h2>
          <Input type="date" id="start-date" label="Start date:" labelOnFront />
          <Input type="date" id="end-date" label="End date:" labelOnFront>
            <Switch
              width={32}
              height={16}
              handleDiameter={14}
              name="indefinite"
              checked={indefinite}
              onChange={() => setIndefinite(!indefinite)}
            />
            <label htmlFor="indefinite">Indefinitely</label>
          </Input>
          <Button className="small-rounded">+ Add</Button>
          <div className="unavailablities">
            <p>Upcoming unavailablities</p>
          </div>
        </div>
        <div className="schedule-categories">
          <h2>Schedules by Category</h2>
          <p>{Object.keys(schedules).length} jobs</p>
          <div className="schedule-list">
            {Object.entries(schedules).map(([key, schedule]) => (
              <div
                className="schedule"
                key={key}
                onClick={() => setSelectedSchedules(schedule.schedules)}>
                <p className="job">{schedule.jobId}</p>
                <p>{schedule.schedules.length} Schedules</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="schedule-details">
          <h2>Schedules</h2>
          {selectedSchedules.map((schedule) => {
            console.log(schedule);
            return (
              <div className="schedule" key={schedule.id}>
                <div className="corner">
                  <Button className="but">
                    <i className="material-icons">expand_more</i>
                  </Button>
                </div>
                <div className="middle">
                  <div className="schedule-date">
                    <i className="material-icons">date_range</i>
                    <span style={{ color: 'black' }}>
                      {schedule.scheduleDuration.months
                        ? `${schedule.scheduleDuration.months} months`
                        : `${new Date(schedule.scheduleDuration.startDate).toLocaleDateString(
                            'fi-FI'
                          )} - ${new Date(schedule.scheduleDuration.endDate).toLocaleDateString(
                            'fi-FI'
                          )}`}
                    </span>
                  </div>
                  <span style={{ color: 'black' }}>
                    <i className="material-icons">access_time</i>
                    {schedule.time.start} - {schedule.time.end}
                  </span>
                  {schedule.recurring.length === 0 ? (
                    <span style={{ color: 'black' }}>
                      <i className="material-icons">loop</i>
                      Every day
                    </span>
                  ) : (
                    <span style={{ color: 'black' }}>
                      <i className="material-icons">loop</i>
                      {schedule.recurring.map(
                        (d, index) => d + (index === schedule.recurring.length - 1 ? '' : ', ')
                      )}
                    </span>
                  )}
                </div>
                <div className="corner">
                  <Button className="but">
                    <i className="material-icons">edit</i>
                  </Button>
                  <Button className="but">
                    <i className="material-icons">delete_forever</i>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
