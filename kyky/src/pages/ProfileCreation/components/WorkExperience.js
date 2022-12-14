import '../../../styles/NewProfileCreation.scss';
import React from 'react';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import Countries from '../../../countries.json';
import { GenericSelect } from './Select';
import { months, years } from './Time';

export default function WorkExperience({ formData, handleChange, setSaved }) {
  const countryOptions = Countries.map((country) => ({ value: country.code, label: country.name }));

  return (
    <div className="workContainer">
      <h3>Add Work Experience</h3>
      <Input
        className="inputLong"
        id="s2WorkExperienceTitle"
        name="s2WorkExperienceTitle"
        value={formData?.s2WorkExperienceTitle}
        onChange={(event) => handleChange(event.target.name, event.target.value)}
        label="Title*"
        placeholder="Ex:Cleaner"
        labelOnFront></Input>
      <Input
        className="inputLong"
        id="s2WorkExperienceCompany"
        name="s2WorkExperienceCompany"
        value={formData?.s2WorkExperienceCompany}
        onChange={(event) => handleChange(event.target.name, event.target.value)}
        label="Company"
        placeholder="Ex:Frenska"
        labelOnFront></Input>
      <Input
        className="inputShort"
        id="s2WorkExperienceLocation"
        name="s2WorkExperienceLocation"
        value={formData?.s2WorkExperienceLocation}
        onChange={(event) => handleChange(event.target.name, event.target.value)}
        label="Location*"
        placeholder="Ex:Helsinki"
        labelOnFront></Input>
      <label htmlFor="countryList" className="countryLabel">
        Country
      </label>
      <GenericSelect
        className="countryList"
        name="countryList"
        placeholder="Finland"
        onChange={(selectOption) => handleChange('s2WorkExperienceCountry', selectOption.value)}
        options={countryOptions}
      />
      <Checkbox
        className="workCheck"
        name="s2WorkExperienceCurrentlyWorking"
        value={formData?.s2WorkExperienceCurrentlyWorking}
        checked={formData?.s2WorkExperienceCurrentlyWorking}
        onChange={(event) => handleChange(event.target.name, event.target.checked)}>
        I am currently working in this role
      </Checkbox>
      <div className="dateContainer">
        <div className="startDateLabel">Start Date*</div>
        <div className="endDateLabel">End Date*</div>
      </div>
      <div className="monthYearContainer">
        <GenericSelect
          className="dateSelect"
          name="startMonthsSelect"
          placeholder="Month"
          onChange={(selectOption) =>
            handleChange('s2WorkExperienceStartMonths', selectOption.value)
          }
          options={months}
        />
        <GenericSelect
          className="dateSelect"
          name="startYearsSelect"
          placeholder="Year"
          onChange={(selectOption) =>
            handleChange('s2WorkExperienceStartYears', selectOption.value)
          }
          options={years}
        />
        <GenericSelect
          className="dateSelect"
          name="endMonthsSelect"
          placeholder="Month"
          onChange={(selectOption) => handleChange('s2WorkExperienceEndMonths', selectOption.value)}
          options={months}
        />
        <GenericSelect
          className="dateSelect"
          name="endYearsSelect"
          placeholder="Year"
          onChange={(selectOption) => handleChange('s2WorkExperienceEndYears', selectOption.value)}
          options={years}
        />
      </div>
      <div className="description">Description</div>
      <textarea
        className="descriptionArea"
        name="s2WorkExperienceDescription"
        value={formData?.s2WorkExperienceDescription}
        onChange={(event) => handleChange(event.target.name, event.target.value)}
      />
      <button type="button" className="saveButton" onClick={() => setSaved(true)}>
        Save
      </button>
    </div>
  );
}
