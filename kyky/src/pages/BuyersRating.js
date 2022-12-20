import { React, useState } from 'react';

import { ReactComponent as ProfileIcon2 } from '../image/profileicon2.svg';
import StarRating from '../components/StarRating';

import '../styles/buyersrating.scss';
import Button from '../components/Button';

export default function BuyersRating() {
  const [selected1, setSelected1] = useState('buyerAttributes');
  const [selected2, setSelected2] = useState('buyerAttributes');
  const [selected3, setSelected3] = useState('buyerAttributes');
  const [selected4, setSelected4] = useState('buyerAttributes');
  const [selected5, setSelected5] = useState('buyerAttributes');
  const [selected6, setSelected6] = useState('buyerAttributes');
  const [selected7, setSelected7] = useState('buyerAttributes');
  const [selected8, setSelected8] = useState('buyerAttributes');
  const [selected9, setSelected9] = useState('buyerAttributes');

  const selectAttribute1 = () => {
    setSelected1('buyerAttributes2');
  };
  const selectAttribute2 = () => {
    setSelected2('buyerAttributes2');
  };
  const selectAttribute3 = () => {
    setSelected3('buyerAttributes2');
  };
  const selectAttribute4 = () => {
    setSelected4('buyerAttributes2');
  };
  const selectAttribute5 = () => {
    setSelected5('buyerAttributes2');
  };
  const selectAttribute6 = () => {
    setSelected6('buyerAttributes2');
  };
  const selectAttribute7 = () => {
    setSelected7('buyerAttributes2');
  };
  const selectAttribute8 = () => {
    setSelected8('buyerAttributes2');
  };
  const selectAttribute9 = () => {
    setSelected9('buyerAttributes2');
  };

  return (
    <div className="buyersRating">
      <div className="buyerSideBar">
        <ProfileIcon2 className="profilePic" />
        <h3>UI/UX Designer</h3>
      </div>
      <div className="buyersRatingMainContainer">
        <h3 className="howDoYouRate">What did FirstName do well and made you happy?</h3>
        <div className="buyersRatingContainer1">
          <button className={selected1} onClick={selectAttribute1}>
            Punctual
          </button>
          <button className={selected2} onClick={selectAttribute2}>
            Friendly
          </button>
          <button className={selected3} onClick={selectAttribute3}>
            Responsible
          </button>
          <button className={selected4} onClick={selectAttribute4}>
            Good taste
          </button>
          <button className={selected5} onClick={selectAttribute5}>
            Empathetic
          </button>
          <button className={selected6} onClick={selectAttribute6}>
            Creative
          </button>
          <button className={selected7} onClick={selectAttribute7}>
            Professional
          </button>
          <button className={selected8} onClick={selectAttribute8}>
            Problem Solving
          </button>
          <button className={selected9} onClick={selectAttribute9}>
            Positive Attitude
          </button>

          <textarea className="buyerTextArea" placeholder="Feel free to add more fair comments!" />
        </div>
        <div className="buyersRatingContainer2">
          <h3>How do you rate FirstName?</h3>
          <div className="starContainer">
            <StarRating className="star-rating" />
          </div>

          <Button className="submitButton" link="thanks-for-rating">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
