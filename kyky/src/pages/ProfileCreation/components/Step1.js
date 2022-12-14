import React from 'react';
import { useState, useEffect } from 'react';
import '../../../styles/NewProfileCreation.scss';
import { ReactComponent as MagGlass } from '../../../image/mag-glass.svg';
import Skills from '../../../mock_skills.json';

export default function Step1({ formData, handleChange }) {
  const [query, setQuery] = useState('');
  const [skills, setSkills] = useState(formData?.s1Skills);

  const handleClick = (event) => {
    for (const skill of skills) {
      if (event.target.value === skill) {
        return;
      }
    }
    setSkills(skills.concat(event.target.value));
  };

  // Updates GetStarted component's form state when 'skills' changes
  useEffect(() => {
    handleChange('s1Skills', skills);
  }, [skills]);

  return (
    <div className="step step1">
      <input
        className="getStartedInput"
        id="s1TitleInput"
        name="s1TitleInput"
        value={formData?.s1TitleInput}
        onChange={(event) => handleChange(event.target.name, event.target.value)}
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
