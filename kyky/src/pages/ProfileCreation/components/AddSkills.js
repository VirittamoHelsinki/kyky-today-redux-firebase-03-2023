import '../../../styles/NewProfileCreation.scss';
import React from 'react';
import { useState } from 'react';
import { ReactComponent as MagGlass } from '../../../image/mag-glass.svg';
import Skills from '../../../mock_skills.json';

export default function AddSkills({ setSaved }) {
  const [clearSkills, setClearSkills] = useState(Skills);
  const [query, setQuery] = useState('');
  const [skills, setSkills] = useState([]);

  const handleClick = (event) => {
    setSkills(skills.concat(event.target.value));
    setClearSkills(clearSkills); //in progress
  };

  return (
    <div className="AddSkillsContainer">
      <h3>My skills</h3>

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
              <div className="addedSkillContainer">
                <li className="addedSkill" key={skill} value={skill}>
                  {skill}
                </li>
              </div>
            );
          })}
        </ul>
        <button type="button" className="saveButton" onClick={() => setSaved(true)}>
          Save
        </button>
      </div>
    </div>
  );
}
