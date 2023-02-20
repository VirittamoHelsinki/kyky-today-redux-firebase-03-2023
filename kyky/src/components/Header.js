/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/auth/userSlice';
import { updateNotifications } from '../redux/notifications/notificationSlice';
import { resetCalendarSchedule } from '../redux/sellers/calendarScheduleSlice';
import { resetCalendarSettings } from '../redux/sellers/calendarSettingsSlice';
import { resetJobCreationForm } from '../redux/sellers/jobFormSlice';
import { resetProfileForm } from '../redux/sellers/profileFormSlice';
import { resetServiceBooking } from '../redux/buyers/serviceBookingSlice';
import { resetFileUpload } from '../redux/storage/fileUploadSlice';
import { resetContact } from '../redux/chat/contactSlice';
import { resetMessage } from '../redux/chat/messageSlice';
import { resetSlug } from '../redux/auth/slugSlice';
import { resetNotifications } from '../redux/notifications/notificationSlice';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import ProfileDropdown from './ProfileDropdown';
import SearchBar from './SearchBar';
import '../styles/header.scss';
import { ReactComponent as KykyLogo } from '../image/kykylogo.svg';

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const notificationRef = useRef();
  const noImgRef = useRef();
  const imgRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const _user = useSelector((state) => state.user);
  const _notifications = useSelector((state) => state.notification.notifications);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (
        e.target !== notificationRef.current &&
        e.target !== noImgRef.current &&
        e.target !== imgRef.current
      ) {
        setProfileOpen(false);
        setNotificationOpen(false);
      }
    };
    document.body.addEventListener('click', closeDropdown);
    return () => document.body.removeEventListener('click', closeDropdown);
  }, []);

  useEffect(() => {
    if (Array.isArray(_notifications)) {
      setNotifications(_notifications);
    }
  }, [_notifications]);

  useEffect(() => {
    const unreads = notifications.filter((notification) => !notification.read);
    setUnreadNotifications(unreads);
  }, [notifications]);

  const onLogoutClick = () => {
    dispatch(logOut());
    dispatch(resetCalendarSchedule());
    dispatch(resetCalendarSettings());
    dispatch(resetFileUpload());
    dispatch(resetJobCreationForm());
    dispatch(resetProfileForm());
    dispatch(resetServiceBooking());
    dispatch(resetContact());
    dispatch(resetMessage());
    dispatch(resetSlug());
    dispatch(resetNotifications());
    navigate('/');
  };

  const profileToggle = () => {
    setNotificationOpen(false);
    setProfileOpen(!profileOpen);
  };

  const notificationToggle = () => {
    setProfileOpen(false);
    setNotificationOpen(!notificationOpen);
  };

  const notificationClick = (to) => {
    navigate(`${to}`);
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
            <li onClick={notificationToggle}>
              <div className="icon-and-red-circle">
                <span className="material-icons-outlined" ref={notificationRef}>
                  notifications
                </span>
                {unreadNotifications.length > 0 && (
                  <span className="red-circle">{unreadNotifications.length}</span>
                )}
              </div>
              <div className="dropdown">
                {notificationOpen && (
                  <div className="dropdown-content">
                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        className={`notification-item ${notification.read ? '' : 'unread'}`}>
                        <p
                          onClick={() => {
                            let notifications_copy = [...notifications];
                            notifications_copy.splice(index, 1);
                            let new_notification = { ...notification, read: true };
                            let new_notifications = [...notifications_copy, new_notification];
                            dispatch(
                              updateNotifications({
                                uid: _user.uid,
                                notifications: new_notifications
                              })
                            );
                            notificationClick(notification.to);
                          }}>
                          {notification.text}
                        </p>
                        <span
                          id="delete-notification"
                          className="material-icons-outlined"
                          onClick={() => {
                            let new_notifications = [...notifications];
                            new_notifications.splice(index, 1);
                            dispatch(
                              updateNotifications({
                                uid: _user.uid,
                                notifications: new_notifications
                              })
                            );
                          }}>
                          delete
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
            <li>
              <Link to="calendar">
                <div className="calendar-icon-hovertext">
                  <span className="material-icons-outlined">calendar_month</span>
                  <span className="hovertext">Calendar</span>
                </div>
              </Link>
            </li>
            <li onClick={profileToggle}>
              <img
                src={_user.photoURL}
                className="profile-img"
                ref={imgRef}
                referrerPolicy="no-referrer"
                alt=""
              />
              <div className="dropdown">
                {profileOpen && (
                  <div className="dropdown-content">
                    <ProfileDropdown user={_user} onLogoutClick={onLogoutClick} />
                  </div>
                )}
              </div>
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
