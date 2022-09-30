export default function ScheduleDetails({ schedule }) {
  const daysLong = {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday'
  };

  function overlapText() {
    if (schedule.canOverlap) {
      let text = 'Allow other bookings to overlap with this job';
      if (schedule.overlapType === 'any') {
        text += ' (Any job type)';
      } else if (schedule.overlapType === 'same') {
        text += ' (Only same job type)';
      }
      return text;
    } else return 'Overlapping not allowed';
  }

  function displayLongerTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const mins = minutes % 60;
    let text = '';
    if (days > 0) {
      text += `${days} days `;
    }
    if (hours > 0) {
      text += `${hours % 24} hours `;
    }
    if (mins > 0) {
      text += `${mins} minutes`;
    }
    return text;
  }

  return (
    <div className="schedule-details-view">
      <h2>{schedule.jobId} details</h2>
      {console.log(schedule)}
      <div>
        <p>Job type:</p>
        <span style={{ color: 'black' }}>{schedule.jobId}</span>
      </div>
      <div>
        <p>Schedule duration</p>
        <span style={{ color: 'black' }}>
          {schedule.scheduleDuration.months
            ? `${schedule.scheduleDuration.months} months`
            : `${new Date(schedule.scheduleDuration.startDate).toLocaleDateString(
                'fi-FI'
              )} - ${new Date(schedule.scheduleDuration.endDate).toLocaleDateString('fi-FI')}`}
        </span>
      </div>
      <div>
        <p>Time</p>
        <span style={{ color: 'black' }}>
          {schedule.time.start} - {schedule.time.end}
        </span>
      </div>
      <div>
        <p>Recurring</p>
        {schedule.recurring.length === 0 ? (
          <span style={{ color: 'black' }}>Every day</span>
        ) : (
          <span style={{ color: 'black' }}>
            On selected weekdays:{' '}
            {schedule.recurring.map(
              (d, index) => daysLong[d] + (index === schedule.recurring.length - 1 ? '' : ', ')
            )}
          </span>
        )}
      </div>
      <div>
        {schedule.limitBookings ? (
          <p>This can only be booked once per day</p>
        ) : (
          <>
            <p>Buffer between bookings</p>
            <span style={{ color: 'black' }}>
              {displayLongerTime(schedule.bufferBetweenBookings)}{' '}
              {!schedule.includeTravelTime ? '(Travel time not included)' : ''}
            </span>
          </>
        )}
      </div>
      <div>
        <p>Minimum duration of a booking</p>
        <span style={{ color: 'black' }}>
          {displayLongerTime(schedule.minimumBookingDuration * 60)}
        </span>
      </div>
      <div>
        <p>Overlapping bookings</p>
        <span style={{ color: 'black' }}>{overlapText()}</span>
      </div>
    </div>
  );
}
