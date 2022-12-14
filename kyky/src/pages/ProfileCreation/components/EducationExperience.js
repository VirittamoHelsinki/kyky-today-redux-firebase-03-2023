import '../../../styles/NewProfileCreation.scss';
import React from 'react';
import Input from '../../../components/Input';
import { GenericSelect } from './Select';
import { months, years } from './Time';

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
      <div className="dateContainer">
        <div className="startDateLabel">Start Date*</div>
        <div className="endDateLabel">End Date*</div>
      </div>
      <div className="monthYearContainer">
        <GenericSelect placeholder="Month" className="dateSelect" options={months}></GenericSelect>
        <GenericSelect placeholder="Year" className="dateSelect" options={years}></GenericSelect>
        <GenericSelect placeholder="Month" className="dateSelect" options={months}></GenericSelect>
        <GenericSelect placeholder="Year" className="dateSelect" options={years}></GenericSelect>
      </div>

      <button type="button" className="saveButton" onClick={() => setSaved(true)}>
        Save
      </button>
    </div>
  );
}
