import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeBookingStatus } from '../../redux/bookings/bookingSlice';
import { addNotification } from '../../redux/notifications/notificationSlice';
import starFilled from '../../image/star-filled.svg';
import starBlank from '../../image/star-white.svg';
import '../../styles/Profiles.scss';

const PurchaseRating = ({ order }) => {
  function loopStars() {
    let star_img_list = [];
    for (let i = 0; i < profileRating; i++) {
      star_img_list.push(<img className="star-img" key={i} src={starFilled} alt="" />);
    }
    for (let i = profileRating; i < 5; i++) {
      star_img_list.push(<img className="star-img" key={i} src={starBlank} alt="" />);
    }
    return star_img_list;
  }
  return (
    <div className="order-container">
      <div className="order-image">
        <img src={order.jobPhotoURL} className="image" alt="" />
      </div>
      <div className="order-title-and-details">
        <div className="order-title">
          <p>{order.jobHeadline}</p>
        </div>
        <div className="order-details">
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
              <p>{order.status}</p>
            </div>
            <div className="detail-value">
              <p>{new Date(order.operationTime.seconds * 1000).toLocaleDateString('fi-FI')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseRating;
