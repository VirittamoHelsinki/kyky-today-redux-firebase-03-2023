/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/auth/userSlice';
import { resetCalendarSchedule } from '../redux/sellers/calendarScheduleSlice';
import { resetJobCreationForm } from '../redux/sellers/jobFormSlice';
import { resetProfileForm } from '../redux/sellers/profileFormSlice';
import { resetServiceBooking } from '../redux/buyers/serviceBookingSlice';
import { resetFileUpload } from '../redux/storage/fileUploadSlice';
import { resetContact } from '../redux/chat/contactSlice';
import { resetMessage } from '../redux/chat/messageSlice';
import ProfileDropdown from './ProfileDropdown';
import SearchBar from './SearchBar';
import '../styles/header.scss';
import { ReactComponent as KykyLogo } from '../image/kykylogo.svg';

const Header = ({ navlinks }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const menuRef = useRef();
  const noImgRef = useRef();
  const imgRef = useRef();

  const dispatch = useDispatch();

  const _user = useSelector((state) => state.user);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (
        e.target !== menuRef.current &&
        e.target !== noImgRef.current &&
        e.target !== imgRef.current
      ) {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };
    document.body.addEventListener('click', closeDropdown);
    return () => document.body.removeEventListener('click', closeDropdown);
  }, []);

  const onLogoutClick = () => {
    dispatch(logOut());
    dispatch(resetCalendarSchedule());
    dispatch(resetFileUpload());
    dispatch(resetJobCreationForm());
    dispatch(resetProfileForm());
    dispatch(resetServiceBooking());
    dispatch(resetContact());
    dispatch(resetMessage());
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
        {_user.uid ? (
          <ul>
            <li>
              <SearchBar />
            </li>
            <li>
              <span className="material-icons-outlined">notifications</span>
            </li>
            <li>
              <Link to="calendar">
                <div className="calendar-icon-hovertext">
                  <span className="material-icons-outlined">calendar_month</span>
                  <span className="hovertext">Calendar</span>
                </div>
              </Link>
            </li>
            <li className="dropdown" onClick={profileToggle}>
              <img
                src={_user.photoURL}
                className="profile-img"
                ref={imgRef}
                referrerPolicy="no-referrer"
                alt=""
              />
              {profileOpen && (
                <div className="dropdown-content">
                  <ProfileDropdown user={_user} onLogoutClick={onLogoutClick} />
                </div>
              )}
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <SearchBar />
            </li>
            <li>
              <Link to="/user-registration">Sign up</Link>
            </li>
            <li>
              <Link to="/user-log-in">Sign in</Link>
            </li>
            <li className="dropdown" onClick={profileToggle}>
              <span className="material-icons-outlined" ref={noImgRef}>
                account_circle
              </span>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
