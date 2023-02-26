import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserType } from '../redux/auth/userSlice';
import '../styles/UserDropdown.scss';

const UserDropdown = ({ logoutClick }) => {
  const [userType, setUserType] = useState('buyer');

  const dispatch = useDispatch();

  const _user = useSelector((state) => state.user);

  useEffect(() => {
    if (['buyer', 'seller'].includes(_user.userType)) {
      setUserType(_user.userType);
    }
  }, [_user]);

  function switchUserType(type) {
    if (_user.userType !== type) {
      dispatch(changeUserType({ uid: _user.uid, userType: type }));
    }
  }

  return (
    <div className="user-dropdown-main">
      {userType === 'seller' ? (
        <div className="dropdown-button-container">
          <div className="dropdown-button-content">
            <Link to="seller/dashboard">
              <button className="dropdown-button">Dashboard</button>
            </Link>
          </div>
          <div className="dropdown-button-content">
            <Link to="calendar">
              <button className="dropdown-button">Calendar</button>
            </Link>
          </div>
          <div className="dropdown-button-content">
            <button className="dropdown-button">Create a job</button>
          </div>
          <div className="dropdown-button-content">
            <button className="dropdown-button">Edit profile</button>
          </div>
        </div>
      ) : (
        <div className="dropdown-button-container">
          <div className="dropdown-button-content">
            <button className="dropdown-button">Dashboard</button>
          </div>
          <div className="dropdown-button-content">
            <button className="dropdown-button">Categories</button>
          </div>
        </div>
      )}

      <div className="switch-user-content">
        <div className="switch-user-label">
          <p>Switch User</p>
        </div>
        <div className="switch-user-buttons">
          <button
            className={`switch-button ${userType === 'buyer' && 'selected'}`}
            onClick={() => switchUserType('buyer')}>
            Buyer
          </button>
          <button
            className={`switch-button ${userType === 'seller' && 'selected'}`}
            onClick={() => switchUserType('seller')}>
            Seller
          </button>
        </div>
      </div>
      <div className="logout-button-content">
        <button
          className="logout-button"
          onClick={() => {
            logoutClick();
          }}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
