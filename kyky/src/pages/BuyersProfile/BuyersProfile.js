import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import BuyersProfileHeader from '../../components/BuyersProfile/BuyersProfileHeader';
import '../../styles/BuyersProfile.scss';

const BuyersProfile = () => {
  const [selectedWindow, setSelectedWindow] = useState('messages');

  return (
    <div className="buyers-profile--container">
      <BuyersProfileHeader selectedWindow={selectedWindow} setSelectedWindow={setSelectedWindow} />
      <div className="buyers-profile--content">
        <Outlet context={setSelectedWindow} />
      </div>
    </div>
  );
};

export default BuyersProfile;
