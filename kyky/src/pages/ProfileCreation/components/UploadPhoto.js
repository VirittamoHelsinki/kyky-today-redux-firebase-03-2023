import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../../redux/storage/fileUploadSlice';

const UploadPhoto = ({ addUrl }) => {
  const [receiveUrl, setReceiveUrl] = useState(false);

  const fileInput = useRef(null);
  const _url = useSelector((state) => state.upload.url);

  const dispatch = useDispatch();

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleChange = (e) => {
    const filesEvent = e.target.files[0];
    setReceiveUrl(true);
    dispatch(uploadImage(filesEvent));
  };

  useEffect(() => {
    if (receiveUrl) {
      addUrl(_url);
      fileInput.current.value = '';
      setReceiveUrl(false);
    }
  }, [_url]);

  return (
    <div className="file-upload">
      <div className="files">
        <button type="button" className="uploadPhotoButton" onClick={handleClick}>
          Select Profile Image
        </button>
      </div>
      <input type="file" ref={fileInput} onChange={handleChange} hidden />
    </div>
  );
};

export default UploadPhoto;
