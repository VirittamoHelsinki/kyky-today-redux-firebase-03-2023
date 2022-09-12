/* eslint-disable */
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Language from './language';
import fi from './localisation/fi.json';
import en from './localisation/en.json';
import MyCalendar from './pages/MyCalendar';
import ProfileCreation from './pages/ProfileCreation';
import Header from './components/Header';
import UserRegistration from './pages/UserRegistration';
import ContactForm from './pages/ContactForm';
import UserLogin from './pages/UserLogIn';
import LandingPage from './pages/LandingPage';
import JobCreation from './pages/JobCreation';
import Overview from './pages/Overview';
import JobCalendar from './pages/JobCalendar';
import Creation from './pages/ProfileCreation/Creation';
import NewProfileCreation from './pages/ProfileCreation/NewProfileCreation';
import GetStarted from './pages/ProfileCreation/GetStarted';

const languages = { fi, en };
function App() {
  const [lang, setLang] = useState(languages.fi);

  const navlinks = [
    { to: '/', label: 'Home' },
    { to: '/profile-creation', label: 'Profile Creation' },
    { to: '/user-registration', label: 'User Registration' },
    { to: '/contact-form', label: 'Contact Form' },
    { to: '/user-log-in', label: 'Log In' },
    { to: '/calendar', label: 'My Calendar' },
    { to: '/job-creation', label: 'Job Creation' },
    { to: '/calendar/overview', label: 'Overview' },
    { to: '/calendar', label: 'Job Calendar' },
    { to: '/new-profile-creation', label: 'New Profile Creation' }
  ];

  return (
    <Language.Provider value={{ lang }}>
      <>
        <BrowserRouter>
          <Header languages={languages} lang={lang} setLang={setLang} navlinks={navlinks} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="profile-creation" element={<ProfileCreation />} />
            <Route path="job-creation" element={<JobCreation />} />
            <Route path="user-registration" element={<UserRegistration />} />
            <Route path="contact-form" element={<ContactForm />} />
            <Route path="user-log-in" element={<UserLogin />} />
            <Route path="calendar" element={<MyCalendar />}>
              <Route index element={<JobCalendar />} />
              <Route path="overview" element={<Overview />} />
            </Route>

            <Route path="new-profile-creation" element={<Creation />}>
              <Route index element={<NewProfileCreation />} />
              <Route path="get-started" element={<GetStarted />} />
            </Route>
           
          </Routes>
        </BrowserRouter>
      </>
    </Language.Provider>
  );
}

export default App;
