/*
  NOTE:
  This is supposed to be a modal that is overlayed on top of the current page.
  HOWEVER, it is currently being developed in its own page.
  THUS, TODO: Make this a modal.
*/
import { useState } from 'react';

/* Step components */
import ChooseJob from '../../components/ManageScheduleModal/ChooseJob';
import DateAndTime from '../../components/ManageScheduleModal/DateAndTime';
import BookingPreferences from '../../components/ManageScheduleModal/BookingPreferences';
import PreviewAndSubmit from '../../components/ManageScheduleModal/PreviewAndSubmit';

export default function ManageScheduleModal() {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState('create');
  const progression = [
    {
      id: 1,
      title: 'Choose a Job',
      component: <ChooseJob />
    },
    {
      id: 2,
      title: 'Date & Time',
      component: <DateAndTime />
    },
    {
      id: 3,
      title: 'Booking Preferences',
      component: <BookingPreferences />
    },
    {
      id: 4,
      title: 'Preview & Submit',
      component: <PreviewAndSubmit />
    }
  ];

  const modeProperties = {
    create: {
      title: 'Create Schedule'
    },
    edit: {
      title: 'Edit Schedule'
    }
  };

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
        {progression[progression.findIndex((item) => item.id === step)].component}
      </div>
      <div className="manage-schedule__footer">
        {step > 1 && (
          <button className="button" onClick={() => setStep(step - 1)}>
            Previous
          </button>
        )}
        {step < progression.length && (
          <button className="button" onClick={() => setStep(step + 1)}>
            Next
          </button>
        )}
      </div>
    </main>
  );
}
