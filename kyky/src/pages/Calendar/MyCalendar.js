import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import CalendarHeader from '../../components/CalendarHeader';
import CreateSchedule from './CreateSchedule';

import '../../styles/MyCalendar.scss';

export default function MyCalendar() {
  const [selectedWindow, setSelectedWindow] = useState('job-calendar');
  const [scheduleWindow, setScheduleWindow] = useState(false);
  const [editing, setEditing] = useState(undefined);
  return (
    <div className="my-calendar">
      <CalendarHeader
        selectedWindow={selectedWindow}
        setSelectedWindow={setSelectedWindow}
        setScheduleWindow={setScheduleWindow}
      />
      <Outlet context={[setSelectedWindow, setEditing, setScheduleWindow]} />
      {scheduleWindow && <CreateSchedule setScheduleWindow={setScheduleWindow} editing={editing} />}
    </div>
  );
}
