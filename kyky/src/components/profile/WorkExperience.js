import { useState, useEffect } from 'react';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import Countries from '../../countries.json';
import { GenericSelect } from './Select';
import { months, years } from './Time';
import '../../styles/NewProfileCreation.scss';

const countries = Countries.map((country) => ({ value: country.code, label: country.name }));

export default function WorkExperience({ addWorkExperience, setModalClosed }) {
  const [workExperience, setWorkExperience] = useState({});
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState(countries[0]);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [startMonth, setStartMonth] = useState(months[0]);
  const [startYear, setStartYear] = useState(years[0]);
  const [endMonth, setEndMonth] = useState(months[0]);
  const [endYear, setEndYear] = useState(years[0]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    setWorkExperience({ ...workExperience, title: title });
  }, [title]);

  useEffect(() => {
    setWorkExperience({ ...workExperience, company: company });
  }, [company]);

  useEffect(() => {
    setWorkExperience({ ...workExperience, location: location });
  }, [location]);

  useEffect(() => {
    setWorkExperience({ ...workExperience, country: country });
  }, [country]);

  useEffect(() => {
    setWorkExperience({ ...workExperience, currentlyWorking: currentlyWorking });
  }, [currentlyWorking]);

  useEffect(() => {
    setWorkExperience({ ...workExperience, startMonth: startMonth });
  }, [startMonth]);

  useEffect(() => {
    setWorkExperience({ ...workExperience, startYear: startYear });
  }, [startYear]);

  useEffect(() => {
    setWorkExperience({ ...workExperience, endMonth: endMonth });
  }, [endMonth]);

  useEffect(() => {
    setWorkExperience({ ...workExperience, endYear: endYear });
  }, [endYear]);

  useEffect(() => {
    setWorkExperience({ ...workExperience, description: description });
  }, [description]);

  const saveAndClose = () => {
    addWorkExperience({ ...workExperience });
    setModalClosed(true);
  };

  return (
    <div className="workContainer">
      <h3>Add Work Experience</h3>
      <Input
        className="inputLong"
        id="s2WorkExperienceTitle"
        name="s2WorkExperienceTitle"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        label="Title*"
        placeholder="Ex:Cleaner"
        labelOnFront></Input>
      <Input
        className="inputLong"
        id="s2WorkExperienceCompany"
        name="s2WorkExperienceCompany"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        label="Company"
        placeholder="Ex:Frenska"
        labelOnFront></Input>
      <Input
        className="inputShort"
        id="s2WorkExperienceLocation"
        name="s2WorkExperienceLocation"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
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
        value={country}
        onChange={(value) => setCountry(value)}
        options={countries}
      />
      <Checkbox
        className="workCheck"
        name="s2WorkExperienceCurrentlyWorking"
        value={currentlyWorking}
        checked={currentlyWorking}
        onChange={(event) => setCurrentlyWorking(event.target.checked)}>
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
      <div className="description">Description</div>
      <textarea
        className="descriptionArea"
        name="s2WorkExperienceDescription"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button type="button" className="cancelButton" onClick={() => setModalClosed(true)}>
        Cancel
      </button>
      <button type="button" className="saveButton" onClick={() => saveAndClose()}>
        Save
      </button>
    </div>
  );
}