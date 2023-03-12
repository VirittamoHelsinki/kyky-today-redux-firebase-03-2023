/* eslint-disable */
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from './redux/calendar/calendarScheduleSlice';
import { fetchBookingsByQuery } from './redux/orders/orderSlice';
import { fetchJobsByQuery } from './redux/jobs/jobSlice';
import { fetchNotifications } from './redux/notifications/notificationSlice';
import { updateLastseen } from './redux/auth/userSlice';

/* Language */
import Language from './language';
import fi from './localisation/fi.json';
import en from './localisation/en.json';

/* Misc */
import Header from './components/Header';
import Footer from './components/Footer';
import UserRegistration from './pages/UserRegistration';
import ContactForm from './pages/ContactForm';
import UserLogin from './pages/UserLogIn';
import RecoverPassword from './pages/RecoverPassword';
import LandingPage from './pages/LandingPage';
import ServiceBooking from './pages/ServiceBooking';
import CategoryPage from './pages/CategoryPage';
import UserProfile from './pages/UserProfile';
import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';

/* Calendar */
import MyCalendar from './pages/Calendar/MyCalendar';
import Overview from './pages/Calendar/Overview';
import JobCalendar from './pages/Calendar/JobCalendar';
import ManageSchedules from './pages/Calendar/ManageSchedules';
import CalendarSettings from './pages/Calendar/CalendarSettings';

/* Seller & buyer profiles */
import BuyersProfile from './pages/Profiles/BuyersProfile';
import SellersProfile from './pages/Profiles/SellersProfile';
import Dashboard from './pages/Profiles/Dashboard';
import Purchases from './pages/Profiles/Purchases';
import Messages from './pages/Profiles/Messages';
import Ratings from './pages/Profiles/Ratings';
import Settings from './pages/Profiles/Settings';
import OwnJobs from './pages/Profiles/OwnJobs';
import Orders from './pages/Profiles/Orders';
import Earnings from './pages/Profiles/Earnings';

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
import ContactUs from './pages/Infos/ContactUs';

const languages = { fi, en };
const defaultJob = {
  id: '',
  categories: [],
  cities: [],
  job_title: ''
};

const App = () => {
  const [lang, setLang] = useState(languages.fi);
  const [jobs, setJobs] = useState([defaultJob]);

  const _user = useSelector((state) => state.user);
  const _titles = useSelector((state) => state.jobs.titles);

  const dispatch = useDispatch();

  useEffect(() => {
    if (_user.uid) {
      dispatch(fetchSchedules(_user.uid));
      dispatch(fetchJobsByQuery({ key: 'uid', value: _user.uid }));
      dispatch(fetchBookingsByQuery(_user.uid));
      dispatch(fetchNotifications(_user.uid));
      dispatch(updateLastseen(_user.uid));
    }
  }, [_user]);

  /* sets job titles for the calendar settings as a parameter 'cos select button values won't render otherwise */
  useEffect(() => {
    if (_titles) {
      setJobs(_titles);
    }
  }, [_titles]);

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
          <Route path="user-profile/:slug" element={<UserProfile />} />
          <Route path="kyky-team" element={<KykyTeam />} />
          <Route path="kyky-faqs" element={<FAQs />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="how-service-works" element={<HowServiceWorks />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="additional-services" element={<AdditionalServices />} />
          <Route path="contact-us" element={<ContactUs />} />

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
              path="settings"
              element={
                <UserRoute>
                  <CalendarSettings jobs={jobs} />
                </UserRoute>
              }
            />
          </Route>

          <Route
            path="buyer"
            element={
              <UserRoute>
                <BuyersProfile />
              </UserRoute>
            }>
            <Route
              path="purchases"
              element={
                <UserRoute>
                  <Purchases />
                </UserRoute>
              }
            />
            <Route
              path="messages"
              element={
                <UserRoute>
                  <Messages />
                </UserRoute>
              }
            />
            <Route
              path="ratings"
              element={
                <UserRoute>
                  <Ratings />
                </UserRoute>
              }
            />
            <Route
              path="settings"
              element={
                <UserRoute>
                  <Settings />
                </UserRoute>
              }
            />
          </Route>

          <Route
            path="seller"
            element={
              <UserRoute>
                <SellersProfile />
              </UserRoute>
            }>
            <Route
              path="dashboard"
              element={
                <UserRoute>
                  <Dashboard />
                </UserRoute>
              }
            />
            <Route
              path="settings"
              element={
                <UserRoute>
                  <Settings />
                </UserRoute>
              }
            />
            <Route
              path="own-jobs"
              element={
                <UserRoute>
                  <OwnJobs />
                </UserRoute>
              }
            />
            <Route
              path="orders"
              element={
                <UserRoute>
                  <Orders />
                </UserRoute>
              }
            />
            <Route
              path="messages"
              element={
                <UserRoute>
                  <Messages />
                </UserRoute>
              }
            />
            <Route
              path="ratings"
              element={
                <UserRoute>
                  <Ratings />
                </UserRoute>
              }
            />
            <Route
              path="earnings"
              element={
                <UserRoute>
                  <Earnings />
                </UserRoute>
              }
            />
            <Route
              path="purchases"
              element={
                <UserRoute>
                  <Purchases />
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
        <Footer />
      </BrowserRouter>
    </Language.Provider>
  );
};

export default App;
