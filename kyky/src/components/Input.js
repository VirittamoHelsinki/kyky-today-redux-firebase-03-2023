/* eslint-disable react/prop-types */
import 'material-icons/iconfont/material-icons.css';

/*
 * This is a component that renders a label and an input wrapped with a wrapper div.
 * The wrapper div can be styled with the className prop. Defaults to "input-container"
 * Types of input are text, password, email, number, and url.
 * Name is used both as the "name" property of the input and as the "id" property of the label.
 * Use the icon property if you want to add a single icon, otherwise pass them as children to the component.
 * Children are passed to the wrapper div, use css if you must get them inside the input.
 */
export default function Input({
  type,
  name,
  className = 'input-container',
  placeholder = 'input',
  autoComplete = 'off',
  label = 'label',
  id,
  value = '',
  required,
  onChange = () => {},
  iconText = '',
  iconClassName = 'material-icons-outlined',
  iconIsButton = true,
  iconOnClick = () => {},
  children
}) {
  return (
    <div className={className}>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
      {iconText !== '' && !iconIsButton && <i className={`${iconClassName}`}>{iconText}</i>}
      {iconText !== '' && iconIsButton && (
        <button className={`${iconClassName} icon-button`} type="button" onClick={iconOnClick}>
          {iconText}
        </button>
      )}

      {children}
    </div>
  );
}
