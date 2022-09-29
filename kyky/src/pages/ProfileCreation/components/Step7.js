import '../../../styles/NewProfileCreation.scss';
import Select from 'react-select';
import Input from '../../../components/Input';
import React from 'react';
import { ReactComponent as ProfileIcon2 } from '../../../image/profileicon2.svg';

export default function Step7() {
  return (
    <div className="step step7">
      <div className="detailsMainContainer">
        <div className="photoContainer">
          <ProfileIcon2 />
          <button className="uploadPhotoButton">Upload Photo</button>
        </div>
        <div className="detailsContainer">
          <label>Country*</label>
          <Select className="select-container3"></Select>

          <Input
            className="detailsInput"
            label="Street Address*(won’t show on profile)"
            labelOnFront></Input>

          <Input className="detailsInput" label="City*" labelOnFront></Input>

          <Input className="detailsInput2" type="text" label="Zip Code*" labelOnFront></Input>
          <label>Phone</label>
          <Select className="select-container4"></Select>
          <Input className="detailsInput"></Input>
        </div>
      </div>
    </div>
  );
}
