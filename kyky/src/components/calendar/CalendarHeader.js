import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/CalendarHeader.scss';

export default function CalendarHeader({ selectedWindow, setSelectedWindow, setScheduleWindow }) {
  const [titles, setTitles] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [pending, setPending] = useState([]);
  const [confirmed, setConfirmed] = useState([]);

  const navigate = new useNavigate();

  const _titles = useSelector((state) => state.jobs.titles);
  const _bookings = useSelector((state) => state.booking.bookings);

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
    { to: '/calendar/settings', label: 'Settings', id: 'settings', icon: 'settings' }
  ];

  useEffect(() => {
    if (_bookings) {
      const pendings = _bookings.filter((booking) => !booking.confirmed);
      setPending(pendings);

      const confirms = _bookings.filter((booking) => booking.confirmed);
      setConfirmed(confirms);
    }
  }, [_bookings]);

  /* just for knowing does user have any job cards made */
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
          <div className="info">
            <i id="small-icon" className="material-icons-outlined">
              work_outline
            </i>
            Ongoing ({ongoing.length})
          </div>
          <div>|</div>
          <div className="info">
            {' '}
            <i id="small-icon" className="material-icons-outlined">
              running_with_errors
            </i>
            Pending ({pending.length})
          </div>
          <div>|</div>
          <div className="info">
            {' '}
            <i id="small-icon" className="material-icons-outlined">
              event_available
            </i>
            Confirmed ({confirmed.length})
          </div>
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

CalendarHeader.propTypes = {
  selectedWindow: PropTypes.string.isRequired,
  setSelectedWindow: PropTypes.func.isRequired,
  setScheduleWindow: PropTypes.func.isRequired
};
