import '../../../styles/NewProfileCreation.scss';
import '../../../styles/_components.scss';
import React, { useState } from 'react';
import { ReactComponent as Like } from '../../../image/like.svg';
import devPhoto from '../../../image/devPhoto.jpg';
import { ReactComponent as ProfileIcon2 } from '../../../image/profileicon2.svg';

export default function Step9(currentStep) {
  return (
    <div className="step step9">
      <div classname="mainContainer">
        <div className="leftContainer">
          <h1 className="success">Your profile has been successfully created, Firstname !</h1>
          <Like></Like>
        </div>
        <div className="rightContainer">
          <img src={devPhoto} alt="devPhoto" className="devPhoto" />
          <div className="container1">
            <ProfileIcon2 />
            <h3>FirstName LastName</h3>
          </div>
          <p>I design websites and mobile apps.</p>
          <p>30€/h</p>
          <p>“I design websites and mibile apps using Figma. And I make prototypes.”</p>
        </div>
      </div>
    </div>
  );
}
