import React from 'react';
import { ReactComponent as Heart } from '../../../image/heart.svg';
import '../../../styles/buyersrating.scss';

export default function ThanksForRating() {
  return (
    <div className="thanksForRating">
      <Heart className="heart1" />
      <Heart className="heart2" />
      <Heart className="heart3" />
      <Heart className="heart4" />
      <Heart className="heart5" />
      <Heart className="heart6" />
      <Heart className="heart7" />
      <Heart className="heart8" />
      <h1 style={{ maxWidth: 460 }}>Thank you for rating, you just helped FirstName to improve!</h1>
    </div>
  );
}
