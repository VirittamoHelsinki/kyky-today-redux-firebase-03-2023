import '../../../styles/NewProfileCreation.scss';
import '../../../styles/_components.scss';
import React from 'react';
import { ReactComponent as Like } from '../../../image/like.svg';
import devPhoto from '../../../image/devPhoto.jpg';
import { ReactComponent as ProfileIcon2 } from '../../../image/profileicon2.svg';

export default function Step9() {
  return (
    <div className="step step9">
      <div classname="mainContainer">
        <div className="mainContainer1">
          <div className="leftContainer">
            <h1 className="success">Your profile has been successfully created, FirstName !</h1>
            <Like></Like>
          </div>
          <div className="rightContainer">
            <img src={devPhoto} alt="devPhoto" className="devPhoto" />

            <div className="profileContainer">
              <ProfileIcon2 className="profileIcon" />
              <h3 className="firstName">FirstName LastName</h3>
            </div>
            <p className="text1">I design websites and mobile apps.</p>
            <p className="text2">30€/h</p>
            <p className="text3">
              “I design websites and mobile apps using Figma. And I make prototypes.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
