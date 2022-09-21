import '../../../styles/NewProfileCreation.scss';
import React from 'react';

export default function Step2(currentStep) {
  return (
    <div className="step step2">
      <div className="addExperience">
        Add experience{' '}
        <button type="button" className="picIcon">
          +
        </button>
      </div>
    </div>
  );
}
