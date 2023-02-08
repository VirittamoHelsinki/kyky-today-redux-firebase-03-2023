import { useEffect } from 'react';
import '../../styles/HowServiceWorks.scss';

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="how-works-main">
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

export default Pricing;
