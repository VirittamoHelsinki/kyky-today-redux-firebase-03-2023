import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPurchasesByQuery } from '../../redux/orders/orderSlice';
import Purchase from '../../components/Profiles/Purchase';

const Purchases = () => {
  const setSelectedWindow = useOutletContext();
  const [incompleted, setIncompleted] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [canceled, setCanceled] = useState([]);

  const dispatch = useDispatch();

  const _user = useSelector((state) => state.user);
  const _orders = useSelector((state) => state.order.purchases);

  useEffect(() => {
    setSelectedWindow('purchases');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchPurchasesByQuery(_user.uid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_user]);

  useEffect(() => {
    if (Array.isArray(_orders)) {
      const incompletes = _orders.filter(
        (order) => order.confirmed && order.status === 'incompleted'
      );
      setIncompleted(incompletes);
      const completes = _orders.filter((order) => order.status === 'completed');
      setCompleted(completes);
      const cancels = _orders.filter((order) => order.status === 'canceled');
      setCanceled(cancels);
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
            <Purchase order={o} key={index} />
          ))}
        </div>
      </div>
      <div className="order-content">
        <div className="status-label">
          <p>Completed orders</p>
        </div>
        <div className="order-items">
          {completed.map((o, index) => (
            <Purchase order={o} key={index} />
          ))}
        </div>
      </div>
      <div className="order-content">
        <div className="status-label">
          <p>Canceled orders</p>
        </div>
        <div className="order-items">
          {canceled.map((o, index) => (
            <Purchase order={o} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Purchases;
