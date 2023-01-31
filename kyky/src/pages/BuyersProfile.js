import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/BuyersProfile.scss';
import Purchases from '../components/BuyersProfile/Purchases';

const Tabs = {
  Purchases: 'Ostokset',
  Messages: 'Viestit',
  Ratings: 'Arvostelut',
  Settings: 'Tilin asetukset'
};

function BuyersProfile() {
  const [currentTab, setCurrentTab] = useState(Tabs.Purchases);

  const _user = useSelector((state) => state.user);

  function selectedTab(currentTab) {
    setCurrentTab(currentTab);
  }

  return (
    <div className="buyers-profile--container">
      <div className="buyers-profile--header">
        <img
          src={_user.photoURL}
          referrerPolicy="no-referrer"
          className="userImage"
          style={{ width: '100px', height: '100px', background: '#387a70', borderRadius: '50px' }}
        />
        <div>
          <h3 className="username">{_user.displayName}</h3>
        </div>
      </div>

      <div className="buyers-profile--content-wrapper">
        <div className="buyers-profile--tabs">
          <div
            className={`buyers-profile--button ${
              currentTab === Tabs.Purchases ? 'selected-tab' : ''
            }`}
            onClick={() => selectedTab(Tabs.Purchases)}>
            <h3>Ostokset</h3>
          </div>
          <div
            className={`buyers-profile--button ${
              currentTab === Tabs.Messages ? 'selected-tab' : ''
            }`}
            onClick={() => selectedTab(Tabs.Messages)}>
            <h3>Viestit</h3>
          </div>
          <div
            className={`buyers-profile--button ${
              currentTab === Tabs.Ratings ? 'selected-tab' : ''
            }`}
            onClick={() => selectedTab(Tabs.Ratings)}>
            <h3>Arvostelut</h3>
          </div>
          <div
            className={`buyers-profile--button ${
              currentTab === Tabs.Settings ? 'selected-tab' : ''
            }`}
            onClick={() => selectedTab(Tabs.Settings)}>
            <h3>Tilin asetukset</h3>
          </div>
        </div>

        <div className="buyers-profile--content">
          {currentTab === Tabs.Purchases && <Purchases />}
        </div>
      </div>
    </div>
  );
}

export default BuyersProfile;
