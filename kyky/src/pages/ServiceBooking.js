import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createBooking } from '../redux/buyers/serviceBookingSlice';
import Button from '../components/Button';
import Calendar from '../components/Calendar';
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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState('€');
  const [currentTab, setCurrentTab] = useState(Tabs.Once);
  const [booking, setBooking] = useState(defaultBookingValue);
  const [date, setDate] = useState(new Date());
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();

  const job = defaultJob;

  const state_exists = location.state !== null;

  useEffect(() => {
    if (state_exists) {
      setUrls(location.state.urls);
      setName(location.state.name);
      setDescription(location.state.description);
      setPrice(location.state.price);
      setUnit(location.state.unit);
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

  function confirmBooking() {
    if (!booking.termsAccepted) {
      alert('Please read the VAT (sales tax) terms before continuing!');
    } else {
      alert(
        `Thank you for booking the job ${location.state.subCategory}! You have booked ${
          location.state.subCategory
        } for the following days: ${booking.selectedDays.map((day) => day.label)}${
          booking.selectedDates
        }`
      );
      dispatch(
        createBooking({
          ...booking,
          id: location.state.id,
          uid: location.state.uid,
          user: location.state.name,
          location: location.state.place,
          date: date,
          time: {
            start: '09:30',
            end: '12:00'
          },
          jobId: location.state.subCategory,
          confirmed: false,
          unread: true
        })
      );
      setBooking(defaultBookingValue);
    }
  }

  return (
    <div className="booking-page-content">
      {!state_exists ? (
        <div>No job profile to show, please navigate back to the category page</div>
      ) : (
        <div className="service-booking-container">
          <div className="service-booking-left-panel">
            <div className="service-booking-left-panel-header">
              <h1>{description}</h1>
              <div className="username-commented-as">
                <h2>{name}</h2> was commented as:
              </div>
              <p>{job.comment.comment}</p>
            </div>
            <img src={urls[0]} className="service-booking-left-panel-image" alt={'jobImage'} />
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
                        {price} {unit}/h
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
                      <div className="recurring-price">{job.prices.weekend} €/h</div>
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
                      <div className="recurring-price">{job.prices.weekend} €/h</div>
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
                      <div className="recurring-price">{job.prices.weekend} €/h</div>
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
                      <div className="recurring-price">{job.prices.weekend} €/h</div>
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
              <Button onClick={() => confirmBooking()} children={<div>Continue</div>} />
            </div>
          </div>
        </div>
      )}
      <div className="service-booking-footer">
        <div className="service-booking-footer-button">
          <Button children={<div>Contact Seller</div>} />
        </div>
      </div>
    </div>
  );
}

export default ServiceBooking;
