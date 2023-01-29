import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { GenericSelect } from './Select';
import Countries from '../../countries.json';
import CountriesWithDialCodes from '../../countriesWithDialCodes.json';
import AddPhoto from './AddPhoto';
import '../../styles/NewProfileCreation.scss';
import '../../styles/_components.scss';

export default function Step7({ handleChange }) {
  const [upload, setUpload] = useState('');
  const [modalClosed, setModalClosed] = useState(true);
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalcode, setPostalCode] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [receiveUrl, setReceiveUrl] = useState(false);
  const [profileIcon, setProfileIcon] = useState(
    'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'
  );

  const _url = useSelector((state) => state.upload.url);
  const _country = useSelector((state) => state.profile.s7Country);
  const _address = useSelector((state) => state.profile.s7Address);
  const _city = useSelector((state) => state.profile.s7City);
  const _postalCode = useSelector((state) => state.profile.s7PostalCode);
  const _dialCode = useSelector((state) => state.profile.s7Dialcode);
  const _phoneNumber = useSelector((state) => state.profile.s7PhoneNumber);
  const _profileIcon = useSelector((state) => state.profile.s7Url);

  const addPhoto = () => {
    setModalClosed(false);
    setUpload(<AddPhoto setModalClosed={setModalClosed} addUrl={addUrl} />);
  };

  const addUrl = (u) => {
    setProfileIcon(u);
    setReceiveUrl(true);
  };

  /* set new url only when receiveUrl is true */
  useEffect(() => {
    if (receiveUrl) {
      handleChange('s7Url', _url);
      setProfileIcon(_url);
      setReceiveUrl(false);
    }
  }, [_url]);

  useEffect(() => {
    handleChange('s7Country', country);
  }, [country]);

  useEffect(() => {
    handleChange('s7Address', address);
  }, [address]);

  useEffect(() => {
    handleChange('s7City', city);
  }, [city]);

  useEffect(() => {
    handleChange('s7PostalCode', postalcode);
  }, [postalcode]);

  useEffect(() => {
    handleChange('s7DialCode', dialCode);
  }, [dialCode]);

  useEffect(() => {
    handleChange('s7PhoneNumber', phoneNumber);
  }, [phoneNumber]);

  useEffect(() => {
    if (_country) {
      setCountry(_country);
    }
  }, [_country]);

  useEffect(() => {
    if (_address) {
      setAddress(_address);
    }
  }, [_address]);

  useEffect(() => {
    if (_city) {
      setCity(_city);
    }
  }, [_city]);

  useEffect(() => {
    if (_postalCode) {
      setPostalCode(_postalCode);
    }
  }, [_postalCode]);

  useEffect(() => {
    if (_dialCode) {
      setDialCode(_dialCode);
    }
  }, [_dialCode]);

  useEffect(() => {
    if (_phoneNumber) {
      setPhoneNumber(_phoneNumber);
    }
  }, [_phoneNumber]);

  useEffect(() => {
    if (_profileIcon) {
      setProfileIcon(_profileIcon);
    }
  }, [_profileIcon]);

  return (
    <div className="step step7">
      <div className="detailsMainContainer">
        <div className="photoContainer">
          <img src={profileIcon} alt="" />
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
            value={Countries.filter(({ value }) => value === country)}
            onChange={(value) => setCountry(value)}
          />
          <label>Street Address*(won’t show on profile)</label>
          <input
            className="detailsInput"
            value={address}
            onChange={(e) => setAddress(e.target.value)}></input>
          <label>City*</label>
          <input
            className="detailsInputShort"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}></input>
          <div className="zipCode">
            <label>ZIP/ Postal Code</label>
            <input
              className="detailsInputShort"
              type="text"
              value={postalcode}
              onChange={(e) => setPostalCode(e.target.value)}></input>
          </div>

          <div className="phoneContainer">
            <label>Phone</label>
            <GenericSelect
              className="select-container"
              name="phoneSelect"
              placeholder="Select..."
              options={CountriesWithDialCodes.map((country) => ({
                value: country.dial_code,
                label: [country.name, ' ', country.dial_code]
              }))}
              value={CountriesWithDialCodes.filter(({ value }) => value === dialCode)}
              onChange={(value) => setDialCode(value)}
            />
            <input
              className="detailsInputPhone"
              placeholder="type your number"
              maxLength={13}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}></input>
          </div>
        </div>
      </div>
      {!modalClosed && <div className="dim2"></div>}
      {!modalClosed && upload}
    </div>
  );
}

Step7.propTypes = {
  handleChange: PropTypes.func.isRequired
};
