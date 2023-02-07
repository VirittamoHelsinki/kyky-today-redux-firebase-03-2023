import { useState } from 'react';
import BuyerFAQ from './BuyerFAQ';
import SellerFAQ from './SellerFAQ';
import '../../styles/FAQs.scss';

const FAQs = () => {
  const [buyerSelected, setBuyerSelected] = useState(false);

  return (
    <div className="faq-main">
      <div className="faq-headline">
        <p>Frequently Asked Questions</p>
      </div>
      <div className="faq-tab">
        <div
          className={`tab-item${buyerSelected ? ' selected' : ''}`}
          onClick={() => setBuyerSelected(true)}>
          Ostaja
        </div>
        <div
          className={`tab-item${!buyerSelected ? ' selected' : ''}`}
          onClick={() => setBuyerSelected(false)}>
          Myyjä
        </div>
      </div>
      {buyerSelected ? <BuyerFAQ /> : <SellerFAQ />}
    </div>
  );
};

export default FAQs;
