// For visual component guidance and testing :)
import { useContext } from 'react';
import Language from './language';

function StyleSandbox() {
  const { lang } = useContext(Language);
  return (
    <div className="sandbox">
      <h1>Style SandBox</h1>
      <h1>{lang.h1_title}</h1>
      <h2>{lang.h2_title}</h2>
      <button type="button">{lang.primary_button}</button>
      <button type="button" className="button-primary">
        Primary button
      </button>
      <form className="card-light">
        <h1>Title</h1>
        <label htmlFor="test">Label text</label>
        <input
          type="text"
          id="text-input-test"
          name="text-input-test"
          placeholder="Placeholder text"
        />
        <div className="checkbox-container">
          <input type="checkbox" id="checkbox-test" name="checkbox-test" value="test" />
          <label className="checkbox-label" htmlFor="checkbox-test">
            Checkbox Label
          </label>
        </div>
      </form>
    </div>
  );
}

export default StyleSandbox;
