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
  const [travelTime, setTravelTime] = useState(false);
  return (
    <>
      <h2>Booking Preferences</h2>
      <div className="buffer-between container">
        <p>Buffer between bookings</p>
        <div className="buffers">
          <Input type="radio" name="buffer" id="none" label="">
            <select className="short" defaultValue={15}>
              {bufferTimes.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.text}
                </option>
              ))}
            </select>
          </Input>
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
        <div className="no-buffers">
          <Input type="radio" name="buffer" id="none" label="Allow only one booking per day" />
        </div>
      </div>
    </>
  );
}
