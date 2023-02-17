import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const FavouriteJobs = () => {
  const setSelectedWindow = useOutletContext();

  useEffect(() => {
    setSelectedWindow('favourite-jobs');
  }, []);

  return <div></div>;
};

export default FavouriteJobs;
