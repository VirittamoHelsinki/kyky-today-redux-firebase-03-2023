import { useState, useEffect } from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Switch from 'react-switch';
import MultipleSelect from '../../components/MultipleSelect';

import jobs from '../../jobs';

export default function CalendarSettings() {
  const [switched, setSwitched] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [selectingJobs, setSelectingJobs] = useState(false);
  const [purge, setPurge] = useState(false);
  const [jobOptions, setJobOptions] = useState([]);

  // value is in months
  const advanceTimes = [
    { value: 0.5, text: '2 weeks' },
    { value: 1, text: '1 month' },
    { value: 2, text: '2 months' },
    { value: 3, text: '3 months' },
    { value: 6, text: '6 months' },
    { value: 12, text: '12 months' }
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    setJobOptions(jobs.map((job) => ({ value: job.id, label: job.jobTitle })));
  }, []);

  function purgeCalendar() {
    if (window.confirm('Are you sure you want to purge the calendar?')) {
      const keys = Object.keys(localStorage).filter(
        (key) => key.includes('_schedules') && !key.includes('unavailability')
      );
      keys.forEach((key) => localStorage.removeItem(key));
    }
  }

  return (
    <main className="job-calendar-settings">
      <div className="settings">
        <h2 className="title">Settings</h2>
        <div className="settings-container">
          <h3 className="title">Booking Settings</h3>
          <div className="setting">
            <span>Enable bookings made</span>
            <select name="enable-bookings" id="enable-bookings">
              {advanceTimes.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.text}
                </option>
              ))}
            </select>
            <span>in advance.</span>
          </div>
          <h3 className="title">Confirmations</h3>
          <div className="setting">
            <label className="switchy-switch">
              <Switch
                width={32}
                height={16}
                handleDiameter={14}
                checked={switched}
                onChange={() => setSwitched(!switched)}
              />
              <span>Automatically confirm bookings</span>
            </label>
          </div>
          <div className={`setting inner ${switched ? '' : 'disabled'}`}>
            <Input
              type="radio"
              name="confirm"
              id="all-jobs"
              label="All jobs"
              onChange={() => {
                setSelectingJobs(false);
                setSwitched(true);
              }}
            />
            <Input
              type="radio"
              name="confirm"
              id="selected-jobs"
              label="Selected jobs only"
              onChange={() => {
                setSelectingJobs(true);
                setSwitched(true);
              }}
            />
            <MultipleSelect options={jobOptions} />
          </div>
        </div>
        <div className="settings-container">
          <h3 className="title">Contact Hours</h3>
          <div className="setting">
            <label className="switchy-switch">
              {/* Switchy UwU */}
              <Switch
                width={32}
                height={16}
                handleDiameter={14}
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <span>Only allow notifications between</span>
              <input type="time" defaultValue="08:00" />
              <span>-</span>
              <input type="time" defaultValue="21:00" />
            </label>
            <div className={`days ${notifications ? '' : 'disabled'}`}>
              {days.map((day) => (
                <Input
                  key={day}
                  type="checkbox"
                  name={day}
                  id={day}
                  label={day.substring(0, 3)}
                  onChange={() => setNotifications(true)}
                />
              ))}
            </div>
          </div>
        </div>
        <Button>Confirm Changes</Button>
      </div>
      <div className="export-import">
        <h2 className="title">Export/Import Calendar</h2>
        <div className="buttons">
          <Button className="button-secondary">Import Calendar</Button>
          <Button className="button-secondary bg-white">Export Calendar</Button>
        </div>
      </div>
      <div className="purge">
        <h2 className="title">Purge Calendar</h2>
        <Input
          type="checkbox"
          className="input-container red"
          label=""
          onChange={() => setPurge(!purge)}>
          <p>
            Confirming this selection deletes all your current schedules from your calendar.
            <br></br>
            <span>This action cannot be undone.</span>
          </p>
        </Input>
        <Button
          className={`button-secondary ${purge ? 'red' : 'disabled'}`}
          onClick={purgeCalendar}>
          Confirm Purge
        </Button>
      </div>
    </main>
  );
}
