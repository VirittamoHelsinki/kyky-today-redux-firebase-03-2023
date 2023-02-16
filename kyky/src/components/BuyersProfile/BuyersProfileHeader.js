import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/BuyersProfile.scss';

export default function BuyersProfileHeader({ selectedWindow, setSelectedWindow }) {
  const navigate = new useNavigate();

  const _user = useSelector((state) => state.user);

  const Tabs = [
    { to: '/buyer/purchases', label: 'Purchases', id: 'purchases' },
    { to: '/buyer/messages', label: 'Messages', id: 'messages' },
    { to: '/buyer/ratings', label: 'Ratings', id: 'ratings' },
    { to: '/buyer/settings', label: 'Settings', id: 'settings' }
  ];

  function changeWindow(url, id) {
    navigate(`${url}`);
    setSelectedWindow(id);
  }

  return (
    <div className="buyers-profile--header-content">
      <div className="buyers-profile--header">
        <img src={_user.photoURL} referrerPolicy="no-referrer" className="userImage" alt="" />
        <div>
          <h3 className="username">{_user.displayName}</h3>
        </div>
      </div>

      <div className="buyers-profile--content-wrapper">
        <div className="buyers-profile--tabs">
          {Tabs.map(({ to, label, id }) => (
            <div
              key={id}
              className={`buyers-profile--button ${selectedWindow === id ? 'selected-tab' : ''}`}
              onClick={() => changeWindow(to, id)}>
              <h3>{label}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

BuyersProfileHeader.propTypes = {
  selectedWindow: PropTypes.string.isRequired,
  setSelectedWindow: PropTypes.func.isRequired
};
