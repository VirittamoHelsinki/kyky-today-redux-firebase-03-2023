import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../redux/storage/fileUploadSlice';
import PropTypes from 'prop-types';
import Spinner from '../ImageSpinner';

const AddPhotoArray = ({ addUrl }) => {
  const [receiveUrl, setReceiveUrl] = useState(false);

  const fileInput = useRef(null);

  const _isLoading = useSelector((state) => state.upload.loading);
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
      {_isLoading ? (
        <Spinner />
      ) : (
        <div className="files">
          <button type="button" className="picIcon" onClick={handleClick}>
            +
          </button>
        </div>
      )}
      <input type="file" ref={fileInput} onChange={handleChange} hidden />
    </div>
  );
};

AddPhotoArray.propTypes = {
  addUrl: PropTypes.func.isRequired
};

export default AddPhotoArray;
