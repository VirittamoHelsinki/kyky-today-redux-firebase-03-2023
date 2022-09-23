import { useState } from 'react';
import Button from '../../components/Button';

import Input from '../../components/Input';
import Switch from 'react-switch';

export default function ManageSchedules() {
  const [indefinite, setIndefinite] = useState(false);
  return (
    <main className="manage-schedules">
      <div className="left-side">
        <h1>Manage Schedules</h1>
        <div className="schedule-unavailibility">
          <h2>Schedule Unavailability</h2>
          <Input type="date" id="start-date" label="Start date" />
          <Input type="date" id="end-date" label="End date">
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
          <Button>+ Add</Button>
        </div>
      </div>
      <div className="right-side"></div>
    </main>
  );
}
