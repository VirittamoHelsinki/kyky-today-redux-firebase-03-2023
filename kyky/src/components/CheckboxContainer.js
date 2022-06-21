/* eslint-disable react/prop-types */
import Checkbox from './Checkbox';

/* Children are expected to be checkbox components */
export default function CheckboxContainer({
  title,
  children,
  className = 'checkbox-div',
  customSelect = true
}) {
  return (
    <div className={className}>
      <div className="checkbox-div-title">{title}</div>
      <div className="checkbox-div-header">
        <span>V</span>
      </div>
      <div className="checkbox-div-content">
        {children}
        {customSelect && <Checkbox title="Muu" name="other" />}
      </div>
    </div>
  );
}
