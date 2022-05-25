// For visual component guidance and testing :)
import { useContext } from 'react';
import Language from './language';

function StyleSandbox() {
  const { lang } = useContext(Language);
  return (
    <div>
      <h1>{lang.h1_title}</h1>
      <h2>{lang.h2_title}</h2>
      <button type="button">{lang.primary_button}</button>
    </div>
  );
}

export default StyleSandbox;
