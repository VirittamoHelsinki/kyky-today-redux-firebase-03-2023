/* eslint-disable */
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Language */
import Language from './language';
import fi from './localisation/fi.json';
import en from './localisation/en.json';

/* Misc */
import ProfileCreation from './pages/ProfileCreation';
import Header from './components/Header';
import UserRegistration from './pages/UserRegistration';
import ContactForm from './pages/ContactForm';
import UserLogin from './pages/UserLogIn';
import LandingPage from './pages/LandingPage';
import JobCreation from './pages/JobCreation';

/* Profile creation */
import NewProfileCreation from './pages/ProfileCreation/NewProfileCreation';
import Creation from './pages/ProfileCreation/Creation';
import GetStarted from './pages/ProfileCreation/GetStarted';

/* Calendar */
import MyCalendar from './pages/Calendar/MyCalendar';
import Overview from './pages/Calendar/Overview';
import JobCalendar from './pages/Calendar/JobCalendar';
import ManageSchedules from './pages/Calendar/ManageSchedules';
import CalendarSettings from './pages/Calendar/CalendarSettings';

const languages = { fi, en };

const App = () => {
  const [lang, setLang] = useState(languages.fi);

  const navlinks = [
    { to: '/', label: 'Home' },
    { to: '/profile-creation', label: 'Profile Creation' },
    { to: '/user-registration', label: 'User Registration' },
    { to: '/contact-form', label: 'Contact Form' },
    { to: '/user-log-in', label: 'Log In' },
    { to: '/job-creation', label: 'Job Creation' },
    { to: '/new-profile-creation', label: 'New Profile Creation' },
    { to: '/calendar', label: 'My Calendar' },
    { to: '/calendar/overview', label: 'Overview' }
  ];

  return (
    <Language.Provider value={{ lang }}>
      <BrowserRouter>
        <Header navlinks={navlinks} />
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
            <Route path="schedule" element={<ManageSchedules />} />
            <Route path="settings" element={<CalendarSettings />} />
          </Route>

          <Route path="new-profile-creation" element={<Creation />}>
            <Route index element={<NewProfileCreation />} />
            <Route path="get-started" element={<GetStarted />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Language.Provider>
  );
};

export default App;
