/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LanguageSelect from './LanguageSelect';
import "../styles/header.scss"
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
    <div className="component-header">
      <nav className="nav-bar">
        <ul>
          <li>
            <KykyLogo/>
          </li>
          <li>
            <LanguageSelect languages={languages} language={lang} setLanguage={setLang} />
          </li>
          <li className="dropdown">
            <span className="material-icons">menu</span>
            <div className="dropdown-content">
            {isOpen && (
              <a>
                  {navlinks.map(({ to, label }) => (
                    <div key={to}>
                      <Link to={to}>{label}</Link>
                    </div>
                  ))}
                
              </a>
            )}
            </div>
          </li>
          

        </ul>
      </nav>
    </div>
  );
}
