/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from 'react';

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
    console.log(filesArray);
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
        <p className="files-info">
          Voit lisätä {filesNumber} tiedostoa. Tiedostojen koko saa olla enintään {size}MB
        </p>
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
      <button type="button" className="button-primary" onClick={handleClick}>
        <i className="material-icons-outlined" style={{ color: 'black' }}>
          add_circle_outline
        </i>
        Lisää tiedostoja
      </button>
      <input type="file" ref={fileInput} onChange={handleChange} multiple hidden />
    </div>
  );
}
