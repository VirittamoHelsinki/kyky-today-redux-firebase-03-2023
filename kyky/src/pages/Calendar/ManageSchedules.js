import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSchedule, removeSchedule } from '../../redux/scheduleSlice';
import Button from '../../components/Button';

import Input from '../../components/Input';
import Switch from 'react-switch';

import ScheduleDetails from '../../components/ScheduleDetails';

export default function ManageSchedules() {
  const [setSelectedWindow, setEditing, setScheduleWindow] = useOutletContext();
  const [schedules, setSchedules] = useState({});
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [unavailabilities, setUnavailabilities] = useState([]);
  const [unavailableStart, setUnavailableStart] = useState('');
  const [unavailableEnd, setUnavailableEnd] = useState('');
  const [indefinite, setIndefinite] = useState(false);
  const [opened, setOpened] = useState(-1);
  const [user, setUser] = useState([]);

  const dispatch = useDispatch();

  const _schedules = useSelector((state) => state.schedule);

  useEffect(() => {
    setSelectedWindow('manage-schedules');
  }, []);

  function deleteSchedule(schedule) {
    const _storage = _schedules[schedule.jobId + '_schedules'];
    const storage = [..._storage];
    const index = storage.findIndex((item) => item._id === schedule._id) || 0;
    const confirm = window.confirm('Are you sure you want to delete this schedule?');
    if (confirm) {
      storage.splice(index, 1);
      if (storage.length === 0) {
        dispatch(removeSchedule({ uid: user.uid, schedule: schedule.jobId }));
      } else {
        dispatch(createSchedule({ uid: user.uid, jobId: schedule.jobId, data: storage }));
      }
    }
    setSelectedSchedules(storage);
  }

  useEffect(() => {
    const keys = Object.keys(_schedules).filter(
      (key) => key.includes('_schedules') && !key.includes('unavailability')
    );
    const allSchedules = keys.map((key) => {
      const schedule = _schedules[key];
      return schedule;
    });
    const schedulesObject = {};
    allSchedules.forEach((schedule) => {
      if (!schedule[0]) schedule = [schedule];
      schedule.forEach((item) => {
        const id = item.jobId;
        if (!schedulesObject[id]) {
          schedulesObject[id] = { jobId: id, schedules: [] };
        }
        schedulesObject[id].schedules.push(item);
      });
    });
    setSchedules(schedulesObject);
    const unavailabilities = JSON.parse(localStorage.getItem('unavailability_schedules')) || [];
    setUnavailabilities(unavailabilities);
  }, [_schedules]);

  useEffect(() => {
    const _user = localStorage.getItem('user');
    setUser(_user ? JSON.parse(localStorage.getItem('user')) : []);
  }, []);

  function createUnavailability() {
    const data = {
      start: unavailableStart,
      end: unavailableEnd,
      indefinite
    };
    const storage = JSON.parse(localStorage.getItem('unavailability_schedules')) || [];
    storage.push(data);
    localStorage.setItem('unavailability_schedules', JSON.stringify(storage));
    window.location.reload();
  }

  function unavailabilityIsValid() {
    if (unavailableStart === '') return false;
    if (!indefinite) {
      if (unavailableStart && unavailableEnd) {
        const start = new Date(unavailableStart);
        const end = new Date(unavailableEnd);
        if (start < end) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  return (
    <main className="manage-schedules">
      <div className="left-side">
        <h1>Manage Schedules</h1>
        <div className="schedule-unavailability">
          <h2>Schedule Unavailability</h2>
          <Input
            type="date"
            id="start-date"
            label="Start date:"
            value={unavailableStart}
            onChange={(e) => setUnavailableStart(e.target.value)}
            labelOnFront
          />
          <Input
            type="date"
            id="end-date"
            label="End date:"
            value={unavailableEnd}
            onChange={(e) => setUnavailableEnd(e.target.value)}
            labelOnFront>
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
          <Button
            className={`small-rounded ${!unavailabilityIsValid() && 'disabled'}`}
            onClick={createUnavailability}>
            + Add
          </Button>
          <div className="unavailabilities">
            <h2>Upcoming unavailablities</h2>
            {unavailabilities.map((unavailability, index) => (
              <div className="unavailability" key={index}>
                <div className="duration">
                  <span>{new Date(unavailability.start).toLocaleDateString('fi-FI')}</span>
                  <span>-</span>
                  <span>
                    {unavailability.indefinite
                      ? 'Indefinite'
                      : new Date(unavailability.end).toLocaleDateString('fi-FI')}
                  </span>
                </div>
                <div>
                  <Button
                    className="close"
                    onClick={() => {
                      const confirm = window.confirm(
                        'Are you sure you want to delete this unavailability?'
                      );
                      if (confirm) {
                        const storage = JSON.parse(
                          localStorage.getItem('unavailability_schedules')
                        );
                        storage.splice(index, 1);
                        localStorage.setItem('unavailability_schedules', JSON.stringify(storage));
                        window.location.reload();
                      }
                    }}>
                    X
                  </Button>
                </div>
              </div>
            ))}
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
                onClick={() => {
                  setOpened(-1);
                  setSelectedSchedules(schedule.schedules);
                }}>
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
          {selectedSchedules.map((schedule, index) => {
            return (
              <React.Fragment key={index}>
                <div className="schedule">
                  <div className="corner">
                    <Button className="but">
                      {opened === index ? (
                        <i className="material-icons" onClick={() => setOpened(-1)}>
                          expand_less
                        </i>
                      ) : (
                        <i className="material-icons" onClick={() => setOpened(index)}>
                          expand_more
                        </i>
                      )}
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
                    <Button
                      className="but"
                      onClick={() => {
                        setEditing(schedule);
                        setScheduleWindow(true);
                      }}>
                      <i className="material-icons">edit</i>
                    </Button>
                    <Button className="but" onClick={() => deleteSchedule(schedule)}>
                      <i className="material-icons">delete_forever</i>
                    </Button>
                  </div>
                </div>
                {opened === index && <ScheduleDetails schedule={schedule} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </main>
  );
}
