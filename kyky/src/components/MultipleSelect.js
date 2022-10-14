import { useState } from 'react';
import Checkbox from './Checkbox';

export default function MultipleSelect({ className = 'multiple-select', options }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={className}>
      <div
        className="select-value"
        onClick={() => {
          setIsOpen(!isOpen);
        }}>
        <div className="values"></div>
        <i className="material-icons-outlined">{isOpen ? 'expand_less' : 'expand_more'}</i>
      </div>
      {isOpen && (
        <div className="select-options">
          {options?.map((option) => {
            return <Checkbox key={option.value} label={option.label} value={option.value} />;
          })}
        </div>
      )}
    </div>
  );
}
