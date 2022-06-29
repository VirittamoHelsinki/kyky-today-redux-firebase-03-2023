/* eslint-disable */
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Language from './language';
import fi from './localisation/fi.json';
import en from './localisation/en.json';
import StyleSandbox from './StyleSandbox';
import ProfileCreation from './pages/ProfileCreation';
import Header from './components/Header';
import UserRegistration from './pages/UserRegistration';
import ContactForm from './pages/ContactForm';
import UserLogin from './pages/UserLogIn';

const languages = { fi, en };
function App() {
  const [lang, setLang] = useState(languages.fi);
  return (
    <Language.Provider value={{ lang }}>
      <>
        <Header languages={languages} lang={lang} setLang={setLang} />
        <div className="App">Hello, World</div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StyleSandbox />} />
            <Route path="/profile-creation" element={<ProfileCreation />} />
            <Route path="/user-registration" element={<UserRegistration />} />
            <Route path="/contact-form" element={<ContactForm />} />
            <Route path="/user-log-in" element={<UserLogin />} />
          </Routes>
        </BrowserRouter>
      </>
    </Language.Provider>
  );
}

export default App;
