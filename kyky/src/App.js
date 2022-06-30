/* eslint-disable */
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Language from './language';
import fi from './localisation/fi.json';
import en from './localisation/en.json';
import ProfileCreation from './pages/ProfileCreation';
import Header from './components/Header';
import UserRegistration from './pages/UserRegistration';
import ContactForm from './pages/ContactForm';
import UserLogin from './pages/UserLogIn';
import LandingPage from './pages/LandingPage';

const languages = { fi, en };
function App() {
  const [lang, setLang] = useState(languages.fi);

  const navlinks = [
    { to: '/', label: 'Home' },
    { to: '/profile-creation', label: 'Profile Creation' },
    { to: '/user-registration', label: 'User Registration' },
    { to: '/contact-form', label: 'Contact Form' },
    { to: '/user-log-in', label: 'Log In' }
  ];

  return (
    <Language.Provider value={{ lang }}>
      <>
        <BrowserRouter>
          <Header languages={languages} lang={lang} setLang={setLang} navlinks={navlinks} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
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
