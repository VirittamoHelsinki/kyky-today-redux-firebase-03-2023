import React from 'react';
import { useState } from 'react';
import '../../../styles/NewProfileCreation.scss';
import { ReactComponent as MagGlass } from '../../../image/mag-glass.svg';
import Skills from '../../../mock_skills.json';

export default function Step1() {
  const [query, setQuery] = useState('');
  const [skills, setSkills] = useState([]);

  const handleClick = (event) => {
    setSkills(skills.concat(event.target.value));
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
        }).map((post, index) => {
          console.log(index);
          return (
            <button className="box" id="skillBox" key={index} onClick={handleClick}>
              <p value={post.skill} key={index}>
                {post.skill}
              </p>
            </button>
          );
        })}{' '}
        <div className="addSkill">
          {' '}
          {skills.map((post, index) => {
            console.log(skills);
            return <span className="addedSkill" key={index}></span>;
          })}
        </div>
        <div className="magGlass">
          <MagGlass />
        </div>
      </div>
    </div>
  );
}
