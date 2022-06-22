/* eslint-disable react/prop-types */

export default function FileUpload({
  title,
  subTitle,
  showDropArea,
  files = 'x',
  size = 'x',
  className = 'file-upload'
}) {
  return (
    <div className={className}>
      <div className="file-upload-texts">
        <h3 className="file-upload-title">{title}</h3>
        <p className="file-upload-subtitle">{subTitle}</p>
        <p className="files-info">
          Voit lisätä {files} tiedostoa. Tiedostojen koko saa olla enintään {size}MB
        </p>
      </div>
      {showDropArea && (
        <div className="file-upload-drop-area">
          <i className="material-icons-outlined" style={{ fontSize: '8rem' }}>
            file_upload
          </i>
        </div>
      )}
      <button type="button" className="button-primary">
        <i className="material-icons-outlined" style={{ color: 'black' }}>
          add_circle_outline
        </i>
        Lisää tiedostoja
      </button>
    </div>
  );
}
