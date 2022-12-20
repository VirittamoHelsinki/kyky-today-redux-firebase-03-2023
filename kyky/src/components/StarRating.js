import React, { useState } from 'react';
import { ReactComponent as Star2 } from '../image/star2.svg';
import '../styles/buyersrating.scss';

export default function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}>
            <span className="star" style={{ width: 100 }}>
              <Star2 />
            </span>
          </button>
        );
      })}
    </div>
  );
}
