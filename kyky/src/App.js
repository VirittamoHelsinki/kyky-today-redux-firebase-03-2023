/* eslint-disable */
import { useState } from 'react';
import Language from './language';
import fi from './localisation/fi.json';
import en from './localisation/en.json';
import StyleSandbox from './StyleSandbox';
import Header from './components/Header';

const languages = { fi, en };
function App() {
  const [lang, setLang] = useState(languages.en);
  return (
    <Language.Provider value={{ lang }}>
      <>
        <Header languages={languages} lang={lang} setLang={setLang} />
        <div className="App">Hello, World</div>
        <StyleSandbox />
      </>
    </Language.Provider>
  );
}

export default App;
