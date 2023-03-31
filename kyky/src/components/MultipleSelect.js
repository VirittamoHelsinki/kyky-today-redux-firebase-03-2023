import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

/* 
  Options array must have these properties:
    [
      {value: 'value', label: 'label'},
    ]
  Label is the text that will be displayed
  Value is the actual value that will be stored
 */

/*
 This is an example of an onChange function:
  (values)=>{setState(values)}
  Using this function, you can pass the values to the parent component
 */
export default function MultipleSelect({
  className = 'multiple-select',
  options, // Array of options
  disabled = false, // Determines if the select component should be interactable
  defaultValue = 'Select', // Default value of the select component
  onChange = () => {} // Callback function to send the values to the parent component
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  /* Whenever selected changes, the onChange function is called with selected passed as argument */
  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  return (
    <div className={`${className}${disabled ? ' disabled' : ''}`}>
      <div
        className="select-value"
        onClick={(e) => {
          if (e.target.classList.contains('values') || e.target.textContent.includes('expand_')) {
            setIsOpen(!isOpen);
          }
        }}>
        <div className="values">
          {selected.length === 0 && <span className="placeholder">{defaultValue}</span>}
          {selected.map((option) => (
            <span key={option.value}>
              {option.label}
              <i
                className="material-icons-outlined"
                onClick={() => setSelected(selected.filter((s) => s.value !== option.value))}>
                close
              </i>
            </span>
          ))}
        </div>
        <i className="material-icons-outlined">{isOpen ? 'expand_less' : 'expand_more'}</i>
      </div>
      {isOpen && (
        <div className="select-options">
          {options?.map((option) => {
            return (
              <Checkbox
                key={option.value}
                label={option.label}
                id={option.value}
                name={option.value}
                value={option.value}
                checked={selected.findIndex((o) => o.value === option.value) !== -1}
                onChange={() => {
                  if (selected.findIndex((o) => o.value === option.value) !== -1) {
                    setSelected(selected.filter((s) => s.value !== option.value));
                  } else {
                    setSelected([...selected, option]);
                  }
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

MultipleSelect.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func
};
