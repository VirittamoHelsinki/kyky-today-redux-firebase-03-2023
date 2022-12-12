/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/userSlice';
import SearchBar from './SearchBar';
import '../styles/header.scss';
import { ReactComponent as KykyLogo } from '../image/kykylogo.svg';

const Header = ({ navlinks }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const menuRef = useRef();
  const profileRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.path[0] !== menuRef.current && e.path[0] !== profileRef.current) {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };
    document.body.addEventListener('click', closeDropdown);
    return () => document.body.removeEventListener('click', closeDropdown);
  }, []);

  const onLogoutClick = () => {
    dispatch(logOut());
  };

  const menuToggle = () => {
    setProfileOpen(false);
    setMenuOpen(!menuOpen);
  };

  const profileToggle = () => {
    setMenuOpen(false);
    setProfileOpen(!profileOpen);
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

          <li className="dropdown" onClick={menuToggle}>
            <span className="material-icons-outlined" ref={menuRef}>
              menu
            </span>
            {menuOpen && (
              <div className="dropdown-content">
                {navlinks.map(({ to, label }) => (
                  <div key={to}>
                    <Link to={to}>{label}</Link>
                  </div>
                ))}
              </div>
            )}
          </li>

          <li className="dropdown" onClick={profileToggle}>
            <span className="material-icons-outlined" ref={profileRef}>
              account_circle
            </span>
            {profileOpen && (
              <div className="dropdown-content">
                <div
                  className="logout"
                  onClick={() => {
                    onLogoutClick();
                  }}>
                  Log out
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
