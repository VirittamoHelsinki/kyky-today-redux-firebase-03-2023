import '../../../styles/NewProfileCreation.scss';
import '../../../styles/_components.scss';
import Select from 'react-select';
/*import ReactFlagsSelect from 'react-flags-select';*/

import React, { useState } from 'react';
import Countries from '../../../countries.json';
import { ReactComponent as ProfileIcon2 } from '../../../image/profileicon2.svg';
import AddPhoto from './AddPhoto';

export default function Step7(currentStep) {
  /*const [selected, setSelected] = useState('');*/
  const [upload, setUpload] = useState('');
  const [saved, setSaved] = useState(true);

  const addPhoto = () => {
    setSaved(false);
    setUpload(<AddPhoto setSaved= {setSaved} />);
    console.log(true);
  };

  return (
    <div className="step step7">
      <div className="detailsMainContainer">
        <div className="photoContainer">
          <ProfileIcon2 />
          <button type= "button" className="uploadPhotoButton" onClick={addPhoto}>
            Upload Photo
          </button>
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
          {/*<ReactFlagsSelect>selected={selected} onSelect={(code => setSelected(code))} </ReactFlagsSelect> */}
          <input
            className="detailsInputPhone"
            placeholder="type your number"
            maxLength={13}></input>
        </div>
      </div>
      {!saved && upload}
    </div>
  );
}
