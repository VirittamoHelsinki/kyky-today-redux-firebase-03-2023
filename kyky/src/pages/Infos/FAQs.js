import { useState } from 'react';
import { buyer_headlines, buyer_texts } from './FAQtexts';

const initialFalses = [];

for (let i = 0; i < 20; i++) {
  initialFalses.push(false);
}

const FAQs = () => {
  const [expandedTexts, setExpandedTexts] = useState(initialFalses);

  return (
    <div className="faq-main">
      {buyer_headlines.map((headline, index) => (
        <div></div>
      ))}
    </div>
  );
};

export default FAQs;
