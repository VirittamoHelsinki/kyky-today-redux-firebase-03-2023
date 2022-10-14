import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function CalendarHeader({ selectedWindow, setSelectedWindow, setScheduleWindow }) {
  const navigate = new useNavigate();

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

  function changeWindow(url, id) {
    navigate(`${url}`);
    setSelectedWindow(id);
  }

  return (
    <div className="my-calendar-header">
      <div className="top">
        <h1 className="title">My Calendar</h1>
        <div className="details">
          <div className="info">Ongoing</div>
          <div>|</div>
          <div className="info">Pending</div>
          <div>|</div>
          <div className="info">Confirmed</div>
          <button className="create-schedule--button" onClick={() => setScheduleWindow(true)}>
            Create a Schedule
          </button>
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
