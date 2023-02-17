import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import BuyersProfileHeader from '../../components/Profiles/BuyersProfileHeader';
import '../../styles/Profiles.scss';

const BuyersProfile = () => {
  const [selectedWindow, setSelectedWindow] = useState('messages');

  return (
    <div className="profiles--container">
      <BuyersProfileHeader selectedWindow={selectedWindow} setSelectedWindow={setSelectedWindow} />
      <div className="profiles--content">
        <Outlet context={setSelectedWindow} />
      </div>
    </div>
  );
};

export default BuyersProfile;
