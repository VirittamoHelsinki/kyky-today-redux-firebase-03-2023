import '../../../styles/NewProfileCreation.scss';
import React from 'react';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';

import Countries from '../../../countries.json';
import { GenericSelect } from './Select';
export default function WorkExperience({ formData, handleChange, setSaved }) {
  const countryOptions = Countries.map((country) => ({ value: country.code, label: country.name }));

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

  const years = [
    { value: 1980, label: 1980 },
    { value: 1981, label: 1981 },
    { value: 1982, label: 1982 },
    { value: 1983, label: 1983 },
    { value: 1984, label: 1984 },
    { value: 1985, label: 1985 },
    { value: 1986, label: 1986 },
    { value: 1987, label: 1987 },
    { value: 1988, label: 1988 },
    { value: 1989, label: 1989 },
    { value: 1990, label: 1990 },
    { value: 1991, label: 1991 },
    { value: 1992, label: 1992 },
    { value: 1993, label: 1993 },
    { value: 1994, label: 1994 },
    { value: 1995, label: 1995 },
    { value: 1996, label: 1996 },
    { value: 1997, label: 1997 },
    { value: 1998, label: 1998 },
    { value: 1999, label: 1999 },
    { value: 2000, label: 2000 },
    { value: 2001, label: 2001 },
    { value: 2002, label: 2002 },
    { value: 2003, label: 2003 },
    { value: 2004, label: 2004 },
    { value: 2005, label: 2005 },
    { value: 2006, label: 2006 },
    { value: 2007, label: 2007 },
    { value: 2008, label: 2008 },
    { value: 2009, label: 2009 },
    { value: 2010, label: 2010 },
    { value: 2011, label: 2011 },
    { value: 2012, label: 2012 },
    { value: 2013, label: 2013 },
    { value: 2014, label: 2014 },
    { value: 2015, label: 2015 },
    { value: 2016, label: 2016 },
    { value: 2017, label: 2017 },
    { value: 2018, label: 2018 },
    { value: 2019, label: 2019 },
    { value: 2020, label: 2020 },
    { value: 2021, label: 2021 },
    { value: 2022, label: 2022 }
  ];

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
