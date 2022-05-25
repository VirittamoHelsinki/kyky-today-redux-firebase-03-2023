/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from 'react';
import Language from '../language';

export default function LanguageSelect({ languages, language, setLanguage }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (lang) => {
    setLanguage(lang);
    toggle();
  };

  return (
    <Language.Provider value={{ language, setLanguage }}>
      <div className="language-select">
        <button type="button" onClick={toggle}>
          {language.name}
        </button>
        {isOpen && (
          <div className="language-select__menu">
            {Object.values(languages).map((lang) => (
              <button key={lang.code} type="button" onClick={() => handleChange(lang)}>
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </Language.Provider>
  );
}
