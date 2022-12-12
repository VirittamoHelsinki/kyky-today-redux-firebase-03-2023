import '../../../styles/NewProfileCreation.scss';
import { GenericSelect } from './Select';
import React from 'react';

export default function Step6() {
  const currencies = [
    { value: 'hourlyRateEuro', label: 'Hourly Rate(€)' },
    { value: 'hourlyRateDollar', label: 'Hourly Rate($)' },
    { value: 'hourlyRatePound', label: 'Hourly Rate(£)' }
  ];

  return (
    <div className="step step6">
      <div className="hourlyContainer">
        <GenericSelect
          className="step6Select"
          placeholder="Choose your currency"
          options={[...currencies]}
        />
        <input
          type="number"
          className="hourlyInput"
          placeholder="Amount per hour:"
          max={1000000}
          min={0}></input>
      </div>{' '}
      <h4 className="totalAmount">Total amount the client will see(including all taxes).</h4>
    </div>
  );
}
