import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSteps, addProfileForm } from '../../redux/sellers/profileFormSlice';
import { titles, tips } from './Features';
import Step1 from './Step1';
import '../../styles/CreateProfileModal.scss';

const CreateProfileModal = () => {
  const [title, setTitle] = useState(0);
  const [tip, setTip] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const _user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const steps = 7;

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
    dispatch(updateSteps({ ...formData }));
  }

  function handleChange(name, value) {
    setFormData({ ...formData, [name]: value });
  }

  function sendForm(event) {
    event.preventDefault();
  }

  function submitform() {
    nextPhase();
    dispatch(addProfileForm({ uid: _user.uid, data: { ...formData, name: _user.displayName } }));
  }

  return (
    <div className="profile-modal-main">
      <div className="profile-model-title">
        <h1>{titles[title]}</h1>
        <p>{tips[tip]}</p>
      </div>
      <form onSubmit={sendForm}>
        {currentStep === 1 && <Step1 handleChange={handleChange} />}
        {currentStep === 2 && <Step2 handleChange={handleChange} />}
        {currentStep === 3 && <Step3 handleChange={handleChange} />}
        {currentStep === 4 && <Step4 handleChange={handleChange} />}
        {currentStep === 5 && <Step7 handleChange={handleChange} />}
        {currentStep === 6 && <Step8 />}
        {currentStep === 7 && <Step9 />}
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
  );
};

export default CreateProfileModal;
