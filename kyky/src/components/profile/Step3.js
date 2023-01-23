import { useState, useEffect } from 'react';
import { GenericSelect } from './Select';
import { language_options } from './Features';
import Languages from '../../../languages.json';

export default function Step3({ handleChange }) {
  const [finnish, setFinnish] = useState(language_options[0]);
  const [swedish, setSwedish] = useState(language_options[0]);
  const [english, setEnglish] = useState(language_options[0]);
  const [optionalLang, setOptionalLang] = useState({ value: '', label: '' });
  const [optionalSkill, setOptionalSkill] = useState(language_options[0]);
  const [languages, setLanguages] = useState([]);
  const [langArr, setLangArr] = useState([]);

  /* copy the lang array, take keys to the list, find if the obj key exists in the list
  and replace existing obj, push a new if doesn't exist, if 'No selection' remove obj 
  from lang array, pass the lang array to the parent components formData state */
  const handleChoices = (obj) => {
    let langArr_copy = [...langArr];
    let keys = Object.keys(langArr_copy);
    let index = keys.indexOf(Object.keys(obj)[0]);
    if (index >= 0) {
      langArr_copy[index] = obj;
    } else {
      langArr_copy.push(obj);
    }
    if (Object.values(obj)[0] === 'No selection') {
      let temp_arr = langArr_copy.filter((e) => Object.keys(e)[0] !== Object.keys(obj)[0]);
      langArr_copy = [...temp_arr];
    }
    setLangArr(langArr_copy);
    handleChange('s3Langs', langArr_copy);
  };

  /* take values and labels from Languages.JSON for react-select when page loads  */
  useEffect(() => {
    setLanguages(
      Object.keys(Languages).map((key) => {
        return { value: key, label: Languages[key].name };
      })
    );
  }, []);

  useEffect(() => {
    handleChoices({ s3Finnish: finnish.label });
  }, [finnish]);

  useEffect(() => {
    handleChoices({ s3Swedish: swedish.label });
  }, [swedish]);

  useEffect(() => {
    handleChoices({ s3English: english.label });
  }, [english]);

  useEffect(() => {
    handleChoices({ s3OptionalLang: optionalLang.label });
  }, [optionalLang]);

  useEffect(() => {
    handleChoices({ s3OptionalSkill: optionalSkill.label });
  }, [optionalSkill]);

  return (
    <div className="step step3">
      <div className="formContainer languageFormContainer">
        <h3>Language</h3>
        <div className="languageRow">
          <label htmlFor="finnishSelect">Finnish</label>
          <GenericSelect
            name="finnishSelect"
            placeholder="My level is"
            options={[...language_options]}
            onChange={(value) => setFinnish(value)}
          />
        </div>
        <div className="languageRow">
          <label htmlFor="swedishSelect">Swedish</label>
          <GenericSelect
            name="swedishSelect"
            placeholder="My level is"
            options={[...language_options]}
            onChange={(value) => setSwedish(value)}
          />
        </div>
        <div className="languageRow">
          <label htmlFor="englishSelect">English</label>
          <GenericSelect
            name="englishSelect"
            placeholder="My level is"
            options={[...language_options]}
            onChange={(value) => setEnglish(value)}
          />
        </div>
        <div className="languageRow">
          <GenericSelect
            className="fourth-language-select-container"
            name="otherSelect"
            placeholder="Select language"
            options={languages}
            onChange={(value) => setOptionalLang(value)}
          />
          <GenericSelect
            name="otherSelect"
            placeholder="My level is"
            options={[...language_options]}
            onChange={(value) => setOptionalSkill(value)}
          />
        </div>
      </div>
    </div>
  );
}
