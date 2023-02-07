import React from 'react';
import { register_texts } from './FAQtexts';
import '../../styles/HowServiceWorks.scss';

const HowServiceWorks = () => {
  return (
    <div className="how-works-main">
      <div className="how-works-title-and-video">
        <div className="how-works-title">
          <p>Miten palvelu toimii</p>
        </div>
        <div className="how-works-video">
          <div className="video-responsive">
            <iframe
              height="487px"
              className="embedded-video"
              src="https://www.youtube.com/embed/0xgMbn3TLeY"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </div>
      </div>
      <div className="register-info-content">
        <div className="register-info-box">
          <div className="register-info-title">
            <p>Rekisteröitymiseen menee alle 5 minuuttia</p>
          </div>
          <div className="register-info-grid">
            {register_texts.map((text, index) => (
              <div className="info-number-and-text">
                <span className="info-number">{index + 1}</span>
                <p className="info-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pricing-content">
        <div className="pricing-headline">
          <p>Hinnasto</p>
        </div>
        <div className="pricing-description">
          <p>Läpinäkyvä hinnoittelu. Ei yllätyksiä tai piilotettuja kustannuksia</p>
        </div>
        <div className="pricing-cards">
          <div className="pricing-card">
            <div className="card-headline">
              <p>REKISTERÖINTI</p>
            </div>
            <div className="card-fee">
              <p>Maksuton</p>
            </div>
            <div className="card-price">
              <p>€0</p>
            </div>
            <div className="card-percents"></div>
            <div className="card-limited">
              <p>LOPUTTOMASTI</p>
            </div>
          </div>
          <div className="pricing-card">
            <div className="card-headline">
              <p>KOMISSIO</p>
            </div>
            <div className="card-fee">
              <p>Maksuton</p>
            </div>
            <div className="card-price">
              <p>€0</p>
            </div>
            <div className="card-percents"></div>
            <div className="card-limited">
              <p>LOPUTTOMASTI</p>
            </div>
          </div>
          <div className="pricing-card">
            <div className="card-headline">
              <p>STRIPE PANKKI PROVISION</p>
            </div>
            <div className="card-fee">
              <p>Maksuton</p>
            </div>
            <div className="card-price">
              <p>0.25€ +1.4%</p>
            </div>
            <div className="card-limited">
              <p>EU PANKKIKORTTI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowServiceWorks;
