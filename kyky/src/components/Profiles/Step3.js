import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../redux/storage/fileUploadSlice';
import PropTypes from 'prop-types';
import { GenericSelect } from './Select';
import countries from '../../countries.json';
import CountriesWithDialCodes from '../../countriesWithDialCodes.json';
import '../../styles/CreateProfileModal.scss';
import '../../styles/_components.scss';

export default function Step5({ handleChange }) {
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
  const _country = useSelector((state) => state.profile.country);
  const _address = useSelector((state) => state.profile.address);
  const _city = useSelector((state) => state.profile.city);
  const _postalCode = useSelector((state) => state.profile.postalCode);
  const _dialCode = useSelector((state) => state.profile.dialcode);
  const _phoneNumber = useSelector((state) => state.profile.phoneNumber);
  const _profileIcon = useSelector((state) => state.profile.url);

  const fileInput = useRef();

  const dispatch = useDispatch();

  /* set new url only when receiveUrl is true */
  useEffect(() => {
    if (receiveUrl) {
      handleChange('url', _url);
      setProfileIcon(_url);
      setReceiveUrl(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_url]);

  useEffect(() => {
    handleChange('country', country);
  }, [country, handleChange]);

  useEffect(() => {
    handleChange('address', address);
  }, [address, handleChange]);

  useEffect(() => {
    handleChange('city', city);
  }, [city, handleChange]);

  useEffect(() => {
    handleChange('postalCode', postalcode);
  }, [postalcode, handleChange]);

  useEffect(() => {
    handleChange('dialCode', dialCode);
  }, [dialCode, handleChange]);

  useEffect(() => {
    handleChange('phoneNumber', phoneNumber);
  }, [phoneNumber, handleChange]);

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

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleImageChange = (e) => {
    const filesEvent = e.target.files[0];
    setReceiveUrl(true);
    dispatch(uploadImage(filesEvent));
  };

  return (
    <div className="profile-step5">
      <div className="details-main-container">
        <div className="photo-container">
          <img src={profileIcon} alt="" />
          <button type="button" className="uploadPhotoButton" onClick={handleClick}>
            Upload Photo
          </button>
          <input type="file" ref={fileInput} onChange={handleImageChange} hidden />
        </div>
        <div className="details-container">
          <div className="details-column">
            <label>Country*</label>
            <GenericSelect
              className="select-container3"
              name="countrySelect"
              placeholder="Select..."
              options={countries}
              value={countries.filter(({ value }) => value === country)}
              onChange={(value) => setCountry(value)}
            />
          </div>
          <div className="details-column">
            <label>Street Address* (won’t show on profile)</label>
            <input
              className="detailsInput"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="city-zip-row">
            <div className="row-item">
              <label>City*</label>
              <input
                className="detailsInputShort"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="row-item">
              <label>ZIP/ Postal Code</label>
              <input
                className="detailsInputShort"
                type="text"
                value={postalcode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>

          <div className="phone-container">
            <label>Phone</label>
            <div className="phone-row">
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
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Step5.propTypes = {
  handleChange: PropTypes.func.isRequired
};
