import '../../../styles/NewProfileCreation.scss';
import '../../../styles/_components.scss';
import Select from 'react-select';
import Input from '../../../components/Input';
import React from 'react';
import Countries from '../../../countries.json';
import { ReactComponent as ProfileIcon2 } from '../../../image/profileicon2.svg';

export default function Step7(currentStep) {
  return (
    <div className="step step7">
      <div className="detailsMainContainer">
        <div className="photoContainer">
          <ProfileIcon2 />
          <button className="uploadPhotoButton">Upload Photo</button>
        </div>
        <div className="detailsContainer">
          <label>Country*</label>
          <Select
            className="select-container3"
            options={Countries}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.code}></Select>
          <label>Street Address*(won’t show on profile)</label>
          <input className="detailsInput"></input>
          <label>City*</label>
          <input className="detailsInputShort"></input>
          <label>ZIP/ Postal Code</label>
          <input className="detailsInputShort" type="text"></input>
          <label>Phone</label>
          <Select className="select-container4"></Select>
          <input
            className="detailsInputPhone"
            placeholder="type your number"
            maxLength={13}></input>
        </div>
      </div>
    </div>
  );
}
