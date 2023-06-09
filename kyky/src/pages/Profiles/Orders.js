import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Order from '../../components/Profiles/Order';

const Orders = () => {
  const setSelectedWindow = useOutletContext();
  const [incompleted, setIncompleted] = useState([]);
  const [completed, setCompleted] = useState([]);

  const _user = useSelector((state) => state.user);
  const _orders = useSelector((state) => state.order.bookings);

  useEffect(() => {
    setSelectedWindow('orders');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array.isArray(_orders)) {
      const incompletes = _orders.filter(
        (order) => order.confirmed && order.status === 'incompleted'
      );
      setIncompleted(incompletes);
      const completes = _orders.filter((order) => order.status === 'completed');
      setCompleted(completes);
    }
  }, [_orders]);

  return (
    <div className="orders-main">
      <div className="order-content">
        <div className="status-label">
          <p>Incompleted orders</p>
        </div>
        <div className="order-items">
          {incompleted.map((o, index) => (
            <Order order={o} key={index} user={_user} />
          ))}
        </div>
      </div>
      <div className="order-content">
        <div className="status-label">
          <p>Completed orders</p>
        </div>
        <div className="order-items">
          {completed.map((o, index) => (
            <Order order={o} key={index} user={_user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
