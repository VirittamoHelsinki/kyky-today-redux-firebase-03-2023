import React from 'react';

const TimeSelect = ({ setTime, timestring }) => {
  return (
    <select
      className="time-select"
      defaultValue={timestring}
      onChange={(e) => setTime(e.target.value)}>
      <option value="0:00">00:00</option>
      <option value="0:15">00:15</option>
      <option value="0:30">00:30</option>
      <option value="0:45">00:45</option>

      <option value="1:00">01:00</option>
      <option value="1:15">01:15</option>
      <option value="1:30">01:30</option>
      <option value="1:45">01:45</option>

      <option value="2:00">02:00</option>
      <option value="2:15">02:15</option>
      <option value="2:30">02:30</option>
      <option value="2:45">02:45</option>

      <option value="3:00">03:00</option>
      <option value="3:15">03:15</option>
      <option value="3:30">03:30</option>
      <option value="3:45">03:45</option>

      <option value="4:00">04:00</option>
      <option value="4:15">04:15</option>
      <option value="4:30">04:30</option>
      <option value="4:45">04:45</option>

      <option value="5:00">05:00</option>
      <option value="5:15">05:15</option>
      <option value="5:30">05:30</option>
      <option value="5:45">05:45</option>

      <option value="6:00">06:00</option>
      <option value="6:15">06:15</option>
      <option value="6:30">06:30</option>
      <option value="6:45">06:45</option>

      <option value="7:00">07:00</option>
      <option value="7:15">07:15</option>
      <option value="7:30">07:30</option>
      <option value="7:45">07:45</option>

      <option value="8:00">08:00</option>
      <option value="8:15">08:15</option>
      <option value="8:30">08:30</option>
      <option value="8:45">08:45</option>

      <option value="9:00">09:00</option>
      <option value="9:15">09:15</option>
      <option value="9:30">09:30</option>
      <option value="9:45">09:45</option>

      <option value="10:00">10:00</option>
      <option value="10:15">10:15</option>
      <option value="10:30">10:30</option>
      <option value="10:45">10:45</option>

      <option value="11:00">11:00</option>
      <option value="11:15">11:15</option>
      <option value="11:30">11:30</option>
      <option value="11:45">11:45</option>

      <option value="12:00">12:00</option>
      <option value="12:15">12:15</option>
      <option value="12:30">12:30</option>
      <option value="12:45">12:45</option>

      <option value="13:00">13:00</option>
      <option value="13:15">13:15</option>
      <option value="13:30">13:30</option>
      <option value="13:45">13:45</option>

      <option value="14:00">14:00</option>
      <option value="14:15">14:15</option>
      <option value="14:30">14:30</option>
      <option value="14:45">14:45</option>

      <option value="15:00">15:00</option>
      <option value="15:15">15:15</option>
      <option value="15:30">15:30</option>
      <option value="15:45">15:45</option>

      <option value="16:00">16:00</option>
      <option value="16:15">16:15</option>
      <option value="16:30">16:30</option>
      <option value="16:45">16:45</option>

      <option value="17:00">17:00</option>
      <option value="17:15">17:15</option>
      <option value="17:30">17:30</option>
      <option value="17:45">17:45</option>

      <option value="18:00">18:00</option>
      <option value="18:15">18:15</option>
      <option value="18:30">18:30</option>
      <option value="18:45">18:45</option>

      <option value="19:00">19:00</option>
      <option value="19:15">19:15</option>
      <option value="19:30">19:30</option>
      <option value="19:45">19:45</option>

      <option value="20:00">20:00</option>
      <option value="20:15">20:15</option>
      <option value="20:30">20:30</option>
      <option value="20:45">20:45</option>

      <option value="21:00">21:00</option>
      <option value="21:15">21:15</option>
      <option value="21:30">21:30</option>
      <option value="21:45">21:45</option>

      <option value="22:00">22:00</option>
      <option value="22:15">22:15</option>
      <option value="22:30">22:30</option>
      <option value="22:45">22:45</option>

      <option value="23:00">23:00</option>
      <option value="23:15">23:15</option>
      <option value="23:30">23:30</option>
      <option value="23:45">23:45</option>
    </select>
  );
};

export default TimeSelect;
