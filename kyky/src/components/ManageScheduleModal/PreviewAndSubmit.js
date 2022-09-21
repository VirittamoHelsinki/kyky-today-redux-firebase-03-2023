export default function PreviewAndSubmit({ properties }) {
  return (
    <div className="preview-and-submit container" style={{ flexDirection: 'column' }}>
      <h2>Preview & Submit</h2>
      {console.log(properties)}
      {Object.entries(properties).map(([key, value]) => (
        <div key={key}>
          <p>
            {key}: <span style={{ color: 'black' }}>{JSON.stringify(value)}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
