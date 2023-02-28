import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import { GenericSelect } from './Select';
import { months, years } from './Time';
import '../../styles/NewProfileCreation.scss';

export default function EducationExperience({ addEducExperience, setModalClosed }) {
  const [educExperience, setEducExperience] = useState({});
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [location, setLocation] = useState('');
  const [startMonth, setStartMonth] = useState({ value: '', label: '' });
  const [startYear, setStartYear] = useState({ value: '', label: '' });
  const [endMonth, setEndMonth] = useState({ value: '', label: '' });
  const [endYear, setEndYear] = useState({ value: '', label: '' });

  useEffect(() => {
    setEducExperience({ ...educExperience, school: school });
  }, [school]);

  useEffect(() => {
    setEducExperience({ ...educExperience, degree: degree });
  }, [degree]);

  useEffect(() => {
    setEducExperience({ ...educExperience, location: location });
  }, [location]);

  useEffect(() => {
    setEducExperience({ ...educExperience, startMonth: startMonth });
  }, [startMonth]);

  useEffect(() => {
    setEducExperience({ ...educExperience, startYear: startYear });
  }, [startYear]);

  useEffect(() => {
    setEducExperience({ ...educExperience, endMonth: endMonth });
  }, [endMonth]);

  useEffect(() => {
    setEducExperience({ ...educExperience, endYear: endYear });
  }, [endYear]);

  const saveAndClose = () => {
    if (startMonth.value === '') {
      window.alert('Please, select a start month.');
      return;
    }
    if (endMonth.value === '') {
      window.alert('Please, select an end month.');
      return;
    }
    if (startYear.value === '') {
      window.alert('Please, select a start year.');
      return;
    }
    if (endYear.value === '') {
      window.alert('Please, select an end year.');
      return;
    }
    addEducExperience({ ...educExperience });
    setModalClosed(true);
  };

  return (
    <div className="educationContainer">
      <h3>Add Education History</h3>
      <Input
        className="inputLong"
        id="s2EducationExperienceSchool"
        name="s2EducationExperienceSchool"
        value={school}
        onChange={(event) => setSchool(event.target.value)}
        label="School"
        placeholder="Ex:Business College Helsinki"
        labelOnFront></Input>
      <Input
        className="inputLong"
        id="s2EducationExperienceDegree"
        name="s2EducationExperienceDegree"
        value={degree}
        onChange={(event) => setDegree(event.target.value)}
        label="Degree"
        placeholder="Ex:Vocational Qualification"
        labelOnFront></Input>
      <Input
        className="inputShort"
        id="s2EducationExperienceField"
        name="s2EducationExperienceField"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
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
          value={startMonth}
          onChange={(value) => setStartMonth(value)}
          options={months}
        />
        <GenericSelect
          className="dateSelect"
          name="startYearsSelect"
          placeholder="Year"
          value={startYear}
          onChange={(value) => setStartYear(value)}
          options={years}
        />
        <GenericSelect
          className="dateSelect"
          name="endMonthsSelect"
          placeholder="Month"
          value={endMonth}
          onChange={(value) => setEndMonth(value)}
          options={months}
        />
        <GenericSelect
          className="dateSelect"
          name="endYearsSelect"
          placeholder="Year"
          value={endYear}
          onChange={(value) => setEndYear(value)}
          options={years}
        />
      </div>

      <div className="button-container">
        <button type="button" className="cancelButton" onClick={() => setModalClosed(true)}>
          Cancel
        </button>
        <button type="button" className="saveButton" onClick={() => saveAndClose()}>
          Save
        </button>
      </div>
    </div>
  );
}

EducationExperience.propTypes = {
  addEducExperience: PropTypes.func.isRequired,
  setModalClosed: PropTypes.func.isRequired
};
