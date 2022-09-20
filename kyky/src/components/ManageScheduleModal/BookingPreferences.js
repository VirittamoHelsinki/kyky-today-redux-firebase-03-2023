import { useState } from 'react';
import Input from '../Input';
import Switch from 'react-switch';

export default function BookingPreferences() {
  const bufferTimes = [
    { value: 0, text: 'None' },
    { value: 5, text: '5 minutes' },
    { value: 15, text: '15 minutes' },
    { value: 30, text: '30 minutes' },
    { value: 60, text: '1 hour' },
    { value: 120, text: '2 hours' }
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
  const [limitBookings, setLimitBookings] = useState(false);
  const [travelTime, setTravelTime] = useState(false);
  const [allowOverlap, setAllowOverlap] = useState(false);
  const [overlapAnyType, setOverlapAnyType] = useState(true);
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
            <select className="short" defaultValue={15}>
              {bufferTimes.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.text}
                </option>
              ))}
            </select>
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
        <select defaultValue={1}>
          {bookingTimes.map((time) => (
            <option key={time.value} value={time.value}>
              {time.text}
            </option>
          ))}
        </select>
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
