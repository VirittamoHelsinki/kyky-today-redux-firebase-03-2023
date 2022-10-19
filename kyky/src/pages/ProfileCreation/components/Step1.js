import '../../../styles/NewProfileCreation.scss';
import { ReactComponent as MagGlass } from '../../../image/mag-glass.svg';
import React from 'react';

export default function Step1(currentStep) {
  return (
    <div className="step step1">
      <input
        className="getStartedInput"
        id="titleInput"
        name="titleInput"
        placeholder="Example: Dogwalker"
        aria-label="Please add a title about what you do"></input>
      <h1>Please add skills you have.</h1>
      <div className="addSkills">
        <input className="addSkillsInput"></input>
        <div className="magGlass">
          <MagGlass />
        </div>
      </div>
    </div>
  );
}
