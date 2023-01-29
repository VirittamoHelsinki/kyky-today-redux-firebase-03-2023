import PropTypes from 'prop-types';
import MultipleSelect from './MultipleSelect';

function SelectDays({ selectedDays, booking }) {
  let options = [];

  if (booking.checked === 'weekday' || booking.checked === 'everyOtherWeekday') {
    options = [
      { value: 'monday', label: 'Monday' },
      { value: 'tuesday', label: 'Tuesday' },
      { value: 'wednesday', label: 'Wednesday' },
      { value: 'thursday', label: 'Thursday' },
      { value: 'friday', label: 'Friday' }
    ];
  } else {
    options = [
      { value: 'saturday', label: 'Saturday' },
      { value: 'sunday', label: 'Sunday' }
    ];
  }

  return (
    <>
      <MultipleSelect options={options} onChange={(e) => selectedDays(e)} />
    </>
  );
}

SelectDays.propTypes = {
  selectedDays: PropTypes.func.isRequired,
  booking: PropTypes.shape({
    checked: PropTypes.oneOf(['weekday', 'weekend', 'everyOtherWeekday', 'everyOtherWeekend'])
  }).isRequired
};

export default SelectDays;
