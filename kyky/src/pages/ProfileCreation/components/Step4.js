import '../../../styles/NewProfileCreation.scss';

import React from 'react';

export default function Step4(currentStep) {
  return (
    <div className="step step4">
      <textarea className="workInput" maxLength={300}></textarea>
    </div>
  );
}
