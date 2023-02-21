import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/Profiles.scss';

export default function BuyersProfileHeader({ selectedWindow, setSelectedWindow }) {
  const navigate = new useNavigate();

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
    <div className="profiles--header-content">
      <div className="profiles--content-wrapper">
        <div className="profiles--tabs">
          {Tabs.map(({ to, label, id }) => (
            <div
              key={id}
              className={`profiles--button ${selectedWindow === id ? 'selected-tab' : ''}`}
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
