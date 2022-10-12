import '../../../styles/NewProfileCreation.scss';
import React from 'react';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import Select from 'react-select';
import Countries from '../../../countries.json';
export default function WorkExperience({ setSaved }) {
  const months = [
    { value: 'january', label: 'January' },
    { value: 'february', label: 'February' },
    { value: 'march', label: 'March' },
    { value: 'april', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'june', label: 'June' },
    { value: 'july', label: 'July' },
    { value: 'august', label: 'August' },
    { value: 'september', label: 'September' },
    { value: 'october', label: 'October' },
    { value: 'november', label: 'November' },
    { value: 'december', label: 'December' }
  ];

  return (
    <div className="workContainer">
      <h3>Add Work Experience</h3>
      <Input
        className="inputLong"
        type="text"
        label="Title*"
        placeholder="Ex:Cleaner"
        labelOnFront></Input>
      <Input className="inputLong" label="Company" placeholder="Ex:Frenska" labelOnFront></Input>
      <Input
        className="inputShort"
        label="Location*"
        placeholder="Ex:Helsinki"
        labelOnFront></Input>
      <label className="countryLabel">Country</label>
      <Select
        label="Country"
        className="countryList"
        placeholder="Finland"
        options={Countries}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.code}></Select>
      <Checkbox className="workCheck">I am currently working in this role</Checkbox>
      <div className="dateContainer">
        <div className="startDateLabel">Start Date*</div>
        <div className="endDateLabel">End Date*</div>
      </div>
      <div className="monthYearContainer">
        <Select placeholder="Month" className="dateSelect" options={months}></Select>
        <Select placeholder="Year" className="dateSelect"></Select>
        <Select placeholder="Month" className="dateSelect" options={months}></Select>
        <Select placeholder="Year" className="dateSelect"></Select>
      </div>
      <div className="description">Description</div>
      <textarea className="descriptionArea"></textarea>
      <button type="button" className="saveButton" onClick={() => setSaved(true)}>
        Save
      </button>
    </div>
  );
}
