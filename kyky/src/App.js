/* eslint-disable */
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Language from './language';
import fi from './localisation/fi.json';
import en from './localisation/en.json';
import StyleSandbox from './StyleSandbox';
import Header from './components/Header';
import Footer from './components/Footer';

const languages = { fi, en };
function App() {
  const [lang, setLang] = useState(languages.en);
  return (
    <Language.Provider value={{ lang }}>
      <>
        <Header languages={languages} lang={lang} setLang={setLang} />
        <div className="App">Hello, World</div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StyleSandbox />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </>
    </Language.Provider>
  );
}

export default App;
