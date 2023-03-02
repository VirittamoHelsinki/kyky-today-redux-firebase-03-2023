/*
  This is now a modal!
*/
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSchedule, removeSchedule } from '../../redux/calendar/calendarScheduleSlice';
import PropTypes from 'prop-types';
import Button from '../../components/Button';

/* Step components */
import ChooseJob from '../../components/calendar/ChooseJob';
import DateAndTime from '../../components/calendar/DateAndTime';
import BookingPreferences from '../../components/calendar/BookingPreferences';
import PreviewAndSubmit from '../../components/calendar/PreviewAndSubmit';

export default function ManageScheduleModal({ setScheduleWindow, editing, jobs }) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState('create');
  const [View, setView] = useState(() => ChooseJob);
  const [canContinue, setCanContinue] = useState(true);
  const [properties, setProperties] = useState({
    jobTitle: '',
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

  const _user = useSelector((state) => state.user);
  const _schedules = useSelector((state) => state.schedule);

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
    // makes copy of the object to allow modifications because Firebase returns Object.freeze()
    const schedules = _schedules[properties.jobTitle + '_schedules']
      ? JSON.parse(JSON.stringify(_schedules[properties.jobTitle + '_schedules']))
      : [];
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
        dispatch(
          createSchedule({
            uid: _user.uid,
            jobTitle: properties.jobTitle + '_schedules',
            data: schedules
          })
        );
      } else {
        dispatch(
          createSchedule({ uid: _user.uid, jobTitle: properties.jobTitle + '_schedules', data: [data] })
        );
      }
    } else if (mode === 'edit') {
      const id = editing._id;
      if (id) {
        const index = schedules.findIndex((item) => item._id === id);
        schedules[index] = { ...properties, _id: id };
        dispatch(
          createSchedule({
            uid: _user.uid,
            jobTitle: properties.jobTitle + '_schedules',
            data: schedules
          })
        );
      }
    }
  }

  function deleteSchedule(schedule) {
    const storage = JSON.parse(localStorage.getItem(`${schedule.jobTitle}_schedules`));
    const index = storage.findIndex((item) => item._id === schedule._id) || 0;
    const confirm = window.confirm('Are you sure you want to delete this schedule?');
    if (confirm) {
      storage.splice(index, 1);
      if (storage.length === 0) {
        dispatch(removeSchedule({ uid: _user.uid, schedule: schedule.jobTitle }));
      } else {
        dispatch(createSchedule({ uid: _user.uid, jobTitle: schedule.jobTitle, data: storage }));
      }
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
          jobs={jobs}
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

ManageScheduleModal.propTypes = {
  editing: PropTypes.shape({
    limitBookings: PropTypes.bool.isRequired,
    bufferBetweenBookings: PropTypes.number.isRequired,
    canOverLap: PropTypes.bool.isRequired,
    includeTravelTime: PropTypes.bool.isRequired,
    jobTitle: PropTypes.string.isRequired,
    minimumBookingDuration: PropTypes.number.isRequired,
    overlapType: PropTypes.string.isRequired,
    recurring: PropTypes.arrayOf(PropTypes.string).isRequired,
    recurringDays: PropTypes.arrayOf(PropTypes.string).isRequired,
    scheduleDuration: PropTypes.shape({
      months: PropTypes.number,
      startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    }).isRequired,
    time: PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired
    }).isRequired
  })
};
