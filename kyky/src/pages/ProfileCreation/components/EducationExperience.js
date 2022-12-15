import '../../../styles/NewProfileCreation.scss';
import React from 'react';
import Input from '../../../components/Input';
import { GenericSelect } from './Select';
import { months, years } from './Time';

export default function EducationExperience({
  formData,
  handleChange,
  handleChangeReactSelect,
  setSaved
}) {
  return (
    <div className="educationContainer">
      <h3>Add Education History</h3>
      <Input
        className="inputLong"
        id="s2EducationExperienceSchool"
        name="s2EducationExperienceSchool"
        value={formData?.s2EducationExperienceSchool}
        onChange={(event) => handleChange(event.target.name, event.target.value)}
        label="School"
        placeholder="Ex:Business College Helsinki"
        labelOnFront></Input>
      <Input
        className="inputLong"
        id="s2EducationExperienceDegree"
        name="s2EducationExperienceDegree"
        value={formData?.s2EducationExperienceDegree}
        onChange={(event) => handleChange(event.target.name, event.target.value)}
        label="Degree"
        placeholder="Ex:Vocational Qualification"
        labelOnFront></Input>
      <Input
        className="inputShort"
        id="s2EducationExperienceField"
        name="s2EducationExperienceField"
        value={formData?.s2EducationExperienceField}
        onChange={(event) => handleChange(event.target.name, event.target.value)}
        label="Field of Study"
        placeholder="Ex:Helsinki"
        labelOnFront></Input>
      <div className="dateContainer">
        <div className="startDateLabel">Start Date*</div>
        <div className="endDateLabel">End Date*</div>
      </div>
      <div className="monthYearContainer">
        <GenericSelect
          className="dateSelect"
          name="startMonthsSelect"
          placeholder="Month"
          defaultValue={formData?.s2EducationExperienceStartMonths}
          onChange={(selectOption) =>
            handleChangeReactSelect('s2EducationExperienceStartMonths', selectOption)
          }
          options={months}
        />
        <GenericSelect
          className="dateSelect"
          name="startYearsSelect"
          placeholder="Year"
          defaultValue={formData?.s2EducationExperienceStartYears}
          onChange={(selectOption) =>
            handleChangeReactSelect('s2EducationExperienceStartYears', selectOption)
          }
          options={years}
        />
        <GenericSelect
          className="dateSelect"
          name="endMonthsSelect"
          placeholder="Month"
          defaultValue={formData?.s2EducationExperienceEndMonths}
          onChange={(selectOption) =>
            handleChangeReactSelect('s2EducationExperienceEndMonths', selectOption)
          }
          options={months}
        />
        <GenericSelect
          className="dateSelect"
          name="endYearsSelect"
          placeholder="Year"
          defaultValue={formData?.s2EducationExperienceEndYears}
          onChange={(selectOption) =>
            handleChangeReactSelect('s2EducationExperienceEndYears', selectOption)
          }
          options={years}
        />
      </div>

      <button type="button" className="saveButton" onClick={() => setSaved(true)}>
        Save
      </button>
    </div>
  );
}
