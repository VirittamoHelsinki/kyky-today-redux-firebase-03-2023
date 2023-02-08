import React from 'react';
import defaultJobImage from '../../image/martin-dalsgaard-sGV1QDMM0Gg-unsplash.jpg';

const AdditionalServices = () => {
  return (
    <div className="additional-services-main">
      <div className="additional-services-content">
        <div className="additional-services-headline">
          <p>Lisäpalvelut</p>
        </div>
        <div className="additional-services-description">
          <p>
            Tarjoamme palveluja tilauksesta. Jos et löydä pyytämääsi palvelua täältä, ota meihin
            yhteyttä: support@kyky.today
          </p>
        </div>
        <div className="service-grid">
          <div className="service-item">
            <div className="item-image">
              <img src={defaultJobImage} className="image" alt="" />
            </div>
            <div className="item-title">
              <p>PROFESSIONAL LOGO DESIGN</p>
            </div>
            <div className="item-description">
              <p>
                Our designer will create a selection of logos for your brand to choose from
                according to your instructions. Fixed price with unlimited revisions. <br />
                <br />
                45 € (VAT incl.) <br />
                <br />
                Delivery: 1 to 3 days <br />
                <br />
                Based on the complexity of your project
              </p>
            </div>
          </div>
          <div className="service-item">
            {' '}
            <div className="item-image">
              <img src={defaultJobImage} className="image" alt="" />
            </div>
            <div className="item-title">
              <p>SOCIAL MEDIA CREATION</p>
            </div>
            <div className="item-description">
              <p>
                We can help you with Email setup; Facebook, Twitter, Instagram, SnapChat, TikTok,
                LinkedIn profile creation and branding support. <br />
                <br />
                65 € (VAT incl.) <br />
                <br />
                Delivery: 1 to 3 days <br />
                <br />
                Based on the amount of accounts creation
              </p>
            </div>
          </div>
          <div className="service-item">
            {' '}
            <div className="item-image">
              <img src={defaultJobImage} className="image" alt="" />
            </div>
            <div className="item-title">
              <p>SIMPLE ONE-PAGER WEBSITE</p>
            </div>
            <div className="item-description">
              <p>
                A simple one-pager website listing your services and contact info. Pictures when not
                free will be billed separately (your choice). <br />
                <br />
                99 € (VAT incl.) <br />
                <br />
                Delivery: min 3 days <br />
                <br />
                Based on the amount of customization/ reviews
              </p>
            </div>
          </div>
          <div className="service-item">
            {' '}
            <div className="item-image">
              <img src={defaultJobImage} className="image" alt="" />
            </div>
            <div className="item-title">
              <p>MULTI-PAGE WEBSITE</p>
            </div>
            <div className="item-description">
              <p>
                Multi-page website with design, structure, and content support. Pictures when not
                free will be billed separately (your choice). <br />
                <br />
                199 € (VAT incl.) <br />
                <br />
                Delivery: min 5 days <br />
                <br />
                Based on the amount of customization/ reviews
              </p>
            </div>
          </div>
        </div>
        <div className="additional-service-button">
          <div className="service-button"></div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalServices;
