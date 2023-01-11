import { LanguagesSelect } from './Select';
import { useState, useEffect } from 'react';
import Languages from '../../../languages.json';

export default function Step3({
  formData,
  handleChangeReactSelect,
  handleClickAddLanguage,
  toggleAddLanguageButton
}) {
  const options = [
    { value: 'noSelection', label: '---' },
    { value: 'basic', label: 'Basic' },
    { value: 'conversational', label: 'Conversational' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'nativeOrBilingual', label: 'Native or Bilingual' }
  ];

  const [languages, setLanguages] = useState();
  useEffect(() => {
    setLanguages(
      Object.keys(Languages).map((key) => {
        return { value: key, label: Languages[key].name };
      })
    );
  }, []);

  return (
    <div className="step step3">
      <div className="formContainer languageFormContainer">
        <h3>Language</h3>
        <LanguagesSelect
          languages={languages}
          options={options}
          formData={formData}
          placeholder="My level is"
          fourthLanguageSelectPlaceholder="Select language"
          handleChangeReactSelect={handleChangeReactSelect}
          handleClickAddLanguage={handleClickAddLanguage}
          toggleAddLanguageButton={toggleAddLanguageButton}
        />
      </div>
    </div>
  );
}
