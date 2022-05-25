/* eslint-disable react/prop-types */
import LanguageSelect from './LanguageSelect';

export default function Header({ languages, lang, setLang }) {
  return (
    <header>
      <LanguageSelect languages={languages} language={lang} setLanguage={setLang} />
    </header>
  );
}
