import '../../../styles/NewProfileCreation.scss';
import Select, { components } from 'react-select';
import { ReactComponent as CheckMark } from '../../../image/check-mark.svg';
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

  const { Option } = components;
  const IconOption = props => (
    <Option {...props}>
      {<CheckMark></CheckMark>}
      {props.data.label}
    </Option>
  );

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
          components={{ Option: IconOption }} // How to deliver isSelected props to IconOption
                                              // for deciding whether to show svg file (green
                                              // arrow) inside Option element?
        >
          {/* ^ Creating new options array for each Select component with the same content. */}
        </Select>
        <label htmlFor={swedishSelectName}>Swedish</label>
        <Select
          className="select-container"
          name={swedishSelectName}
          placeholder={placeholder}
          options={[...options]}
          components={{ Option: IconOption }}
        ></Select>
        <label htmlFor={englishSelectName}>English</label>
        <Select
          className="select-container"
          name={englishSelectName}
          placeholder={placeholder}
          options={[...options]}
          components={{ Option: IconOption }}
        ></Select>
      </div>
    </div>
  );
}
