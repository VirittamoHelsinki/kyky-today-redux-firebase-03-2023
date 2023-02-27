import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as MagGlass } from '../../image/mag-glass.svg';
import Skills from '../../mock_skills.json';
import '../../styles/CreateProfileModal.scss';

export default function Step1({ handleChange }) {
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState([]);

  const _title = useSelector((state) => state.profile.s1Title);
  const _skills = useSelector((state) => state.profile.s1Skills);

  useEffect(() => {
    handleChange('s1Title', title);
  }, [title]);

  useEffect(() => {
    handleChange('s1Skills', skills);
  }, [skills]);

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

  const handleClick = (event) => {
    for (const skill of skills) {
      if (event.target.value === skill) {
        return;
      }
    }
    setSkills(skills.concat(event.target.value));
  };

  return (
    <div className="profile-step1">
      <input
        className="step1-title-input"
        id="s1TitleInput"
        name="s1TitleInput"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Example: Dogwalker"
        aria-label="Please add a title about what you do"></input>
      <p>Please add skills you have.</p>
      <div className="step-1-add-skills-container">
        <div className="mag-glass">
          <MagGlass />
        </div>
        <input
          className="add-skills-input"
          placeholder="Add Skills"
          onChange={(event) => setQuery(event.target.value)}></input>
        {Skills.filter((post) => {
          if (query === '') {
            return '';
          } else if (post.skill.toLowerCase().startsWith(query.toLowerCase())) {
            return post;
          }
        }).map((post) => {
          return (
            <button
              className="skillBox"
              id="skillBox"
              key={post.id}
              value={post.skill}
              onClick={handleClick}>
              {post.skill}
            </button>
          );
        })}

        <ul className="addSkill">
          {skills.map((skill) => {
            return (
              <li className="addedSkill" key={skill} value={skill}>
                {skill}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

Step1.propTypes = {
  handleChange: PropTypes.func.isRequired
};
