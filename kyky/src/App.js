/* eslint-disable */
import { useState } from 'react';
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
import RecoverPassword from './pages/RecoverPassword';
import LandingPage from './pages/LandingPage';
import ServiceBooking from './pages/ServiceBooking';
import CategoryPage from './pages/CategoryPage';
import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';

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
import JobCreation from './pages/Calendar/JobCreation';

/* Buyer's Rating*/
import BuyersRating from './pages/BuyersRating';
import ThanksForRating from './components/profile/ThanksForRating';
import NPS from './components/profile/NPS';

const languages = { fi, en };

const App = () => {
  const [lang, setLang] = useState(languages.fi);

  const navlinks = [
    { to: '/', label: 'Home' },
    { to: '/new-profile-creation', label: 'Profile Creation' },
    { to: '/job-creation', label: 'Job Creation' },
    { to: '/buyers-rating', label: 'Buyers Rating' },
    { to: '/contact-form', label: 'Contact Form' }
  ];

  return (
    <Language.Provider value={{ lang }}>
      <BrowserRouter>
        <Header navlinks={navlinks} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="categories/:category" element={<CategoryPage />} />
          <Route path="service-booking" element={<ServiceBooking />} />
          <Route
            path="profile-creation"
            element={
              <UserRoute>
                <ProfileCreation />
              </UserRoute>
            }
          />
          <Route
            path="job-creation"
            element={
              <UserRoute>
                <JobCreation />
              </UserRoute>
            }
          />
          <Route
            path="calendar"
            element={
              <UserRoute>
                <MyCalendar />
              </UserRoute>
            }>
            <Route
              index
              element={
                <UserRoute>
                  <JobCalendar />
                </UserRoute>
              }
            />
            <Route
              path="overview"
              element={
                <UserRoute>
                  <Overview />
                </UserRoute>
              }
            />
            <Route
              path="schedule"
              element={
                <UserRoute>
                  <ManageSchedules />
                </UserRoute>
              }
            />
            <Route
              path="job-creation"
              element={
                <UserRoute>
                  <JobCreation />
                </UserRoute>
              }
            />
            <Route
              path="settings"
              element={
                <UserRoute>
                  <CalendarSettings />
                </UserRoute>
              }
            />
          </Route>

          <Route
            path="new-profile-creation"
            element={
              <UserRoute>
                <Creation />
              </UserRoute>
            }>
            <Route
              index
              element={
                <UserRoute>
                  <NewProfileCreation />
                </UserRoute>
              }
            />
            <Route
              path="get-started"
              element={
                <UserRoute>
                  <GetStarted />
                </UserRoute>
              }
            />
          </Route>
          <Route
            path="buyers-rating"
            element={
              <UserRoute>
                <BuyersRating />
              </UserRoute>
            }
          />
          <Route
            path="buyers-rating/thanks-for-rating"
            element={
              <UserRoute>
                <ThanksForRating />
              </UserRoute>
            }
          />
          <Route
            path="buyers-rating/thanks-for-rating/nps"
            element={
              <UserRoute>
                <NPS />
              </UserRoute>
            }
          />
          <Route
            path="user-registration"
            element={
              <GuestRoute>
                <UserRegistration />
              </GuestRoute>
            }
          />
          <Route path="contact-form" element={<ContactForm />} />
          <Route
            path="user-log-in"
            element={
              <GuestRoute>
                <UserLogin />
              </GuestRoute>
            }
          />
          <Route
            path="recover-password"
            element={
              <GuestRoute>
                <RecoverPassword />
              </GuestRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Language.Provider>
  );
};

export default App;
