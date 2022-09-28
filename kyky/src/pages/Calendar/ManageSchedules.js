import { useEffect, useState } from 'react';
import Button from '../../components/Button';

import Input from '../../components/Input';
import Switch from 'react-switch';

export default function ManageSchedules() {
  const [indefinite, setIndefinite] = useState(false);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((key) => key.includes('_schedules'));
    console.log(keys);
    const allSchedules = localStorage;
  }, []);

  return (
    <main className="manage-schedules">
      <div className="left-side">
        <h1>Manage Schedules</h1>
        <div className="schedule-unavailability">
          <h2>Schedule Unavailability</h2>
          <Input type="date" id="start-date" label="Start date:" labelOnFront />
          <Input type="date" id="end-date" label="End date:" labelOnFront>
            <Switch
              width={32}
              height={16}
              handleDiameter={14}
              name="indefinite"
              checked={indefinite}
              onChange={() => setIndefinite(!indefinite)}
            />
            <label htmlFor="indefinite">Indefinitely</label>
          </Input>
          <Button className="small-rounded">+ Add</Button>
          <div className="unavailablities">
            <p>Upcoming unavailablities</p>
          </div>
        </div>
      </div>
      <div className="right-side"></div>
    </main>
  );
}
