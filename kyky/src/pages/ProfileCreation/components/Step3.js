import { LanguagesSelect } from './Select';
import { useState } from 'react';

export default function Step3() {
  const options = [
    { value: 'basic', label: 'Basic' },
    { value: 'conversational', label: 'Conversational' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'nativeOrBilingual', label: 'Native or Bilingual' }
  ];

  const initialSelectAttributes = [
    { name: 'finnishSelect', label: 'Finnish', visible: true },
    { name: 'swedishSelect', label: 'Swedish', visible: true },
    { name: 'englishSelect', label: 'English', visible: true },
    { name: 'otherSelect', label: 'Other language', visible: false }
  ];

  const [selectAttributes, setSelectAttributes] = useState(initialSelectAttributes);

  const handleClick = () => {
    setSelectAttributes(
      initialSelectAttributes.map(({ name, label, visible }) => {
        if (!visible) {
          return { name, label, visible: true };
        } else {
          return { name, label, visible };
        }
      })
    );
  };

  return (
    <div className="step step3">
      <div className="formContainer languageFormContainer">
        <h3>Language</h3>
        <LanguagesSelect
          options={options}
          selectAttributes={selectAttributes}
          placeholder="My level is"
          fourthLanguageSelectPlaceholder="Select language"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}
