import '../../../styles/NewProfileCreation.scss';

import React from 'react';

export default function Step6(currentStep) {
  return (
    <div className="step step6">
      <div className="hourlyContainer">
        <h4>Hourly Rate(€)</h4>
        <input type="number" className="hourlyInput" max={1000000} maxLength={7} min={0}></input>
      </div>{' '}
      <h4 className="totalAmount">Total amount the client will see.</h4>
    </div>
  );
}
