// For visual component guidance and testing :)
import { useContext } from 'react';
import Language from './language';

function StyleSandbox() {
  const { lang } = useContext(Language);
  return (
    <main className="sandbox">
      <h1>Style SandBox</h1>
      <br />
      <h1>{lang.sandbox.h1}</h1>
      <h2>{lang.sandbox.h2}</h2>
      <h3>{lang.sandbox.h3}</h3>
      <form className="card-light small">
        <h1>{lang.sandbox.card_title}</h1>
        <div className="input-container">
          <label htmlFor="test">{lang.sandbox.text_label}</label>
          <input
            type="text"
            id="text-input-test"
            name="text-input-test"
            placeholder={lang.sandbox.placeholder}
          />
          <icon>[PIC]</icon>
        </div>
        <div className="input-container">
          <label htmlFor="test">{lang.sandbox.text_label}</label>
          <input
            type="text"
            id="text-input-test"
            name="text-input-test"
            placeholder={lang.sandbox.placeholder}
          />
          <icon>[PIC]</icon>
        </div>
        <div className="input-container">
          <label htmlFor="test">{lang.sandbox.text_label}</label>
          <input
            type="text"
            id="text-input-test"
            name="text-input-test"
            placeholder={lang.sandbox.placeholder}
          />
          <icon>[PIC]</icon>
        </div>

        <div className="checkbox-container">
          <input type="checkbox" id="checkbox-test" name="checkbox-test" value="test" />
          <label className="checkbox-label" htmlFor="checkbox-test">
            {lang.sandbox.checkbox_label}
            <a href="https://www.google.com/">{lang.sandbox.link}</a>
          </label>
        </div>
        <button type="button" className="button-primary">
          {lang.sandbox.button_primary}
        </button>
      </form>
    </main>
  );
}

export default StyleSandbox;
