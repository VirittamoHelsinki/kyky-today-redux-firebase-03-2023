import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Ratings = () => {
  const setSelectedWindow = useOutletContext();

  useEffect(() => {
    setSelectedWindow('ratings');
  }, []);

  return <div></div>;
};

export default Ratings;
