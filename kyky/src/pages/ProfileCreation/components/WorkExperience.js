import '../../../styles/NewProfileCreation.scss';
import React from 'react';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import Select from 'react-select';
export default function WorkExperience() {
  return (
    <div className="workContainer">
      <h3>Add Work Experience</h3>
      <Input
        className="inputLong"
        label="Title/a heading for what you do*"
        placeholder="Ex:Cleaner"
        labelOnFront></Input>
      <Input className="inputLong" label="Company" placeholder="Ex:Frenska" labelOnFront></Input>
      <Input
        className="inputShort"
        label="Location*"
        placeholder="Ex:Helsinki"
        labelOnFront></Input>
      <Select className="countryList" placeholder="Finland"></Select>
      <Checkbox className="workCheck">I am currently working in this role</Checkbox>
      <button className="saveButton">Save</button>
    </div>
  );
}
