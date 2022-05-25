// For visual component guidance and testing :)
import { useContext } from 'react';
import Language from './language';

function StyleSandbox() {
  const { lang } = useContext(Language);
  return (
    <div className="sandbox">
      <h1>Style SandBox</h1>
      <br />
      <h1>{lang.sandbox_h1}</h1>
      <h2>{lang.sandbox_h2}</h2>
      <h3>{lang.sandbox_h3}</h3>
      <button type="button" className="button-primary">
        {lang.sandbox_button_primary}
      </button>
      <form className="card-light">
        <h1>{lang.sandbox_card_title}</h1>
        <label htmlFor="test">{lang.sandbox_text_label}</label>
        <input
          type="text"
          id="text-input-test"
          name="text-input-test"
          placeholder={lang.sandbox_placeholder}
        />
        <div className="checkbox-container">
          <input type="checkbox" id="checkbox-test" name="checkbox-test" value="test" />
          <label className="checkbox-label" htmlFor="checkbox-test">
            {lang.sandbox_checkbox_label}
          </label>
        </div>
      </form>
    </div>
  );
}

export default StyleSandbox;
