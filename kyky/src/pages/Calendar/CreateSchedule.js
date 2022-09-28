/*
  NOTE:
  This is supposed to be a modal that is overlayed on top of the current page.
  HOWEVER, it is currently being developed in its own page.
  THUS, TODO: Make this a modal.
*/
import { useEffect, useState } from 'react';
import Button from '../../components/Button';

/* Step components */
import ChooseJob from '../../components/ManageScheduleModal/ChooseJob';
import DateAndTime from '../../components/ManageScheduleModal/DateAndTime';
import BookingPreferences from '../../components/ManageScheduleModal/BookingPreferences';
import PreviewAndSubmit from '../../components/ManageScheduleModal/PreviewAndSubmit';

export default function ManageScheduleModal({ setScheduleWindow }) {
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

  useEffect(() => {
    setView(() => progression[progression.findIndex((item) => item.id === step)].component);
  }, [step]);

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
    if (schedules) {
      schedules.push(properties);
      localStorage.setItem(`schedule-${properties.jobId}`, JSON.stringify(properties));
    } else {
      localStorage.setItem(`${properties.jobId}_schedules`, JSON.stringify([properties]));
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
      </div>
    </main>
  );
}
