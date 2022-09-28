import '../../../styles/NewProfileCreation.scss';
import Select from 'react-select';
import React from 'react';

export default function Step5(currentStep) {
    const options = [
        { value: 'itAndNetworking', label: 'IT & Networking' },
        { value: 'salesAndMarketing', label: 'Sales & marketing' },
        { value: 'writing', label: 'Writing' },
        { value: 'webMobileAndSoftwareDev ', label: 'Web, Mobile & Software Dev' }
      ];
    
  const placeholder = 'Search for a service';

  return (
    <div className="step step5">
      <Select className="select-container2" placeholder={placeholder} options={[...options]} />
    </div>
  );
}
