import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.scss';

const Footer = () => {
  return (
    <div className="footer-main">
      <div className="info-box">
        <div className="title">YRITYS</div>
        <Link to="/categories/home_maintenance_and_repairs">
          <div className="content">TIIMI/TEAM</div>
        </Link>
        <div className="content">YHTEYSTIEDOT/CONTACT</div>
        <div className="content">MITEN PALVELU TOIMII</div>
        <div className="content">PREMIUM-PALVELUT</div>
      </div>
      <div className="info-box">
        <div className="title">TUKI</div>
        <div className="content">UKK/FAQ</div>
        <div className="content">KÄYTTÖEHDOT/TERMS OF SERVICE</div>
        <div className="content">TIETOSUOJASELOSTE/PRIVACY POLICY</div>
        <div className="content">HINNASTO</div>
      </div>
    </div>
  );
};

export default Footer;
