import '../../../styles/NewProfileCreation.scss';
import React from 'react';

import { useState } from 'react';
import WorkExperience from './WorkExperience';
import EducationExperience from './EducationExperience';

export default function Step2(currentStep) {
  const [experience, setExperience] = useState('');
  const [saved, setSaved] = useState(false);
  const workExperience = () => {
    setSaved(false);
    setExperience(<WorkExperience setSaved={setSaved} />);
  };

  const educationExperience = () => {
    setSaved(false);
    setExperience(<EducationExperience setSaved={setSaved} />);
  };

  return (
    <div className="step step2">
      <div className="experienceContainer">
        <div className="addExperience">
          Add Work experience{' '}
          <button type="button" className="picIcon" onClick={() => workExperience()}>
            +
          </button>
        </div>
        <div className="addExperience">
          Add Education experience{' '}
          <button type="button" className="picIcon" onClick={() => educationExperience()}>
            +
          </button>
        </div>
      </div>
      {!saved && <div className="dim"></div>}
      {!saved && experience}
    </div>
  );
}
