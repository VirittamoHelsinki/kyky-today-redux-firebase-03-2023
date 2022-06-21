/* eslint-disable react/prop-types */
import { useState } from 'react';
import Checkbox from './Checkbox';

/* Instead of passing children, must pass an array of information */
export default function CheckboxContainer({
  title,
  content,
  className = 'checkbox-div',
  customSelect = true
}) {
  const [selected, setSelected] = useState([]);
  const [custom, setCustom] = useState('');
  const [customText, setCustomText] = useState('');
  return (
    <div className={className}>
      <div className="checkbox-div-title">{title}</div>
      <div className="checkbox-div-header">
        {selected.map((item) => (
          <button
            type="button"
            key={item}
            className="checkbox-div-header-item"
            onClick={() => setSelected(selected.filter((itm) => itm !== item))}>
            {item}
          </button>
        ))}
      </div>
      <div className="checkbox-div-content">
        {content.map((checkbox) => {
          return (
            <Checkbox
              key={checkbox.name}
              name={checkbox.name}
              title={checkbox.title}
              checked={selected.includes(checkbox.title)}
              onChange={() => {
                if (selected.includes(checkbox.title)) {
                  setSelected(selected.filter((item) => item !== checkbox.title));
                } else {
                  setSelected([...selected, checkbox.title]);
                }
              }}
            />
          );
        })}
        {customSelect && (
          <>
            <Checkbox title="Muu" name="other" onChange={() => setCustom(!custom)} />
            {custom && (
              <input
                type="text"
                placeholder="Mikä?"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                onKeyUp={(e) => {
                  e.preventDefault();
                  if (e.key === 'Enter') {
                    setSelected([...selected, customText]);
                    setCustomText('');
                  }
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
