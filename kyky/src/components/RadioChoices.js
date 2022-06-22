/* eslint-disable react/prop-types */

// Children are expected to be Choice components.
export default function RadioChoices({ title, children, className = 'radio-choices' }) {
  return (
    <div className={className}>
      <h3 className="radio-choices-title">{title}</h3>
      {children}
    </div>
  );
}
