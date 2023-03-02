import PropTypes from 'prop-types';

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
    <div className="preview-and-submit container" style={{ flexDirection: 'column' }}>
      <h2>Preview & Submit</h2>
      <div>
        <p>Job type:</p>
        <span style={{ color: 'black' }}>{properties.jobTitle}</span>
      </div>
      <div>
        <p>Schedule duration</p>
        <span style={{ color: 'black' }}>
          {properties.scheduleDuration.months
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
        {properties.recurring.length === 0 ? (
          <span style={{ color: 'black' }}>Every day</span>
        ) : (
          <span style={{ color: 'black' }}>
            On selected weekdays:{' '}
            {properties.recurring.map(
              (d, index) => daysLong[d] + (index === properties.recurring.length - 1 ? '' : ', ')
            )}
          </span>
        )}
      </div>
      <div>
        {properties.limitBookings ? (
          <p>This can only be booked once per day</p>
        ) : (
          <>
            <p>Buffer between bookings</p>
            <span style={{ color: 'black' }}>
              {displayLongerTime(properties.bufferBetweenBookings)}{' '}
              {!properties.includeTravelTime ? '(Travel time not included)' : ''}
            </span>
          </>
        )}
      </div>
      <div>
        <p>Minimum duration of a booking</p>
        <span style={{ color: 'black' }}>
          {displayLongerTime(properties.minimumBookingDuration * 60)}
        </span>
      </div>
      <div>
        <p>Overlapping bookings</p>
        <span style={{ color: 'black' }}>{overlapText()}</span>
      </div>
    </div>
  );
}

PreviewAndSubmit.propTypes = {
  properties: PropTypes.shape({
    limitBookings: PropTypes.bool.isRequired,
    bufferBetweenBookings: PropTypes.number.isRequired,
    canOverLap: PropTypes.bool,
    includeTravelTime: PropTypes.bool.isRequired,
    jobTitle: PropTypes.string.isRequired,
    minimumBookingDuration: PropTypes.number.isRequired,
    overlapType: PropTypes.string.isRequired,
    recurring: PropTypes.arrayOf(PropTypes.string).isRequired,
    scheduleDuration: PropTypes.shape({
      months: PropTypes.number,
      startDate: PropTypes.instanceOf(Date),
      endDate: PropTypes.instanceOf(Date)
    }).isRequired,
    time: PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
