import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Purchases from '../components/BuyersProfile/Purchases';
import Messages from '../components/BuyersProfile/Messages';
import '../styles/BuyersProfile.scss';

const Tabs = [
  { tab: 'Messages', display: 'Viestit' },
  { tab: 'Purchases', display: 'Ostokset' },
  { tab: 'Ratings', display: 'Arvostelut' },
  { tab: 'Settings', display: 'Tilin asetukset' }
];

function BuyersProfile() {
  const [currentTab, setCurrentTab] = useState('Messages');

  const _user = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="buyers-profile--container">
      <div className="buyers-profile--header">
        <img src={_user.photoURL} referrerPolicy="no-referrer" className="userImage" alt="" />
        <div>
          <h3 className="username">{_user.displayName}</h3>
        </div>
      </div>

      <div className="buyers-profile--content-wrapper">
        <div className="buyers-profile--tabs">
          {Tabs.map(({ tab, display }, index) => (
            <div
              key={index}
              className={`buyers-profile--button ${currentTab === tab ? 'selected-tab' : ''}`}
              onClick={() => setCurrentTab(tab)}>
              <h3>{display}</h3>
            </div>
          ))}
        </div>

        <div className="buyers-profile--content">
          {currentTab === 'Messages' && <Messages user={_user} />}
          {currentTab === 'Purchases' && <Purchases />}
        </div>
      </div>
    </div>
  );
}

export default BuyersProfile;
