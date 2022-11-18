import React from 'react';
import { GenericSelect } from './Select';
import '../../../styles/NewProfileCreation.scss';

export default function Step5() {
  const options = [
    { value: 'itAndNetworking', label: 'IT & Networking' },
    { value: 'salesAndMarketing', label: 'Sales & marketing' },
    { value: 'writing', label: 'Writing' },
    { value: 'webMobileAndSoftwareDev ', label: 'Web, Mobile & Software Dev' }
  ];

  return (
    <div className="step step5">
      <GenericSelect
        className="select-container2"
        name="mainService"
        placeholder="Search for a service"
        options={[...options]}
      />
    </div>
  );
}
