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
        <section>
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
          <div className="input-container error">
            <label htmlFor="test2">{lang.sandbox.text_label_error}</label>
            <input
              type="text"
              id="text-input-test2"
              name="text-input-test2"
              placeholder={lang.sandbox.placeholder}
            />
            <icon>[PIC]</icon>
          </div>
          <div className="input-container">
            <label htmlFor="test3">{lang.sandbox.text_label}</label>
            <input
              type="text"
              id="text-input-test3"
              name="text-input-test3"
              placeholder={lang.sandbox.placeholder}
            />
          </div>
        </section>
        <section>
          <div className="checkbox-container no-shadow">
            <input type="checkbox" id="checkbox-test" name="checkbox-test" value="test" />
            <label className="checkbox-label" htmlFor="checkbox-test">
              {lang.sandbox.checkbox_label_no_shadow}
            </label>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" id="checkbox-test" name="checkbox-test" value="test" />
            <label className="checkbox-label" htmlFor="checkbox-test">
              {lang.sandbox.checkbox_label}
              <a href="https://www.google.com/">{lang.sandbox.link}</a>
            </label>
          </div>
        </section>
        <button type="button" className="button-primary" onClick="">
          <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank" rel="noreferrer">
            {lang.sandbox.button_primary}
          </a>
        </button>
      </form>
    </main>
  );
}

export default StyleSandbox;
