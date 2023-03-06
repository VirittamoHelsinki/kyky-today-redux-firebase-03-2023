import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeBookingStatus } from '../../redux/bookings/bookingSlice';
import { addNotification } from '../../redux/notifications/notificationSlice';
import '../../styles/Profiles.scss';

const Order = ({ order, user }) => {
  const [showOrderDataModal, setShowOrderDataModal] = useState(false);

  const dispatch = useDispatch();

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
              <p>{order.bookingId}</p>
            </div>
          </div>
          <div className="detail">
            <div className="detail-title">
              <p>Buyer</p>
            </div>
            <div className="detail-value">
              <p>{order.buyerName}</p>
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
            <div className="order-data-button">
              <button onClick={() => setShowOrderDataModal(true)}>Order data</button>
            </div>
          ) : (
            <div className="detail">
              <div className="detail-title">
                <p>{order.status}</p>
              </div>
              <div className="detail-value">
                <p>{new Date(order.operationTime.seconds * 1000).toLocaleDateString('fi-FI')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {showOrderDataModal && (
        <div className="order-data-modal transparent-background">
          <div className="order-data-modal">
            <div className="order-data-content">
              <div className="order-data-title-close-button">
                <div className="order-data-title">
                  <p>{order.jobHeadline}</p>
                </div>
                <div className="order-data-close-button">
                  <span
                    id="cancel-button"
                    className="material-icons-outlined"
                    onClick={() => setShowOrderDataModal(false)}>
                    cancel
                  </span>
                </div>
              </div>
              <div className="order-data-image-details">
                <div className="order-data-image">
                  <img src={order.jobPhotoURL} className="image" alt="" />
                </div>
                <div className="order-data-details">
                  <div className="title-label-chat-button">
                    <div className="title-label">
                      <p>
                        {order.jobHeadline < 30
                          ? order.jobHeadline
                          : order.jobHeadline.substring(0, 30) + '...'}
                      </p>
                    </div>
                    <div className="chat-button">
                      <button>Chat with the buyer</button>
                    </div>
                  </div>
                  <div className="details-row">
                    <div className="detail">
                      <div className="detail-title">
                        <p>Buyer</p>
                      </div>
                      <div className="detail-value">
                        <p>{order.buyerName}</p>
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
                        <p>Status</p>
                      </div>
                      <div className="detail-value">
                        <p>{order.status}</p>
                      </div>
                    </div>
                  </div>
                  <div className="note-content">
                    <div className="note-label">
                      <p>Note to the buyer</p>
                    </div>
                    <div className="note-description">
                      <p>
                        I have several leashes and collar for dogs, cats and rabbits as well as
                        small transport and small extra cage if needed.
                      </p>
                    </div>
                  </div>
                  <div className="buttons-row">
                    <button
                      className="completed-button"
                      onClick={() => {
                        dispatch(
                          changeBookingStatus({
                            bookingId: order.bookingId,
                            status: 'completed'
                          })
                        );
                        dispatch(
                          addNotification({
                            uid: order.buyerUid,
                            notification: {
                              text: user.displayName + ' completed your booking',
                              to: '/buyer/purchases',
                              read: false
                            }
                          })
                        );
                        setShowOrderDataModal(false);
                      }}>
                      Mark as completed
                    </button>
                    <button
                      className="canceled-button"
                      onClick={() => {
                        dispatch(
                          changeBookingStatus({
                            bookingId: order.bookingId,
                            status: 'canceled'
                          })
                        );
                        dispatch(
                          addNotification({
                            uid: order.buyerUid,
                            notification: {
                              text: user.displayName + ' canceled your booking',
                              to: '/buyer/purchases',
                              read: false
                            }
                          })
                        );
                        setShowOrderDataModal(false);
                      }}>
                      Mark as canceled
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
