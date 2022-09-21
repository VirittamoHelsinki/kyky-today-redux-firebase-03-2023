import '../../styles/NewProfileCreation.scss';
import { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';

export default function GetStarted() {
  const [title, setTitle] = useState('Please add a title about what you do.');
  const [secondTitle, setSecondTitle] = useState(
    "It's the very first thing clients see. Please describe your skills with your own words."
  );
  const [fieldChange, setFieldChange] = useState(
    <input className="getStartedInput" placeholder="Example: Dogwalker"></input>
  );
  function nextPhase() {
    setTitle('If you have relevant work experience, add it here.');
    setFieldChange(
      <div className="addExperience">
        Add experience{' '}
        <button type="button" className="picIcon">
          +
        </button>
      </div>
    );
    setSecondTitle('Relevant working experience will increase the chance of getting hired!');
  }

  return (
    <div className="get-started">
      <div className="mainContainer">
        <h1>{title}</h1>
        <p>{secondTitle}</p>
        <div>{fieldChange}</div>
        <button className="nextButton" onClick={nextPhase}>
          NEXT
        </button>
        <div className="workContainer">
          <h3>Add Work Experience</h3>
          <Input
            className="inputLong"
            label="Title/a heading for what you do*"
            placeholder="Ex:Cleaner"></Input>
          <Input className="inputLong" label="Company" placeholder="Ex:Frenska"></Input>
          <Input className="inputShort" label="Location*" placeholder="Ex:Helsinki"></Input>
          <select className="countryList"></select>
          <Checkbox className="workCheck">I am currently working in this role</Checkbox>
          <button className="saveButton">SAVE</button>
        </div>
        <div className="educationContainer">
          <h3>Add Education History</h3>
          <Input
            className="inputLong"
            label="School"
            placeholder="Ex: Business college Helsinki "></Input>
          <Input
            className="inputLong"
            label="Degree"
            placeholder="Ex:Vocational Qualification"></Input>
          <Input className="inputShort" label="Field of Study" placeholder="Ex:Helsinki"></Input>
          <Input className="inputShort" label="Graduation Date" placeholder="mm/dd/yyyy"></Input>

          <button className="saveButton">SAVE</button>
        </div>
      </div>
    </div>
  );
}
