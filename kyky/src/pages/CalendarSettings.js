import Button from '../components/Button';
import Input from '../components/Input';

export default function CalendarSettings() {
  return (
    <main className="job-calendar-settings">
      <div className="settings">
        <h2 className="title">Settings</h2>
      </div>
      <div className="export-import">
        <h2 className="title">Export/Import Calendar</h2>
        <div className="buttons">
          <Button className="button-secondary">Import Calendar</Button>
          <Button className="button-secondary">Export Calendar</Button>
        </div>
      </div>
      <div className="purge">
        <h2 className="title">Purge Calendar</h2>
        <Input type="checkbox" label="">
          <p>
            Confirming this selection deletes all your current schedules from your calendar.
            <br></br>
            <span>This action cannot be undone.</span>
          </p>
        </Input>
        <Button className="button-secondary">Confirm Purge</Button>
      </div>
    </main>
  );
}
