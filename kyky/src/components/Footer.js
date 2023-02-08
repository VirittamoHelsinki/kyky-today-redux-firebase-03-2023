import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.scss';

const Footer = () => {
  return (
    <div className="footer-main">
      <div className="info-box">
        <div className="title">YRITYS</div>
        <Link to="/kyky-team">
          <div className="content">TIIMI/TEAM</div>
        </Link>
        <div className="content">YHTEYSTIEDOT/CONTACT</div>
        <Link to="/how-service-works">
          <div className="content">MITEN PALVELU TOIMII</div>
        </Link>
        <Link to="/additional-services">
          <div className="content">PREMIUM-PALVELUT</div>
        </Link>
      </div>
      <div className="info-box">
        <div className="title">TUKI</div>
        <Link to="/kyky-faqs">
          <div className="content">UKK/FAQ</div>
        </Link>
        <Link to="/terms-of-service">
          <div className="content">KÄYTTÖEHDOT/TERMS OF SERVICE</div>
        </Link>
        <Link to="/privacy-policy">
          <div className="content">TIETOSUOJASELOSTE/PRIVACY POLICY</div>
        </Link>
        <Link to="/pricing">
          <div className="content">HINNASTO</div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
