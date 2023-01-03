import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSteps, addProfileForm } from '../../redux/sellers/profileFormSlice';
import { titles, tips } from './components/Features';
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
  const [title, setTitle] = useState(0);
  const [tip, setTip] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const steps = 9;

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  function previousPhase() {
    setTitle(title - 1);
    setTip(tip - 1);
    setCurrentStep(currentStep - 1);
  }

  function nextPhase() {
    dispatch(updateSteps({ ...formData }));
    setTitle(title + 1);
    setTip(tip + 1);
    setCurrentStep(currentStep + 1);
    dispatch(addStep({ ...formData }));
  }

  function handleChange(name, value) {
    setFormData({ ...formData, [name]: value });
  }

  function sendForm(event) {
    event.preventDefault();
  }

  function submitform() {
    nextPhase();
    dispatch(
      addProfileForm({
        ...formData,
        uid: user.uid,
        name: user.displayName
      })
    );
  }

  return (
    <div className="get-started">
      <div className="mainContainer">
        <div className="titleContainer">
          <h1>{titles[title]}</h1>
          <p>{tips[tip]}</p>
        </div>
        <form onSubmit={sendForm}>
          {currentStep === 1 && <Step1 handleChange={handleChange} />}
          {currentStep === 2 && <Step2 handleChange={handleChange} />}
          {currentStep === 3 && <Step3 handleChange={handleChange} />}
          {currentStep === 4 && <Step4 handleChange={handleChange} />}
          {currentStep === 5 && <Step5 handleChange={handleChange} />}
          {currentStep === 6 && <Step6 handleChange={handleChange} />}
          {currentStep === 7 && <Step7 handleChange={handleChange} />}
          {currentStep === 8 && <Step8 />}
          {currentStep === 9 && <Step9 />}
          <div>
            {currentStep > 1 && currentStep < steps && (
              <button className="previousButton" onClick={previousPhase}>
                Previous
              </button>
            )}
            {currentStep <= steps - 2 && (
              <button className="nextButton" onClick={nextPhase}>
                Next
              </button>
            )}
            {currentStep === steps - 1 && (
              <button className="submitButton" type="button" onClick={submitform}>
                Submit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
