import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/Profiles.scss';

export default function SellersProfileHeader({ selectedWindow, setSelectedWindow }) {
  const navigate = new useNavigate();

  const _user = useSelector((state) => state.user);

  const Tabs = [
    { to: '/seller/own-jobs', label: 'Own Jobs', id: 'own-jobs' },
    { to: '/seller/messages', label: 'Messages', id: 'messages' },
    { to: '/seller/ratings', label: 'Ratings', id: 'ratings' },
    { to: '/seller/earnings', label: 'Earnings', id: 'earnings' },
    { to: '/seller/purchases', label: 'Purchases', id: 'purchases' },
    { to: '/seller/favourite-jobs', label: 'Favourite jobs', id: 'favourite-jobs' },
    { to: '/seller/settings', label: 'Settings', id: 'settings' }
  ];

  function changeWindow(to, id) {
    navigate(`${to}`);
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

SellersProfileHeader.propTypes = {
  selectedWindow: PropTypes.string.isRequired,
  setSelectedWindow: PropTypes.func.isRequired
};
