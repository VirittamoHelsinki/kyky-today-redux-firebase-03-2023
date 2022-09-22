import '../../../styles/NewProfileCreation.scss';
import Select from 'react-select';
import React from 'react';

export default function Step3(currentStep) {
  const options = [
    { value: 'basic', label: 'Basic' },
    { value: 'conversational', label: 'Conversational' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'nativeOrBilingual', label: 'Native or Bilingual' }
  ];

  const placeholder = 'My level is';
  const finnishSelectName = "finnishSelect";
  const swedishSelectName = "swedishSelect";
  const englishSelectName = "englishSelect";

  return (
    <div className="step step3">
      <div className="formContainer languageFormContainer">
        <h3>Language</h3>
        <label htmlFor={finnishSelectName}>Finnish</label>
        <Select
          className="select-container"
          name={finnishSelectName}
          placeholder={placeholder}
          options={[...options]}
        >
          {/* ^ Creating new options array for each Select component with the same content. */}
        </Select>
        <label htmlFor={swedishSelectName}>Swedish</label>
        <Select
          className="select-container"
          name={swedishSelectName}
          placeholder={placeholder}
          options={[...options]}
        ></Select>
        <label htmlFor={englishSelectName}>English</label>
        <Select
          className="select-container"
          name={englishSelectName}
          placeholder={placeholder}
          options={[...options]}
        ></Select>
      </div>
    </div>
  );
}
