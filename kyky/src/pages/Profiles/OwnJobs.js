import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const OwnJobs = () => {
  const setSelectedWindow = useOutletContext();

  useEffect(() => {
    setSelectedWindow('own-jobs');
  }, []);

  return <div></div>;
};

export default OwnJobs;
