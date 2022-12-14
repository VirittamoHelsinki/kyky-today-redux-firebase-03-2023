import '../../../styles/NewProfileCreation.scss';
import React from 'react';
import { useState, useEffect } from 'react';
import { ReactComponent as MagGlass } from '../../../image/mag-glass.svg';
import Skills from '../../../mock_skills.json';

export default function AddSkills({ setSaved, formData, handleChange }) {
  const [skills, setSkills] = useState(formData?.s1Skills);
  const [query, setQuery] = useState('');

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
