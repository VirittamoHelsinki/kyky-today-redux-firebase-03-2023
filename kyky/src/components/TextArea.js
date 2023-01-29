import PropTypes from 'prop-types';

export default function TextArea({ label, name, value, onChange, className = 'text-area' }) {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <textarea name={name} value={value} onChange={onChange} />
    </div>
  );
}

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string
};
