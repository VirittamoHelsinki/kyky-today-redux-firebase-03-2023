import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Earnings = () => {
  const setSelectedWindow = useOutletContext();

  useEffect(() => {
    setSelectedWindow('earnings');
  }, []);

  return <div></div>;
};

export default Earnings;
