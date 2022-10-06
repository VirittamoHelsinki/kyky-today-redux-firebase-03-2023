import React from 'react';
import '../../../styles/NewProfileCreation.scss';
import { ReactComponent as ProfileIcon2 } from '../../../image/profileicon2.svg';

export default function AddPhoto({ setSaved }) {
  return (
    <div className="addPhotoContainer">
      <div className="addPhotoTxtContainer">
        <h4> Add a profile photo</h4>
        <ProfileIcon2 />
        <button className="selectImgButton">Select Profile Image</button>
        <p> Your photo should show your face clearly, we suggest a neutral background.</p>
      </div>
      <div className="addPhotoBtnContainer">
        <button className="addPhotoButton1" onClick={() => setSaved(true)}>
          Cancel
        </button>
        <button className="addPhotoButton2" onClick={() => setSaved(true)}>
          Save
        </button>
      </div>
    </div>
  );
}
