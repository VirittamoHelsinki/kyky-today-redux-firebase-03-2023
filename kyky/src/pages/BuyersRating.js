import React from 'react';
import { ReactComponent as Star2 } from '../image/star2.svg';
import '../styles/buyersrating.scss';

export default function BuyersRating() {
  return (
    <div>
      <div className="buyersRatingMainContainer">
        <div className="buyerSideBar">
          <h3>UI/UX Designer</h3>
        </div>

        <div className="buyersRatingContainer1">
          <h3>What did FirstName do well and made you happy?</h3>
          <button className="buyerAttributes">Punctual</button>
          <button className="buyerAttributes">Friendly</button>
          <button className="buyerAttributes">Responsible</button>
          <button className="buyerAttributes">Good taste</button>
          <button className="buyerAttributes">Empathetic</button>
          <button className="buyerAttributes">Creative</button>
          <button className="buyerAttributes">Professional</button>
          <button className="buyerAttributes">Problem Solving</button>
          <button className="buyerAttributes">Positive Attitude</button>
          <textarea className="buyerTextArea" placeholder="Feel free to add more fair comments!" />
        </div>
        <div className="buyersRatingContainer2">
          <h3>How do you rate FirstName?</h3>
          <div className="starContainer">
            <Star2 className="star" />
            <Star2 className="star" />
            <Star2 className="star" />
            <Star2 className="star" />
            <Star2 className="star" />
          </div>
          <button className="submitButton">Submit</button>
        </div>
      </div>
    </div>
  );
}
