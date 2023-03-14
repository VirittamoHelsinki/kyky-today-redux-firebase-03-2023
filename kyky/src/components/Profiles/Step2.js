import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/CreateProfileModal.scss';

export default function Step4({ handleChange }) {
  const [text, setText] = useState('');

  const _text = useSelector((state) => state.profile.workInput);

  /* call handleChange every time the field value changes */
  useEffect(() => {
    handleChange('workInput', text);
  }, [text]);

  /* set a value if redux's state.profile.s4WorkInput is not empty */
  useEffect(() => {
    if (_text) {
      setText(_text);
    }
  }, [_text]);

  return (
    <div className="profile-step4">
      <p>Descripe with a few words who you are and what work do you do here</p>
      <textarea
        className="work-input"
        maxLength={300}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
}

Step4.propTypes = {
  handleChange: PropTypes.func.isRequired
};
