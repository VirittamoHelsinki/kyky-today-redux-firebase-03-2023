/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import LanguageSelect from './LanguageSelect';
import "../styles/header.scss"
import { ReactComponent as KykyLogo } from '../image/kykylogo.svg';

const Header = ({ languages, lang, setLang, navlinks }) => {
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
                {navlinks.map(({ to, label }) => (
                  <a key={to}>
                    <Link to={to}>{label}</Link>
                  </a>
                ))}            
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
