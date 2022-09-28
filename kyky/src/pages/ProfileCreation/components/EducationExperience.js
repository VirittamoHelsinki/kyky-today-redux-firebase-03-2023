import '../../../styles/NewProfileCreation.scss';
import React from 'react';

import Input from '../../../components/Input';

export default function EducationExperience({ setSaved }) {
  return (
    <div className="educationContainer">
      <h3>Add Education History</h3>
      <Input
        className="inputLong"
        label="School"
        placeholder="Ex:Business College Helsinki"
        labelOnFront></Input>
      <Input
        className="inputLong"
        label="Degree"
        placeholder="Ex:Vocational Qualification"
        labelOnFront></Input>
      <Input
        className="inputShort"
        label="Field of Study"
        placeholder="Ex:Helsinki"
        labelOnFront></Input>
      <Input
        className="inputShort"
        label="Graduation Date"
        placeholder="mm/dd/yyyy"
        labelOnFront></Input>

      <button type="button" className="saveButton" onClick={() => setSaved(true)}>
        Save
      </button>
    </div>
  );
}
