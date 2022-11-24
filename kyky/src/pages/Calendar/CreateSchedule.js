/*
  This is now a modal!
*/
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSchedule, removeSchedule } from '../../redux/scheduleSlice';
import Button from '../../components/Button';

/* Step components */
import ChooseJob from '../../components/ManageScheduleModal/ChooseJob';
import DateAndTime from '../../components/ManageScheduleModal/DateAndTime';
import BookingPreferences from '../../components/ManageScheduleModal/BookingPreferences';
import PreviewAndSubmit from '../../components/ManageScheduleModal/PreviewAndSubmit';

export default function ManageScheduleModal({ setScheduleWindow, editing }) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState('create');
  const [View, setView] = useState(() => ChooseJob);
  const [canContinue, setCanContinue] = useState(true);
  const [properties, setProperties] = useState({
    jobId: '',
    scheduleDuration: {
      months: 3,
      startDate: null,
      endDate: null
    },
    time: {
      start: '08:00',
      end: '16:00'
    },
    recurring: [],
    limitBookings: false,
    bufferBetweenBookings: 15,
    includeTravelTime: false,
    minimumBookingDuration: 1,
    canOverlap: false,
    overlapType: 'any'
  });
  const progression = [
    {
      id: 1,
      title: 'Choose a Job',
      component: ChooseJob
    },
    {
      id: 2,
      title: 'Date & Time',
      component: DateAndTime
    },
    {
      id: 3,
      title: 'Booking Preferences',
      component: BookingPreferences
    },
    {
      id: 4,
      title: 'Preview & Submit',
      component: PreviewAndSubmit
    }
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    setView(() => progression[progression.findIndex((item) => item.id === step)].component);
  }, [step]);

  useEffect(() => {
    if (editing) {
      setMode('edit');
      setStep(2);
      setProperties(editing);
    }
  }, [editing]);

  const modeProperties = {
    create: {
      title: 'Create Schedule'
    },
    edit: {
      title: 'Edit Schedule'
    }
  };

  function setField(field, value) {
    setProperties((prev) => ({ ...prev, [field]: value }));
  }

  function SubmitDetails() {
    const schedules = JSON.parse(localStorage.getItem(`${properties.jobId}_schedules`));
    if (mode === 'create') {
      const id = Math.random().toString(36).substring(2, 9); // generate random id
      const data = { ...properties, _id: id };
      if (data.scheduleDuration.months) {
        data.scheduleDuration.startDate = new Date();
        data.scheduleDuration.endDate = new Date();
        data.scheduleDuration.endDate.setMonth(
          data.scheduleDuration.endDate.getMonth() + data.scheduleDuration.months
        );
      }

      if (schedules) {
        schedules.push(properties);
        dispatch(createSchedule({ jobId: properties.jobId, data: schedules }));
      } else {
        dispatch(createSchedule({ jobId: properties.jobId, data: [data] }));
      }
    } else if (mode === 'edit') {
      const id = editing._id;
      if (id) {
        const index = schedules.findIndex((item) => item._id === id);
        schedules[index] = { ...properties, _id: id };
        dispatch(createSchedule({ jobId: properties.jobId, data: schedules }));
      }
    }
  }

  function deleteSchedule(schedule) {
    const schedules = JSON.parse(localStorage.getItem(`${schedule.jobId}_schedules`));
    const index = schedules.findIndex((item) => item._id === schedule._id) || 0;
    const confirm = window.confirm('Are you sure you want to delete this schedule?');
    if (confirm) {
      schedules.splice(index, 1);
      setScheduleWindow(false);
      if (schedules.length === 0) {
        dispatch(removeSchedule(properties.jobId));
      } else {
        dispatch(createSchedule({ jobId: properties.jobId, data: schedules }));
        //localStorage.setItem(`${schedule.jobId}_schedules`, JSON.stringify(storage));
      }
      //window.location.reload();
    }
  }

  return (
    <main className="create-schedule">
      <div className="create-schedule__progression">
        <h1>{modeProperties[mode].title}</h1>
        <div className="steps">
          {progression.map(({ id, title }, index) => (
            <div className="step-container" key={id}>
              <div className={`step ${step === id ? 'active' : step > id ? 'complete' : ''}`}>
                <div className="step__title">{title}</div>
                <div className="step__circle">
                  {step > id && <i className="material-icons-outlined">done</i>}
                </div>
              </div>
              {index + 1 < progression.length && (
                <div className={`step__line ${step > id ? 'active' : ''}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="manage-schedule__content">
        <View
          properties={properties}
          setField={setField}
          setScheduleWindow={setScheduleWindow}
          canContinue={canContinue}
          setCanContinue={setCanContinue}
        />
      </div>
      <div className="manage-schedule__footer">
        <Button className="cancel" onClick={() => setScheduleWindow(false)}>
          <i className="material-icons-outlined">close</i> Cancel
        </Button>
        {step > 1 && (
          <Button className="prog_button prev" onClick={() => setStep(step - 1)}>
            <i className="material-icons-outlined">chevron_left</i>
            Previous
          </Button>
        )}
        {step < progression.length && (
          <Button
            className={`prog_button ${!canContinue && 'disabled'}`}
            onClick={() => setStep(step + 1)}>
            Next <i className="material-icons-outlined">chevron_right</i>
          </Button>
        )}
        {step === progression.length && (
          <Button
            onClick={() => {
              SubmitDetails();
              setScheduleWindow(false);
            }}>
            Submit<i className="material-icons-outlined">done</i>
          </Button>
        )}
        {editing && (
          <Button className="delete" onClick={() => deleteSchedule(properties)}>
            Delete Schedule<i className="material-icons">delete_forever</i>
          </Button>
        )}
      </div>
    </main>
  );
}
