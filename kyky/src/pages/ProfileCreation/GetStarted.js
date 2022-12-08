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
  const [formData, setFormData] = useState({
    // Step 1
    s1TitleInput: '',
    s1Skills: [],
    // Step 2 work experience
    s2WorkExperienceTitle: '',
    s2WorkExperienceCompany: '',
    s2WorkExperienceLocation: '',
    s2WorkExperienceCountry: '',
    s2WorkExperienceCurrentlyWorking: false,
    s2WorkExperienceStartMonths: '',
    s2WorkExperienceStartYears: '',
    s2WorkExperienceEndMonths: '',
    s2WorkExperienceEndYears: '',
    s2WorkExperienceDescription: ''
  });

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

  function handleChange(name, value) {
    console.log('GetStarted.js handleChange function:');
    console.log('name:', name);
    console.log('value:', value);

    setFormData({ ...formData, [name]: value });
  }

  function sendForm(event) {
    event.preventDefault();
  }

  return (
    <div className="get-started">
      <div className="mainContainer">
        <div className="titleContainer">
          <h1>{titles[title]}</h1>
          <p>{tips[tip]}</p>
        </div>
        <form onSubmit={sendForm}>
          {currentStep === 1 && <Step1 formData={formData} handleChange={handleChange} />}
          {currentStep === 2 && <Step2 formData={formData} handleChange={handleChange} />}
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
