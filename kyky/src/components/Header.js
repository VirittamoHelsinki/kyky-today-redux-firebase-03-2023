/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInEmailAndPassword, signInGoogleAuthProvider, logOut } from '../redux/auth/userSlice';
import { updateNotifications } from '../redux/notifications/notificationSlice';
import { resetCalendarSchedule } from '../redux/calendar/calendarScheduleSlice';
import { resetCalendarSettings } from '../redux/calendar/calendarSettingsSlice';
import { resetJobs } from '../redux/jobs/jobSlice';
import { resetProfileForm } from '../redux/profiles/profileSlice';
import { resetOrder } from '../redux/orders/orderSlice';
import { resetFileUpload } from '../redux/storage/fileUploadSlice';
import { resetContact } from '../redux/chat/contactSlice';
import { resetMessage } from '../redux/chat/messageSlice';
import { resetRating } from '../redux/profiles/ratingSlice';
import { resetSlug } from '../redux/auth/slugSlice';
import { resetNotifications } from '../redux/notifications/notificationSlice';
import UserDropdown from './UserDropdown';
import Filter from './FilterComponent';
import Checkbox from './Checkbox';
import { ReactComponent as KykyLogo } from '../image/kykylogo.svg';
import kyky from '../image/kykylogo.png';
import dogIMG from '../image/dog-walker.png';
import cookingIMG from '../image/cooking.png';
import technologyIMG from '../image/technology.png';
import gardeningIMG from '../image/gardening.png';
import photographyIMG from '../image/photography.png';
import googleLogo from '../image/googlelogo.png';
import '../styles/Header.scss';
// import { doc, onSnapshot } from 'firebase/firestore';
// import { db } from '../firebase/firebase';

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [randNumber, setRandNumber] = useState(0);

  const notificationRef = useRef();
  const noImgRef = useRef();
  const imgRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const _user = useSelector((state) => state.user);
  const _notifications = useSelector((state) => state.notification.notifications);

  const randomImages = [dogIMG, cookingIMG, technologyIMG, gardeningIMG, photographyIMG];

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
    dispatch(resetJobs());
    dispatch(resetProfileForm());
    dispatch(resetOrder());
    dispatch(resetContact());
    dispatch(resetMessage());
    dispatch(resetSlug());
    dispatch(resetNotifications());
    dispatch(resetRating());
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

  // useEffect(() => {
  //   if (_user.uid) {
  //     onSnapshot(doc(db, 'users', _user.uid, 'data', 'notifications'), (doc) => {
  //       let _notifications = [];
  //       let i = 0;
  //       while (doc.data()[i]) {
  //         _notifications.push(doc.data()[i]);
  //         i++;
  //       }
  //       setNotifications(_notifications);
  //     });
  //   }
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      return;
    }
    dispatch(
      signInEmailAndPassword({
        email: username,
        password: password
      })
    );
    setShowLoginModal(false);
    setUsername('');
    setPassword('');
    setRemember(false);
  };

  const onGoogleClick = () => {
    dispatch(signInGoogleAuthProvider());
  };

  return (
    <div className="navheader">
      <div className="nav-title">
        <a href="/">
          <KykyLogo />
        </a>
      </div>
      <Filter />
      <nav>
        {_user.uid ? (
          <ul>
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
                    <div className="notification-title-bar">Notifications</div>
                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        className={`notification-item ${notification.read ? '' : 'unread'}`}>
                        <div
                          className="item-left-side"
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
                          <span
                            className="material-icons-outlined"
                            id="icon-notification"
                            style={{ color: notification.color }}>
                            {notification.icon}
                          </span>
                          <p className="item-name-bold">{notification.name}</p>
                          <p className="item-text-normal">{notification.text}</p>
                        </div>
                        <div className="item-right-side">
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
                            close
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                    <UserDropdown logoutClick={onLogoutClick} />
                  </div>
                )}
              </div>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/user-registration">
                <p className="sign-in-register-label">Register</p>
              </Link>
            </li>
            <li
              onClick={() => {
                setRandNumber(Math.floor(Math.random() * randomImages.length));
                setShowLoginModal(true);
              }}>
              <p className="sign-in-register-label">Sign in</p>
            </li>
          </ul>
        )}
      </nav>
      {showLoginModal && (
        <div className="login-modal transparent-background">
          <div className="login-modal">
            <div className="login-modal-container">
              <div className="login-modal-left-side">
                <div className="login-modal-logo">
                  <img src={kyky} alt="" />
                </div>
                <div className="login-modal-title">
                  <p>Let's get things done!</p>
                </div>
                <div className="login-modal-image">
                  <img className="random-images" src={randomImages[randNumber]} alt="" />
                </div>
              </div>
              <div className="login-modal-right-side">
                <div className="login-modal-close-button">
                  <span
                    className="material-icons-outlined"
                    onClick={() => setShowLoginModal(false)}>
                    close
                  </span>
                </div>
                <div className="login-modal-login-title">
                  <p>Sign in</p>
                </div>
                <div className="login-modal-input-container">
                  <div className="input-title">
                    <p>User name</p>
                  </div>
                  <div className="input-container">
                    <input
                      className="input-field"
                      type="text"
                      placeholder="User name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="login-modal-input-container">
                  <div className="input-title">
                    <p>Password</p>
                  </div>
                  <div className="input-container">
                    <input
                      className="input-field"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="login-modal-checkbox-recovery-container">
                  <Checkbox
                    label="Keep me logged in"
                    name="remember"
                    value={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    checked={remember}></Checkbox>
                  <div className="recovery-label">
                    <Link to="/recover-password">
                      <p>Recover password</p>
                    </Link>
                  </div>
                </div>
                <div className="login-modal-buttons-column-container">
                  <button className="login-local-button" onClick={handleSubmit}>
                    <p>Log in</p>
                  </button>
                  <button
                    className="login-google-button"
                    onClick={() => {
                      setShowLoginModal(false);
                      setUsername('');
                      setPassword('');
                      setRemember(false);
                      onGoogleClick();
                    }}>
                    <img src={googleLogo} alt="" />
                    <p>Log in with Google</p>
                  </button>
                </div>
                <div className="login-modal-register-container">
                  <p className="new-user-label">New user?</p>
                  <p
                    className="register-here-link"
                    onClick={() => {
                      setShowLoginModal(false);
                      setUsername('');
                      setPassword('');
                      setRemember(false);
                      navigate('/user-registration');
                    }}>
                    Register here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
