import '../../../styles/NewProfileCreation.scss';
import React from 'react';

export default function Step3(currentStep) {
  if (currentStep !== 3) {
    return null
  };
    
  return (
    <div className="step step3">
      Content
    </div>
  );
}