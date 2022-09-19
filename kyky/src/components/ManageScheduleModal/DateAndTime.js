import Input from '../Input';

export default function DateAndTime() {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  return (
    <>
      <h2>Date & Time</h2>
      <div className="schedule-duration container">
        <p>Schedule duration</p>
        <Input type="radio" name="auto" label="" />
        <select>
          <option>3 months</option>
        </select>
        <Input type="radio" name="auto" label="" />
        <Input type="date" name="start-date" label="Start date" labelOnFront />
        <Input type="date" name="end-date" label="End date" labelOnFront />
      </div>
      <div className="time container">
        <p>Time</p>
        <Input type="time" label="Start:" labelOnFront />
        <Input type="time" label="End:" labelOnFront />
      </div>
      <div className="recurrence container">
        <p>Recurring</p>
        <div className="recurrence-days">
          {days.map((day) => {
            return (
              <div className="recurrence-day">
                <Input type="checkbox" name={day} label={day} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
