import { useState } from 'react';
import '../../styles/NewProfileCreation.scss';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import Step6 from './components/Step6';
import Step7 from './components/Step7';
import Step8 from './components/Step8';
import Step9 from './components/Step9';

export default function GetStarted() {
  const titles = [
    'Please add a title about what you do.',
    'If you have relevant work and/or education experience, add it here.',
    'Good. Now tell us which languages you speak.',
    'Almost there! What work do you do here?',
    'What is the main service you offer?',
    'Please add your hourly rate.',
    'Last details before you publish your profile',
    'Preview Profile',
    ' '
  ];

  const tips = [
    "It's the very first thing clients see. Please describe your skills with your own words.",
    'Relevant working experience will increase the chance of getting hired!',
    'Your language skill can make client know you better.',
    'Write down what you can offer to clients(maximum of 300 characters).',
    'Choose one service that best describes the type of work you do.',
    'Clients will see this rate on your profile.',
    'A professional photo helps build trust with your clients.',
    'You can still edit your profile as you want.',
    ' '
  ];

  const steps = 9;

  const [title, setTitle] = useState(0);
  const [tip, setTip] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});

  function previousPhase() {
    setTitle(title - 1);
    setTip(tip - 1);
    setCurrentStep(currentStep - 1);
  }

  function nextPhase() {
    setTitle(title + 1);
    setTip(tip + 1);
    setCurrentStep(currentStep + 1);
  }

  function handleChange(event) {
    const stepNumber = event.target.className.match('step[0-9]')[0];
    console.log('stepNumber in GetStarted.js handleChange function:', stepNumber);

    const returnStepData = () => {
      switch (stepNumber) {
        case 'step1':
          return step1Data;
        case 'step2':
          return step2Data;
        default:
          console.error('Error: No form step found.');
      }
    };
    const name = event.target.name;
    console.log('name in GetStarted.js handleChange function:', name);
    const value = event.target.value;
    console.log('value in GetStarted.js handleChange function:', value);
    const stepContainsData = Object.keys(returnStepData()).length !== 0; // returns boolean
    console.log('stepContainsData in GetStarted.js handleChange function:', stepContainsData);
    for (const [inputKey, inputValue] of Object.entries(returnStepData())) {
      console.log('inputKey:', inputKey, 'inputValue:', inputValue);
    }
    const inputExists = Object.keys(returnStepData()).includes(name); // returns boolean
    console.log('inputExists in GetStarted.js handleChange function:', inputExists);
    const inputData =
      stepContainsData && inputExists
        ? Object.fromEntries([
            Object.entries(returnStepData()).find(
              (input) => input[0] === name && input[1] !== undefined
            )
          ])
        : false; // returns object / boolean
    console.log('inputData in GetStarted.js handleChange function:', inputData);

    /*
    a) Jos step1Data ei ole tyhjä...
      aa) ja parametrinä olevaa name:a vastaava input-kenttä löytyy, muokataan sitä ja jätetään 
          muut kentät ennalleen.
      ab) Jos parametrina olevaa name:a vastaava input-kenttä ei löydy, luodaan se ja siihen kuuluva value.
    b) Jos step1Data on tyhjä, luodaan parametrina olevaa stepNumberia vastaava objekti eli step1 
       ja sille name ja value.
    */

    const editStepData = () => {
      return stepContainsData && inputExists
        ? Object.fromEntries(
            Object.entries(returnStepData()).map(([inputKey, inputValue]) => {
              if (inputKey === name) return [name, value];
              else return [inputKey, inputValue];
            })
          )
        : stepContainsData && !inputExists
        ? Object.fromEntries(Object.entries(returnStepData()).concat([name, value]))
        : !stepContainsData && !inputExists
        ? { [name]: value }
        : {};
    };

    switch (stepNumber) {
      case 'step1':
        editStepData()
          ? setStep1Data(editStepData())
          : console.error('Error: Setting form state failed in step1.', editStepData());
      case 'step2':
        editStepData()
          ? setStep2Data(editStepData())
          : console.error('Error: Setting form state failed in step2.', editStepData());
      default:
        console.error('Error: Setting form state failed in default.', editStepData());
    }

    console.log('step1Data in handleChange function:', step1Data);
    console.log('step2Data in handleChange function:', step2Data);
  }

  function sendForm(event) {
    event.preventDefault();
    console.log('Form sent');
  }

  return (
    <div className="get-started">
      <div className="mainContainer">
        <div className="titleContainer">
          <h1>{titles[title]}</h1>
          <p>{tips[tip]}</p>
        </div>
        <form onSubmit={sendForm}>
          {currentStep === 1 && <Step1 step1Data={step1Data} handleChange={handleChange} />}
          {currentStep === 2 && <Step2 step2Data={step2Data} handleChange={handleChange} />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}
          {currentStep === 5 && <Step5 />}
          {currentStep === 6 && <Step6 />}
          {currentStep === 7 && <Step7 />}
          {currentStep === 8 && <Step8 />}
          {currentStep === 9 && <Step9 />}
          <div>
            {currentStep > 1 && (
              <button className="previousButton" onClick={previousPhase}>
                Previous
              </button>
            )}
            {currentStep < steps && (
              <button className="nextButton" onClick={nextPhase}>
                Next
              </button>
            )}
            {currentStep === steps && (
              <button className="submitButton" type="submit">
                Submit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
