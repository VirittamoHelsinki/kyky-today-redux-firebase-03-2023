import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCalendarSettings,
  fetchCalendarSettings
} from '../../redux/calendar/calendarSettingsSlice';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Switch from 'react-switch';
import MultipleSelect from '../../components/MultipleSelect';

export default function CalendarSettings({ jobs }) {
  const [switched, setSwitched] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [selectingJobs, setSelectingJobs] = useState(false);
  const [purge, setPurge] = useState(false);
  const [bookingsAdvance, setBookingsAdvance] = useState(3);
  const [jobOptions, setJobOptions] = useState([]);
  const [selectedJobsAuto, setSelectedJobsAuto] = useState([]);
  const [notificationDays, setNotificationDays] = useState([]);
  const [notificationStartTime, setNotificationStartTime] = useState('08.00');
  const [notificationEndTime, setNotificationEndTime] = useState('21.00');

  const _user = useSelector((state) => state.user);
  const _settings = useSelector((state) => state.calendarsettings);

  const dispatch = useDispatch();

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
    dispatch(fetchCalendarSettings(_user.uid));
  }, []);

  useEffect(() => {
    setJobOptions(jobs.map((job) => ({ value: job.id, label: job.job_title })));
    if ('bookingsAdvance' in _settings) {
      const parsedSettings = JSON.parse(JSON.stringify(_settings));
      setSwitched(parsedSettings.switched);
      setNotifications(parsedSettings.notifications);
      setSelectingJobs(parsedSettings.selectingJobs);
      setSelectedJobsAuto(parsedSettings.selectedJobsAuto);
      setBookingsAdvance(parsedSettings.bookingsAdvance);
      setNotificationDays(parsedSettings.notificationDays);
      setNotificationStartTime(parsedSettings.notificationStartTime);
      setNotificationEndTime(parsedSettings.notificationEndTime);
    }
  }, [_settings]);

  function purgeCalendar() {
    if (window.confirm('Are you sure you want to purge the calendar?')) {
      const keys = Object.keys(localStorage).filter(
        (key) => key.includes('_schedules') && !key.includes('unavailability')
      );
      keys.forEach((key) => localStorage.removeItem(key));
    }
  }

  function confirmChanges() {
    const settings = {
      switched,
      notifications,
      selectingJobs,
      selectedJobsAuto,
      bookingsAdvance,
      notificationDays,
      notificationStartTime,
      notificationEndTime
    };
    dispatch(saveCalendarSettings({ uid: _user.uid, data: { ...settings } }));
  }

  return (
    <main className="job-calendar-settings">
      <div className="settings">
        <h2 className="title">Settings</h2>
        <div className="settings-container">
          <h3 className="title">Booking Settings</h3>
          <div className="setting">
            <span>Enable bookings made</span>
            <select
              name="enable-bookings"
              id="enable-bookings"
              value={bookingsAdvance}
              onChange={(e) => setBookingsAdvance(e.target.value)}>
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
            <MultipleSelect
              options={jobOptions}
              disabled={!selectingJobs}
              onChange={(values) => {
                setSelectedJobsAuto(values);
              }}
            />
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
              <input
                type="time"
                defaultValue="08:00"
                onChange={(e) => setNotificationStartTime(e.target.value)}
              />
              <span>-</span>
              <input
                type="time"
                defaultValue="21:00"
                onChange={(e) => setNotificationEndTime(e.target.value)}
              />
            </label>
            <div className={`days ${notifications ? '' : 'disabled'}`}>
              {days.map((day) => (
                <Input
                  key={day}
                  type="checkbox"
                  name={day}
                  id={day}
                  label={day.substring(0, 3)}
                  checked={notificationDays.includes(day)}
                  onChange={() => {
                    setNotifications(true);
                    if (notificationDays.includes(day)) {
                      setNotificationDays(notificationDays.filter((d) => d !== day));
                    } else {
                      setNotificationDays([...notificationDays, day]);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <Button onClick={confirmChanges}>Confirm Changes</Button>
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

CalendarSettings.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.string).isRequired,
      cities: PropTypes.arrayOf(PropTypes.string).isRequired,
      job_title: PropTypes.string.isRequired
    })
  ).isRequired
};
