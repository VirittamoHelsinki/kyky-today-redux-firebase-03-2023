import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../redux/buyers/serviceBookingSlice';
import { createContact } from '../redux/chat/contactSlice';
import Button from '../components/Button';
import Input from '../components/Input';
import Calendar from '../components/calendar/Calendar';
import SelectDays from '../components/SelectDays';
import Checkbox from '../components/Checkbox';

const Tabs = {
  Once: 'Once',
  Recurring: 'Recurring'
};

const defaultBookingValue = {
  checked: '',
  selectedDays: [],
  selectedDates: [],
  termsAccepted: false
};

const defaultJob = {
  job: 'Dog Walker',
  title: 'I will walk your dog with love and care',
  comment: { author: 'John Doe', comment: 'Punctual, friendly, dog lover, caring, responsible' },
  prices: {
    weekday: 25,
    weekend: 30,
    everyOtherWeekday: 22,
    everyOtherWeekend: 25,
    onceEveryMonth: 25
  }
};

function ServiceBooking() {
  const [urls, setUrls] = useState([]);
  const [urlIndex, setUrlIndex] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [weekday, setWeekday] = useState(0);
  const [weekend, setWeekend] = useState(0);
  const [everyOtherWeekday, setEveryOtherWeekday] = useState(0);
  const [everyOtherWeekend, setEveryOtherWeekend] = useState(0);
  const [onceAMonth, setOnceAMonth] = useState(0);
  const [unit, setUnit] = useState('€');
  const [currentTab, setCurrentTab] = useState(Tabs.Once);
  const [booking, setBooking] = useState(defaultBookingValue);
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [inputname, setInputname] = useState('');
  const [inputmail, setInputmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [uid, setUid] = useState('');

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const _user = useSelector((state) => state.user);

  const job = defaultJob;

  const state_exists = location.state !== null;

  /* set card owner's data to local state */
  useEffect(() => {
    if (state_exists) {
      setUrls(location.state.urls);
      setName(location.state.name);
      setDescription(location.state.description);
      setPrice(location.state.price);
      setWeekday(location.state.weekday);
      setWeekend(location.state.weekend);
      setEveryOtherWeekday(location.state.everyOtherWeekday);
      setEveryOtherWeekend(location.state.everyOtherWeekend);
      setOnceAMonth(location.state.onceAMonth);
      setUnit(location.state.unit);
      setPhotoURL(location.state.photoURL);
      setUid(location.state.uid);
    }
  }, []);

  useEffect(() => {
    if (_user.uid) {
      setUser(_user);
    }
  }, []);

  useEffect(() => {
    selectedCalendarDay(date);
  }, [date]);

  function selectedCalendarDay(date) {
    setBooking({ ...booking, selectedDays: [], selectedDates: [date] });
  }

  function checkOnceEveryMonth() {
    check('onceEveryMonth');
    setShowCalendarModal(true);
  }

  function check(value) {
    setBooking({ ...booking, checked: value });
  }

  function selectedDays(e) {
    setBooking({ ...booking, selectedDays: e, selectedDates: [] });
  }

  function selectedTab(currentTab) {
    setCurrentTab(currentTab);
    setBooking(defaultBookingValue);
  }

  function checkTerms() {
    if (booking.termsAccepted) {
      setBooking({ ...booking, termsAccepted: false });
    } else {
      setBooking({ ...booking, termsAccepted: true });
    }
  }

  function authenticated() {
    if (user) {
      confirmBooking();
    } else {
      setShowGuestModal(true);
    }
  }

  /* create a chat between user and card's owner */
  function onContactClick() {
    dispatch(
      createContact({
        myUid: user.uid,
        myName: user.displayName,
        myPhotoURL: user.photoURL,
        contactUid: uid,
        contactName: name,
        contactPhotoURL: photoURL
      })
    );
  }

  function confirmBooking() {
    if (!booking.termsAccepted) {
      alert('Please read the VAT (sales tax) terms before continuing!');
    } else {
      alert(
        `Thank you for booking the job ${location.state.title}! You have booked ${
          location.state.title
        } for the following days: ${booking.selectedDays.map((day) => day.label)}${
          booking.selectedDates
        }`
      );
      dispatch(
        createBooking({
          ...booking,
          id: location.state.id,
          uid: location.state.uid,
          user: user ? user.displayName : inputname,
          mail: user ? user.email : inputmail,
          location: location.state.place,
          date: date,
          time: {
            start: '09:00',
            end: '15:00'
          },
          jobId: location.state.title,
          confirmed: false
        })
      );
      setBooking(defaultBookingValue);
      navigate('/');
    }
  }

  function mailValidation(email) {
    if (email.length < 5 || !email.includes('@') || !email.includes('.')) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="booking-page-content">
      {!state_exists ? (
        <div>No job profile to show, please navigate back to the category page</div>
      ) : (
        <div className="service-booking-container">
          <div className="service-booking-left-panel">
            <div className="service-booking-left-panel-content">
              <div className="service-booking-left-panel-header">
                <h1>{description}</h1>
                <div className="username-commented-as">
                  <h2>{name}</h2> was commented as:
                </div>
                <p>{job.comment.comment}</p>
              </div>
              <div className="service-booking-left-panel-price">
                <div className="price">
                  {price} {unit}/h
                </div>
              </div>
            </div>
            <div className="service-booking-left-panel-image-content">
              <img
                src={urls[urlIndex]}
                className="service-booking-left-panel-image"
                alt={'jobImage'}
              />
              {urlIndex > 0 && (
                <div
                  className="arrow-left"
                  onClick={() => {
                    setUrlIndex(urlIndex - 1);
                  }}>
                  <span className="material-icons-outlined">keyboard_arrow_left</span>
                </div>
              )}
              {urlIndex < urls.length - 1 && (
                <div
                  className="arrow-right"
                  onClick={() => {
                    setUrlIndex(urlIndex + 1);
                  }}>
                  <span className="material-icons-outlined">keyboard_arrow_right</span>
                </div>
              )}
            </div>
          </div>

          <div className="service-booking-right-panel">
            <div className="service-booking-right-panel-content">
              <div className="service-booking-right-panel-tabs">
                <div
                  className={`panel-button ${currentTab === Tabs.Once ? 'selected' : ''}`}
                  onClick={() => selectedTab(Tabs.Once)}>
                  Once
                </div>
                <div
                  className={`panel-button ${currentTab === Tabs.Recurring ? 'selected' : ''}`}
                  onClick={() => selectedTab(Tabs.Recurring)}>
                  Recurring
                </div>
              </div>

              {currentTab === Tabs.Once && (
                <div>
                  <Calendar date={date} setDate={setDate} minYears={0} maxYears={5} />
                  <div className="vat-terms">
                    <Checkbox
                      className="checkbox"
                      label={`I have read VAT (sales tax) terms`}
                      onChange={() => checkTerms()}
                    />
                  </div>
                </div>
              )}

              {currentTab === Tabs.Recurring && (
                <div className="recurring-tab-container">
                  <div className="checkbox-wrapper">
                    <div className="checkbox-wrapper-row">
                      <div className="recurring-text">
                        <Checkbox
                          className="checkbox"
                          label="Every weekday"
                          checked={booking.checked === 'weekday'}
                          onChange={() => check('weekday')}
                        />
                      </div>
                      <div className="recurring-price">
                        {weekday} {unit}/h
                      </div>
                      {booking.checked === 'weekday' && (
                        <SelectDays selectedDays={selectedDays} booking={booking} />
                      )}
                    </div>

                    <div className="checkbox-wrapper-row">
                      <div className="recurring-text">
                        <Checkbox
                          className="checkbox"
                          label="Every weekend"
                          checked={booking.checked === 'weekend'}
                          onChange={() => check('weekend')}
                        />
                      </div>
                      <div className="recurring-price">{weekend} €/h</div>
                      {booking.checked === 'weekend' && (
                        <SelectDays selectedDays={selectedDays} booking={booking} />
                      )}
                    </div>

                    <div className="checkbox-wrapper-row">
                      <div className="recurring-text">
                        <Checkbox
                          className="checkbox"
                          label="Every other weekday"
                          checked={booking.checked === 'everyOtherWeekday'}
                          onChange={() => check('everyOtherWeekday')}
                        />
                      </div>
                      <div className="recurring-price">{everyOtherWeekday} €/h</div>
                      {booking.checked === 'everyOtherWeekday' && (
                        <SelectDays selectedDays={selectedDays} booking={booking} />
                      )}
                    </div>

                    <div className="checkbox-wrapper-row">
                      <div className="recurring-text">
                        <Checkbox
                          className="checkbox"
                          label="Every other weekend"
                          checked={booking.checked === 'everyOtherWeekend'}
                          onChange={() => check('everyOtherWeekend')}
                        />
                      </div>
                      <div className="recurring-price">{everyOtherWeekend} €/h</div>
                      {booking.checked === 'everyOtherWeekend' && (
                        <SelectDays selectedDays={selectedDays} booking={booking} />
                      )}
                    </div>

                    <div className="checkbox-wrapper-row">
                      <div className="recurring-text">
                        <Checkbox
                          className="checkbox"
                          label="Once every month"
                          checked={booking.checked === 'onceEveryMonth'}
                          onChange={() => checkOnceEveryMonth()}
                        />
                      </div>
                      <div className="recurring-price">{onceAMonth} €/h</div>
                      {booking.checked === 'onceEveryMonth' && showCalendarModal && (
                        <div className="calendar-modal transparent-background">
                          <div className="calendar-modal">
                            <Calendar date={date} setDate={setDate} minYears={0} maxYears={5} />
                            <div className="calendar-modal-buttons-container">
                              <Button
                                className="calendar-modal-button"
                                onClick={() => setShowCalendarModal(false)}>
                                Confirm selection
                              </Button>
                              <Button
                                className="calendar-modal-button"
                                onClick={() => setBooking(defaultBookingValue)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="vat-terms">
                    <Checkbox
                      className="checkbox"
                      label={`I have read VAT (sales tax) terms`}
                      onChange={() => checkTerms()}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="service-booking-right-panel-continue-button">
              <Button onClick={() => authenticated()} children={<div>Continue</div>} />
            </div>
            {showGuestModal && (
              <div className="guest-modal transparent-background">
                <div className="guest-modal">
                  <h3>You are not logged in.</h3>
                  <h3>Enter your name and email address so you can be contacted.</h3>
                  <div>Name</div>
                  <Input
                    label=""
                    type="text"
                    name="username"
                    value={inputname}
                    placeholder="your name"
                    onChange={(e) => {
                      setInputname(e.target.value);
                    }}></Input>
                  <div>Email address</div>
                  <Input
                    label=""
                    type="email"
                    name="email"
                    value={inputmail}
                    placeholder="your email"
                    onChange={(e) => {
                      setInputmail(e.target.value);
                    }}></Input>
                  <div className="guest-modal-buttons-container">
                    {inputname !== '' && mailValidation(inputmail) ? (
                      <Button
                        className="guest-modal-button"
                        onClick={() => {
                          confirmBooking();
                          setShowGuestModal(false);
                        }}>
                        Confirm selection
                      </Button>
                    ) : (
                      <Button className="guest-modal-button-disabled" disabled>
                        Confirm selection
                      </Button>
                    )}
                    <Button className="guest-modal-button" onClick={() => setShowGuestModal(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="service-booking-footer">
        <div className="service-booking-footer-button">
          {user ? (
            <Button
              className="button-enabled"
              onClick={() => {
                onContactClick();
                navigate('/buyers-profile');
              }}>
              Contact Seller
            </Button>
          ) : (
            <Button className="button-disabled">Contact Seller</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceBooking;
