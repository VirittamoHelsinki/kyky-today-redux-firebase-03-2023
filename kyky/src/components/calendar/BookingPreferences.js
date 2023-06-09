import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import Input from '../Input';

export default function BookingPreferences({ properties, setField, setCanContinue }) {
  const bufferTimes = [
    { value: 0, text: 'None' },
    { value: 5, text: '5 minutes' },
    { value: 15, text: '15 minutes' },
    { value: 30, text: '30 minutes' },
    { value: 60, text: '1 hour' },
    { value: 120, text: '2 hours' },
    { value: -1, text: 'Custom' }
  ];
  const bookingTimes = [
    // in hours
    { value: 0.5, text: '30 minutes' },
    { value: 1, text: '1 hour' },
    { value: 2, text: '2 hours' },
    { value: 3, text: '3 hours' },
    { value: 6, text: '6 hours' },
    { value: 10, text: '10 hours' },
    { value: -1, text: 'Custom' }
  ];
  const [limitBookings, setLimitBookings] = useState(properties.limitBookings);
  const [bufferTime, setBufferTime] = useState(properties.bufferBetweenBookings);
  const [customBuffertime, setCustomBuffertime] = useState(undefined);
  const [customMinimumBookingDuration, setCustomMinimumBookingDuration] = useState(undefined);
  const [travelTime, setTravelTime] = useState(properties.includeTravelTime);
  const [minimumBookingDuration, setMinimumBookingDuration] = useState(
    properties.minimumBookingDuration
  );
  const [allowOverlap, setAllowOverlap] = useState(properties.canOverlap);
  const [overlapAnyType, setOverlapAnyType] = useState(properties.overlapType === 'any');
  const [bufferError, setBufferError] = useState(false);
  const [bookingError, setBookingError] = useState(false);

  useEffect(() => {
    checkIfCanContinue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customBuffertime, customMinimumBookingDuration]);

  function checkIfCanContinue() {
    let can = true;
    if (customBuffertime > 23) {
      can = false;
      setBufferError(true);
    } else {
      setBufferError(false);
    }
    if (customMinimumBookingDuration > 168) {
      can = false;
      setBookingError(true);
    } else {
      setBookingError(false);
    }
    setCanContinue(can);
  }

  function changeMinimumDurationTime(val) {
    if (val === -1) {
      setMinimumBookingDuration(val);
      setCustomMinimumBookingDuration(1);
    } else {
      setMinimumBookingDuration(val);
      setCustomMinimumBookingDuration(undefined);
      setField('minimumBookingDuration', val);
    }
  }

  function changeBufferTime(val) {
    if (val === -1) {
      setBufferTime(val);
      setCustomBuffertime(1);
    } else {
      setBufferTime(val);
      setCustomBuffertime(undefined);
    }
  }

  useEffect(() => {
    if (limitBookings) {
      setField('limitBookings', true);
    } else {
      setField('limitBookings', false);
      setField('bufferBetweenBookings', bufferTime);
      setField('includeTravelTime', travelTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitBookings, bufferTime, travelTime]);

  useEffect(() => {
    if (allowOverlap) {
      setField('canOverlap', true);
      setField('overlapType', overlapAnyType ? 'any' : 'same');
    } else {
      setField('canOverlap', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowOverlap, overlapAnyType]);

  return (
    <>
      <h2>Booking Preferences</h2>
      <div className="buffer-between container">
        <p>Buffer between bookings</p>
        <div className={`buffers box ${!limitBookings ? 'selected' : ''}`}>
          <Input
            type="radio"
            name="buffer"
            id="buffer-bookings"
            label=""
            checked={!limitBookings}
            onChange={() => setLimitBookings(false)}>
            <select
              className="short"
              value={bufferTime}
              onChange={(e) => changeBufferTime(+e.target.value)}>
              {bufferTimes.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.text}
                </option>
              ))}
            </select>
            {customBuffertime !== undefined && (
              <>
                <Input
                  type="number"
                  name="custom-buffer"
                  id="custom-buffer"
                  className="input-container short"
                  label="hours"
                  value={customBuffertime}
                  onChange={(e) => {
                    setCustomBuffertime(+e.target.value);
                    setField('bufferBetweenBookings', +e.target.value * 60);
                  }}
                  min={1}
                  max={23}
                />
                <span>The buffer time must be between 1-23 hours</span>
              </>
            )}
            {bufferError && (
              <div className="error">
                <i className="material-icons-outlined">error_outline</i>
                <div>Invalid buffer time. The buffer time must be between 1-23 hours.</div>
              </div>
            )}
          </Input>
          <div className="travel-time-container">
            <Switch
              width={32}
              height={16}
              handleDiameter={14}
              name="travel-time"
              checked={travelTime}
              onChange={() => setTravelTime(!travelTime)}
            />
            <label htmlFor="travel-time">Include travel time</label>
          </div>
        </div>
        <div className={`limit-bookings box ${limitBookings ? 'selected' : ''}`}>
          <Input
            type="radio"
            name="buffer"
            id="limit-bookings"
            label="Allow only one booking per day"
            checked={limitBookings}
            onChange={() => setLimitBookings(true)}></Input>
        </div>
      </div>
      <div className="booking-duration container">
        <p>Minimum duration of a booking</p>
        <select
          defaultValue={minimumBookingDuration}
          onChange={(e) => changeMinimumDurationTime(+e.target.value)}>
          {bookingTimes.map((time) => (
            <option key={time.value} value={time.value}>
              {time.text}
            </option>
          ))}
        </select>
        {customMinimumBookingDuration !== undefined && (
          <>
            <Input
              type="number"
              name="custom-buffer"
              id="custom-buffer"
              className="input-container short"
              label="hours"
              value={customMinimumBookingDuration}
              onChange={(e) => {
                setCustomMinimumBookingDuration(+e.target.value);
                setField('minimumBookingDuration', +e.target.value);
              }}
              min={1}
              max={168}
            />
            <span>The duration must be between 1-168 hours</span>
          </>
        )}
        {bookingError && (
          <div className="error">
            <i className="material-icons-outlined">error_outline</i>
            <div>Invalid booking duration. The duration must be between 1-168 hours.</div>
          </div>
        )}
      </div>
      <div className="overlapping-bookings container">
        <p>Overlapping bookings</p>
        <div className="allow">
          <Switch
            width={32}
            height={16}
            handleDiameter={14}
            name="allow-overlap"
            checked={allowOverlap}
            onChange={() => setAllowOverlap(!allowOverlap)}
          />
          <label htmlFor="allow-overlap">Allow other bookings to overlap with this job</label>
        </div>
        <div
          className={`${allowOverlap ? '' : 'disabled'}`}
          style={{ display: 'flex', gap: '2rem' }}>
          <div className={`any-job box ${overlapAnyType ? 'selected' : ''}`}>
            <Input
              type="radio"
              name="job-type"
              id="any-type"
              label="Any job type"
              checked={overlapAnyType}
              onChange={() => {
                setOverlapAnyType(true);
                setAllowOverlap(true);
              }}></Input>
          </div>
          <div className={`same-job box ${!overlapAnyType ? 'selected' : ''}`}>
            <Input
              type="radio"
              name="job-type"
              id="same-type"
              label="Same job type only"
              checked={!overlapAnyType}
              onChange={() => {
                setOverlapAnyType(false);
                setAllowOverlap(true);
              }}></Input>
          </div>
        </div>
      </div>
    </>
  );
}

BookingPreferences.propTypes = {
  properties: PropTypes.shape({
    limitBookings: PropTypes.bool.isRequired,
    bufferBetweenBookings: PropTypes.number.isRequired,
    includeTravelTime: PropTypes.bool.isRequired,
    minimumBookingDuration: PropTypes.number.isRequired,
    canOverLap: PropTypes.bool,
    overlapType: PropTypes.string.isRequired
  }).isRequired,
  setField: PropTypes.func.isRequired,
  setCanContinue: PropTypes.func.isRequired
};

// BookingPreferences.propTypes = {
//   properties: PropTypes.shape({
//     limitBookings: PropTypes.bool.isRequired,
//     bufferBetweenBookings: PropTypes.number.isRequired,
//     canOverLap: PropTypes.bool.isRequired,
//     includeTravelTime: PropTypes.bool.isRequired,
//     jobTitle: PropTypes.string.isRequired,
//     limitBookings: PropTypes.bool.isRequired,
//     minimumBookingDuration: PropTypes.number.isRequired,
//     overlapType: PropTypes.string.isRequired,
//     recurring: PropTypes.arrayOf(PropTypes.string).isRequired,
//     recurringDays: PropTypes.arrayOf(PropTypes.string).isRequired,
//     scheduleDuration: PropTypes.shape({
//       months: PropTypes.number,
//       startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
//       endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
//     }).isRequired,
//     time: PropTypes.shape({
//       start: PropTypes.string.isRequired,
//       end: PropTypes.string.isRequired
//     }).isRequired
//   }).isRequired,
//   setField: PropTypes.func.isRequired,
//   setCanContinue: PropTypes.func.isRequired
// };
