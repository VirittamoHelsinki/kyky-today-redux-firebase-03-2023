export default function PreviewAndSubmit({ properties }) {
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
    if (properties.canOverlap) {
      let text = 'Allow other bookings to overlap with this job';
      if (properties.overlapType === 'any') {
        text += ' (Any job type)';
      } else if (properties.overlapType === 'same') {
        text += ' (Only same job type)';
      }
      return text;
    } else return 'Overlapping not allowed';
  }

  return (
    <div className="preview-and-submit container" style={{ flexDirection: 'column' }}>
      <h2>Preview & Submit</h2>
      {console.log(properties)}
      <div>
        <p>Job type:</p>
        <span style={{ color: 'black' }}>{properties.jobId}</span>
      </div>
      <div>
        <p>Schedule duration</p>
        <span style={{ color: 'black' }}>
          {properties.months
            ? `${properties.scheduleDuration.months} months`
            : `${properties.scheduleDuration.startDate.toLocaleDateString(
                'fi-FI'
              )} - ${properties.scheduleDuration.endDate.toLocaleDateString('fi-FI')}`}
        </span>
      </div>
      <div>
        <p>Time</p>
        <span style={{ color: 'black' }}>
          {properties.time.start} - {properties.time.end}
        </span>
      </div>
      <div>
        <p>Recurring</p>
        <span style={{ color: 'black' }}>
          On selected weekdays:{' '}
          {properties.recurring.map(
            (d, index) => daysLong[d] + (index === properties.recurring.length - 1 ? '' : ', ')
          )}
        </span>
      </div>
      <div>
        {properties.limitBookings ? (
          <p>This can only be booked once per day</p>
        ) : (
          <>
            <p>Buffer between bookings</p>
            <span style={{ color: 'black' }}>
              {properties.bufferBetweenBookings} minutes{' '}
              {!properties.includeTravelTime ? '(Travel time not included)' : ''}
            </span>
          </>
        )}
      </div>
      <div>
        <p>Minimum duration of a booking</p>
        <span style={{ color: 'black' }}>{properties.minimumBookingDuration} hours</span>
      </div>
      <div>
        <p>Overlapping bookings</p>
        <span style={{ color: 'black' }}>{overlapText()}</span>
      </div>
    </div>
  );
}
