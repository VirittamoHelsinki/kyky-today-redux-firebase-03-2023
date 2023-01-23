import { useState, useEffect } from 'react';
import Input from '../../components/Input';
import { GenericSelect } from './Select';
import { months, years } from './Time';
import '../../styles/NewProfileCreation.scss';

export default function EducationExperience({ addEducExperience, setModalClosed }) {
  const [educExperience, setEducExperience] = useState({});
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [location, setLocation] = useState('');
  const [startMonth, setStartMonth] = useState(months[0]);
  const [startYear, setStartYear] = useState(years[0]);
  const [endMonth, setEndMonth] = useState(months[0]);
  const [endYear, setEndYear] = useState(years[0]);

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

      <button type="button" className="cancelButton" onClick={() => setModalClosed(true)}>
        Cancel
      </button>
      <button type="button" className="saveButton" onClick={() => saveAndClose()}>
        Save
      </button>
    </div>
  );
}
