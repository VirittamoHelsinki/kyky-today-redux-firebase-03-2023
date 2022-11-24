import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSchedules } from '../../redux/scheduleSlice';
import CalendarHeader from '../../components/CalendarHeader';
import CreateSchedule from './CreateSchedule';
import '../../styles/MyCalendar.scss';

export default function MyCalendar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSchedules());
  }, []);

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
