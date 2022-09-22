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

  return (
    <div className="step step3">
      <div className="formContainer">
        <h3>Language</h3>
        <Select
          className="select-container"
          name="finnishSelect"
          placeholder={placeholder}
          options={[...options]}
        >
          {/* ^ Creating new options array for each Select component with the same content. */}
        </Select>
        <Select
          className="select-container"
          name="swedishSelect"
          placeholder={placeholder}
          options={[...options]}
        ></Select>
        <Select
          className="select-container"
          name="englishSelect"
          placeholder={placeholder}
          options={[...options]}
        ></Select>
      </div>
    </div>
  );
}
