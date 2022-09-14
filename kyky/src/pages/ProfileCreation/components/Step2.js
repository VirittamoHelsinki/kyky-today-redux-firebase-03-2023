import '../../../styles/NewProfileCreation.scss';
import React from 'react';

export default function Step2(currentStep) {
  if (currentStep !== 2) {
    return null
  };
    
  return (
    <div className="step step2">
      Content
    </div>
  );
}