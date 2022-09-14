import '../../../styles/NewProfileCreation.scss';
import React from 'react';

export default function Step1(currentStep) {
  if (currentStep !== 1) {
    return null
  };
    
  return (
    <div className="step step1">
      <label htmlFor="titleInput">Please add a title about what you do.</label>
      <input id="titleInput" name="titleInput" placeholder="Example: Dogwalker"></input>
    </div>
  );
}