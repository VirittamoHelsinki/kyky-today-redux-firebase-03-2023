/* eslint-disable react/prop-types */

/*
 * Simple checkbox component for use in forms.
 * You can add a link by passing it as a child to the component.
 */
export default function Checkbox({ title, name, children }) {
  return (
    <div className="checkbox-container">
      <input type="checkbox" name={name} />
      <label className="checkbox-label" htmlFor={name}>
        {title}
        {children}
      </label>
    </div>
  );
}
