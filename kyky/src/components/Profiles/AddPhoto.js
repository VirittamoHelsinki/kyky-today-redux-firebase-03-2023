import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../redux/storage/fileUploadSlice';
import PropTypes from 'prop-types';
import '../../styles/CreateProfileModal.scss';

export default function AddPhoto({ setModalClosed, addUrl }) {
  const [selectedImage, setSelectedImage] = useState('');
  const [profileIcon, setProfileIcon] = useState(
    'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'
  );

  const fileInput = useRef(null);

  const _profileIcon = useSelector((state) => state.profile.s7Url);

  const dispatch = useDispatch();

  /* set a profile icon's URL if redux's state.profile.s7Url is not empty */
  useEffect(() => {
    if (_profileIcon) {
      setProfileIcon(_profileIcon);
    }
  }, [_profileIcon]);

  /* assign a click-property to the image */
  const handleClick = () => {
    fileInput.current.click();
  };

  /* take the image clicked by user, create the images' URL and set the image 
  to the selectedImage for dispatch, set a new profile icon */
  const handleChange = (e) => {
    const filesEvent = e.target.files[0];
    const url = URL.createObjectURL(filesEvent);
    setSelectedImage(filesEvent);
    setProfileIcon(url);
  };

  /* pass the URL to the parent component via addUrl, dispatch the image to the firebase */
  const saveProfileIcon = () => {
    addUrl(profileIcon);
    dispatch(uploadImage(selectedImage));
  };

  return (
    <div className="addPhotoContainer">
      <div className="addPhotoTxtContainer">
        <h4> Add a profile photo</h4>
        <img src={profileIcon} alt="" />
        <button className="selectImgButton" onClick={handleClick}>
          Select Profile Image
        </button>
        <input type="file" ref={fileInput} onChange={handleChange} hidden />
        <p> Your photo should show your face clearly, we suggest a neutral background.</p>
      </div>
      <div className="addPhotoBtnContainer">
        <button className="addPhotoButton1" onClick={() => setModalClosed(true)}>
          Cancel
        </button>
        <button
          className="addPhotoButton2"
          onClick={() => {
            saveProfileIcon();
            setModalClosed(true);
          }}>
          Save
        </button>
      </div>
    </div>
  );
}

AddPhoto.propTypes = {
  setModalClosed: PropTypes.func.isRequired,
  addUrl: PropTypes.func.isRequired
};
