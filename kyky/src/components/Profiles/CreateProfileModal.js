import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSteps, addProfileForm } from '../../redux/profiles/profileSlice';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import '../../styles/CreateProfileModal.scss';

const CreateProfileModal = ({ setShowProfileModal }) => {
  const [title, setTitle] = useState(0);
  const [tip, setTip] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const _user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const steps = 6;

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
      <form onSubmit={sendForm}>
        {currentStep === 1 && <Step1 handleChange={handleChange} />}
        {currentStep === 2 && <Step2 handleChange={handleChange} />}
        {currentStep === 3 && <Step3 handleChange={handleChange} />}
        {currentStep === 4 && <Step4 handleChange={handleChange} />}
        {currentStep === 5 && <Step5 handleChange={handleChange} />}
        {currentStep === 6 && <Step6 />}
        <div className="button-container">
          <div className="cancel-button">
            <button className="form-button" onClick={() => setShowProfileModal(false)}>
              Cancel
            </button>
          </div>
          <div className="step-submit-buttons">
            {currentStep > 1 && currentStep < steps && (
              <button className="form-button" onClick={previousPhase}>
                Previous
              </button>
            )}
            {currentStep <= steps - 2 && (
              <button className="form-button" onClick={nextPhase}>
                Next
              </button>
            )}
            {currentStep === steps - 1 && (
              <button
                className="form-button"
                type="button"
                onClick={() => {
                  submitform();
                  setShowProfileModal(false);
                }}>
                Submit Profile
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProfileModal;
