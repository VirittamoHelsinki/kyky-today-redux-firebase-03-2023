import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import '../../styles/NewProfileCreation.scss';
import { useState } from 'react';

export default function GetStarted() {
  const titles = [
    'Please add a title about what you do.',
    'If you have relevant work and/or education experience, add it here.',
    'Good. Now tell us which languages you speak.',
    'Almost there! What work do you do here?',
    'What is the main service you offer?'
  ];

  const tips = [
    "It's the very first thing clients see. Please describe your skills with your own words.",
    'Relevant working experience will increase the chance of getting hired!',
    'Your language skill can make client know you better.',
    'Write down what you can offer to clients.',
    'Choose one service that best describes the type of work you do.'
  ];

  const steps = 5;

  const [title, setTitle] = useState(0);
  const [tip, setTip] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  function nextPhase() {
    setTitle(title + 1);
    setTip(tip + 1);
    setCurrentStep(currentStep + 1);
  }

  return (
    <div className="get-started">
      <div className="mainContainer">
        <div className="titleContainer">
          <h1>{titles[title]}</h1>
          <p>{tips[tip]}</p>
        </div>
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
        {currentStep === 4 && <Step4 />}
        {currentStep === 5 && <Step5 />}
        {currentStep < steps && (
          <button className="nextButton" onClick={nextPhase}>
            NEXT
          </button>
        )}
        {currentStep === steps && <button className="submitButton">Submit Profile</button>}
      </div>
    </div>
  );
}
