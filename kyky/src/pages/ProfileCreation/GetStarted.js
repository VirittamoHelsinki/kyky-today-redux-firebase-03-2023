import '../../styles/NewProfileCreation.scss';
import { useState, useEffect } from 'react';

export default function GetStarted() {
  const [title, setTitle] = useState('Please add a title about what you do.');

  function nextPhase() {
    setTitle('If you have relevant work experience, add it here');
  }

  return (
    <div className="get-started">
      <div className="mainContainer">
        <h1>{title}</h1>
        <p>
          It's the very first thing clients see. Please describe your skills with your own words.
        </p>
        <input className="getStartedInput" placeholder="Example: Dogwalker"></input>
        <button className="nextButton" onClick={nextPhase}>
          NEXT
        </button>
        <div className="addExperience">
          Add experience{' '}
          <button type="button" className="picIcon">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
