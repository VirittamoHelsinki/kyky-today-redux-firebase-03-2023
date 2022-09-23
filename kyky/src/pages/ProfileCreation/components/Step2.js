import '../../../styles/NewProfileCreation.scss';
import React from 'react';

import { useState } from 'react';
import WorkExperience from './WorkExperience';
import EducationExperience from './EducationExperience';



export default function Step2(currentStep) {
  const [experience, setExperience] = useState('');

  const workExperience = () => {
    setExperience(<WorkExperience />);
  };

  const educationExperience = () => {
    setExperience(<EducationExperience/>)
  }

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
      </div>{experience}
    </div>
  );
}
