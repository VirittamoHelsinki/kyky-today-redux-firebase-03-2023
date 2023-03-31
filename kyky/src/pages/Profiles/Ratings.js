import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { fetchPurchasesByQuery } from '../../redux/orders/orderSlice';
import PurchaseRating from '../../components/Profiles/PurchaseRating';

const Ratings = () => {
  const setSelectedWindow = useOutletContext();
  const [completed, setCompleted] = useState([]);

  const dispatch = useDispatch();

  const _user = useSelector((state) => state.user);
  const _orders = useSelector((state) => state.order.purchases);

  useEffect(() => {
    setSelectedWindow('ratings');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchPurchasesByQuery(_user.uid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_user]);

  useEffect(() => {
    if (Array.isArray(_orders)) {
      const completes = _orders.filter((order) => order.status === 'completed');
      setCompleted(completes);
    }
  }, [_orders]);

  return (
    <div className="ratings-main">
      <div className="ratings-items">
        {completed.map((order, index) => (
          <PurchaseRating order={order} user={_user} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Ratings;
