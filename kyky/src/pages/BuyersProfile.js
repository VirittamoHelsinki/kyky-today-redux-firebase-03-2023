import { useState } from 'react';
import { useSelector } from 'react-redux';
import Purchases from '../components/BuyersProfile/Purchases';
import Messages from '../components/BuyersProfile/Messages';
import '../styles/BuyersProfile.scss';

const Tabs = [
  { tab: 'Purchases', display: 'Ostokset' },
  { tab: 'Messages', display: 'Viestit' },
  { tab: 'Ratings', display: 'Arvostelut' },
  { tab: 'Settings', display: 'Tilin asetukset' }
];

function BuyersProfile() {
  const [currentTab, setCurrentTab] = useState(Tabs.Purchases);

  const _user = useSelector((state) => state.user);

  return (
    <div className="buyers-profile--container">
      <div className="buyers-profile--header">
        <img src={_user.photoURL} referrerPolicy="no-referrer" className="userImage" />
        <div>
          <h3 className="username">{_user.displayName}</h3>
        </div>
      </div>

      <div className="buyers-profile--content-wrapper">
        <div className="buyers-profile--tabs">
          {Tabs.map(({ tab, display }) => (
            <div
              className={`buyers-profile--button ${currentTab === tab ? 'selected-tab' : ''}`}
              onClick={() => setCurrentTab(tab)}>
              <h3>{display}</h3>
            </div>
          ))}
        </div>

        <div className="buyers-profile--content">
          {currentTab === 'Purchases' && <Purchases />}
          {currentTab === 'Messages' && <Messages user={_user} />}
        </div>
      </div>
    </div>
  );
}

export default BuyersProfile;
