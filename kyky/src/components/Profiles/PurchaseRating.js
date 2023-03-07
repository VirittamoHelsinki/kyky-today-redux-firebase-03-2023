import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRating } from '../../redux/profiles/ratingSlice';
import { rateCompletedPurchase } from '../../redux/bookings/bookingSlice';
import starFilled from '../../image/star-filled.svg';
import starBlank from '../../image/star-white.svg';
import '../../styles/Profiles.scss';

const adjs = [
  { text: 'Punctual', selected: false },
  { text: 'Friendly', selected: false },
  { text: 'Responsible', selected: false },
  { text: 'Good taste', selected: false },
  { text: 'Empathetic', selected: false },
  { text: 'Creative', selected: false },
  { text: 'Professional', selected: false },
  { text: 'Problem solving', selected: false },
  { text: 'Positive attitude', selected: false }
];

const PurchaseRating = ({ order, user }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedTexts, setSelectedTexts] = useState(adjs);
  const [comment, setComment] = useState('');
  const [starValue, setStarValue] = useState(5);

  const dispatch = useDispatch();

  function submitRating() {
    const texts = selectedTexts.filter((f) => f.selected).map((t) => t.text);
    dispatch(
      addRating({
        uid: order.sellerUid,
        rating: {
          buyerName: user.displayName,
          buyerUid: user.uid,
          texts: texts,
          comment: comment,
          stars: starValue
        }
      })
    );
    dispatch(
      rateCompletedPurchase({
        bookingId: order.bookingId,
        value: starValue
      })
    );
    setSelectedTexts(adjs);
    setComment('');
    setStarValue(5);
  }

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
              <p>{new Date(order.activityTime.seconds * 1000).toLocaleDateString('fi-FI')}</p>
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
                  {selectedTexts.map((text, index) => (
                    <div className="rating-modal-text" key={index}>
                      <div
                        className={`adj-text ${text.selected ? 'selected' : ''}`}
                        onClick={() => {
                          let texts = [...selectedTexts];
                          texts[index].selected = !texts[index].selected;
                          setSelectedTexts(texts);
                        }}>
                        {text.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rating-modal-textarea-content">
                  <textarea
                    className="rating-modal-textarea"
                    name="comments-field"
                    value={comment}
                    placeholder="Feel free to add more fair comments!"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                </div>
                <div className="rating-modal-stars-content">
                  <div className="rating-modal-stars-label">
                    <p>How do you rate {order.sellerName}?</p>
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
                  <button
                    className="submit-button"
                    onClick={() => {
                      submitRating();
                      setShowRatingModal(false);
                    }}>
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
