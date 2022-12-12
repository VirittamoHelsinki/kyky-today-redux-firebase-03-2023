/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/userSlice';
import SearchBar from './SearchBar';
import '../styles/header.scss';
import { ReactComponent as KykyLogo } from '../image/kykylogo.svg';

const Header = ({ navlinks }) => {
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logOut());
  };

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
            <Link to="/user-registration">Rekisteröidy</Link>
          </li>

          <li className="dropdown">
            <span className="material-icons-outlined">menu</span>
            <div className="dropdown-content">
              {navlinks.map(({ to, label }) => (
                <div key={to}>
                  <Link to={to}>{label}</Link>
                </div>
              ))}
            </div>
          </li>

          <li className="dropdown">
            <span className="material-icons-outlined">account_circle</span>
            <div className="dropdown-content">
              <div
                className="logout"
                onClick={() => {
                  onLogoutClick();
                }}>
                Log out
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
