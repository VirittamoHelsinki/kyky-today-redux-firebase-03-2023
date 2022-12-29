/* eslint-disable react/prop-types */
import { useRef, useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../redux/storage/fileUploadSlice';
import Spinner from './ImageSpinner';
import Language from '../language';
import Button from './Button';

export default function FileUpload({
  title,
  subTitle,
  filesNumber = 'x',
  size = 'x',
  className = 'file-upload',
  urlToForm
}) {
  const fileInput = useRef(null);
  const [files, setFiles] = useState([]);
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
    const filesArray = [...files];
    filesArray.push(filesEvent);
    setFiles(filesArray);
    dispatch(uploadImage(filesEvent));
  };

  useEffect(() => {
    urlToForm(url);
  }, [url]);

  useEffect(() => {
    const rawText = lang.common.max_files;
    const parsedText = rawText.replace('{filesNumber}', filesNumber).replace('{size}', size);
    setText(parsedText);
  }, [lang]);

  useEffect(() => {
    console.log(files);
    if (files.length > 0) {
      console.log('excuse me WTF');
      fileInput.current.value = '';
    }
  }, [files]);

  return (
    <div className={className}>
      <div className="file-upload-texts">
        <h3 className="file-upload-title">{title}</h3>
        <p className="file-upload-subtitle">{subTitle}</p>
        <p className="files-info">{text}</p>
      </div>

      <div className="files">
        {files.map((file) => {
          return (
            <div key={file.name} className="file">
              <p className="file-name">{file.name}</p>
              <p className="file-size">{file.size / 1000}kb</p>

              <button
                className="file-remove"
                type="button"
                onClick={() => setFiles(files.filter((f) => f !== file))}>
                <i className="material-icons-outlined">close</i>
              </button>
            </div>
          );
        })}
      </div>
      <Button type="button" onClick={handleClick}>
        <i className="material-icons-outlined" style={{ color: 'black' }}>
          add_circle_outline
        </i>
        {lang.common.add_files}
      </Button>
      <input type="file" ref={fileInput} onChange={handleChange} hidden />
    </div>
  );
}
