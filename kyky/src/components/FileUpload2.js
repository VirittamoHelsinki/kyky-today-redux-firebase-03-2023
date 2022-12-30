import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../redux/storage/fileUploadSlice';
import Spinner from './ImageSpinner';

export default function FileUpload2({ addUrl }) {
  const [receivingUrl, setReceivingUrl] = useState(false);
  const fileInput = useRef(null);

  const isLoading = useSelector((state) => state.upload.loading);
  const _url = useSelector((state) => state.upload.url);

  const dispatch = useDispatch();

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleChange = (e) => {
    const filesEvent = e.target.files[0];
    setReceivingUrl(true);
    dispatch(uploadImage(filesEvent));
  };

  useEffect(() => {
    if (receivingUrl) {
      addUrl(_url);
      fileInput.current.value = '';
      setReceivingUrl(false);
    }
  }, [_url]);

  return (
    <div className="file-upload">
      {isLoading ? (
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
}
