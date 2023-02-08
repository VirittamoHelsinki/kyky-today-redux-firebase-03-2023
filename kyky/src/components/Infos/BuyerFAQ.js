import { useState } from 'react';
import { buyer_headlines, buyer_texts } from './FAQtexts';
import '../../styles/FAQs.scss';

const initFalses = [];

for (let i = 0; i < buyer_headlines.length; i++) {
  initFalses.push(false);
}

const BuyerFAQ = () => {
  const [extendedTexts, setExtendedTexts] = useState(initFalses);

  return (
    <div className="faq-content">
      {buyer_headlines.map((headline, index) => (
        <div className="faq-item" key={index}>
          <div className="headline-content">
            <div className="item-headline">
              <p>{headline}</p>
            </div>
            <div
              className="item-icon"
              onClick={() => {
                let new_list = [...extendedTexts];
                new_list[index] = !new_list[index];
                setExtendedTexts(new_list);
              }}>
              {extendedTexts[index] ? (
                <span id="custom-size" className="material-icons-outlined">
                  remove
                </span>
              ) : (
                <span id="custom-size" className="material-icons-outlined">
                  add
                </span>
              )}
            </div>
          </div>
          {extendedTexts[index] && (
            <div className="faq-extended">
              <p>{buyer_texts[index]}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BuyerFAQ;
