/* eslint-disable */
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from './redux/sellers/calendarScheduleSlice';
import { fetchBookingsByQuery } from './redux/buyers/serviceBookingSlice';
import { fetchJobsByQuery } from './redux/sellers/jobFormSlice';

/* Language */
import Language from './language';
import fi from './localisation/fi.json';
import en from './localisation/en.json';

/* Misc */
import ProfileCreation from './pages/ProfileCreation';
import Header from './components/Header';
import Footer from './components/Footer';
import UserRegistration from './pages/UserRegistration';
import ContactForm from './pages/ContactForm';
import UserLogin from './pages/UserLogIn';
import RecoverPassword from './pages/RecoverPassword';
import LandingPage from './pages/LandingPage';
import ServiceBooking from './pages/ServiceBooking';
import CategoryPage from './pages/CategoryPage';
import BuyersProfile from './pages/BuyersProfile';
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

/* Footer contents */
import KykyTeam from './pages/Infos/KykyTeam';
import FAQs from './pages/Infos/FAQs';
import TermsOfService from './pages/Infos/TermsOfService';
import PrivacyPolicy from './pages/Infos/PrivacyPolicy';
import HowServiceWorks from './pages/Infos/HowServiceWorks';
import Pricing from './pages/Infos/Pricing';
import AdditionalServices from './pages/Infos/AdditionalServices';

const languages = { fi, en };

const App = () => {
  const [lang, setLang] = useState(languages.fi);

  const _user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (_user.uid) {
      dispatch(fetchSchedules(_user.uid));
      dispatch(fetchJobsByQuery({ key: 'uid', value: _user.uid }));
      dispatch(fetchBookingsByQuery(_user.uid));
    }
  }, [_user]);

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
            path="buyers-profile"
            element={
              <UserRoute>
                <BuyersProfile />
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
          <Route path="kyky-team" element={<KykyTeam />} />
          <Route path="kyky-faqs" element={<FAQs />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="how-service-works" element={<HowServiceWorks />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="additional-services" element={<AdditionalServices />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Language.Provider>
  );
};

export default App;
