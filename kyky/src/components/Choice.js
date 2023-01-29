import PropTypes from 'prop-types';

export default function Choice({ label, name, className = 'radio-choice' }) {
  return (
    <label className={className} htmlFor={name}>
      <input type="radio" name={name} value={label} />
      {label}
    </label>
  );
}

Choice.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string
};
