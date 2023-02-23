import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import SellersProfileHeader from '../../components/Profiles/SellersProfileHeader';
import '../../styles/Profiles.scss';

const SellersProfile = () => {
  const [selectedWindow, setSelectedWindow] = useState('dashboard');

  return (
    <div className="profiles--container">
      <SellersProfileHeader selectedWindow={selectedWindow} setSelectedWindow={setSelectedWindow} />
      <div className="profiles--content">
        <div className="profiles--content-header">
          <p>{selectedWindow}</p>
        </div>
        <Outlet context={setSelectedWindow} />
      </div>
    </div>
  );
};

export default SellersProfile;
