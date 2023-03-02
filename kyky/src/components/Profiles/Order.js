import {useState} from "react";
import '../../styles/Profiles.scss'

const Order = ({order}) => {
  const [showOrderDataModal, setShowOrderDataModal] = useState(false);

  function getOperationtime(time) {
    return Date.parse(time) || 0;
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
              <p>Buyer</p>
            </div>
            <div className="detail-value">
              <p>
                {order.buyerName}
              </p>
            </div>
          </div>
          <div className="detail">
            <div className="detail-title">
              <p>Sum</p>
            </div>
            <div className="detail-value">
              <p>{parseInt(order.price) *6} {order.unit}</p>
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
              <p>{new Date(getOperationtime(order.operationTime)).toLocaleDateString('fi-FI')}</p>
              </div>
            </div>)}
        </div>
      </div>
      {showOrderDataModal && (
        <div className='order-data-modal transparent-background'>
          <div className='order-data-modal'>
            <div className='order-data-content'>
              <div className='order-data-title'>
                <p>{order.jobHeadline}</p>
              </div>
              <div className='order-data-image-details'>
                <div className="order-data-image">
                  <img src={order.jobPhotoURL} className="image" alt="" />
                </div>
                <div className='order-data-details'>
                  <div className='title-label-chat-button'>
                    <div className='title-label'>
                      <p>{order.jobHeadline}</p>
                    </div>
                    <div className='chat-button'>
                      <button>Chat with the buyer</button>
                    </div>
                  </div>
                  <div className='details-row'>
                    <div className="detail">
                      <div className="detail-title">
                        <p>Buyer</p>
                      </div>
                      <div className="detail-value">
                        <p>
                          {order.buyerName}
                        </p>
                      </div>
                    </div>
                    <div className="detail">
                      <div className="detail-title">
                        <p>Sum</p>
                      </div>
                      <div className="detail-value">
                        <p>{parseInt(order.price) *6} {order.unit}</p>
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
                    <div className='note-label'>
                      <p>Note to the buyer</p>
                    </div>
                    <div className='note-description'>
                      <p>I have several leashes and collar for dogs, cats and rabbits as well as small transport and small extra cage if needed.</p>
                    </div>
                  </div>
                  <div className='buttons-row'>
                  <button className='completed-button'>Mark as completed</button>
                  <button 
                    className='canceled-button'
                    onClick={() => setShowOrderDataModal(false)}>Mark as canceled</button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>)}
    </div>
  )
}

export default Order;