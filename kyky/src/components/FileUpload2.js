import { useRef, useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../redux/storage/fileUploadSlice';
import Spinner from './ImageSpinner';
import Language from '../language';

export default function FileUpload2({ filesNumber = 'x', getImageUrl }) {
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [text, setText] = useState('');
  const { lang } = useContext(Language);

  const isLoading = useSelector((state) => state.upload.loading);
  const url = useSelector((state) => state.upload.url);

  const dispatch = useDispatch();

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleChange = (e) => {
    const filesEvent = e.target.files[0];
    setFile(filesEvent);
    setName(filesEvent.name);
    setSize(filesEvent.size);
    dispatch(uploadImage(filesEvent));
  };

  useEffect(() => {
    getImageUrl(url);
  }, [url]);

  useEffect(() => {
    const rawText = '';
    const parsedText = rawText.replace('{filesNumber}', filesNumber).replace('{size}', size);
    setText(parsedText);
  }, [lang]);

  useEffect(() => {
    fileInput.current.value = '';
  }, [file]);

  return (
    <div className="file-upload">
      {' '}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="files">
          <div key={name} className="file">
            <p className="file-name">{name}</p>
            <p className="file-size">{size / 1000}kb</p>

            <button
              className="file-remove"
              type="button"
              onClick={() => {
                setFile(null);
                setName('');
                setSize('');
              }}>
              <i className="material-icons-outlined">close</i>
            </button>
          </div>
        </div>
      )}
      <button type="button" className="picIcon" onClick={handleClick}>
        +
      </button>
      <input type="file" ref={fileInput} onChange={handleChange} hidden />
    </div>
  );
}
