import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CalendarHeader({ selectedWindow, setSelectedWindow, setScheduleWindow }) {
  const navigate = new useNavigate();
  const [titles, setTitles] = useState([]);

  const _titles = useSelector((state) => state.jobs.cards);

  const navButtons = [
    { to: '/calendar', label: 'Job Calendar', id: 'job-calendar', icon: 'calendar_month' },
    {
      to: '/calendar/overview',
      label: 'Overview',
      id: 'overview',
      icon: 'preview'
    },
    {
      to: '/calendar/schedule',
      label: 'Manage Schedules',
      id: 'manage-schedules',
      icon: 'build'
    },
    { to: '/calendar/job-creation', label: 'Create a job', id: 'job-creation', icon: 'add_task' },
    { to: '/calendar/settings', label: 'Settings', id: 'settings', icon: 'settings' }
  ];

  useEffect(() => {
    if (_titles) {
      setTitles(_titles);
    }
  }, [_titles]);

  function changeWindow(url, id) {
    navigate(`${url}`);
    setSelectedWindow(id);
  }

  return (
    <div className="my-calendar-header">
      {titles.length === 0 && (
        <div className="alert-box-yellow">
          <span className="material-icons-outlined">info</span>
          <p>Add jobs to your profile to enable and schedule bookings.</p>
        </div>
      )}
      <div className="top">
        <h1 className="title">My Calendar</h1>
        <div className="details">
          <div className="info">Ongoing</div>
          <div>|</div>
          <div className="info">Pending</div>
          <div>|</div>
          <div className="info">Confirmed</div>
          {titles.length > 0 ? (
            <button className="create-schedule--button" onClick={() => setScheduleWindow(true)}>
              Create a Schedule
            </button>
          ) : (
            <button className="create-schedule--button-disabled" disabled>
              Create a Schedule
            </button>
          )}
        </div>
      </div>
      <div className="selection">
        {navButtons.map(({ to, label, id, icon }) => (
          <button
            key={id}
            className={`button ${selectedWindow === id ? 'selected' : ''}`}
            onClick={() => changeWindow(to, id)}>
            <i className="material-icons">{icon}</i>
            {label}
          </button>
        ))}
        <div className="bar"></div>
      </div>
    </div>
  );
}
