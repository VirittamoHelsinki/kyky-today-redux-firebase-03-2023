import React from 'react';
import '../../styles/Profiles.scss';

const Purchase = ({ order }) => {
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
              <p>Booking Id</p>
            </div>
            <div className="detail-value">
              <p>{order.orderId}</p>
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
          {order.status === 'incompleted' ? (
            <div className="detail">
              <div className="detail-title">
                <p>{order.status}</p>
              </div>
              <div className="detail-value">
                <p>Pending...</p>
              </div>
            </div>
          ) : (
            <div className="detail">
              <div className="detail-title">
                <p>{order.status}</p>
              </div>
              <div className="detail-value">
                <p>{new Date(order.activityTime.seconds * 1000).toLocaleDateString('fi-FI')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchase;
