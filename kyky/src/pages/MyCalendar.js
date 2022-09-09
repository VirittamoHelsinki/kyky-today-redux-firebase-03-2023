import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import CalendarHeader from '../components/CalendarHeader';

import '../styles/MyCalendar.scss';

export default function MyCalendar() {
  const [selectedWindow, setSelectedWindow] = useState('job-calendar');
  return (
    <div className="my-calendar">
      <CalendarHeader selectedWindow={selectedWindow} setSelectedWindow={setSelectedWindow} />
      <Outlet />
    </div>
  );
}
