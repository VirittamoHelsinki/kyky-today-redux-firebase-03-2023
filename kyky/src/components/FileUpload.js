/* eslint-disable react/prop-types */
import { useRef, useState, useEffect, useContext } from 'react';
import Language from '../language';
import Button from './Button';

export default function FileUpload({
  title,
  subTitle,
  showDropArea,
  filesNumber = 'x',
  size = 'x',
  className = 'file-upload'
}) {
  const fileInput = useRef(null);
  const drop = useRef(null);
  const [files, setFiles] = useState([]);
  const [text, setText] = useState('');
  const { lang } = useContext(Language);

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleChange = (e) => {
    const filesEvent = e.target.files[0];
    const filesArray = [...files];
    filesArray.push(filesEvent);
    setFiles(filesArray);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const filesEvent = e.dataTransfer.files[0];
    const filesArray = [...files];
    filesArray.push(filesEvent);
    setFiles(filesArray);
  };

  useEffect(() => {
    if (showDropArea) {
      drop?.current?.addEventListener('dragover', handleDragOver);
      drop?.current?.addEventListener('drop', handleDrop);
      return () => {
        drop?.current?.removeEventListener('dragover', handleDragOver);
        drop?.current?.removeEventListener('drop', handleDrop);
      };
    }
    return undefined;
  }, [showDropArea]);

  useEffect(() => {
    const rawText = lang.common.max_files;
    const parsedText = rawText.replace('{filesNumber}', filesNumber).replace('{size}', size);
    setText(parsedText);
  }, [lang]);

  useEffect(() => {
    if (files.length > 0) {
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
      {showDropArea && (
        <div className="file-upload-drop-area" ref={drop}>
          <i className="material-icons-outlined" style={{ fontSize: '8rem' }}>
            file_upload
          </i>
        </div>
      )}
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
