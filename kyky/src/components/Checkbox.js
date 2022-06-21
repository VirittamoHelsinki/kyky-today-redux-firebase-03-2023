/* eslint-disable react/prop-types */

/*
 * Simple checkbox component for use in forms.
 * You can add a link by passing it as a child to the component.
 */
export default function Checkbox({ title, name, onChange, checked = 'ignore', children }) {
  return (
    <div className="checkbox-container">
      {checked === 'ignore' ? (
        <input type="checkbox" name={name} onChange={onChange} />
      ) : (
        <input type="checkbox" name={name} onChange={onChange} checked={checked} />
      )}

      <label className="checkbox-label" htmlFor={name}>
        {title}
        {children}
      </label>
    </div>
  );
}
