import '../../../styles/NewProfileCreation.scss';
import React from 'react';
import { useState } from 'react';
import WorkExperience from './WorkExperience';
import EducationExperience from './EducationExperience';

export default function Step2({ formData, handleChange, handleChangeReactSelect }) {
  const [experience, setExperience] = useState();
  const [saved, setSaved] = useState(true);
  const chooseExperience = (event) => {
    const experienceType = event.target.id;
    setSaved(false);
    setExperience(experienceType);
  };

  const renderExperience = () => {
    if (experience === 'workExperience') {
      return (
        <WorkExperience
          formData={formData}
          handleChange={handleChange}
          handleChangeReactSelect={handleChangeReactSelect}
          setSaved={setSaved}
        />
      );
    } else if (experience === 'educationExperience') {
      return <EducationExperience setSaved={setSaved} />;
    } else {
      console.error("User interface doesn't know which experience modal window to show.");
    }
  };

  return (
    <div className="step step2">
      <div className="experienceContainer">
        <div className="addExperience">
          Add Work experience{' '}
          <button
            type="button"
            id="workExperience"
            className="picIcon"
            onClick={(e) => chooseExperience(e)}>
            +
          </button>
        </div>
        <div className="addExperience">
          Add Education experience{' '}
          <button
            type="button"
            id="educationExperience"
            className="picIcon"
            onClick={(e) => chooseExperience(e)}>
            +
          </button>
        </div>
      </div>
      {!saved && <div className="dim"></div>}
      {!saved && experience && renderExperience()}
    </div>
  );
}
