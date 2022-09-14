import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import '../../styles/NewProfileCreation.scss';
import { useState } from 'react';

export default function GetStarted() {
  const titles = [
    'Please add a title about what you do.',
    'If you have relevant work experience, add it here',
    'Good. Now tell us which languages you speak.'
  ];

  const tips = [
    "It's the very first thing clients see. Please describe your skills with your own words.",
    "Relevant working experience will increase the chance of getting hired!",
    "Your language skill can make client know you better."
  ];

  const [title, setTitle] = useState(0);
  const [tip, setTip] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  function nextPhase() {
    setTitle(title + 1);
    setTip(tip + 1);
  }

  return (
    <div className="get-started">
      <div className="mainContainer">
        <h1>{titles[title]}</h1>
        <p>{tips[tip]}</p>
        <Step1 currentStep={currentStep}></Step1>
        <Step2 currentStep={currentStep}></Step2>
        <Step3 currentStep={currentStep}></Step3>
        <button className="nextButton" onClick={nextPhase}>
          NEXT
        </button>
        <div className="addExperience">
          Add experience{' '}
          <button type="button" className="picIcon">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
