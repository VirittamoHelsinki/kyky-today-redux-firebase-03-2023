import '../../../styles/NewProfileCreation.scss';
import '../../../styles/_components.scss';
import { ReactComponent as Pen } from '../../../image/pen.svg';
import { ReactComponent as Gps } from '../../../image/gps.svg';
import { ReactComponent as ProfileIcon2 } from '../../../image/profileicon2.svg';
import React, { useState } from 'react';
import AddPhoto from './AddPhoto';
import WorkExperience from './WorkExperience';
import EducationExperience from './EducationExperience';
import AddSkills from './AddSkills';

export default function Step8() {
  const [upload, setUpload] = useState('');
  const [saved, setSaved] = useState(true);
  const [saved2, setSaved2] = useState(true);
  const [experience, setExperience] = useState('');

  const addPhoto = () => {
    setSaved2(false);
    setUpload(<AddPhoto setSaved2={setSaved2} />);
    console.log(true);
  };

  const workExperience = () => {
    setSaved(false);
    setExperience(<WorkExperience setSaved={setSaved} />);
  };

  const educationExperience = () => {
    setSaved(false);
    setExperience(<EducationExperience setSaved={setSaved} />);
  };

  const addSkills= () => {
    setSaved(false);
    setExperience(<AddSkills setSaved={setSaved}/>)
  };

  return (
    <div className="step step8">
      <div className="previewMainContainer">
        <div className="previewContainer1">
          <div className="editPhotoButtonContainer">
            <ProfileIcon2 />
            <button className="editPhotoButton" onClick={addPhoto}>
              <Pen />
              Edit Photo
            </button>
          </div>
          <div className="bigContainer">
            <div className="nameContainer">
              <h2 className="firstNameLastName">FirstName LastName</h2>
            </div>
            <div className="gpsLocation">
              <Gps />
              <p className="currentLocation">Helsinki, Uusimaa</p>
            </div>{' '}
            <div className="jobTitleContainer">
              <h3 className="jobTitle">UI/UX Designer</h3>
              <Pen />
            </div>
            <div className="hourlyPriceContainer">
              <p className="hourlyPrice">€30/h</p>
              <Pen />
            </div>
          </div>
          <textarea className="jobTextArea"></textarea>
        </div>
        <div className="previewContainer2">
          <h3>Skills</h3>
          <button className="picIcon" onClick={() => addSkills()}>+</button>
          <div className="skillContainer">
            <div className="skill Html">HTML5</div>
            <div className="skill Css">CSS 3</div>
            <div className="skill Figma">Figma</div>
            <div className="skill Proto">Prototype Design</div>
            <div className="skill softwareDev">Software Development</div>
          </div>
        </div>
        <div className="previewContainer3">
          {' '}
          <h3>Work Experience</h3>
          <button className="picIcon" onClick={() => workExperience()}>
            +
          </button>
          <p>No items to display.</p>
        </div>
        <div className="previewContainer4">
          <h3>Education History</h3>
          <button className="picIcon" onClick={() => educationExperience()}>
            +
          </button>
          <p>No items to display.</p>
        </div>
        {!saved2 && <div className="dim3"></div>}
        {!saved2 && upload}
      </div>{' '}
      {!saved && <div className="dim"></div>}
      {!saved && experience}
    </div>
  );
}
