import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Orders = () => {
  const setSelectedWindow = useOutletContext();

  useEffect(() => {
    setSelectedWindow('orders');
  }, []);

  return <div></div>;
};

export default Orders;
