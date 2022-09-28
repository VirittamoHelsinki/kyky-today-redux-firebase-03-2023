import '../../../styles/NewProfileCreation.scss';
import Select from 'react-select';
import React from 'react';

export default function Step5(currentStep) {
  const placeholder = 'Search for a service';

  return (
    <div className="step step5">
      <Select className="select-container2" placeholder={placeholder} />
    </div>
  );
}
