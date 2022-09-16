import { useState } from 'react';

export default function CreateSchedule() {
  const [step, setStep] = useState(3);
  const progression = [
    {
      id: 1,
      title: 'Choose a Job'
    },
    {
      id: 2,
      title: 'Date & Time'
    },
    {
      id: 3,
      title: 'Booking Preferences'
    },
    {
      id: 4,
      title: 'Preview & Submit'
    }
  ];

  return (
    <main className="create-schedule">
      <div className="create-schedule__progression">
        <h1>Create Schedule</h1>
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
    </main>
  );
}
