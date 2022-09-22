import '../../../styles/NewProfileCreation.scss';
import React from 'react';

export default function Step1(currentStep) {
  return (
    <div className="step step1">
      <input className= "getStartedInput"
        id="titleInput"
        name="titleInput"
        placeholder="Example: Dogwalker"
        aria-label="Please add a title about what you do"
      ></input>
    </div>
  );
}
