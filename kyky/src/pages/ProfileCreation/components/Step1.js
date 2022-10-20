import '../../../styles/NewProfileCreation.scss';
import { ReactComponent as MagGlass } from '../../../image/mag-glass.svg';
import Skills from '../../../mock_skills.json';
import { useState } from 'react';
import React from 'react';

export default function Step1(currentStep) {
  const [query, setQuery] = useState('');
  const [skills, setSkills] = useState('');

  const handleClick = (event) => {
    setSkills(event.target.value);
    console.log(true);
  };

  return (
    <div className="step step1">
      <input
        className="getStartedInput"
        id="titleInput"
        name="titleInput"
        placeholder="Example: Dogwalker"
        aria-label="Please add a title about what you do"></input>
      <h1>Please add skills you have.</h1>
      <div className="addSkills">
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
        }).map((post, index) => (
          <button className="box" key={index} onClick={handleClick} value={skills}>
            <p>{post.skill}</p>
          </button>
        ))}
        <div className="addedSkill">{setSkills}</div>
        <div className="magGlass">
          <MagGlass />
        </div>
      </div>
    </div>
  );
}
