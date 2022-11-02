import React from 'react';
import { useState, createRef } from 'react';
import '../../../styles/NewProfileCreation.scss';
import { ReactComponent as MagGlass } from '../../../image/mag-glass.svg';
import Skills from '../../../mock_skills.json';

export default function Step1() {
  const inputRef = createRef();
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
        }).map((post) => {
          return (
            <button className="skillBox" key={post.id} value={post.skill} onClick={handleClick}>
              <p value={post.skill} key={post.id}>
                {post.skill}
              </p>
            </button>
          );
        })}

        <ul className="addSkill">
          {skills.map((skill) => {
            console.log(skills);

            console.log(skill);
            return (
              <li className="addedSkill" key={skill} value={skill}>
                {skill}
              </li>
            );
          })}
        </ul>
        <div className="magGlass">
          <MagGlass />
        </div>
      </div>
    </div>
  );
}
