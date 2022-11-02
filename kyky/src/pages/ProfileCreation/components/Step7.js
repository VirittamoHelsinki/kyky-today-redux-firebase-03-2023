import '../../../styles/NewProfileCreation.scss';
import '../../../styles/_components.scss';
import { GenericSelect } from './Select';
import React, { useState } from 'react';
import Countries from '../../../countries.json';
import CountriesWithDialCodes from '../../../countriesWithDialCodes.json';
import { ReactComponent as ProfileIcon2 } from '../../../image/profileicon2.svg';
import AddPhoto from './AddPhoto';

export default function Step7() {
  const [upload, setUpload] = useState('');
  const [saved2, setSaved2] = useState(true);

  const addPhoto = () => {
    setSaved2(false);
    setUpload(<AddPhoto setSaved2={setSaved2} />);
    console.log(true);
  };

  return (
    <div className="step step7">
      <div className="detailsMainContainer">
        <div className="photoContainer">
          <ProfileIcon2 />
          <button type="button" className="uploadPhotoButton" onClick={addPhoto}>
            Upload Photo
          </button>
        </div>
        <div className="detailsContainer">
          <label>Country*</label>
          <GenericSelect
            className="select-container3"
            name="countrySelect"
            placeholder="Select..."
            options={Countries.map((country) => ({ value: country.code, label: country.name }))}
          />
          <label>Street Address*(won’t show on profile)</label>
          <input className="detailsInput"></input>
          <label>City*</label>
          <input className="detailsInputShort"></input>
          <div className="zipCode">
            <label>ZIP/ Postal Code</label>
            <input className="detailsInputShort" type="text"></input>
          </div>

          <div className="phoneContainer">
            <label>Phone</label>
            <GenericSelect
              className="select-container"
              name="phoneSelect"
              placeholder="Select..."
              options={CountriesWithDialCodes.map((country) => ({
                value: country.code,
                label: [country.name, ' ', country.dial_code]
              }))}
            />
            <input
              className="detailsInputPhone"
              placeholder="type your number"
              maxLength={13}></input>
          </div>
        </div>
      </div>
      {!saved2 && <div className="dim2"></div>}
      {!saved2 && upload}
    </div>
  );
}
