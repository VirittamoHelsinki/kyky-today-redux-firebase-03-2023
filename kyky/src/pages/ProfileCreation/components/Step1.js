import React from 'react';
import { useState } from 'react';
import '../../../styles/NewProfileCreation.scss';
import { ReactComponent as MagGlass } from '../../../image/mag-glass.svg';
import Skills from '../../../mock_skills.json';

export default function Step1({ formData, handleChange }) {
  const [clearSkills, setClearSkills] = useState(Skills);
  const [query, setQuery] = useState('');
  const [skills, setSkills] = useState([]);

  const handleClick = (event) => {
    setSkills(skills.concat(event.target.value));
    setClearSkills(clearSkills.filter((post) => post.skill !== query));
    console.log(clearSkills);
  };

  return (
    <div className="step step1">
      <input // How to pass information about current step to handleChange function?
        className="step1 getStartedInput"
        id="titleInput"
        name="titleInput"
        value={formData?.step1?.titleInput}
        onChange={handleChange}
        placeholder="Example: Dogwalker"
        aria-label="Please add a title about what you do"></input>
      <h1>Please add skills you have.</h1>
      <div className="addSkills">
        <div className="magGlass">
          <MagGlass />
        </div>
        <input
          className="addSkillsInput"
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
