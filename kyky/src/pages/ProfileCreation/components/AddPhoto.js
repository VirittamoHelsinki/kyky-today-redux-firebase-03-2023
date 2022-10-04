import React from 'react';
import '../../../styles/NewProfileCreation.scss';


export default function AddPhoto({setSaved}) {
  return (
    <div className="addPhotoContainer">
        <h4> Add a profile photo</h4>
      <button className="selectImgButton">Select Profile Image</button>
      <p> Your photo should show your face clearly, we suggest a neutral background.</p>
      <button className= "addPhotoButton1">Cancel</button>
      <button className= "addPhotoButton2" onClick={() => setSaved(true)}>Save</button>
    </div>
  );
}
