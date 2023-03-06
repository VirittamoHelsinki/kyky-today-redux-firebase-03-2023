import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import starFilled from '../../image/star-filled.svg';
import starBlank from '../../image/star-white.svg';
import '../../styles/Profiles.scss';

const PurchaseRating = ({ order }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedTexts, setSelectedTexts] = useState([]);
  const [comments, setComments] = useState('');
  const [starValue, setStarValue] = useState(5);

  const adjectives = [
    'Punctual',
    'Friendly',
    'Responsible',
    'Good taste',
    'Empathetic',
    'Creative',
    'Professional',
    'Problem solving',
    'Positive Attitude'
  ];

  function loopStars(rating) {
    let star_img_list = [];
    for (let i = 0; i < rating; i++) {
      star_img_list.push(<img className="star-img" key={i} src={starFilled} alt="" />);
    }
    for (let i = rating; i < 5; i++) {
      star_img_list.push(<img className="star-img" key={i} src={starBlank} alt="" />);
    }
    return star_img_list;
  }

  return (
    <div className="purchase-rating-container">
      <div className="purchase-rating-image">
        <img src={order.jobPhotoURL} className="image" alt="" />
      </div>
      <div className="purchase-rating-title-and-details">
        <div className="purchase-rating-title">
          <p>{order.jobHeadline}</p>
        </div>
        <div className="purchase-rating-details">
          <div className="detail">
            <div className="detail-title">
              <p>Booking Id</p>
            </div>
            <div className="detail-value">
              <p>{order.bookingId}</p>
            </div>
          </div>
          <div className="detail">
            <div className="detail-title">
              <p>Seller</p>
            </div>
            <div className="detail-value">
              <p>{order.sellerName}</p>
            </div>
          </div>
          <div className="detail">
            <div className="detail-title">
              <p>Sum</p>
            </div>
            <div className="detail-value">
              <p>
                {parseInt(order.price) * 6} {order.unit}
              </p>
            </div>
          </div>
          <div className="detail">
            <div className="detail-title">
              <p>Purchased</p>
            </div>
            <div className="detail-value">
              <p>{new Date(order.created.seconds * 1000).toLocaleDateString('fi-FI')}</p>
            </div>
          </div>
          <div className="detail">
            <div className="detail-title">
              <p>completed</p>
            </div>
            <div className="detail-value">
              <p>{new Date(order.operationTime.seconds * 1000).toLocaleDateString('fi-FI')}</p>
            </div>
          </div>
          {order.rating > 0 ? (
            <div className="purchase-rating-stars">
              {loopStars(order.rating).map((star) => star)}
            </div>
          ) : (
            <div className="rating-button-container">
              <button className="rating-button" onClick={() => setShowRatingModal(true)}>
                Rate now
              </button>
            </div>
          )}
        </div>
        {showRatingModal && (
          <div className="rating-modal transparent-background">
            <div className="rating-modal">
              <div className="rating-modal-content">
                <div className="rating-modal-top-row">
                  <div className="rating-modal-image-name-title">
                    <div className="rating-modal-image-content">
                      <img src={order.buyerPhotoURL} className="rating-modal-image" alt="" />
                    </div>
                    <div className="rating-modal-name-title-content">
                      <div className="rating-modal-name">
                        <p>{order.buyerName}</p>
                      </div>
                      <div className="rating-modal-title">
                        <p>{order.jobTitle}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rating-modal-close-button-content">
                    <span
                      className="material-icons-outlined"
                      onClick={() => setShowRatingModal(false)}>
                      close
                    </span>
                  </div>
                </div>
                <div className="rating-modal-texts-content">
                  {adjectives.map((adj, index) => (
                    <div className="rating-modal-text" key={index}>
                      {selectedTexts.includes(adj) ? (
                        <div className="adj-text selected">{adj}</div>
                      ) : (
                        <div className="adj-text">{adj}</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="rating-modal-textarea-content">
                  <textarea
                    className="rating-modal-textarea"
                    name="comments-field"
                    value={comments}
                    placeholder="Feel free to add more fair comments!"
                    onChange={(e) => {
                      setComments(e.target.value);
                    }}
                  />
                </div>
                <div className="rating-modal-stars-content">
                  <div className="rating-modal-stars-label">
                    <p>How do you rate {order.sellerName}</p>
                  </div>
                  <div className="rating-modal-stars-row">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                      <img
                        className="rating-modal-star"
                        key={index}
                        src={starValue >= star ? starFilled : starBlank}
                        alt=""
                        onClick={() => setStarValue(star)}
                      />
                    ))}
                  </div>
                </div>
                <div className="submit-button-content">
                  <button className="submit-button" onClick={() => setShowRatingModal(false)}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseRating;
