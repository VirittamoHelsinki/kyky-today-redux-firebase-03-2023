export default function PreviewAndSubmit({ properties }) {
  return (
    <div className="preview-and-submit container">
      <h2>Preview & Submit</h2>
      {console.log(properties)}
      {Object.entries(properties).map(([key, value]) => (
        <div key={key}>
          <p>{key}</p>
          <p>{JSON.stringify(value)}</p>
        </div>
      ))}
    </div>
  );
}
