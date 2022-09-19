import '../../../styles/NewProfileCreation.scss';
import Select from '../../../components/Select';
import SelectOption from '../../../components/SelectOption';
import React from 'react';

export default function Step3(currentStep) {
  const options = [
    <SelectOption key='' value='' text='My level is'></SelectOption>,
    <SelectOption key='basic' value='basic' text='Basic'></SelectOption>,
    <SelectOption key='conversational' value='conversational' text='Conversational'></SelectOption>,
    <SelectOption key='fluent' value='fluent' text='Fluent'></SelectOption>,
    <SelectOption key='nativeOrBilingual' value='nativeOrBilingual' text='Native or Bilingual'></SelectOption>,
  ];

  return (
    <div className="step step3">
      <div className="formContainer">
        <h2>Language</h2>
        {/* Creating new options array for each Select component with the same content. */}
        <Select name='finnishSelect' label='Finnish' options={[...options]} required='required'></Select>
        <Select name='swedishSelect' label='Swedish' options={[...options]} required='required'></Select>
        <Select name='englishSelect' label='English' options={[...options]} required='required'></Select>
      </div>
    </div>
  );
}