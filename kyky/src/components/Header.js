/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/header.scss';
import { ReactComponent as KykyLogo } from '../image/kykylogo.svg';

const Header = ({ navlinks }) => {
  return (
    <div id="navheader">
      <div className="nav-title">
        <a href="/">
          <KykyLogo />
        </a>
      </div>
      <nav>
        <ul>
          <li>
            <SearchBar />
          </li>

          <li>
            <a>
              <Link to="/user-registration">Rekisteröidy</Link>
            </a>
          </li>

          <li className="dropdown">
            <span className="material-icons-outlined">menu</span>
            <div className="dropdown-content">
              {navlinks.map(({ to, label }) => (
                <a key={to}>
                  <Link to={to}>{label}</Link>
                </a>
              ))}
            </div>
          </li>

          <li>
            <span class="material-icons-outlined">account_circle</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
