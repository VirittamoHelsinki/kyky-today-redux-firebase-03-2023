/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LanguageSelect from './LanguageSelect';
import { ReactComponent as KykyLogo } from '../image/kykylogo.svg';
export default function Header({ languages, lang, setLang, navlinks }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (lang) => {
    setLang(lang);
    toggle();
  };

  return (
    <header className="component-header">
      <KykyLogo/>
      <LanguageSelect languages={languages} language={lang} setLanguage={setLang} />

      <nav className="component-selector">
        <button type="button" onClick={toggle}>
          ** Select **
        </button>
        {isOpen && (
          <div>
            <ul>
              {navlinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
