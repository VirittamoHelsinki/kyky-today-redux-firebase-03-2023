/* eslint-disable react/prop-types */

// Children are expected to be Choice components.
export default function RadioChoices({ label, children, className = 'radio-choices' }) {
  return (
    <div className={className}>
      <h3 className="radio-choices-label">{label}</h3>
      {children}
    </div>
  );
}
