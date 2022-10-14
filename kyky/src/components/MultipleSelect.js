import { useState } from 'react';
import Checkbox from './Checkbox';

export default function MultipleSelect({ className = 'multiple-select', options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  return (
    <div className={className}>
      <div
        className="select-value"
        onClick={() => {
          setIsOpen(!isOpen);
        }}>
        <div className="values">
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
                    console.log('selected', selected);
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
