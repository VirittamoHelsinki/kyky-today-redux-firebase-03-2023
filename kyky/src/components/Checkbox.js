import PropTypes from 'prop-types';

/*
 * Simple checkbox component for use in forms.
 * You can add a link by passing it as a child to the component.
 */
export default function Checkbox({
  label,
  name,
  value,
  className = 'checkbox-container',
  onChange,
  checked = 'ignore',
  required,
  children
}) {
  return (
    <div className={className}>
      {checked === 'ignore' ? (
        <input type="checkbox" name={name} id={name} value={value} onChange={onChange} />
      ) : (
        <input
          type="checkbox"
          name={name}
          id={name}
          value={value}
          className={className}
          onChange={onChange}
          checked={checked}
          required={required}
        />
      )}

      <label className="checkbox-label" htmlFor={name}>
        {label}
        {children}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  required: PropTypes.bool,
  children: PropTypes.node
};
