import { LanguagesSelect } from './Select';
import { useState } from 'react';

export default function Step3(currentStep) {
  const options = [
    { value: 'basic', label: 'Basic' },
    { value: 'conversational', label: 'Conversational' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'nativeOrBilingual', label: 'Native or Bilingual' }
  ];

  const initialSelectAttributes = [
    { name: 'finnishSelect', label: 'Finnish' },
    { name: 'swedishSelect', label: 'Swedish' },
    { name: 'englishSelect', label: 'English' }
  ];

  const [selectAttributes, setSelectAttributes] = useState(initialSelectAttributes);

  const handleClick = () => {
    setSelectAttributes(initialSelectAttributes.concat(
      { name: 'otherSelect', label: 'Other language' }
    ))
  }

  return (
    <div className="step step3">
      <div className="formContainer languageFormContainer">
        <h3>Language</h3>
        <LanguagesSelect options={options} selectAttributes={selectAttributes} placeholder="My level is" />
        <button id="addLanguageButton" onClick={handleClick}>
          <i className="material-icons-outlined">add_circle_outline</i>
          <p>Add a language</p>
        </button>
      </div>
    </div>
  );
}
