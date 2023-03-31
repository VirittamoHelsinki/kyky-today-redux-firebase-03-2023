import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/CreateProfileModal.scss';

export default function Step1({ handleChange }) {
  const [title, setTitle] = useState('');
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);

  const _title = useSelector((state) => state.profile.title);
  const _skills = useSelector((state) => state.profile.skills);

  useEffect(() => {
    handleChange('title', title);
  }, [title, handleChange]);

  useEffect(() => {
    handleChange('skills', skills);
  }, [skills, handleChange]);

  useEffect(() => {
    if (_title) {
      setTitle(_title);
    }
  }, [_title]);

  useEffect(() => {
    if (_skills) {
      setSkills(_skills);
    }
  }, [_skills]);

  return (
    <div className="profile-step1">
      <div className="title-input-container">
        <p>Add a title about what you do.</p>
        <input
          className="step1-title-input"
          name="s1TitleInput"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Example: Dogwalker"
          aria-label="Please add a title about what you do"
        />
      </div>
      <div className="skill-container">
        <p>Add skills you have.</p>
        <div className="step-1-add-skills-container">
          <div className="input-button-row">
            <input
              className="add-skills-input"
              placeholder="Add Skills"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
            <button
              className="add-skill-button"
              onClick={() => {
                if (skill !== '') {
                  setSkills([...skills, skill]);
                  setSkill('');
                }
              }}>
              +
            </button>
          </div>
          <ul className="addSkills">
            {skills.map((skill, index) => {
              return (
                <li
                  className="addedSkill"
                  key={index}
                  value={skill}
                  onClick={() => {
                    setSkills(skills.filter((item) => item !== skill));
                  }}>
                  {skill}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

Step1.propTypes = {
  handleChange: PropTypes.func.isRequired
};
